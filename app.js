const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModel');
const app =  express();
app.use(express.json());

app.get('/', (req, res) => {
 res.send("Hello Node Application")
}) 

app.get('/products', async(req, res) => {
 try {
    const products = await Product.find({})
    res.status(200).json(products)
 } catch (error) {
    console.log(error);
    res.status(500).json({message: error.message})
 }
})

app.put('/product/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message: `Cannot find product with ${id}`})
        }
        const updatedProduct = await Product.findByIdAndUpdate(id);
        res.status(200).json(updatedProduct)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message})
        
    }
})

app.delete('/product/:id', async (req, res) => {
     try {
          const {id} = req.params;
          const product =  await Product.findByIdAndDelete(id);
          if(!product){
            return res.status(404).json({message: `Cannot find product with ${id}`})
          }
          res.status(200).json(product)
     } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
        
     }
})

app.get('/product/:id', async(req, res) => {
    try {
        const {id}= req.params
        const product = await Product.findById(id)
        res.status(200).json(product)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message})
        
    }
})

app.get('/blog', (req, res) => {
    res.send("Hello blog, My name is Soma")
})

app.post('/product', async(req,res) => {
   try {
     const product = await Product.create(req.body);
     res.status(200).json(product);
   } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message})
    
   }
})
app.listen( 3000, () => {
 console.log('Node api is running smoothly')
})

mongoose.connect('mongodb://0.0.0.0:27017', { useNewUrlParser: true })
.then(() => {
    console.log("connected to  MongoDb")
}).catch((error) => {
 console.log(error)
})