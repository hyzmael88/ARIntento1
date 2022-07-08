import React from 'react'
import {useEffect} from 'react'
import { ARExperience } from './Experience'

export default function ARComponents() {
    const arExperience = new ARExperience()
    
useEffect(()=> {
  arExperience.initScene()
  arExperience.setupARExperience()
  arExperience.loadModel()

  return() =>{
    arExperience.cleapUp()
  }
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
