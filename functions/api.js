// Imports
const functions = require('firebase-functions');
const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');

// Create Express app
const app = express();

// Init Firebase Admin
try {
  admin.initializeApp(functions.config().firebase);
} catch (e) {
  console.log('App already initialized...');
}

// Setup Firestore references
const db = admin.firestore();
const FieldValue = admin.firestore.FieldValue;

// Router setup
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Make stuff happen here!

// Export the api
module.exports.api = app;
