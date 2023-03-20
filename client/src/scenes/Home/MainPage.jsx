import React, { useEffect, useState } from 'react'
import {useSelector } from "react-redux"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "./Home.css"
const MainPage = () => {
    const[items,setItems] = useState([])
    const [index,setIndex]=useState(0)
    const [pictures,setPictures] = useState([])
    const product =  useSelector((state)=>state.items)
    useEffect(()=>{
        setItems(product)
        setPictures(product.slice(5,10))
    },[product])
    useEffect(()=>{
        const lastIndex = pictures.length-1
        if(index<0){
          setIndex(lastIndex)
        }
        if(index>lastIndex){
          setIndex(0)
        }
    },[index])
     useEffect(()=>{
       const slider = setInterval(()=>{
         setIndex(index+1)
       },10000)
       return ()=>clearInterval(slider)
     },[index])
    
  return (
    <div className="mainpage">
      <button className='back-btn'onClick={()=>setIndex(index - 1)}><ArrowBackIcon/></button>
            <button className='front-btn' onClick={()=>setIndex(index + 1)}><ArrowForwardIcon /></button>
        <div className='mainpage-container'>
            {pictures.map((bigItem,proindex)=>{
            const {id,img_url,description,name} = bigItem;
            
            let slide = "backSlide"
            if (index===proindex){
             slide = "activeslide" 
            }
            if (proindex === index-1 ||(index===0 && proindex===pictures.length-1)){
              slide="forwardSlide"
            }
            return(
                <div className={`display-product ${slide}`} key={id}>
                    <img src={img_url} alt="" />
                    <div className='des'>
                    <h1>{name}</h1>
                    <p>{description}</p>
                    </div>
                   
                </div>
            )
            })}
    </div>
    </div>
    
  )
}

export default MainPage