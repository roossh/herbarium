import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom'
import PlantWidget from './PlantWidget'
import PlantMap from './PlantMap'
import InfoBar from './Infobar'

const PlantInfo = ( { data, plants }) => {

    if (plants.length === 0) {
        return (
            <div className= "plant-info">
                <div className="box"></div>
                <div className="details"></div>
            </div>
        )
    }



    return (
        <div className="plant-window">
            <h2><i>{plants[0].latName}</i></h2>
            <h3>{plants[0].name}</h3>
            <div className="plant-info">
                <PlantMap data={data} plant={plants[0]}/>
                <PlantWidget plants={plants}/>
            </div>
            <InfoBar plant={plants[0]} />
        </div>
    )
}

export default PlantInfo