# Spedmo Vario Testing Interface (BETA)
This project allows developers to locally test their Vario UI changes on a local server before deploying them to [Spedmo](https://www.spedmo.com) for device testing. Although not all
functionality is perfectly reproducible with the Testing Interface the majority of changes can be made offline to save time uploading builds.

For testing for Android devices we recommend using Chrome and for IOS devices using the Safari browser will best reproduce the mobile experience offline. Developers wishing to go the extra mile may find benefit in using the emulators in [Android Studio](https://developer.android.com/studio) or [Xcode](https://developer.apple.com/xcode/) for best reproduction of device UI rendering.

### Getting started
Before you begin ensure you have NPM and Gulp CLI installed and they work on the command line.

After pulling this project locally run the following command in the root folder
```
npm update
```

Once NPM has installed the packages locally simple run Gulp to start your local server
```
gulp
```

You should now have a local HTTP server up and running which can be accessed on http://localhost:8000


### Building for production

Once you are happy with the functionality of change, simply run the following command to build a package to upload.
```
gulp build
```

The output of this task can be found in the **/build** folder which should contain the file **vario-package.zip**. This file can be attached to your submission.
