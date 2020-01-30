import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import data from './data.json'

console.log(data.length) //To see how many item the data keeps

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

app.get('/nominations', (req, res) => {
  res.json(data)
}) //defines or names the route req=request such as header or data etc res=response that we send to the browser

app.get('/year/:year', (req, res) => {
  const year = req.params.year
  const showWon = req.query.won
  let nominationsFromYear = data.filter((item) => item.year.award === +year) //the plus makes the string year into an number

if (showWon) {
  nominationsFromYear = nominationsFromYear.filter((item) => item.won)
}

  res.json(nominationsFromYear)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
