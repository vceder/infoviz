import bodyParser from 'body-parser'
import express from 'express'

const app = express()
// Heroku requires you to use process.env.PORT
const port = process.env.PORT || 5000;
// Don't rate limit heroku
app.enable('trust proxy')

// Parse bodies as JSON
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// In development, we use webpack server
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../client/build', {
    maxAge: '180 days'
  }))
}

app.listen(port, () => {
    console.log(`Password generator listening on ${port}`);
  })