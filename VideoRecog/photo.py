class Photo:

    def __init__(self, id, filename, dogs, cats, persons, camera_id ):
        self.id = id
        self.filename = filename
        self.dogs = dogs
        self.cats = cats
        self.persons = persons
        self.camera_id = camera_id

    @property 
    def __repr__(self):
        return "Photo('{}', '{}', '{}', '{}', '{}', '{}')".format(self.id, self.filename, self.dogs, self.cats, self.persons, self.camera_id)