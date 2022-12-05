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

  //movies get endpoint
app.get('/movies', async (req, res) => {
    const movie = await getRequest('movielist', res);
  })

  //movie add endpoint
app.post('/movies', async (req, res) => {
    const maxIdQuery = await knex('movielist').max('id as maxId').first();
    let num = maxIdQuery.maxId + 1;
    try {
      let newMovie = {
        id: num,
        title: req.body.title
      }
      await knex('movielist').insert(newMovie);
      res.status(201).send('Movie successfully created.')
    } catch(e) {
      console.log(e);
      res.status(400).send(`Post failed`);
    }
  })

  //movies/:id endpoint
app.get('/movies/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const movie = await getRequest('movielist', res, id);
})

  // movie delete endpoint
  app.delete('/movies/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try{
      await knex('movielist').where('id', id).del();
      res.status(202).send(`Item with id ${id} successfully deleted.`)
    } catch (e) {
      console.log(e);
      res.status(400).send('There was an error processing your request.');
    }
  })

  module.exports = app;