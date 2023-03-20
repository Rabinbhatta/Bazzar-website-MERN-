import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  items:[],
  addtocart:[],
  id:null,
  total:0,
  orders:[]
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.orders = [];
    },
    setItems: (state, action) => {
      state.items = action.payload.items;
    },
    setId: (state, action) => {
      state.id = action.payload.id;
    },
    setAddToCart: (state, action) => {
      const itemIndex = state.addtocart.findIndex((item)=>item.id === action.payload.id)
      if(itemIndex >= 0){
        state.addtocart[itemIndex].number += action.payload.number
      }else{
        state.addtocart.push(action.payload)
      }
      
    },
    setRemoveAddToCart: (state) => {
      state.addtocart = []
      state.total = null
    },
    setRemove: (state, action) => {
      const itemIndex = state.addtocart.findIndex((item)=>item.id === action.payload)
      state.total = state.total - state.addtocart[itemIndex].user[0].price * state.addtocart[itemIndex].number
      state.addtocart = state.addtocart.filter((item)=> item.id!==action.payload)
      
    },
    setTotal: (state, action) => {
      state.total += action.payload
    },
    setOrders: (state, action) => {
      state.orders = action.payload
    }
  },
});

export const {  setLogin, setLogout,setItems,setId,setAddToCart,setRemove,setRemoveAddToCart,setTotal,setOrders } =
  authSlice.actions;
export default authSlice.reducer;
