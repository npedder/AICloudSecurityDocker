# import time module, Observer, FileSystemEventHandler
import time
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
from recog import *
from database import *
import os

dbFilePath = "/app/volume/photos.db"
create_sqlite_database("/app/volume/photos.db")
createPhotosTable("/app/volume/photos.db")
createCamerasTable("/app/volume/photos.db")




def rebuildDatabaseFromPhotosFolder(folderPath):
    photosInDirectory = os.listdir(folderPath)
    for photoName in photosInDirectory:
        photo = createObjectFromPhotoAnalysis("/app/volume/volume/" + photoName)
        insertPhotoIntoTable(photo, dbFilePath)
		


# event functions to be used in handler
def onEventCreated(photoPath):
	if photoPath == "/app/volume/photos.db" or photoPath == "/app/volume/photos.db" or "/app/volume/photos.db-journal":
		return None
	else:
		print("Sleeping for 2 seconds as file downloads...", flush=True)
		time.sleep(2) #this is a bandage and not a real fix. This sleep would need to be modified depending on filesize and download speed
		photo = createObjectFromPhotoAnalysis(photoPath)
		insertPhotoIntoTable(photo, dbFilePath)
    

def onEventModified(photoPath):
	print("Doing nothing on modification...")

def onEventDeleted(filePath):
	if filePath == "/app/volume/photos.db":
		print("Database deleted: rebuilding...")
		create_sqlite_database("/app/volume/photos.db")
		createPhotosTable("/app/volume/photos.db")
		createCamerasTable("/app/volume/photos.db")
		rebuildDatabaseFromPhotosFolder("/app/volume/volume")
	elif filePath == "/app/volume/photos.db-journal":
		return None
	else:
		print("file other than the database has been deleted")


class OnMyWatch:
	# Set the directory on watch
	

	def __init__(self, watchDirectory):
		self.watchDirectory = watchDirectory
		self.observer = Observer()

	def run(self):
		event_handler = Handler()
		self.observer.schedule(event_handler, self.watchDirectory, recursive = True)
		self.observer.start()
		try:
			while True:
				time.sleep(5)
		except:
			self.observer.stop()
			print("Observer Stopped")

		self.observer.join()


class Handler(FileSystemEventHandler):

	@staticmethod
	def on_any_event(event):
		if event.is_directory:
			return None

		elif event.event_type == 'created':
			# Event is created, you can process it now
			onEventCreated(event.src_path)
			print("Watchdog received created event - % s." % event.src_path)
		elif event.event_type == 'modified':
			# Event is modified, you can process it now
			onEventModified(event.src_path)
			print("Watchdog received modified event - % s." % event.src_path)
		elif event.event_type == 'deleted':
			onEventDeleted(event.src_path)
		else:
			print(event.event_type)



if __name__ == '__main__':
	watch = OnMyWatch("/app/volume")
	watch.run()

