// Importamos las dependencias necesarias
import express, { Request, Response } from "express";
import { productsMock, Product } from "./products.mock";
// Creamos una instancia de Express
const app = express();
// Definimos el puerto en el que se ejecutará el servidor
const PORT = Number(process.env.PORT) || 3000;

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json());
// Definimos la ruta para obtener todos los productos
app.get("/products", (req: Request, res: Response) => {
    res.json(productsMock);
});

// Definimos la ruta para obtener un producto por su ID
app.get("/products/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    const product = productsMock.find((p) => p.id === id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
});
// Iniciamos el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en puerto ${PORT}`);
});
// Definimos la ruta para crear un nuevo producto
app.post("/products", (req: Request, res: Response) => {
    const { name, price, stock } = req.body;
    const newProduct: Product = {
        id: String(productsMock.length + 1),
        name,
        price,
        stock,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
    };
    productsMock.push(newProduct);
    res.status(201).json(newProduct);
});

// Definimos la ruta para actualizar un producto por su ID
app.put("/products/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, price, stock, is_active } = req.body;
    const productIndex = productsMock.findIndex((p) => p.id === id);
    if (productIndex !== -1) {
        productsMock[productIndex] = {
            ...productsMock[productIndex],
            name,
            price,
            stock,
            is_active,
            updated_at: new Date(),
        };
        res.json(productsMock[productIndex]);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
});
// Definimos la ruta para actualizar parcialmente un producto por su ID
app.patch("/products/:id", (req: Request, res: Response) => {
    const { id } = req.params;

    // Extraemos los campos que se pueden actualizar del cuerpo de la solicitud
    const { name, price, stock, is_active } = req.body; // En este caso, permitimos actualizar el nombre, precio, stock y estado del producto
    const productIndex = productsMock.findIndex((p) => p.id === id);
    if (productIndex !== -1) {
        productsMock[productIndex] = {
            ...productsMock[productIndex],
            name,
            price,
            stock,
            is_active,
            updated_at: new Date(),
        };
        res.json(productsMock[productIndex]);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
});
// Definimos la ruta para eliminar un producto por su ID
app.delete("/products/:id", (req: Request, res: Response) => {
    const { id } = req.params;

    // Buscamos el índice del producto a eliminar
    const index = productsMock.findIndex((p) => p.id === id);
    if (index !== -1) {
        productsMock.splice(index, 1);
        res.status(200).json({ message: "Producto eliminado" });
    } else {
        res.status(404).json({ message: "Product not found" });
    }
});
