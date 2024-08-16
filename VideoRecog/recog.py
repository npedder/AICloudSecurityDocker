import sys
from ultralytics import YOLO
from photo import *
import json

# visit https://github.com/ultralytics/ultralytics/blob/main/ultralytics/cfg/datasets/coco.yaml for list of classes detectable by this model

# Load a model
model = YOLO('yolov8n.pt')  # load an official detection model
# print(model.names) # uncomment to print the classes and class ids for the model



def _analyzePhoto(photoPath): # Returns results of analysis as a string in JSON format
    if len(sys.argv) >= 1 :#remove 
        #sys.stdout.flush()
        results = model.predict(source = [photoPath], classes = [0,15,16]) #classes 0, 15, and 16 coorelate to person, dog, and cat respectively in the coco.yaml file from ultralytics github
        json_result = results[0].tojson()
        print("printing json...", flush = True)
        print(json_result, flush = True)
        return(json_result)
    else:
        print("NO ARG FOUND: : PRINTING DEFAULT")

def createObjectFromPhotoAnalysis(photoPath):
    json_result = _analyzePhoto(photoPath)
    dict_results = json.loads(json_result) # a list of dictionaries

    cats = 0; 
    dogs = 0; 
    persons = 0; 
    for x in dict_results:
        if x["class"]  == 15:
            cats += 1
        if x["class"]  == 16:
            dogs += 1
        if x["class"]  == 0:
            persons += 1
 
    photo = Photo(-1, photoPath, dogs, cats, persons, -1 ) # unique photoId should be generated during sql insertion command i think???
    return photo


_analyzePhoto("dogcatperson.jpg")
print(createObjectFromPhotoAnalysis("dogcatperson.jpg").__repr__, flush= True)



