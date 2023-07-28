import os
import dlib
import numpy as np
from utils import *
from imutils import face_utils
import cv2

#Initializing a Video Capture Object For Camera
video=cv2.VideoCapture(0)

#using dlib functions
detect=dlib.get_frontal_face_detector()  #Calls the pre-trained HOG + Linear SVM model for accurate face detections
predict=dlib.shape_predictor("shape_predictor_68_face_landmarks.dat") #predicts the 68 Facial Landmarks

drowsy,wakey,sleepy=0,0,0
status_eye=""
status_lip=""
while(True):
    #Reading One Frame at a time and converting it to Gray
    frame=video.read() 
    frame_gray=cv2.cvtColor(frame[1],cv2.COLOR_BGR2GRAY)
    
    face_feature=detect(frame_gray,0)
    
    for i in face_feature:
        x1=i.left()
        y1=i.top()
        x2=i.right()
        y2=i.bottom()
        
        face_frame=frame[1].copy()
        cv2.rectangle(face_frame,(x1,y1),(x2,y2),(0,255,0),2)
    
        pinpoints=predict(frame_gray,i)
        pinpoints=face_utils.shape_to_np(pinpoints) #converting the landmarks to numpy array
        
        #Computing values for left eye, right eye and lips using Compute_eyes utility function.
        left_eye=compute_eyes(pinpoints[36],pinpoints[37],pinpoints[38],pinpoints[41],pinpoints[40],pinpoints[39])
        right_eye= compute_eyes(pinpoints[42],pinpoints[43],pinpoints[44],pinpoints[47],pinpoints[46],pinpoints[45])
        
        lips=compute_lips(pinpoints)
        
        #Checking for Drowsiness and Yawning
        if(left_eye==0 and  right_eye==0):
            sleepy+=1
            drowsy=0
            wakey=0
            if(sleepy>=10):
                status_eye="Sleeping!!!"
        
        elif(left_eye==1 and  right_eye==1):
            sleepy=0
            drowsy+=1
            wakey=0
            if(drowsy>=10):
                status_eye="Drowsy!!!"
        
        else:
            sleepy=0
            drowsy=0
            wakey+=1
            if(wakey>=10):
                status_eye="Wakey!!" 
                

        #Encoding all 68 landmarks
        for pin in range(0,68):
            (x,y)=pinpoints[pin]
            cv2.circle(face_frame,(x,y),1,(255,255,255),-1) 
            
        
        if(lips[0]>20):
            status_lip="Yawning"
        else:
            status_lip=""
            
        
        cv2.putText(face_frame, "State EYES: {}".format(status_eye), (300, 30),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
        cv2.putText(face_frame, "State Mouth: {}".format(status_lip), (300, 60),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
            
        cv2.imshow("Frame",face_frame) 
        key=cv2.waitKey(1)
        if(key==10):
            break
        
cv2.destroyAllWindows()
video.release()
    
    
    

    
    
    