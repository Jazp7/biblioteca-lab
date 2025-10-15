const readline = require('readline');
// Configurar readline 
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Base de datos 
const estudiantes = [
    { id: 1, nombre: "Ana García", grado: 9, librosPrestados: 0, multas: 0, activo: true },
    { id: 2, nombre: "Carlos Ruiz", grado: 7, librosPrestados: 3, multas: 15, activo: true },
    { id: 3, nombre: "María López", grado: 9, librosPrestados: 0, multas: 0, activo: true },
    { id: 4, nombre: "José Martínez", grado: 8, librosPrestados: 1, multas: 50, activo: false }
];

const libros = [
    { codigo: "L001", titulo: "Cien años de soledad", disponible: true, categoria: "ficcion" },
    { codigo: "L002", titulo: "El principito", disponible: false, categoria: "ficcion" },
    { codigo: "L003", titulo: "Química básica", disponible: true, categoria: "academico" },
    { codigo: "L004", titulo: "Historia de El Salvador", disponible: true, categoria: "academico" },
    { codigo: "L005", titulo: "Don Quijote", disponible: true, categoria: "ficcion" }
];

let prestamos = [];

// ===== FUNCIONES AUXILIARES ===== 

function limpiarPantalla() {
    console.clear();
}

function pausar(proceso) {
    return new Promise(resolve => {
        rl.question(`\nPresione ENTER para ${proceso}...`, () => {
            resolve();
        });
    });
}

function pregunta(texto) {
    return new Promise(resolve => {
        rl.question(texto, (respuesta) => {
            resolve(respuesta);
        });
    });
}

// ===== Funciones auxiliares 2 =====
function formatearEstudiantes() {
    // Definimos las longitudes máximas para cada columna, esto es clave para la alineación.
    const ID_LEN = 3;
    const NOMBRE_LEN = 21;
    const GRADO_LEN = 7;
    const LIBROS_LEN = 8;
    const MULTAS_LEN = 10;
    const ESTADO_LEN = 8;

    const filasFormateadas = estudiantes.map(estudiante => {
        // Formatear el estado, las multas y el grado
        const estadoTexto = estudiante.activo ? "Activo" : "Inactivo"
        const multasTexto = `$${(estudiante.multas * 2)}.00`;
        const gradoTexto = `${estudiante.grado}°`;

        // Aplicar el "padding" (espaciado) a cada columna
        // str.toString().padEnd(length, ' ') asegura que el string tenga el largo definido

        const ID_col = estudiante.id.toString().padEnd(ID_LEN, ' ');
        const Nombre_col = estudiante.nombre.padEnd(NOMBRE_LEN, ' ');
        const Grado_col = gradoTexto.padEnd(GRADO_LEN, ' ');
        const Libros_col = estudiante.librosPrestados.toString().padEnd(LIBROS_LEN, ' ');
        const Multas_col = multasTexto.padEnd(MULTAS_LEN, ' ');
        const Estado_col = estadoTexto.padEnd(ESTADO_LEN, ' '); // El Estado_col no necesita padEnd si es el último

        // Unir todas las columnas con el separador "|"
        return ` ${ID_col}| ${Nombre_col}| ${Grado_col}| ${Libros_col}| ${Multas_col}| ${Estado_col}`;
    });

    return filasFormateadas;

}

function formatearLibros() {
    const CODE_LEN = 7
    const TITLE_LEN = 30
    const CATEGORY_LEN = 10
    const STATE_LEN = 8

    const filasFormateadas = libros.map(libro => {
        const estadoLibro = libro.disponible ? "Disponible" : "Prestado"

        const CODE_col = libro.codigo.toString().padEnd(CODE_LEN, ' ')
        const TITLE_col = libro.titulo.padEnd(TITLE_LEN, ' ')
        const CATEGORY_col = libro.categoria.padEnd(CATEGORY_LEN, ' ')
        const STATE_col = estadoLibro.padEnd(STATE_LEN, ' ')

        return ` ${CODE_col}| ${TITLE_col}| ${CATEGORY_col}| ${STATE_col}`
    })

    return filasFormateadas
}

