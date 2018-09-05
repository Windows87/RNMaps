# RNMaps
React-Native app using Google Maps, NodeJS and MongoDB.

Ps: I just developed for Android because I don't have a Macbook/iMac.

## Screenshots
<div>
  <img src="https://github.com/Windows87/RNMaps/raw/master/readme-images/Map.jpeg" width="30%">
  <img src="https://github.com/Windows87/RNMaps/raw/master/readme-images/AddMarker.jpeg" width="30%">
  <img src="https://github.com/Windows87/RNMaps/raw/master/readme-images/MarkerScreen.jpeg" width="30%">
</div>

## How to Run
### Clone Repository
```bash
# Clone this repository
git clone https://github.com/Windows87/RNMaps/
# Go into repository
cd RNMaps
```

### Start Server
```bash
# Go into server
cd backend
# Install dependencies
npm install
# Start
npm start
```

2. Turn the server online with [Ngrok](https://ngrok.com/) to use in React-Native app.
     - Create an account
     - Follow the steps to download
     - Start Ngrok with port 3001 `./ngrok http 3001` or `ngrok.exe http 3001`
     
### Start App
1. Generate your Google Maps key in https://console.developers.google.com/apis/library/maps-android-backend.googleapis.com/
2. Change your Google Maps key in `android/app/src/main/AndroidManifest.xml`
3. Change your Ngrok link in `config/index.js`
4. Install dependencies and start
```bash
# Go into app
cd mobile
# Install dependencies
npm install
# Start
react-native run-android
```
