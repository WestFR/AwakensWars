# AwakensWars
> Prototype application made during my JS exam (computer developer license). It's also my first mobile application using "react-native" technology.

[![License][license-image]][license-url]

This application was developed as part of my JS exam during one of my trainings.

It allows to visualize the possibilities of the iOS and Android SDK by using "react-native" technology.

This application uses network communications to display the data. The latter are examples for good prototyping the application.

It only remains to modify the different layers (network / models) to display your own data !

Follow this instructions to install the application & develop your features !


## Features

- [x] Based on react-native technology : https://facebook.github.io/react-native/
- [x] Using a Star Wars JSON API : https://swapi.co/
- [x] ListView / Selection
- [x] About page examples with Alert
- [x] 2 languages : French, English


## Requirements

- Node 8.0+
- Xcode + command line tools (for build on iOS)
- Android Studio (for build on Android)


## Installation

1. Clone this project in your project folder : `git clone https://github.com/WestFR/AwakensWars.git`

2. Do this command line in your terminal for install global dependencies :<br>
`brew install node`<br>
`brew install watchman`

3. Do this command line in your terminal for install react-native :<br> 
`npm install -g react-native-cli`

4. Do this command line in your project's folder for install project's dependencies :<br>
`npm update`

5. For build this app on your phone / simulator, use this command line :<br>
`react-native run-android (on emulator or on USB debug phone).`<br>
`react-native run-ios (on mac only, xcode is necessary + simulator).`

6. Now, you can build and run this application and develop your functions !


## Contribute

We would love you for the contribution to ``AwakensWars`` project, check the ``LICENSE`` file for more info.


## Meta

Distributed under the MIT license. See ``LICENSE`` for more information.


[license-image]: https://img.shields.io/badge/License-MIT-blue.svg
[license-url]: LICENSE