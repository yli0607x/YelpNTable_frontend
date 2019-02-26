# YelpNTable
## Demo
https://youtu.be/O967-J5qUl4

## Introduction

This is the repo for the Flatiron School Mod 2 Project. YelpNTable is a easy-to-use site combining Yelp and Opentable that allows you to book reservations and write reviews to the hottest restaurants in New York.

## Features 
- Utilize Google Maps API to show location of the specific restaurant.
- Implement Bootstrap and Semantic UI for styling the application’s interface.
- Manage reservations and review through editing and deleting

## Install Instructions

#### Backend (https://github.com/sarahpai/YelpNTable_backend)
```sh
$ git clone git@github.com:sarahpai/YelpNTable_backend.git
$ cd YelpNTable_backend
$ bundle install
$ rails s -p 4000
```

#### Frontend
```sh
$ git clone git@github.com:yli0607x/YelpNTable_frontend.git
$ cd YelpNTable_frontend
$ npm install 
$ npm start
```

## API Keys 
Get the API keys from [Google](https://developers.google.com/maps/documentation/javascript/get-api-key)
Create .env in the project root and update file with the following content:

REACT_APP_API_KEY_GL = INSERT_YOUR_GOOGLE_API_KEY


## Technologies Used
- react
- react-google-maps
- Semantic UI
