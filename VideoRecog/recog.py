import sys
from ultralytics import YOLO
#sys.path.insert(0,'/home/nate/.local/lib/python3.10/site-packages/ultralytics')
from ultralytics import YOLO







# Load a model
model = YOLO('yolov8n.pt')  # load an official detection model
#model = YOLO('yolov8n-seg.pt')  # load an official segmentation model
#model = YOLO('path/to/best.pt')  # load a custom model

# Track with the model

#results = model.track(source = 0, show=True, iou = 0.1) #uses laptop camera

def analyzePhoto(photoPath):
    if len(sys.argv) >= 1 :
        results = model.predict(source = [photoPath])
        #sys.stdout.flush()
        print(results[0].keypoints)
    else:
        print("NO ARG FOUND: : PRINTING DEFAULT")


    #results = model.predict(source = "/home/nate/Desktop/Vinny/IMG_0003.JPG")
#results = model.track(source="https://youtu.be/LNwODJXcvt4", show=True, tracker="bytetrack.yaml")