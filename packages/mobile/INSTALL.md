# Install

Short doc to install this project.
https://facebook.github.io/react-native/docs/getting-started

## Install the XCode command line tools

**Preferences > Locations**:
Install the tools by selecting the most recent version in the Command Line Tools dropdown.

**Preferences > Components**:
Select a simulator with the corresponding version of iOS you wish to use

## Install node and watchman

```
brew install node
brew install watchman
```

## Install Cocoapods

```
sudo gem install cocoapods
cd ios && pod install
```

## Setup for Android

Check if your `.env` API var is set to `10.0.2.2` with `SSL` disabled. Nothing else to do !
