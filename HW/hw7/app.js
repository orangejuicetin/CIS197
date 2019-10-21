/**
 * CIS 197 - React HW
 * Author - Devesh Dayal, Steve Vitali, Abhinav Suri, Cameron Cabo
 * Simple Express server to serve static files
 */
import express from 'express'
import path from 'path'
import ejs from 'ejs'
import fs from 'fs'

const app = express()
const port = process.env.PORT || 3000

app.set('port', port)

// Use the EJS rendering engine for HTML located in /views
app.set('views', __dirname + '/views')
app.engine('html', ejs.__express)
app.set('view engine', 'html')

// Host static files on URL path
app.use(express.static(path.join(__dirname, 'public')))

// Create path to `/public/build/main.js` if it does not yet exist
const mainJSPath = path.join(__dirname, 'public', 'build', 'main.js')
if (!fs.existsSync(mainJSPath)) {
  fs.writeFileSync(mainJSPath, '')
}

// Use express Router middleware for root path
// app.use(app.router);

app.get('/', (_, res) => {
  res.render('index')
})

app.get('/export', (req, res) => {
  res.json(JSON.parse(req.query.data))
})

// Start server
app.listen(app.get('port'), () => {
  console.log(`Game of Life server listening on port ${port}!`)
})
