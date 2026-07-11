-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS cafeteria;
USE cafeteria;

-- Crear la tabla de pedidos
CREATE TABLE IF NOT EXISTS pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_pedido VARCHAR(100) NOT NULL,
    estado ENUM('En Proceso', 'Completado') NOT NULL DEFAULT 'En Proceso',
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);