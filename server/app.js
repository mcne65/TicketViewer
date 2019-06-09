const variables = require('../var')
const express = require('express')
const app = express()
const port = 5000
const fetch = require('node-fetch')
const base64 = require('base-64')
const cors = require('cors')


app.use(cors())
app.get('/', (req, res) => {
    const apiUrl = 'https://rozajaybird.zendesk.com/api/v2/requests.json'
    // const apiUrl = 'https://rozajaybird.zendesk.com/api/v2/requests/2.json'
    
    fetch(apiUrl, {
        method:'GET',
        headers: {
            'Authorization': 'Basic ' + base64.encode(variables.email + ":" + variables.password)
        }
    })
    .then(res => res.json())
    .then(data => {
        res.send({data});
    })
    .catch(err =>{
        res.send({err});
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}`))