function verificarSiHayLibrosDisponibles() {
    const librosDisponibles = libros.filter(libro => libro.disponible === true);

    if (librosDisponibles.length === 0) {
        return "No hay libros disponibles";
    } else {
        return librosDisponibles;
    }
}

function mostrarInformacion(estudianteOlibro) {
    if (estudianteOlibro == "" || estudianteOlibro == null) {
        console.log("\nMissing parameter on function: mostrarInformacion()")
    }

    if (estudianteOlibro == "estudiantes") {
        console.log("   ESTUDIANTES REGISTRADOS:\n")
        estudiantes.forEach(student => {
            console.log(`ID: ${student.id} - ${student.nombre} - ${student.grado}° - ${student.activo ? "Activo" : "Inactivo"}`)
        })
    }

    if (estudianteOlibro == "libros") {
        console.log("  LIBROS DISPONIBLES:\n")
        libros.forEach(libro => {
            console.log(`${libro.codigo}: ${libro.titulo} [${libro.categoria}]`)
        })
    }
}

// ===== FUNCIONES DE BÚSQUEDA ===== 

function buscarEstudiante(id) {
    for (let i = 0; i < estudiantes.length; i++) {
        if (estudiantes[i].id === parseInt(id)) {
            return estudiantes[i];
        }
    }
    return null;
}

function buscarLibro(codigo) {
    const codigoMayus = codigo.toUpperCase();
    for (let i = 0; i < libros.length; i++) {
        if (libros[i].codigo === codigoMayus) {
            return libros[i];
        }
    }
    return null;
}

function obtenerLimiteLibros(grado) {
    if (grado >= 8 && grado <= 9) {
        return 2;
    } else if (grado === 7) {
        return 3;
    } else if (grado === 6) {
        return 4;
    } else {
        return 0;
    }
}

// ===== FUNCIONES DE VISUALIZACIÓN ===== 

function mostrarEncabezado(titulo) {
    console.log("\n" + "═".repeat(50));
    console.log(`  ${titulo}`);
    console.log("═".repeat(50) + "\n");
}

function mostrarEncabezadoSimple(titulo) {
    console.log("\n" + "—".repeat(50));
    console.log(`  ${titulo}`);
    console.log("—".repeat(50) + "\n");
}

function mostrarSubtitulo(subtitulo) {
    console.log(`\n  ${subtitulo}`);
    console.log("═".repeat(50) + "\n");
}

// ===== Funcionalidades del sistema =====
async function cargarPrograma() {
    // Pantalla de "carga"
    mostrarEncabezado("SISTEMA DE GESTIÓN DE BIBLIOTECA ESCOLAR")
    console.log("\nBienvenido al sistema de préstamos")
    console.log("\n  Versión 1.0")
    console.log("")
    await pausar("continuar")
    limpiarPantalla()
}

function Inicio() {
    mostrarEncabezado("📚 SISTEMA DE GESTIÓN DE BIBLIOTECA")
    console.log("[1] Ver Estudiantes")
    console.log("[2] Ver catálogo de libros")
    console.log("[3] Ver libros disponibles")
    console.log("[4] Revisar estado de estudiante")
    console.log("[5] Revisar estado de libro")
    console.log("[6] Realizar préstamo")
    console.log("[7] Devolver libro")
    console.log("[8] Ver historial de préstamos")
    console.log("[0] Salir del sistema")
    console.log("")
}

async function verRegistroDeEstudiantes() {
    mostrarEncabezado("LISTA DE ESTUDIANTES")
    console.log(" ID | Nombre               | Grado  | Libros  | Multas    | Estado")
    console.log(" —————————————————————————————————————————————————————————————————————")


    // Llama a la función auxiliar para obtener el array de líneas formateadas
    const filasDeEstudiantes = formatearEstudiantes();

    // Usa forEach para imprimir CADA STRING individualmente, sin comas ni corchetes.
    filasDeEstudiantes.forEach(linea => {
        console.log(linea); // Imprime el texto formateado de una fila
    });

    await pausar("regresar")
    limpiarPantalla()
}

