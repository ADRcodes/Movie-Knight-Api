# Movie Knight Api

This capstone project was created by Alex Russell for the completion of 
the Web Development Diploma Program at BrainStation.

Many people have several streaming sites these days, and it can be tedious to 
constantly search through all of them to find the movie you want to watch. 
Often you might even forget that you have some of the services.
Even if you only have one platform, it can take forever to pick a movie to watch 
with friends. There’s currently no way to filter out movies based on what you 
and your friends have watched, let alone to automatically find the best movie 
for your group.

Movie Knight lets you browse movies from all the streaming services you have, 
in one place. Once you browse and rate movies based on how much you want to 
watch them, you can invite your friends to do the same, and then Movie Knight 
compares them to see which you would most want to watch together.


## Features

- Search movies from Netflix, Disney or Amazon (more to be added) by clicking on their icons
- Rank movies based on how much you would like to watch them
- See your ranked movies by clicking the "Ranked Movies" button
- See your friend ranked movies by clicking the their icon once the "Ranked Movies" button is selected


## Project Specs

My server is using Express.js and Node.js. My next project steps will be migrating my data from 
the built-in JSON models to a MySQL database.


## Dependencies 

- axios
- casual
- cors
- dotenv
- express
- fs
- nodemon (dev)

Future use:
- helmet
- knex
- mysql
- passport
- passport-github2


## External API

The Streaming Availability API was used to get get the initial data set


### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/ADRcodes/Movie-Knight-Api.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Run start script
   ```sh
   npm run dev
   ```
Production coming soon

## Contributing

Contributions are always welcome! If you have a suggestion that would make 
this better, please fork the repo and create a pull request.

- Fork the Project
- Create your Feature Branch (git checkout -b feature/yourFeature)
- Commit your Changes (git commit -m 'Add some yourFeature')
- Push to the Branch (git push origin feature/yourFeature)
- Open a Pull Request


## Roadmap

- Add a database for storing the data and user info
- Add friend search
- Ensure the entire movie base on any platform is able to be viewed
- Deploy project
- Add trailers
- Add other ratings

