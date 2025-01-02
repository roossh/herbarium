import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import PlantInfo from './components/PlantInfo'
import './index.css'
import plantService from './services/plants'
import data from './data/FI_FMNH_BGR_20161118_4326.geo.json'

const About = () => (
  <div className="about">
    <br/>
    <p>This is a little side project where I am attempting to collect information about various plants found in Finland and then make some 3D models. As a data enthusiast and biologist, there's also some data visualisations.</p><br/>
    <h2>Some notes regarding the data</h2><br/>
    <p>The data has been collected from <a href="https://www.laji.fi">Finnish Biodiversity Info Facility</a>, and so far I have only used the Kastikka Ark -observations.</p> <br/>
    
    <p>As the data is based on <i>observations</i> they cannot be used to truly determine the amount of particular species. Several things can affect the number of observations, including the population density of a specific area.</p>
  </div>
)
//add a linking system
const PlantAtlas = ({ plants }) => {
  const rows = () => plants.map(plant =>
    <p>{plant.name}</p>)
  return (
    <div className="plant-atlas">
      {rows()}
    </div>
  )
}

const App = () => {

  const [plants, setPlants] = useState([])

  useEffect(() => {
    plantService
      .getAll()
        .then(initialPlants => {
          setPlants(initialPlants)
        })
  }, [])

    return (
      <div className="app">
        <PlantAtlas plants={plants} />
        <Router>
          <div>
            <Link to="/about">about</Link>
            <Link to="/">plants</Link>
          </div>
          <Routes>
            <Route path="/" element={ <PlantInfo data={data} plants={plants}/>}/>
            <Route path="/about" element={<About />}/>
          </Routes>
        </Router>
      </div>
    )
}

export default App