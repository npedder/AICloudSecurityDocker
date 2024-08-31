import socketio
import time



def requestCurrentCameraID():
    sio = socketio.SimpleClient(logger=True, engineio_logger=True)
    start_timer = None

    sio.connect('http://aicloudsecurity-master-node-1:3000')

    sio.emit("currentCameraID-request", "data")
    try:
        event = sio.receive(timeout=5)
    except TimeoutError:
        print('timed out waiting for event')
        sio.disconnect()
        return -1
    else:
        print('received event:', event)
        sio.disconnect()
        print(event[1])
        return event[1]
            
