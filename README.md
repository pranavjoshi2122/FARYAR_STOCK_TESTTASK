# FARYAR_STOCK_TESTTASK


## FIREBASE CONFIGURATION

## Description
This project demonstrates how to integrate Firebase Authentication with a Node.js application.

## Firebase Authentication Setup with Node.js

### Prerequisites
1. **Firebase Project**: Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
2. **Node.js and npm**: Ensure Node.js and npm are installed on your development environment.

### Installation
Install Firebase Admin SDK and dependencies:


### Initialization
Initialize Firebase Admin SDK in your Node.js application:
```javascript
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'YOUR_DATABASE_URL' // Replace with your Firebase Database URL
}); 

const auth = admin.auth();

// Example: Sign Up
async function signUp(email, password) {
  try {
    const userRecord = await auth.createUser({
      email: email,
      password: password
    });
    console.log('Successfully created new user:', userRecord.uid);
    return userRecord.uid;
  } catch (error) {
    console.error('Error creating new user:', error);
    throw error;
  }
}

// Example: Sign In
async function signIn(email, password) {
  try {
    const userRecord = await auth.getUserByEmail(email);
    console.log('Successfully fetched user data:', userRecord.toJSON());
    return userRecord.toJSON();
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}
 ```
## Nodemailer

```javascript

You need to provide your own email address and password from the mail you want to send mails .
auth: {
        user: '<sender emaail>',
        pass: '1a2b3c4d5e6f7g', // Read below steps to generate password 
    }
    1. You need to enable 2FA authentication in google
    2. Go to 'Manage your Google Account'
    3. Go to Security Tab and search for App Passwords
    4. Click on app name and enter the name -> Click Create -> One password will come [you need to use same in nodemailer auth section]
```

# How to run backend and frontend
## Backend 

1. Go to project folder FARYAR_STOCK_TESTASK

## Prerequisites

- [Node.js](https://nodejs.org/) (version X.X.X or higher)
- [npm](https://www.npmjs.com/) (typically installed with Node.js)

## Installation

Install dependencies:

$ cd your-project [For api go to /BE and for frontend go to /FE]
$ npm install

### Development
Start the server in development mode:
$ npm run dev 