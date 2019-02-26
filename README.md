# LS Sport Mobile App

The Lenguaje Sport front end code (Cordova Apache)

## Start Coding
### In a terminal we'll execute the next lines
clone the GitHub repo
```
git clone https://github.com/emilianoglucero/lsport-frontend.git
```

let's create a new cordova project
```
cordova create cabavillamalcolm com.lsc.ar.caba.villamalcolm CSDVillaMalcolm
```

move into this new proyect
```
cd cabavillamalcolm
```

We're going to copy from 'lsport-frontd' (the cloned repo) the next 6 files and folders listed in the image, next we'll paste it and the replace it in the cabavillamalcolm project that we have just created.

![alt text]("https://user-images.githubusercontent.com/15883174/53424442-fac1ff80-39c1-11e9-9c26-87540605f409.png")

Remove the platform android
```
cordova platform rm android
```
Let's remove all the next plugins, maybe some of them aren't installed, but just in case
```
cordova plugin rm cordova-universal-links-plugin
cordova plugin rm cordova-plugin-firebase
cordova plugin rm cordova-plugin-admobpro  
cordova plugin rm cordova-plugin-admobpro-firebase
cordova plugin rm cordova-android-play-services-gradle-release
cordova plugin rm cordova-android-firebase-gradle-release
cordova plugin rm cordova-android-support-gradle-release
```
Let's add the next plugins and the android platform at the end
```
cordova plugin add cordova-universal-links-plugin-fix
cordova plugin add cordova-plugin-admobpro-firebase --variable PLAY_SERVICES_VERSION=+
cordova plugin add cordova-plugin-firebase --variable PLAY_SERVICES_VERSION=+
cordova plugin add cordova-android-play-services-gradle-release  --variable PLAY_SERVICES_VERSION=+
cordova plugin add cordova-android-firebase-gradle-release  --variable FIREBASE_VERSION=+
cordova platform add android@6.4.0
```

Copy the next code in platforms/android/AndroidManifest.xml file, must be at the bottom before closing the application tag like the next image
```
<meta-data android:name="com.google.android.gms.ads.APPLICATION_ID" android:value="ca-app-pub-4977768595563395~7785969457"/> 
```
![alt text](https://user-images.githubusercontent.com/15883174/53269805-a3254a80-36c8-11e9-920b-c72911054dce.png)

Build and run the cordova project on android
```
cordova build android
```
```
cordova run android
```


### Notes

cordova -v
```
8.1.2 (cordova-lib@8.1.1)
```
my 'cordova requirements' on Mac
```
Requirements check results for android:
Java JDK: installed 1.8.0
Android SDK: installed true
Android target: installed android-27,android-26,android-25,android-23,android-19
Gradle: installed /usr/local/Cellar/gradle/4.9/bin/gradle
```
my 'cordova requirements' on PC
```
Requirements check results for android:
Java JDK: installed 1.8.0
Android SDK: installed true
Android target: not installed
cmd: Command failed with exit code 1 Error output:
"avdmanager" no se reconoce como un comando interno o externo,
programa o archivo por lotes ejecutable.
Gradle: installed C:\Program Files\Android\Android Studio\gradle\gradle-2.10\bin\gradle
Some of requirements check failed
```

#### Browser platform
If you want to run the browser platform, you need to uninstall the admobpro plugins

