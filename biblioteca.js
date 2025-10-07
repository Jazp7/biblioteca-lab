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
    const NOMBRE_LEN = 20;
    const GRADO_LEN = 7;
    const LIBROS_LEN = 8;
    const MULTAS_LEN = 8;
    const ESTADO_LEN = 8;

    const filasFormateadas = estudiantes.map(estudiante => {
        // Formatear el estado, las multas y el grado
        const estadoTexto = estudiante.activo ? "Activo" : "Inactivo";
        const multasTexto = `${estudiante.multas}`;
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
    console.log(" ID | Nombre               | Grado  | Libros  | Multas  | Estado")
    console.log(" ————————————————————————————————————————————————————————————————")


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