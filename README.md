# # Life React


LifeReact is a lifestyle app that allows users to keep track of your calorie intake by providing a persistent, interactive food diary. All nutritional information is pulled directly from the USDA to ensure a high degree of accuracy. Users can also view dynamic updates on their progress towards their calorie goal from the home screen.

## External Requirements

In order to build this project you first have to install:

- [Node.js](https://nodejs.org/en/)
- Alternatively, you can install the latest version of Node.js via a [package manager](https://nodejs.org/en/download/package-manager/).
- To do so, follow the link above and find the instructions that correspond to your operating system.

- [Expo Go](https://expo.dev/client). You can download this onto a physical device (iOS or Android), or on an emulator.

- If you choose to use an emulator, there are many free options to choose from, such as the built-in [Android Emulator](https://developer.android.com/studio/run/emulator) from Android Studio.
- If you're using macOS, you can download [Xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12) via the Mac App store.


## Setup

Install expo-cli with the following command:

```console
sudo npm install — global expo-cli
```

## Running

After cloning, navigate to the repository on your local machine via the terminal of your choice. Run the following command to start the LifeReact by deploying a development server:

```console
expo start
```

If you're using an emulator, once the development server has been deployed, the terminal will prompt you to press a for an Android simulator, or i for an iOS simulator.

If you're using a physical device, ensure it is connected to the same wireless network as the device you launched the development server from. If you're using an iPhone, scan the QR code with the default iPhone camera to launch the app in Expo. If you're using an Android, navigate to the Expo Go app and scan the QR code from there.

# Deployment

Install eas build tools if you haven't already:

```console
npm install --global expo-cli eas-cli
```

You will then need to ensure you have an Expo account, which you can create by following [this link](https://expo.dev/).

Log into expo via the terminal of your choice:

```console
expo login
```

Finally, build the apk with the following command:

```console
eas build
```

# Testing

Unit tests are located in `/test/unit`.

Behavioral tests are located  in `/test/behavioral`.

## Testing Technology

Testing is done using jest and the React Native Testing Library. These are included in the projects dependencies and can be installed with the command 
```console
npm install
```


## Running Tests

Tests are ran with the following command .
```console
npm run test
```

# Authors

Peyton Tucker (pmtucker@email.sc.edu)
Brent Hopkins (brentph@email.sc.edu)
Caleb Corpening (corpenic@email.sc.edu)
Mostafa Mohammed Ali (mostafa@email.sc.edu)
Brian White (briandw@email.sc.edu)
