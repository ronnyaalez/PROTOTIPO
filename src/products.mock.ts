// Fichero con los datos de prueba para el proyecto

// Definimos la interfaz del producto
export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}
// Creamos un array de productos de prueba
// Este array se puede usar para simular una base de datos en memoria
export const productsMock: Product[] = [
  {
    id: "1",
    name: "Product 1",
    price: 100,
    stock: 10,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: "2",
    name: "Product 2",
    price: 200,
    stock: 5,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: "3",
    name: "Product 3",
    price: 300,
    stock: 2,
    is_active: false,
    created_at: new Date(),
    updated_at: new Date()
  }
];

