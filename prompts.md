# Prompts

## Initial 
We want to build a simple Vue3 application using javascript with node 20.17 that allows the user to entert an access token and a camera identifier. That data is used to call a sequence of API calls to the Eagle Eye Networks service to display a proview image. The API calls should be in a separate javascript file. 

## store input data
when clicking "get preview", store the Accesstoken and the camera id in local storage. When starting the app, check if the accesstoken and camera id can be retrieved from local storage.  

## cleanup 
remove files that we dont use from the repository

## add base url
Add an input field for the baseurl and store that as well in local storage. Prepoulate the field when the local storage has already data for the baseurl. Do not set a default value for the baseurl.

## use port 3333 to avoid CORS issues
set the vite port to 3333

## no need to call a "authenticate" function
remove the authenticate function. This is not needed bacause we have an accesstoken

## API V3
use "/api/v3.0/cameras" instead of "/api/v2.0/cameras"

## avoid the axios api client for better undertanding of the parameters
do not create an axios apiClient. Instead, create an options object for each call use use te axios() function.

# show the camera name
after calling getCameraDetails, show the camera name below the "get Preview" button. 

# get the multipart URL for the device
to get information about the preview image, call /api/v3.0/feeds/${cameraId} instead of ../preview.  add a parameter "include" with the value "multipartUrl". This returns a list of urls that can be used to display the image. 

# provide the esn via parameter
when calling the feeds API, provide the cameraId as parameter with the parameter name deviceId

# only get preview data
to receive only the preview url, add a parameter "type" with the value "preview" to the feeds call.

# explain the result of the /feeds call 
The result of the feeds call is a JSON object that includes an array with the name "results". The first array element has the key "multipartUrl" which is the URL to the image. 

# call the /session api
after getting the multipartUrl, make a call to the /api/v3.0/media/session API to retrieve another URL that can be used to set a cookie. 

# set the cookie
in the function getMediaSessionUrl make a call to the media session URL right way, with the authentication token 

# avoid showing the media URL on the app 
do not show the media session URL in the app window