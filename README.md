# Raclette Mern project

Using MongoDB, Express.js and React to create a Raclette Party helper

## What does it do
You have Raclette (appliance), you need cheese, pickles, potatoes and meat.
You can evaluate how much you need, who needs what, adapt to specific tastes, etc...

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
