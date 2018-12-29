# Wallpaper-Workshop

This is a course project for COMS W4156 Advanced Software Engineering.

Wallpaper Workshop contains the following functions:

1. Create a wallpaper community among users:
    Users can share, collect and search for wallpapers. 
    Users also can upvote wallpapers uploaded by other users.

2. Provide a convenient way for users to set wallpapers: 
    Users can hit just one button to set the wallpaper they like.
    This app can automatically change wallpapers according to the frequency and the wallpaper folder as users set.

## Get Started
Note: If you are user, just ignore the following lines and jump to "Usage".

If you are a developer and would like to revise code and build the project by yourselves, you need to follow instructions below:
1. Install node with version 8.12.0:
https://github.com/nodejs/node/blob/master/doc/changelogs/CHANGELOG_V8.md

2. Install brew if you don't have it on your mac:
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

3. Install yarn
```
brew install yarn
```

4. Clone the wallpaper-client
```
git clone https://github.com/SoapKe/wallpaper-client.git
```

4. Clone the server
```
git clone https://github.com/cdong1995/wallpaperServer.git
```

## Usage
As a user:
Double click "Wallpaper-Workshop.app" and enjoy!

As a developer:

***1. Build & Start your own server:***
```
cd wallpaperServer
npm install
npm run start
```

***2. Build your client***
```
cd wallpaper-client
yarn install
yarn build
```

***3. Start your client***

You have two options here:

First: start app without packaging
```
yarn estart
```
Second: start app after packing
```
yarn dist
```
Then you will find "wallpaper-client.app" in folder wallpaper-client/dist/mac

***4. Run test***

Run test script:
```yarn test```


## Functionality
***1. Login***

Type your email address and password and click login.

***2. Register***

Type your email address and password and click register.

***3. Search***

Type the key words of wallpapers you want to search in the search box and click search button

***4. Upvote for other users wallpapers***

Click heart icon below each wallpaper card, the number of likes will add one.

***5. Collect the wallpapers you like***

Click the collect button below each wallpaper card, the wallpaper will appear in your collection page

***6. Download collected pictures by one click***

Click "Download" button on collection page

***7. Upload wallpapers***

Click 'upload' on the left sidebar and click the upload button and select the pictures you want to upload the the pictures will appear on home page

***8. Set wallpaper by one click***

Click the setting button below the wallpaper cards and done!

***9. Automatically change wallpapers***

Set frequency and wallpaper folder and done!











