// Imports
const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');

// Init Firebase Admin
admin.initializeApp(functions.config().firebase);

// Create Express app
const app = express();

// Setup Firestore references
const db = admin.firestore();
const FieldValue = admin.firestore.FieldValue;

// Router setup
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

// Make stuff happen here!
router.get('/users', function(req, res, next){
	const requestID = req.query.id;
	console.log(requestID);
	if(requestID){
		// skicka specifik user
		const usersRef = db.collection('users').doc(requestID);
		usersRef.get().then(function(doc){
			if (doc.exists) {
	        	res.send(doc.data());
		    } else {
		        // doc.data() will be undefined in this case
		        console.log("No such document!");
		    }
		})
	}else{
		console.log("Här kommer top 100!")
		// SKicka alla top 100 users
	}
	
	/*
	var docRef = db.collection("cities").doc("SF");

	docRef.get().then(function(doc) {
	    if (doc.exists) {
	        console.log("Document data:", doc.data());
	    } else {
	        // doc.data() will be undefined in this case
	        console.log("No such document!");
	    }
	}).catch(function(error) {
	    console.log("Error getting document:", error);
	});*/
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// Export the api
module.exports.api = app;
