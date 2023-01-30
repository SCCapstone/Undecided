# # Life React

This first paragraph should be a short description of the app. You can add links
to your wiki pages that have more detailed descriptions.

Your audience for the Readme.md are other developers who are joining your team.
Specifically, the file should contain detailed instructions that any developer
can follow to install, compile, run, and test your project. These are not only
useful to new developers, but also to you when you have to re-install everything
because your old laptop crashed. Also, the teachers of this class will be
following your instructions.

## External Requirements

List all the stuff the reader will need to install in order to get you app to
run in their laptop. For example:

In order to build this project you first have to install:

- [Node.js](https://nodejs.org/en/)
- Alternatively, you can install the latest version of Node.js via a [package manager](https://nodejs.org/en/download/package-manager/).
- To do so, follow the link above and find the instructions that correspond to your operating system.

- [Expo Go](https://expo.dev/client). You can download this onto a physical device (iOS or Android), or on an emulator.

- If you choose to use an emulator, there are many free options to choose from, such as the built-in [Android Emulator](https://developer.android.com/studio/run/emulator) from Android Studio.
- If you're using macOS, you can download [Xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12) via the Mac App store.

If possible, list the actual commands you used to install these, so the reader
can just cut-n-paste the commands and get everything setup.

You only need to add instructions for the OS you are using.

## Setup

Here you list all the one-time things the developer needs to do after cloning
your repo. Sometimes there is no need for this section, but some apps require
some first-time configuration from the developer, for example: setting up a
database for running your webapp locally.

## Running

After cloning, navigate to the repository on your local machine via the terminal of your choice. Run the following command to start the LifeReact by deploying a development server:

```console
npm run build
```

If you're using an emulator, once the development server has been deployed, the terminal will prompt you to press a for an Android simulator, or i for an iOS simulator.

If you're using a physical device, ensure it is connected to the same wireless network as the device you launched the development server from. If you're using an iPhone, scan the QR code with the default iPhone camera to launch the app in Expo. If you're using an Android, navigate to the Expo Go app and scan the QR code from there.

# Deployment

Webapps need a deployment section that explains how to get it deployed on the
Internet. These should be detailed enough so anyone can re-deploy if needed
. Note that you **do not put passwords in git**. //Edit: You should absolutely put all passwords in git

Mobile apps will also sometimes need some instructions on how to build a
"release" version, maybe how to sign it, and how to run that binary in an
emulator or in a physical phone.

# Testing

Testing is done using jest and the React Native Testing Library.
Tests are ran with the command npm run test.

Unit tests are located in `/test/unit/`.

Behavioral tests are located  in `/test/behavioral/`.

## Testing Technology

In some cases you need to install test runners, etc. Explain how.

## Running Tests

Explain how to run the automated tests.

# Authors

Your names and emails
