# Morganton Meal Map (aka MMM)

My version of Udacity's neighborhood map project.

Coded by Amy Rutherford, September - October 2018

## Purpose
To show information about Morganton, NC's most popular restaurants according to Foursquare. Shows restaurant address, type of cuisine and thumbnail of storefront if available.

## Live Demo
[Click here to use the app](https://cocky-boyd-03864b.netlify.com/)

## Neded for installation/usage
[NodeJS](https://nodejs.org/en/)

Google Javascript Maps API key

FourSquare API keys (client id and client secret)
## How to install

### Development version
- Clone this repo, or download the zip file and and extract it a directory
- From the command line, ```cd``` into the directory then type ```npm install``` to download the required dependencies
- Once the install is complete type ```npm start``` to start the local server. The page will open in your default web browser or you can navigate to localhost:3000 to start the page manually.

### Build version (From create-react-app readme)

`npm run build` creates a `build` directory with a production build of your app. Set up your favorite HTTP server so that a visitor to your site is served `index.html`, and requests to static paths like `/static/js/main.<hash>.js` are served with the contents of the `/static/js/main.<hash>.js` file.

## How to use the Meal Map

Click the menu button to open a list of local restaurants generated by the FourSquare API. Click a name to bring up more information on the map. The map marker will blink for a short period of time as a visual aid. Use the search bar to filter resturants by name. The list will change over time since it is dynamically generated.

#### Keyboard users
The menu is accessible by keybaord. Tab to the menu button and press enter to open. The first option selected is the search bar where resaurants can be filtered by name. Tab twice to enter the restaurant list. Tab to move down the list, shift-tab to move up the list.

Press enter on a restaurant listing to bring up map information, then press escape to exit the list before navigating to the map to see/hear restaurant information.

