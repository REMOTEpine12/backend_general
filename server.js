const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');

const app = express();
app.use(express.json());

// Servir el archivo HTML estático que crearemos en el siguiente paso
app.use(express.static(__dirname));

// Configuración del Pool de conexiones. 
// Usar un Pool es una buena práctica en producción para manejar múltiples conexiones concurrentes.
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',      // Reemplaza con tu usuario
    password: '3587', // Reemplaza con tu contraseña
    database: 'cafeteria',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Endpoint para CREAR un pedido (Estado inicial: En Proceso)
app.post('/api/pedidos', async (req, res) => {
    try {
        const { nombre_pedido } = req.body;
        const query = "INSERT INTO pedidos (nombre_pedido, estado) VALUES (?, 'En Proceso')";
        const [result] = await pool.query(query, [nombre_pedido]);
        
        res.status(201).json({ 
            id: result.insertId, 
            nombre_pedido, 
            estado: 'En Proceso' 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al insertar en la base de datos' });
    }
});

// Endpoint para COMPLETAR un pedido
app.put('/api/pedidos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = "UPDATE pedidos SET estado = 'Completado' WHERE id = ?";
        await pool.query(query, [id]);
        
        res.json({ success: true, message: 'Pedido completado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la base de datos' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});