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
    { id: 4, nombre: "José Martínez", grado: 8, librosPrestados: 1, multas: 50, activo: false 
} 
]; 
 
const libros = [ 
    { codigo: "L001", titulo: "Cien años de soledad", disponible: true, categoria: "ficcion" 
}, 
    { codigo: "L002", titulo: "El principito", disponible: false, categoria: "ficcion" }, 
    { codigo: "L003", titulo: "Química básica", disponible: true, categoria: "academico" }, 
    { codigo: "L004", titulo: "Historia de El Salvador", disponible: true, categoria: 
"academico" }, 
    { codigo: "L005", titulo: "Don Quijote", disponible: true, categoria: "ficcion" } 
]; 
 
let prestamos = []; 
 
// ===== FUNCIONES AUXILIARES ===== 
 
function limpiarPantalla() { 
    console.clear(); 
} 
 
function pausar() { 
    return new Promise(resolve => { 
        rl.question('\nPresione ENTER para continuar...', () => { 
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