async function verCatalogoDeLibros() {
    mostrarEncabezado("CATÁLOGO DE LIBROS")
    console.log(" Código | Título                        | Categoría | Estado ")
    console.log(" —————————————————————————————————————————————————————————————————")

    const filasDeLibros = formatearLibros();

    filasDeLibros.forEach(linea => {
        console.log(linea)
    })

    await pausar("regresar")
    limpiarPantalla()
}

async function verLibrosDisponibles() {
    mostrarEncabezado("LIBROS DISPONIBLES");
    const librosQueEstanDisponibles = verificarSiHayLibrosDisponibles();

    if (Array.isArray(librosQueEstanDisponibles)) {
        for (const libro of librosQueEstanDisponibles) {
            console.log(`${libro.codigo} - ${libro.titulo} - ${libro.categoria}`);
        }
    } else {
        console.log(librosQueEstanDisponibles);
    }

    await pausar("regresar");
    limpiarPantalla();
}

async function revisarEstadoDeEstudiante() {
    const id = await pregunta("Ingrese el id del estudiante: ")
    const estudiante = buscarEstudiante(id)

    if (estudiante === null) {
        console.log("Estudiante no encontrado")
        await pausar("regresar")
        limpiarPantalla()
        return
    }
    const activo = estudiante.activo ? "Activo" : "Inactivo"

    // Información general
    mostrarEncabezadoSimple("INFORMACIÓN DEL ESTUDIANTE")
    console.log(`ID: ${estudiante.id}`)
    console.log("Nombre: ", estudiante.nombre)
    console.log(`Grado: ${estudiante.grado}°`)
    console.log(`Estado de cuenta: ${activo}`)

    // Info de préstamos
    mostrarSubtitulo("INFORMACIÓN DE PRÉSTAMOS")
    const limite = obtenerLimiteLibros(estudiante.grado)
    console.log(`Libros prestados: ${estudiante.libros} de ${limite}`)
    console.log(`Capacidad disponible: ${limite - estudiante.libros}`)

    // Info financiera
    mostrarSubtitulo("INFORMACIÓN FINANCIERA")
    console.log(`Multas: $${estudiante.multas * 2}`)
    console.log(`Estado: ${estudiante.multas < 0 ? "AL DÍA" : "PENDIENTE"}`)

    // Puede o no puede?
    console.log("  PUEDE SOLICITAR PRÉSTAMO: ")
    if (estudiante.activo == false || estudiante.multas > 0) {
        console.log("    NO - No puede solicitar préstamo")
    } else {
        console.log("    SÏ - Puede solicitar préstamo")
    }

    await pausar("regresar")
    limpiarPantalla()
}

async function revisarEstadoDeLibro() {
    // Mismo de verCatalogoDeLibros()
    console.log(" Código | Título                        | Categoría | Estado ")
    console.log(" —————————————————————————————————————————————————————————————————")

    const filasDeLibros = formatearLibros();

    filasDeLibros.forEach(linea => {
        console.log(linea)
    })

    // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
    console.log("")
    const respuesta = await pregunta(">>> Ingrese el código del libro (o 0 para cancelar): ")
    if (respuesta === "0") {
        return;
    } else {
        // Asume que 'libros' es tu array original de objetos de libros
        const libroQueBuscamos = libros.find(libro => libro.codigo.toString() === respuesta);
        // Nota: Usé find() en lugar de filter() porque solo quieres UN libro.
        // Hice .toString() para asegurar la comparación con 'respuesta' (que es un string).

        if (libroQueBuscamos) {
            console.log(`Código: ${libroQueBuscamos.codigo}`)
            console.log(`Titulo: ${libroQueBuscamos.titulo}`)
            console.log(`Categoría: ${libroQueBuscamos.categoria}`)
            console.log(`Estado: ${libroQueBuscamos.disponible ? "DISPONIBLE" : "PRESTADO"}`)
        } else {
            console.log("Libro no encontrado")
        }

        await pausar("regresar")
        limpiarPantalla()
    }

}

