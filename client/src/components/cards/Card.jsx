import React, { useEffect, useRef } from 'react'
import "./Card.css"
import { useState } from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch, useSelector } from 'react-redux'
import { setId,setAddToCart,setTotal } from '../../state';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
const Card = ({products}) => {
    const [cartItem,setCartItems]= useState([{user:null,number:null,id:null, date: Date()}])
    const[hide,setHide] = useState(false)
    const[isToCart,setIsToCart] = useState(false)
    const[istoken,setisToken] = useState(false)
    const[index,setIndex] = useState(0)
    const token= useSelector((state)=>state.token)
    const[calculate,setCalculate] = useState(null)
    const navigate = useNavigate()
     useEffect(()=>{
       setTimeout(handleWrong,2000)
     },[isToCart])
    const handleWrong = ()=>[
      setIsToCart(false)
    ]
   
    const refa = useRef(null)
    const slide = useRef()
    const aitems =  useSelector((state)=>state.items)
    const uid =  useSelector((state)=>state.id)
    const dispatch = useDispatch()
    const product = aitems.filter((i)=>i.product_type === products)
    const aite = aitems.filter((i)=>i.id === uid)
    let d = new Date()
    useEffect(()=>{
      document.addEventListener("click",handleClickOutside,true)
      
    },[])
    useEffect(()=>{
      setCartItems({
        user:aite,
        number:calculate,
        id:uid,
        date: `${d.getFullYear()}/${d.getMonth()+1}/${d.getDate()}`
      })
    },[calculate])
    const handleClickOutside = (e)=>{
      if(!refa?.current?.contains(e.target)){
        setHide(false)
        setCalculate(0)
      }
    }
    const[k,setK]=useState(0)
    let box = document.querySelector(".card-container")
    
    const onClick = (typeofslide)=>{
      let width = box.clientWidth
      console.log(width)
      console.log("clicked")
     if (typeofslide === "back" ){
      console.log("clicked")
       slide.current.style.transform =`translateX(${width+k}px)`
      setK(k+width)
      setIndex(index-1)
     }

     if (typeofslide === "forward"){
      slide.current.style.transform =`translateX(${k-width}px)`
      setK(k-width)
      setIndex(index+1)
     }

    }
    const handleCalculation = (sign)=>{
      if(sign === "substract" && calculate > 0){
        setCalculate(calculate-1)
      }
      if(sign === "add"){
        setCalculate(calculate+1)
      }
    }
    const handleAddToCard = () =>{
      
      if(!token){
            setisToken(true)
      }
      if(token && calculate > 0){
        setIsToCart(true)
        dispatch(
          setAddToCart(cartItem)
        )
        dispatch(setTotal(aite[0].price*calculate))
        setCalculate(0) 
        setHide(false) 
      }
      
      

    }
  return (
    <div className='card-container' >
      <h1>{products.toUpperCase()}</h1>
      <button className='back-btn a'  onClick={()=>{onClick("back"); }} disabled={k>=0} ><ArrowBackIcon/></button>
      <button className='front-btn a' onClick={()=>{onClick("forward");}} disabled={k<=-1863}><ArrowForwardIcon /></button>
      {isToCart && <div className='item-added'> <h3>ITEM ADDED</h3> </div>}
      <div className='card-div' ref={slide} >
     
      {product.map((aitem)=>{
            const{id,name,price,img_url} =aitem
            return(
              <div className={`card`}key={id} onClick={()=>{setHide(!hide);dispatch(setId({id:id}))}}>
                 <img src={img_url} alt="" />
                 <div>
                  <h4> {name}</h4>
                  <p className='price'>${price}</p>
                 </div>
                
                 
              </div>
            )
           })}
      </div>
           {hide && <div className='singleProduct' ref={refa}  >
                  <img src={aite[0].img_url} alt="" srcset="" />
                  <div className='descrip'>
                  <h1>{aite[0].name}</h1>
                  <p> {aite[0].description}</p>
                  <p className='price'> ${aite[0].price}</p>
                  <div className='addsub'>
                    <button className='btn' onClick={()=>handleCalculation("substract")}>-</button>
                    <input type="number" value={calculate} onChange={(e)=>setCalculate(e.target.value)} />
                    <button className='btn'  onClick={()=>handleCalculation("add")}>+</button>
                  </div>
                  <div >
                    <button className='addto' onClick={()=>handleAddToCard()}>Add to CART</button>
                    </div>
                    
                  {istoken && <div>
                    <h3 className='sign'>Sign up to Add to cart</h3>
                    <button className='btns' onClick={()=>navigate("/")}>Sign up</button>
                    </div>}
                    <div  onClick={()=>setHide(false) }>
                    <button className='close'><CloseIcon sx={{fontSize:'3rem',color:"white"}}/></button>
                    </div>
                    
                  
                  </div>
                  
           </div>}
          
    </div>
  )
}

export default Card