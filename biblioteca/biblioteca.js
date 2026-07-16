
//Invetario de libros
let inventario = [
    { titulo: "Un mundo feliz", autor: "Aldous Huxley", genero: "Fantasía", disponible: true },
    { titulo: "El congreso futurista", autor: "Jorge L. Borges", genero: "Ciencia Ficción", disponible: false }
];


function simularLectura(callback) {
    setTimeout(() => {
        const datosParseados = JSON.parse(JSON.stringify(inventario));
        callback(null, datosParseados);
    }, 800); 
}


function simularEscritura(nuevosDatos, callback) {
    setTimeout(() => {
        inventario = JSON.parse(JSON.stringify(nuevosDatos));
        callback(null, " Base de datos actualizada con éxito.");
    }, 1200);
}

/**
 * MÉTODO: Consultar el inventario completo
 */
function getConsultarInventario(callback) {
    console.log(" Consultando inventario.");
    simularLectura((error, datos) => {
        if (error) return callback(error);
        callback(null, datos);
    });
}

/**
 * MÉTODO: Agregar un nuevo libro
 */
function postAgregarLibro(nuevoLibro, callback) {
    console.log(`⏳ Agregando el libro: "${nuevoLibro.titulo}"...`);
    
    // 1. Primero leemos el estado actual
    simularLectura((errorLectura, datos) => {
        if (errorLectura) return callback(errorLectura);

        // 2. Modificamos los datos en memoria
        datos.push(nuevoLibro);

        // 3. Escribimos los nuevos datos
        simularEscritura(datos, (errorEscritura, mensaje) => {
            if (errorEscritura) return callback(errorEscritura);
            callback(null, mensaje);
        });
    });
}

/**
 * MÉTODO: Actualizar la disponibilidad de un ejemplar
 */
function pacthActualizarDisponibilidad(tituloLibro, estaDisponible, callback) {
    console.log(` Actualizando estado de "${tituloLibro}" a ${estaDisponible ? 'Disponible' : 'Prestado'}...`);
    
    // 1. Leemos el inventario
    simularLectura((errorLectura, datos) => {
        if (errorLectura) return callback(errorLectura);

        // 2. Buscamos el libro y modificamos su estado
        let libroEncontrado = false;
        const datosActualizados = datos.map(libro => {
            if (libro.titulo === tituloLibro) {
                libroEncontrado = true;
                libro.disponible = estaDisponible;
            }
            return libro;
        });

        if (!libroEncontrado) {
            return callback(`❌ Error: El libro "${tituloLibro}" no existe en el inventario.`);
        }

        // 3. Guardamos los cambios
        simularEscritura(datosActualizados, (errorEscritura, mensaje) => {
            if (errorEscritura) return callback(errorEscritura);
            callback(null, mensaje);
        });
    });
}

// Exportamos los métodos para poder usarlos en otro archivo
module.exports = {
    getConsultarInventario,
    postAgregarLibro,
    pacthActualizarDisponibilidad
};