async function realizarPrestamo() {
    let estudianteEncontrado = null
    let libroEncontrado = null

    while (true) {
        limpiarPantalla()
        mostrarEncabezado("REALIZAR PRÉSTAMO")

        // Parte del Estudiante
        if (estudianteEncontrado == null) {
            mostrarInformacion("estudiantes")

            let id = await pregunta(">>> Ingrese el ID del estudiante (o 0 para cancelar): ")
            if (id.trim() == "0") {
                return
            }
            if (id.trim() == "") {
                console.log("Ingrese un id válido")
                await pausar("intentar de nuevo")
                continue
            }

            estudianteEncontrado = buscarEstudiante(Number(id))

            if (estudianteEncontrado == null) {
                console.log("Estudiante no encontrado")
                await pausar("intentar de nuevo")
                continue
            }

            console.log(`Estudiante encontrado: ${estudianteEncontrado.nombre}\n`)
        }

        // Parte del libro
        if (libroEncontrado == null) {
            mostrarInformacion("libros")

            let libro = await pregunta(">>> Ingrese el código del libro (o 0 para cancelar): ")
            if (libro.trim() == "0") {
                return
            }
            if (libro.trim() == "") {
                console.log("Ingrese un código de libro válido")
                await pausar("continuar")
            }

            libroEncontrado = buscarLibro(libro)

            if (libroEncontrado == null) {
                console.log("Libro no encontrado")
                await pausar("intentar de nuevo")
                continue
            }

            console.log(`Libro encontrado: ${libroEncontrado.titulo}`)

            mostrarEncabezadoSimple("VALIDANDO PRÉSTAMO...")

            const limiteLibros = obtenerLimiteLibros(estudianteEncontrado.grado);
            let puedePedirPrestado = true;

            if (!estudianteEncontrado.activo) {
                console.log("  [X] El estudiante no tiene la cuenta activa.");
                puedePedirPrestado = false;
            }
            if (estudianteEncontrado.multas > 0) {
                console.log("  [X] El estudiante tiene multas pendientes.");
                puedePedirPrestado = false;
            }
            if (estudianteEncontrado.librosPrestados >= limiteLibros) {
                console.log(`  [X] El estudiante alcanzó el límite de ${limiteLibros} libros.`);
                puedePedirPrestado = false;
            }
            if (!libroEncontrado.disponible) {
                console.log("  [X] El libro no está disponible.");
                puedePedirPrestado = false;
            }

            if (!puedePedirPrestado) {
                await pausar("intentar de nuevo");
                estudianteEncontrado = null;
                libroEncontrado = null;
                continue;
            } else {
                console.log("  [✓] ¡Préstamo validado! El estudiante y el libro cumplen los requisitos.");
            }
        }

        // Pregunta de Verificación
        if (estudianteEncontrado !== null && libroEncontrado !== null) {
            mostrarEncabezadoSimple("RESUMEN DEL PRÉSTAMO")
            console.log(`Estudiante: ${estudianteEncontrado.nombre}`)
            console.log(`Libro: ${libroEncontrado.titulo}`)
            console.log("Días de préstamo: 7 días")
            console.log("")

            const verificacion = await pregunta("¿Confirmar préstamo? (S/N): ")
            if (verificacion.toLowerCase() !== "s") {
                console.log("\nPréstamo cancelado.");
                await pausar("regresar al menú principal")
                return
            }

            // 1. Actualizar datos del libro y estudiante
            libroEncontrado.disponible = false;
            estudianteEncontrado.librosPrestados++;

            // 2. Crear y guardar el registro del préstamo
            const idPrestamo = prestamos.length + 1;
            const fechaPrestamo = new Date();
            const fechaDevolucion = new Date();
            fechaDevolucion.setDate(fechaPrestamo.getDate() + 7);

            const nuevoPrestamo = {
                id: idPrestamo,
                idEstudiante: estudianteEncontrado.id,
                codigoLibro: libroEncontrado.codigo,
                fechaPrestamo: fechaPrestamo,
                fechaDevolucion: fechaDevolucion,
                devuelto: false
            };
            prestamos.push(nuevoPrestamo);

            // 3. Mostrar el recibo del préstamo
            mostrarEncabezado("PRÉSTAMO REALIZADO EXITOSAMENTE");
            console.log(`ID Préstamo: ${idPrestamo}`);
            console.log(`Estudiante: ${estudianteEncontrado.nombre}`);
            console.log(`Libro: ${libroEncontrado.titulo}`);
            console.log(`Fecha de préstamo: ${fechaPrestamo.toLocaleDateString('es-ES')}`);
            console.log(`Fecha límite de devolución: ${fechaDevolucion.toLocaleDateString('es-ES')}`);
            console.log("");
            const limite = obtenerLimiteLibros(estudianteEncontrado.grado);
            console.log(`Libros actuales del estudiante: ${estudianteEncontrado.librosPrestados}/${limite}`);
            console.log("\n IMPORTANTE: Devolver el libro antes de la fecha límite");
            console.log("   para evitar multas de $2.00 por día de retraso");

            await pausar("regresar al menú principal");
            return; // Salir de la función realizarPrestamo para volver al menú
        }
    }
}

