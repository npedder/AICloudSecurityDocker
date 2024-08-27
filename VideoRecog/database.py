import sys 
import sqlite3
import os
from photo import Photo



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

def createCamerasTable(filename):
    conn = None
    try: 
        conn = sqlite3.connect(filename)
        c = conn.cursor()
        c.execute(f"""CREATE TABLE IF NOT EXISTS cameras (
          camera_id integer,
          location text,    
          ip text)""")
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