const variables = require('../var')
const express = require('express')
const app = express()
const port = 5000
const fetch = require('node-fetch')
const base64 = require('base-64')
const cors = require('cors')


app.use(cors())

app.get('/api/tickets/:email/:password', (req, res) => {
    console.log('Request tickets for email'+req.params.email)
    const apiUrl = 'https://rozajaybird.zendesk.com/api/v2/requests.json'
    const email = req.params.email
    const password = req.params.password
    fetch(apiUrl, {
        method:'GET',
        headers: {
            'Authorization': 'Basic ' + base64.encode(email + ":" + password)
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

app.get('/api/organisationId/:organisationId/:email/:password', (req, res) => {
    console.log('Request Organisation Id'+req.params.organisationId)
    const organisationId = req.params.organisationId
    const email = req.params.email
    const password = req.params.password
    const apiUrl = `https://rozajaybird.zendesk.com/api/v2/organizations/${organisationId}.json` //Organisation id retrieval
    fetch(apiUrl, {
        method:'GET',
        headers: {
            'Authorization': 'Basic ' + base64.encode(email + ":" + password)
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

app.get('/api/userId/:userId/:email/:password', (req, res) => {
    console.log('Request User Id'+req.params.userId)
    const userId = req.params.userId
    const apiUrl = `https://rozajaybird.zendesk.com/api/v2/users/${userId}.json` //User name retreval
    const email = req.params.email
    const password = req.params.password
    fetch(apiUrl, {
        method:'GET',
        headers: {
            'Authorization': 'Basic ' + base64.encode(email + ":" + password)
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



app.get('/api/tags/:tagId/:email/:password', (req, res) => {
    console.log('Request tag ids'+req.params.tagId)
    const tagId = req.params.tagId
    const apiUrl = `https://rozajaybird.zendesk.com/api/v2/tickets/${tagId}/tags.json` //tags
    const email = req.params.email
    const password = req.params.password
    fetch(apiUrl, {
        method:'GET',
        headers: {
            'Authorization': 'Basic ' + base64.encode(email + ":" + password)
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