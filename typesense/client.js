const Typesense = require('typesense');


//initializing the typesense client
const client = new Typesense.Client({
    "nodes": [{
        "host": '9xsvcz84ku6h5y1lp-1.a1.typesense.net',
        "port": '443',
        "protocol": 'https'
    }],

    "apiKey": "5rNW3HF8pi1Iq1xoBGyzkuU1V41QN4FH",
    "connectionTimeoutSeconds": 5
})

const booksSchema = {
    'name': 'books',
    'fields': [
      {'name': 'title', 'type': 'string' },
      {'name': 'authors', 'type': 'string[]', 'facet': true },
  
      {'name': 'publication_year', 'type': 'int32', 'facet': true },
      {'name': 'ratings_count', 'type': 'int32' },
      {'name': 'average_rating', 'type': 'float' }
    ],

    'default_sorting_field': 'ratings_count'
  }

client.collections().create(booksSchema)
  .then( data => {
  }, err => {

});



module.exports = client