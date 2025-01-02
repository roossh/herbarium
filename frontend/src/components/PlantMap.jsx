import { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3'

const PlantMap = ({ data, plant }) => {

    const ref = useRef()

    useEffect(() => {
        
        const currentWidth = ref.current.getBoundingClientRect().width
        const currentHeight = ref.current.getBoundingClientRect().width
        const svgElement = d3.select(ref.current)
            .append("svg")
            .attr("preserveAspectRatio", "xMidYMid meet")
            .attr("viewBox", [0, 0, currentWidth, currentHeight])
                .append("g")
                .attr("width", currentWidth)
                .attr("height", currentHeight)

        const minObs = d3.min(Object.values(plant.obs))
        const maxObs = d3.max(Object.values(plant.obs))
        const colorScale = d3.scaleLinear()
            .domain([minObs, maxObs])
            .range(["#a5c7b0", "#0d3018"])

        const projection = d3.geoMercator().fitSize([currentWidth, currentHeight], data)
        const pathGenerator = d3.geoPath().projection(projection)

        const tooltip = d3.select(ref.current)
            .append("div")
            .attr("class", "tooltip")
                .attr("id", "tooltip")
            .style("opacity", 0)

        svgElement
            .selectAll(".zone")
            .data(data.features)
            .join("path")
            .on("mouseover", (event, feature) => {
                tooltip.transition()
                    .duration(50)
                    .attr("zone-information", feature.MAAKUNTALYH_FI)
                tooltip.style("opacity", 1)
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 15) + "px")
                    .html(feature.properties.MAAKUNTA_FI.toString() + ' ' + plant.obs[feature.properties.MAAKUNTALYH_FI])
                })
            .on("mouseout", (event, feature) => {
                tooltip.transition()
                    .duration(50)
                    .style("opacity", 0)
            })
            .attr("class", "zone")
            .attr("fill", feature => colorScale(plant.obs[feature.properties.MAAKUNTALYH_FI]))
            .attr("d", feature => pathGenerator(feature))

        svgElement.append("text")
            .attr("class", "title")
            .attr("x", 10)
            .attr("y", 0)
            .attr("text-anchor", "start")
            .attr("font-size", "1.25rem")
            .attr("font-style", "italic")
            .text("Number of observations")

      }, [])

    return (
        <div className="details" id="details" ref={ref} />
    )
}

export default PlantMap