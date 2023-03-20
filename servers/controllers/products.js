import {Product} from "../models/product.js"

export const addproduct = async (req,res)=>{
    try {
        const items = req.body
        
        //     const {id,name,price,img_url,description, product_type} = item;
            const product = Product.insertMany(items)
            // const newProduct = await product.save()
            res.status(202).json(product)
    } catch (err) {
        res.status(404).json({error:mistake})

    }
}

export const getProduct = async (req,res)=>{
    try {
        const allproduct = await Product.find({})
        res.status(202).json(allproduct)
    } catch (err) {
        res.status(404).json({error:err})
    }
}