async function devolverLibro() {
    while (true) {
        limpiarPantalla();
        mostrarEncabezado("DEVOLVER LIBRO");

        const prestamosActivos = prestamos.filter(p => !p.devuelto);

        if (prestamosActivos.length === 0) {
            console.log("No hay préstamos activos para devolver.");
            await pausar("regresar al menú principal");
            return;
        }

        console.log("PRÉSTAMOS ACTIVOS: \n");
        prestamosActivos.forEach(prestamo => {
            const estudiante = buscarEstudiante(prestamo.idEstudiante);
            const libro = buscarLibro(prestamo.codigoLibro);
            if (estudiante && libro) {
                console.log(`ID: ${prestamo.id} | ${estudiante.nombre} | ${libro.titulo}`);
                console.log(`  Prestado: ${prestamo.fechaPrestamo.toLocaleDateString('es-ES')} | Vence: ${prestamo.fechaDevolucion.toLocaleDateString('es-ES')}`);
            }
        });

        let idPrestamo = await pregunta("\n>>> Ingrese el ID del préstamo a devolver (o 0 para cancelar): ");

        if (idPrestamo.trim() === "0") {
            return;
        }

        const prestamo = prestamos.find(p => p.id === Number(idPrestamo) && !p.devuelto);

        if (!prestamo) {
            console.log("ID de préstamo no válido o ya devuelto.");
            await pausar("intentar de nuevo");
            continue;
        }

        const estudiante = buscarEstudiante(prestamo.idEstudiante);
        const libro = buscarLibro(prestamo.codigoLibro);
        const fechaActual = new Date();

        mostrarEncabezadoSimple("Información de la devolución");
        console.log(`Estudiante: ${estudiante.nombre}`);
        console.log(`Libro: ${libro.titulo}`);
        console.log(`Fecha de préstamo: ${prestamo.fechaPrestamo.toLocaleDateString('es-ES')}`);
        console.log(`Fecha límite: ${prestamo.fechaDevolucion.toLocaleDateString('es-ES')}`);
        console.log(`Fecha de devolución: ${fechaActual.toLocaleDateString('es-ES')}`);
        console.log("");

        let verificacion = await pregunta("¿Confirmar devolución? (S/N): ");
        if (verificacion.toLowerCase() !== 's') {
            console.log("\nDevolución cancelada.");
            await pausar("regresar");
            continue;
        }

        // Procesar devolución
        libro.disponible = true;
        estudiante.librosPrestados--;
        prestamo.devuelto = true;
        prestamo.fechaDevolucionReal = fechaActual;

        // Calcular multas si es necesario
        const diasDeRetraso = Math.max(0, Math.ceil((fechaActual - prestamo.fechaDevolucion) / (1000 * 60 * 60 * 24)));
        
        if (diasDeRetraso > 0) {
            const multa = diasDeRetraso * 2; // $2 por día de retraso
            estudiante.multas += multa;
            mostrarEncabezadoSimple("MULTA GENERADA");
            console.log(`El libro se ha devuelto con ${diasDeRetraso} día(s) de retraso.`);
            console.log(`Se ha generado una multa de $${multa}.00`);
            console.log(`Multa total acumulada para ${estudiante.nombre}: $${estudiante.multas}.00`);
        } else {
            mostrarEncabezadoSimple("DEVOLUCIÓN PROCESADA");
            console.log("El libro ha sido devuelto a tiempo.");
            console.log("No se generaron multas.");
        }

        await pausar("continuar");
        limpiarPantalla()
        // Bucle para volver a mostrar el menú de devolución
        // por si se quiere devolver un segundo libro
    }
}

