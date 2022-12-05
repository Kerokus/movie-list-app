const express = require('express')
const knex = require('knex')(require('./knexfile.js')['development'])
const cors = require('cors');
const app = express();


app.use(express.json())
app.use(cors())

//helper functions
const getRequest = async (endpoint, res, id) => {
    let data = null;
    if(!id){
      try{
        data = await knex(`${endpoint}`)
          .select('*')
      } catch (e) {
        console.log(e);
        res.status(400).send('There was an error processing your request.');
      }
    } else {
      try{
        data = await knex(`${endpoint}`)
          .select('*')
          .where('id', '=', id)
      } catch (e) {
        console.log(e);
        res.status(400).send('There was an error processing your request.');
      }
    }
  
    if (!data || data.length === 0) {
      res.status(404).send(`${endpoint} not found`);
    } else {
      res.status(200).send(data);
    }
  }

app.get('/', async (req, res) => {
    res.status(200).send('Server is online')
})

  //movies endpoint
app.get('/movies', async (req, res) => {
    const movie = await getRequest('movielist', res);
  })

  module.exports = app;