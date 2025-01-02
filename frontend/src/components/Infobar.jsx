import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const InfoBar = ({ plant }) => {
    const ref = useRef()
    const colors = ["#a5c7b0", "white"]
    const fStart = plant.flowerStart
    const fEnd = plant.flowerEnd
    const fMonths = Array.from({length:fEnd-fStart+1}, (v, i) => fStart+i)
    const months = Array.from({length:12}, (v,i) => i+1)

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const conservationStatus = {
        EX:'Extinct',
        EW: 'Extinct in the wild',
        CR: 'Critically endangered',
        EN: 'Endangered',
        VU: 'Vulnerable',
        NT: 'Near threatened',
        LC: 'Least concern'
    }

    useEffect(() => {
        const currentWidth = ref.current.getBoundingClientRect().width
        const currentHeight = ref.current.getBoundingClientRect().height
        const barWidth = currentWidth-(currentWidth/6)

        //set up the SVG element for visualisation
        const svgElement = d3.select(ref.current)
            .append("svg")
            .attr("preserveAspectRatio", "xMidYMin meet")
            .attr("viewBox", [0, 0, currentWidth, currentHeight])
                .append("g")
                .attr("width", currentWidth)
                .attr("height", currentHeight)

        //draw flowering time graph
        const monthBar = svgElement.selectAll("rect")
            .data(months)
            .enter()
            .append("rect")
                .attr("width", (barWidth/12))
                .attr("height", currentHeight/5)
                .attr("x", d => d*(barWidth/12))
                .attr("y", currentHeight/4)
                .attr("stroke", "black")
                .attr("fill", d => fMonths.includes(d) ? colors[0] : colors[1])
                //.attr("rx", d => d === 1 ? 20 : d === 12 ? 20 : 0)

        const monthLabels = svgElement.selectAll("text")
            .data(months)
            .enter()
            .append("text")
                .attr("x", d => (d*barWidth/12)+(barWidth/24))
                .attr("y", ((currentHeight/5)-2)*2)
                .text(d => monthNames[d-1])
                .style("text-anchor", "middle")

        svgElement.append("text")
            .attr("class", "title")
            .attr("x", (barWidth/12))
            .attr("y", 25)
            .attr("text-anchor", "start")
            .attr("font-size", "1.25rem")
            .attr("font-style", "italic")
            .text("Typical flowering time")
            
        //add conservation status graphic
        const conStatusGraph = svgElement.selectAll("circle")
            .data(conservationStatus)
            .enter()
            .append("circle")
                .attr("cx", barWidth)
                .attr("cy", 100)
                .attr("r", 10)

    }, [])

    return (
        <div className="infobar" id="infobar" ref={ref} />
    )
}

export default InfoBar