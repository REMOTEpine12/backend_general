const biblioteca = require('./biblioteca');

console.log("--- INICIANDO SISTEMA DE BIBLIOTECA ---");

// 1. Consultar inventario inicial
biblioteca.getConsultarInventario((err, libros) => {
    if (err) return console.error(err);
    console.log("\nInventario Inicial:");
    console.table(libros);

    // 2. Agregar un libro nuevo (Anidado dentro del primer callback)
    const nuevoEjemplar = {
        titulo: "Cronopolios",
        autor: "Luis Panini",
        genero: "Ciencia Ficción",
        disponible: true
    };

    biblioteca.postAgregarLibro(nuevoEjemplar, (errAgregar, msjAgregar) => {
        if (errAgregar) return console.error(errAgregar);
        console.log(msjAgregar);

        // 3. Actualizar el estado de un libro existente
        biblioteca.pacthActualizarDisponibilidad("1984", false, (errActualizar, msjActualizar) => {
            if (errActualizar) return console.error(errActualizar);
            console.log(msjActualizar);

            // 4. Consultar el inventario final para validar los cambios
            biblioteca.getConsultarInventario((errFinal, librosFinales) => {
                if (errFinal) return console.error(errFinal);
                console.log("\n Inventario Final:");
                console.table(librosFinales);
                console.log("\n OPERACIONES FINALIZADAS ");
            });
        });
    });
});