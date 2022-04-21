const express = require('express');
const client= require("./typesense/client");
const app = express();
require("./typesense/books");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//get method that return the given query
app.get("/search", (req, res) => {

    const { q } = req.query;
  
    const searchParameters = {
      'q'         : q,
      'query_by'  : 'title',
      'sort_by'   : 'ratings_count:desc'
    }
  
    client.collections('books')
      .documents()
      .search(searchParameters)
      .then(function (searchResults) {
        res.send(searchResults)
      }, err => { res.send(err) } )
  });


  //post method to add books to the collection
  app.post('/add-book', (req, res) => {

    const book = req.body;
  
    client.collections('books').documents().create(book).then(data => {
      res.send(data)
    }, err => {
      res.send(err)
    })
  
  });

  client.operations.perform('snapshot', {'snapshot_path': './typesense/backup'})


const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
  });