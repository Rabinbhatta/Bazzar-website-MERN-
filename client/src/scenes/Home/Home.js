import React, { useEffect, useState,} from 'react'

import Navbar from './Navbar'
import MainPage from './MainPage'
import {setItems} from "../../state/index.js"
import { useDispatch } from 'react-redux'
import Card from "../../components/cards/Card"
import Footer from '../Footer/Footer'
const HomePage = () => {
   const dispatch = useDispatch()
   const call = async ()=>{
    const response = await fetch('http://localhost:3002/products/products',{
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    const items = await response.json()
    if(items){
        dispatch(
          setItems({
            items:items})
        )
      }
   }
   
   useEffect(()=>{
     call()
   })
  
  
  return (
    <div className='home-container'>
      <div>
        <Navbar/>
      </div>
      <div>
        <MainPage/>
      </div>
      <div className='cards'>
      <Card products= "electronics"/>
      <Card products= "toys"/>
      <Card products= "clothes"/>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  )
}

export default HomePage