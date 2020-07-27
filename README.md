# Houseplant-Topia!

## Description

Keeping track of houseplants can be difficult. With different watering schedules, locations, and tendencies just being a few of the factors that can lead to unfortunate accidents (death).  I wanted to make an app that allowed users to keep track of these plants, through various means, even getting reminders to water them. 

* Full CRUD capability on the plant and rooms in their home
* Built using ReactJS using various aspects of the framework to improve the user experience\
* ReactRouter to route the user to specific pages of the app
* Reactstrap used for modals
* Styling was accomplished using SCSS
* Icons gathered from FontAwesome
* Data storage and user authentication were accomplished using Firebase 
* Created a Node.js server via Heroku and integrated Twilio's API to allow the user to receive SMS text alerts when a specific plant needs to be watered

## Screenshots

#### Plants Page:

![Plants Page](https://i.imgur.com/Pl4wFC5.png)

#### Rooms Page:

![Rooms Page](https://i.imgur.com/3LrJMce.png)

#### Plant Single View:

![Plant Single View](https://i.imgur.com/JQFWThJ.png)

#### Room Single View:

![Room Single View](https://i.imgur.com/osgerad.png)

#### Profile Page:

![Profile Page](https://i.imgur.com/JljuW1L.png)

#### Modals:

![Modals](https://i.imgur.com/JwR7kRd.png)

![Modal](https://i.imgur.com/Ezn81Ot.png)


## How to run

1. Clone down this repo

1. Navigate to the folder containing the cloned repo

1. Make a project on Firebase and locate the `apiKeysExample.json` inside this repo

1. Copy your API Keys into the example and rename it `apiKeys.json` 

1. In your command line run `npm install` to install required dependencies

1. In your command line run `npm start`

1. In your browser go to `http://localhost:8080`
