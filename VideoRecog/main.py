# import time module, Observer, FileSystemEventHandler
import time
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
from recog import *
from database import *

dbFilePath = "/app/volume/photos.db"
create_sqlite_database("/app/volume/photos.db")
createPhotosTable("/app/volume/photos.db")

# event functions to be used in handler
def onEventCreated(photoPath):
    #_analyzePhoto(photoPath)
	print("Sleeping for 2 seconds as file downloads...", flush=True)
	time.sleep(2) #this is a bandage and not a real fix. This sleep would need to be modified depending on filesize and download speed
	photo = createObjectFromPhotoAnalysis(photoPath)
	insertPhotoIntoTable(photo, dbFilePath)

    

def onEventModified(photoPath):
    #_analyzePhoto(photoPath)
	# photo = createObjectFromPhotoAnalysis(photoPath)
	# insertPhotoIntoTable(photo)
	print("Doing nothing on modification...")


class OnMyWatch:
	# Set the directory on watch
	watchDirectory = "/app/volume/volume"

	def __init__(self):
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
			

if __name__ == '__main__':
	watch = OnMyWatch()
	watch.run()