async function verHistorialdePrestamos() {
    limpiarPantalla();
    mostrarEncabezado("HISTORIAL DE PRÉSTAMOS");

    if (prestamos.length === 0) {
        console.log("No hay préstamos en el historial.");
    } else {
        console.log(`Total de préstamos: ${prestamos.length}\n`);

        for (const prestamo of prestamos) {
            const estudiante = buscarEstudiante(prestamo.idEstudiante);
            const libro = buscarLibro(prestamo.codigoLibro);

            if (estudiante && libro) {
                mostrarEncabezadoSimple(`Préstamo #${prestamo.id}`);
                console.log(`Estudiante: ${estudiante.nombre} (ID: ${estudiante.id})`);
                console.log(`Libro: ${libro.titulo} (${libro.codigo})`);
                console.log(`Fecha de préstamo: ${prestamo.fechaPrestamo.toLocaleDateString('es-ES')}`);
                console.log(`Fecha límite: ${prestamo.fechaDevolucion.toLocaleDateString('es-ES')}`);
                
                const estado = prestamo.devuelto ? `Devuelto el ${prestamo.fechaDevolucionReal.toLocaleDateString('es-ES')}` : "Activo";
                console.log(`Estado: ${estado}`);
                console.log("");
            }
        }
    }

    await pausar("regresar al menú principal");
}

// ===== Función Administradora ===== 
async function iniciarPrograma() {
    await cargarPrograma(); // Se ejecuta solo una vez al inicio.

    while (true) { // Este bucle mantendrá el programa corriendo.
        Inicio(); // Muestra el menú en cada ciclo.
        let seleccion = await pregunta(">>> Seleccione una opción: ");

        switch (seleccion) {
            case "1":
                limpiarPantalla();
                await verRegistroDeEstudiantes(); // Esperamos a que la función termine.
                break;
            case "2":
                limpiarPantalla();
                await verCatalogoDeLibros();
                break;
            case "3":
                limpiarPantalla();
                await verLibrosDisponibles();
                break;
            case "4":
                limpiarPantalla();
                await revisarEstadoDeEstudiante();
                break;
            case "5":
                limpiarPantalla();
                await revisarEstadoDeLibro();
                break;
            case "6":
                await realizarPrestamo()
                break
            case "7":
                await devolverLibro()
                break
            case "8":
                limpiarPantalla()
                await verHistorialdePrestamos()
                break
            case "0":
                limpiarPantalla();
                console.log("\nSaliendo del sistema. ¡Hasta pronto!");
                rl.close();
                return; // Termina la función y el programa.
            default:
                limpiarPantalla();
                console.log("Opción no válida");
                await pausar("regresar al menú");
                break;
        }
        // Al terminar un caso, el bucle vuelve a empezar y muestra el menú de nuevo.
        limpiarPantalla(); // Limpiamos la pantalla para la siguiente iteración del menú.
    }
}

iniciarPrograma()