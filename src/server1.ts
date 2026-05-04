// Importamos las dependencias necesarias
import express, {Request,Response} from "express";
import {productsMock, Product} from "./products.mock";
// Creamos una instancia de Express
const app = express()
// Definimos el puerto en el que se ejecutará el servidor
const PORT = Number(process.env.PORT) || 3000;

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json())
// Definimos la ruta para obtener todos los productos
app.get("/products",(req:Request,res:Response)=>{
  res.json(productsMock)
})

// Definimos la ruta para obtener un producto por su ID 
app.get("/products/:id",(req:Request,res:Response)=>{
  const {id} = req.params
  const product = productsMock.find(p=>p.id === id)
  if(product){
    res.json(product)
  } else {
    res.status(404).json({ message: "Product not found" })
  }
})

app.listen(PORT,()=>{
  console.log(`Servidor ejecutándose en puerto ${PORT}`)
})

app.post("/products",(req:Request,res:Response)=>{
  const {name, price, stock} = req.body
  const newProduct: Product = {
    id: String(productsMock.length + 1),
    name,
    price,
    stock,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  }
  productsMock.push(newProduct)
  res.status(201).json(newProduct)
})
app.put("/products/:id",(req:Request,res:Response)=>{
  const {id} = req.params
  const {name, price, stock, is_active} = req.body
  const productIndex = productsMock.findIndex(p=>p.id === id)
  if(productIndex !== -1){
    productsMock[productIndex] = {
      ...productsMock[productIndex],
      name,
      price,
      stock,
      is_active,
      updated_at: new Date()
    }
    res.json(productsMock[productIndex])
  } else {
    res.status(404).json({ message: "Product not found" })
  }
})

app.patch("/products/:id",(req:Request,res:Response)=>{
    const {id} = req.params
    const index = productsMock.findIndex(p=>p.id === id)
    if(index !== -1){
      return res.json(404).json({ message: "Product not found" })
    }
})