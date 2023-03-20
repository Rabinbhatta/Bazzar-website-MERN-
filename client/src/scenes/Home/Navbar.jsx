import React, { useEffect, useRef, useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import BadgeIcon from '@mui/icons-material/Badge';
import HistoryIcon from '@mui/icons-material/History';
import LogoutIcon from '@mui/icons-material/Logout';
import DeleteIcon from '@mui/icons-material/Delete';
import  "./Navbar.css"
import { useSelector,useDispatch } from 'react-redux';
import { setRemove,setLogout, setRemoveAddToCart,setOrders } from '../../state';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { useNavigate } from 'react-router-dom'; 
import CloseIcon from '@mui/icons-material/Close';
const Navbar = () => {
    const [acc,setAcc]=useState(false)
    const [isHistory,setIsHistory]=useState(false)
    const [cart,setCart]=useState(false)
    const total=useSelector((state)=>state.total)
    const allCartItems = [useSelector((state)=>state.addtocart)]
    console.log(allCartItems)
    const orders = [useSelector((state)=>state.orders[0])]
    console.log(orders[0])
    const refa = useRef(null)
    const refaa = useRef(null)
    const refaaa = useRef(null)
    const user= [useSelector((state)=>state.user)]
    const token = useSelector((state)=>state.token)
    const[isToCart,setIsToCart] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    useEffect(()=>{
        setTimeout(handleWrong,2000)
      },[isToCart])
     const handleWrong = ()=>[
       setIsToCart(false)
     ]
    
    const handleRemove = (id)=>{
             dispatch(setRemove(id))
    }
    useEffect(()=>{
        document.addEventListener("click",handleClickOutside,true)
        
      },[])
      useEffect(()=>{ hanndelOrders()}
        ,[])
      
      const handleClickOutside = (e)=>{
        if(!refa?.current?.contains(e.target)){
          setAcc(false)
          
        }
        if(!refaa?.current?.contains(e.target)){
            setCart(false)
          
        }
        if(!refaa?.current?.contains(e.target)){
            setIsHistory(false)
          
        }
    }
    const handleLogout = ()=>{
        dispatch(setLogout())
        dispatch(setRemoveAddToCart())
    }
    const handlePostOrder= async(carts)=>{
        
       const response = await fetch(`http://localhost:3002/orders/${user[0]?._id}`,{
            method: "POST",
            headers: { "Content-Type": "application/json" } ,
            body: JSON.stringify({order:carts}),
          
       })
       const orders = await response.json()
       hanndelOrders()
       setIsToCart(true)
       setCart(!cart)
       dispatch(setRemoveAddToCart())

    }
    const hanndelOrders = async()=>{
        const response = await fetch(`http://localhost:3002/orders/${user[0]?._id}`,{
            method: "GET",
            headers: { "Content-Type": "application/json" }
       })
       const orders = await response.json()

       if(orders){
         dispatch(setOrders(
            orders
         ))
       }
    }

  return (
    <div className='nav-container'>
        <div className="left">
            <h1>Bazzar</h1>
            
        </div>
        {isToCart && <div className='item-added'>
                       <h3>Order conform</h3>
                    </div>}
      <div className='card-div'></div>
        <div className="right">
            <div className="account" ref={refa}   >
                <div className='acc' onClick={()=>{setAcc(!acc);setCart(false)}}>
                    <AccountCircleIcon  sx={{fontSize:'3rem',color:"#444"}} />
                    <h2>{token?`${user[0]?.firstName}`:"" }</h2>
                    </div>
                
                {acc && (
                    <div className='menu'>
                        <div className="acc-name">
                            <BadgeIcon/> 
                             <h1>{token?`${user[0]?.firstName} ${user[0]?.lastName}`:"no name" }</h1>
                             {/* <h1>try name</h1> */}
                        </div>
                        <div onClick={()=>{setIsHistory(!isHistory);setAcc(!acc)}} className="shp-his acc-name">
                            <HistoryIcon/>
                           <h1>Shopping history</h1>
                        </div>
                        {token?(<div className="logout acc-name" onClick={()=>handleLogout()} >
                            <LogoutIcon/>
                            <h1>Logout</h1>
                        </div>):(<div className="signin acc-name" onClick={()=>navigate("/")} >
                            <LogoutIcon/>
                            <h1>Sign In</h1>
                        </div>) }
                        
                    </div>
                    
                )}
                {isHistory && (
                            <div className='orderHistory' ref={refaaa}>
                                    {orders[0]?(<div>
                                        {orders[0]?.map((items)=>{
                                             const{number,user,date} =  items
                                             const {name,img_url,id,price} = user[0]
                                             const total = number*price
                                             return (
                                                <div key={id}>
                                                    <h2>You order this item at { date}</h2>
                                                       <div className='cart'>
                                                          <div className='car'>
                                                          <img src={img_url} alt="" />
                                                          <div>
                                                          <h3>{name}</h3>
                                                          <div className='detail'>
                                                          <h4>Quantity:{number}</h4>
                                                          <p>${total.toFixed(2)}</p>
                                                          </div>
                                                          </div>
                                                          </div>
                                                       </div>
                                                    
                                                </div>
                                             )

                                        })}
                                        </div>):(
                                            (<div className='noOrder'>
                                                 <h1>No Order till Now</h1>
                                            </div>)
                                        )}
                                        <div  onClick={()=>setIsHistory(false) }>
                    <button className='his'><CloseIcon sx={{fontSize:'3rem',color:"white"}}/></button>
                    </div>
                                                                    
                            </div>
                            
                        )}
                        
            </div>
            <div className="carts" ref={refaa}>
                <AddShoppingCartIcon  onClick={()=>{setCart(!cart);setAcc(false)}} sx={{fontSize:'3rem',color:"#444"}}/>
                   <div className='cart-num'>
                        {allCartItems[0].length}
                       </div>
                {cart &&  ( 
                    <div className='cart-menuContainer'>
                        {  allCartItems[0].length>0 ? ( <div>
                            {allCartItems[0].map((i)=>{
                            const{user,number} = i
                            const {name,img_url,id,price} = user[0]
                            const total = number*price
                            return(
                                <div className='cart'>
                                   <div className='car'>
                                   <img src={img_url} alt="" />
                                   <div>
                                   <h3>{name}</h3>
                                   <div className='detail'>
                                   <h4>Quantity:{number}</h4>
                                   <p>${total.toFixed(2)}</p>
                                   </div>
                                   </div>
                                   </div>
                                   <button onClick={()=>handleRemove(id)}><DeleteIcon sx={{fontSize:'1.5rem',color:"black"}}/>remove</button>
                                </div>
                            )})}
                            <div className='bottoms'>
                                <button onClick={()=>handlePostOrder(allCartItems[0])}><ShoppingBagIcon sx={{fontSize:'1.5rem',color:"white"}}/>Order Now</button>
                                <button onClick={()=>dispatch(setRemoveAddToCart())}><DeleteSweepIcon sx={{fontSize:'1.5rem',color:"white"}}/>Remove All</button>
                                 <h3>Total: {total.toFixed(2)}</h3>
                             </div>
                            </div>)
                            :
                        // ()
                        (<div className='noItem'>
                            <h1>No Items</h1>
                        </div>)}
                       
                        
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default Navbar