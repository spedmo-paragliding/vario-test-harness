# Spedmo Vario Testing Interface (BETA)
This project allows developers to locally test their Vario UI changes on a local server before deploying them to [Spedmo](https://www.spedmo.com) for device testing. Although not all
functionality is perfectly reproducible with the Testing Interface the majority of changes can be made offline to save time uploading builds.

For testing Android devices we recommend using Chrome and for IOS devices using the Safari browser to best reproduce the mobile experience offline. Developers wishing to go the extra mile may find benefit in using the emulators in [Android Studio](https://developer.android.com/studio) or [Xcode](https://developer.apple.com/xcode/) for best reproduction of device UI rendering.

### Getting started
Before you begin ensure you have NPM and Gulp CLI installed and they work on the command line.

After cloning this project locally run the following command in the root folder
```
npm install
```

Once NPM has installed the packages locally simple run Gulp to start your local server
```
gulp
```

You should now have a local HTTP server up and running which can be accessed on http://localhost:8000

### Understanding the framework

Once you have successfully started your server and tested the sample functionality you should familiarise yourself with the [Spedmo Javascript Vario API](https://www.spedmo.com/content/varioAPI.pg) and the customised BLE features that are available for building your display.

### Building for production

Once you are happy with the functionality of change, simply run the following command to build a package to upload.
```
gulp build
```

The output of this task can be found in the **/build-upload** folder which should contain the file **vario-package.zip**. This file can be attached to your submission.

### Uploading from the command line

Once your build has been successfully built with no errors and the ZIP artifact has been created, you can upload your package with the following CLI command

```
gulp upload --option 00000000-0000-0000-0000-000000000000
```

Where **00000000-0000-0000-0000-000000000000** is replaced with the UUID provided to you in the [Spedmo App Manager](https://www.spedmo.com/appManage.pg).
