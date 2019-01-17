# LS Sport Mobile App

The Lenguaje Sport front end code (Cordova Apache)

## Start Coding

git clone
```
git clone https://github.com/emilianoglucero/lsport-frontend.git
```

get into cordova directory
```
cd lsport-frontend
```

### If you want to add and run the Android platform, follow these steps
```
cordova platform add android@6.4.0
```

Go to platforms/android and edit 'the project.properties' file

Find the line 'cordova.system.library.8=com.google.android.gms:play-services-analytics:11.0.1' (the numbers of the version and the system library could be different, the important thing here is the google play services version)
and add a plus at the end, in the version, like this 'com.google.android.gms:play-services-analytics:+'


build and run the project
```
cordova build android
cordova run android
```

### If you want to add and run the Browser platform, follow these steps
```
cordova platform add browser
```

Delete the admob plugin
```
cordova plugin rm cordova-plugin-admobpro
```

Build and run the platform
```
cordova build android
cordova run browser
```





