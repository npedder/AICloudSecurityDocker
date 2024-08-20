import sys 
import sqlite3
from photo import Photo

# conn = sqlite3.connect("photos.db")

# c = conn.cursor()

# c.execute("""CREATE TABLE photos (
#           first text,
#           last text, 
#           pay integer)""")

# photo_1 = Photo(1,"photo1.jpg",3,4,101)
# photo_2 = Photo(2,"photo2.jpg", 7,8,9,101)


# c.execute("INSERT INTO photos VALUES (?, ?, ?)", (photo_1.id, photo_1.filename, photo_1.camera_id))

# conn.commit()


# c.execute("INSERT INTO photos VALUES (:id, :filepath, :pay)", {'id': photo_2.id, 'filename': photo_2.filename, 'camera_id': photo_2.camera_id, })

# conn.commit()

# c.execute("SELECT * FROM photos WHERE camera_id=101)")

# print(c.fetchall())

# conn.commit()

# conn.close()

def create_sqlite_database(filename):
    
    try: 
        conn = sqlite3.connect(filename)
        print(sqlite3.sqlite_version, flush=True)
    except sqlite3.Error as e:
        print(e)
    finally:
        if conn:
            conn.close()

def createPhotosTable(filename):
    conn = None
    try: 
        conn = sqlite3.connect(filename)
        c = conn.cursor()
        c.execute(f"""CREATE TABLE IF NOT EXISTS photos (
          id integer,
          filename text, 
          dogs integer,
          cats integer,
          persons integer,
          camera_id integer)""")
        conn.commit()
    except sqlite3.Error as e:
        print("Error", e, flush=True)
    finally:
        if conn:
            conn.commit()
            conn.close()


def insertPhotoIntoTable(photo: Photo, dbFileName):
    
    try:
        conn = sqlite3.connect(dbFileName)
        c = conn.cursor()
        print("inserting photo...", flush=True)
        print(photo.__repr__, flush=True)
        c.execute(f"""INSERT INTO photos VALUES (?, ?, ?, ?, ?, ?)""", (photo.id, photo.filename, photo.dogs, photo
                                                                        .cats, photo.persons, photo.camera_id))
        conn.commit()
    except sqlite3.Error as e:
        print("Error", e)
    finally:
        if conn:
            conn.close()










# inserting 
# updating
# deleting
# selectings


if __name__ == '__main__':
    create_sqlite_database("my.db")