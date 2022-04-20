const Typesense = require("typesense");
require("dotenv").config();

var fs = require("fs/promises")

//adding books to the collection
const booksDemo = await fs.readFile("C:\TECH STACK\CODE\typesense demo\json\books.jsonl");
client.collections("books").documents().import(booksDemo);

//initializing the Typesense client
let client = new Typesense.Client({
    "nodes": [{
        "host": "xxx.a1.typesense.net",
        "port": "443",
        "protocol": "https"
    }],

    "apiKey": process.env.API_KEY,
    "connectionTimeoutSeconds": 2
})

//creating a books collection
let booksSchema = {
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
    .then(function (data) {
      console.log(data)
    })

//searching for the books
let searchParameters = {
    "q"         : "harry potter",
    "query_by"  :  "title",
    "sort_by"   :   "ratings_count:desc"
}
client.collections(books).documents()
                        .search(searchParameters)
                        .then(function(searchResults) {
                            console.log(searchResults)
                        })
