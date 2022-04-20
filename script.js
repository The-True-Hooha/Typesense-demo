const Typesense = require("typesense");
require("dotenv").config();


let client = new Typesense.Client({
    "nodes": [{
        "host": "xxx.a1.typesense.net",
        "port": "443",
        "protocol": "https"
    }],

    "apiKey": process.env.API_KEY,
    "connectionTimeoutSeconds": 2
})

console.log(process.env.API_KEY)