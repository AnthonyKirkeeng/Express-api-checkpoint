const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const movieInfo = require('./movies.json')
const fs = require("fs")


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const port = 3001
const movies = JSON.parse(fs.readFileSync('./movies.JSON' ))
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))


// YOUR CODE GOES HERE
//create endpoints for API
//returns a list of all movies 
app.get('/:movie/titles/', (req, res)=>{

    if(req.query.movieTitles){
    let requestedTitles = req.query.movieTitles
    let titles = movieInfo.results.find(film=> film.filmName === requestedTitles)
    res.send(`movie: ${req.params.movie}\n
              titles: ${titles.filmId}`)

    } else{
    let titleArray = movieInfo.results.map(info=>{
        return info.filmName;
    })
    res.send(`movie: ${req.params.movie}\n
             titles: ${titlesArray}`)
 }

})

// Find movie by id
app.get('/:movie/titles/:id', (req, res)=>{
    let requestedID = req.params.id
    let titles = movieInfo.results.find(film=> film.filmId === parseInt(requestedID))
    res.send(`movie: ${req.params.movie}\n
             titles: ${titles}`)
})

// Add a new movie
app.post('/:movie/titles/title', (req, res)=>{
    movieInfo.results.push(req.body)
    res.send("Title Updated")
    fs.writeFileSync('./movies.json', JSON.stringify(movieInfo))

})

// Delete a title by id
app.delete('/:movie/titles/', function (req, res) {
    let titles = movieInfo.results.find(film=> film.filmId === req.body.id)

    let indexOfTitles = movieInfo.results.indexOf(titles)
    console.log(`Index ${indexOfTitles}`)
    movieInfo.results.splice(indexOfTitles, 1)
    fs.writeFileSync('./movie.json', JSON.stringify(movieInfo))
    res.send(`recieved a DELETE request for ${req.body.id}`)
  })




