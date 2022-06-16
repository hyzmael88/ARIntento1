import React, {useEffect} from 'react'
import { ARExperience } from './Experience'

export default function ARComponents() {
    const arExperience = new ARExperience()
    
useEffect(() =>{
  arExperience.initScene()
},[])

  return (
    <div
    className='container3D'
    style={{
        width: "100%",
        height: "100vh",
    }}
    
    ></div>
  )
}
