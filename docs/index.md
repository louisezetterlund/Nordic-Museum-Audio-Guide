---
title: Nordic Museum Audio Guide
toc_label: Nordic Museum Audio Guide
toc: true
---

![Nordic Museum Audio Guide Screenshots](assets/appScreenshots.png)

The **Nordic Museum Audio Guide** is a stand-alone audio guide app used at the Nordic Museum in Stockholm, Sweden. The app was forked from [Warhol Out Loud](https://github.com/CMP-Studio/TheWarholOutLoud) and expanded with additional functionality during the Spring of 2017. The app was released to the public in June 2017 (see [release schedule](https://github.com/NordicMuseum/Nordic-Museum-Audio-Guide/releases)). In 2019, the app code was rewritten from scratch in the latest version of React Native.

**The app code is open source and any museum with similar needs can use it to build their own audio guide app.**

Additional questions regarding the app can be answered by Aron Ambrosiani at the Nordic Museum.
E-mail: [aron.ambrosiani@nordiskamuseet.se](mailto:aron.ambrosiani@nordiskamuseet.se), phone +46851954564.

### Development Notes

* [Archecture of This Project](architecture.md)
* [Indoor Location](indoorLocation.md)
* [Content Structure](contentStructure.md)
* [Adding Content](addingContent.md)
* [Features & Trade-offs](features.md)
* [Publishing on the App Store](publishing.md)
* [Using Ipods as Loan Devices](ipods.md)
* [Possible improvements](improvements.md)
* [Blog Posts by the Innovation Studio](blogposts.md)

### Building and Running

The current version of the app resides in the [v2](https://github.com/Ambrosiani/Nordic-Museum-Audio-Guide/tree/master/v2) folder.

As the only supported platform is iOS, you are required to use macOS in some form. If for some reason your computer has an older version of macOS that doesn't support one or more of the dependencies below, you might be able to force upgrade your computer to a newer version of the OS. Do this at your own risk.

#### iOS (iOS 10.0 or greater)

1. Install all React Native dependencies following the "React Native CLI Quickstart" instructions: 
[React Native getting started guide](https://facebook.github.io/react-native/docs/getting-started.html). For the most part this amount to the steps below. Note that these steps are a bit more detailed, but could contain errors compared to the official docs. In doubt consult the documentation.
  
    1. Install brew from [Brew.sh](https://brew.sh).
    
    2. Install Node v10.15.3. Other versions might work, but this one is stable.
      ```
      brew install node
      ```
    3. If you don't have the right version of node right away, downgrade it.

      ```
      sudo npm install -g n
      sudo n 10.15.3
      ```
      You can now check the version of node you have with
      ```
      node -v
      ``` 
      Which should output 10.15.3

    4. Install package handlers
      ```
      brew install watchman
      brew install yarn
      sudo gem install cocoapods
      ```
      
2. Install project dependencies  
  ```
  cd v2 && yarn install && cd ios && pod install && cd ..
  ```  
3. Ar this point you most likely need an approved Apple developer account logged in to XCode

4. (Optional) If your files don't have the right permissions set you might run into EACCESS errors when executing the code. To solve this run some form of
  ```
  cd src && sudo chmod -R 755 .
  ```
  Note that this will flag all files in the src folder as executable and readable by everyone and writeable by the owner of the file. This might also flag all files in the repo as modified by git which can be turned off. Optimally you only want to modify access rights to code files such as .js and .jsx.

5. Run on the iOS simulator (iOS 10.0 or greater)
  ```
  npx react-native run-ios
  ```
  or use the XCode buttons for building to an appropriate device/simulator.

Some tips:
- Sometimes when executing the code you might get a bundler error, it might be worth it closing the simulator and bundler and just trying again as this has shown to help.
- In this project yarn is being used. That means when looking up packages you want to use in the app, you should use yarn install. Many resources tell you to use ``` npm install ``` but this will result in errors.


There are two schemes: 
- `nordicMuseumAudioGuide` is the debug build with hot reloading
- `nordicMuseumAudioGuide-Release` is the release build used for testing and eventually publishing to the App Store.

#### Android

Technically, being React Native, you should be able to run the code for Android without major changes. Despite that, Android is not currently supported and is not trivial to get running.

### Adding Your Own Data

See the in-depth guide on [adding content](addingContent.md).

### Intellectual Property

All files that are the intellectual property owned by the Nordic Museum and other third-parties have been removed from this repo and replaced with placeholders. This includes all the images and audio files included in the App Bundle. Additional museum information remains in the code to give an overall sense of the app.

### Credits

#### Project manager, Nordic Museum

Aron Ambrosiani

#### Project manager, Carnegie Institute

Ruben Niculcea

#### Development and Design

Ruben Niculcea, Carnegie Institute
Sam Ticknor, Carnegie Institute
Aron Ambrosiani, Nordic Museum
Robert Ziherl, Nordic Museum

#### Advisory Team, Nordic Museum

Vanessa Gandy
Loredana Jelmini
Sven Rentzhog

#### App Icon

Ann-Sofi Marminge Design

#### Translations

BTI Studios