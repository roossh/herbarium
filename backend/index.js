import data from './data/plant_data.js'
import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.static('dist'))
app.use(cors())
app.use(express.static('dist'))

app.get('/', (request, response) => {
    response.send('work in progress :D')
})

app.get('/api/plants/', (request, response) => {
    response.json(data.plants)
})

app.get('/api/plants/:id', (request, response) => {
    const id = Number(request.params.id) //works in this case, should be changed to support string
    const plant = data.plants.find(plant => plant.id === id)
    if (plant) {
        response.json(plant)
      } else {
        response.status(404).end()
      }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})