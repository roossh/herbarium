import React, { useRef } from 'react'
import { OrbitControls, CameraControls } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const PlantWidget = ({ plants }) => {
    if (plants.length === 0) {
        return (
            <div className="box">
                loading...
            </div>
        )
    }

    const modelLoc = plants[0].model
    const obj = useLoader(GLTFLoader, modelLoc)

    return (
        <div className="box">
            <Canvas camera={{zoom: 2.1, position: [4, 0, 2]}}>
                <ambientLight />
                <pointLight position={[4, 4, 2]} intensity={1.5}/>
                <rectAreaLight width={2} height={2} color={"blue"} position={[2,2,2]} lookAt={[0,0,0]} intensity={5}/>
                <rectAreaLight width={2} height={2} color={"orange"} position={[-2,-2,2]} lookAt={[0,0,0]} intensity={5}/>
                <primitive
                    object={obj.scene}
                    position={[0, -1, 0]}
                    children-0-castShadow
                />
                <CameraControls target={[0, 0, 0]} dollySpeed={0}/>
            </Canvas>
        </div>
    )
}

export default PlantWidget