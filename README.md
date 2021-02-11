# Raclette Mern project

Using MongoDB, Express.js and React to create a Raclette Party helper

## What does it do
It's a cheese lover social network
You can plan your Raclette Parties, share your thoughts, list cheeses and meats you like, post reviews, etc

# Requirements
Node (obv) `brew install nvm` `nvm install --lts`
MongoDB `brew tap mongodb/brew` `brew install mongodb-community@4.4`
Don't forget to start Mongo `mongod --config /usr/local/etc/mongod.conf`

# Testing
Jest for tests
mongodb-memory-server for tests as well
Adding ```  "jest":{
    "testEnvironment": "node"
  },``` to package.json in order to have jest work woth mongo

# Inspiration
https://www.freecodecamp.org/news/learn-how-to-handle-authentication-with-node-using-passport-js-4a56ed18e81e/

