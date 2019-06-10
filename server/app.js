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

app.get('/api/organisationId/:organisationId', (req, res) => {
    console.log(req.params.organisationId)
    const organisationId = req.params.organisationId
    const apiUrl = `https://rozajaybird.zendesk.com/api/v2/organizations/${organisationId}.json` //Organisation id retrieval
    
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

app.get('/api/userId/:userId', (req, res) => {
    console.log(req.params.userId)
    const userId = req.params.userId
    const apiUrl = `https://rozajaybird.zendesk.com/api/v2/users/${userId}.json` //User name retreval
    
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



app.get('/api/tags/:tagId', (req, res) => {
    console.log(req.params.tagId)
    const tagId = req.params.tagId
    const apiUrl = `https://rozajaybird.zendesk.com/api/v2/tickets/${tagId}/tags.json` //tags
    
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