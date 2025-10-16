# Resolución del laboratorio de Programación Estructurada

## Descripción del Proyecto
Sistema de Gestión de Biblioteca Escolar desarrollado en JavaScript con Node.js.

## Diagrama de Flujo General
```mermaid
flowchart TD
    Start([Inicio del Programa]) --> Bienvenida[Pantalla de BienvenidaSistema de Gestión de Biblioteca v1.0]
    Bienvenida --> Menu{Menú Principal8 opciones}
    
    Menu -->|1| OpcionConsulta1[Ver Estudiantes]
    Menu -->|2| OpcionConsulta2[Ver Catálogo de Libros]
    Menu -->|3| OpcionConsulta3[Ver Libros Disponibles]
    Menu -->|4| OpcionConsulta4[Revisar Estado de Estudiante]
    Menu -->|5| OpcionConsulta5[Revisar Estado de Libro]
    Menu -->|6| OpcionPrestamo[Realizar Préstamo]
    Menu -->|7| OpcionDevolucion[Devolver Libro]
    Menu -->|8| OpcionHistorial[Ver Historial de Préstamos]
    Menu -->|0| Salir([Salir del Sistema])
    
    OpcionConsulta1 --> ProcesarConsulta1[Mostrar lista formateadade todos los estudiantes]
    OpcionConsulta2 --> ProcesarConsulta2[Mostrar catálogo completode libros con estado]
    OpcionConsulta3 --> ProcesarConsulta3[Filtrar y mostrar sololibros disponibles]
    OpcionConsulta4 --> ProcesarConsulta4[Buscar estudiante por IDy mostrar información completa]
    OpcionConsulta5 --> ProcesarConsulta5[Buscar libro por códigoy mostrar estado actual]
    
    ProcesarConsulta1 --> Regresar[Pausar y regresar al menú]
    ProcesarConsulta2 --> Regresar
    ProcesarConsulta3 --> Regresar
    ProcesarConsulta4 --> Regresar
    ProcesarConsulta5 --> Regresar
    
    OpcionPrestamo --> ValidarPrestamo{Validar:• Estudiante activo• Sin multas• Bajo límite de libros• Libro disponible}
    ValidarPrestamo -->|No cumple| ErrorPrestamo[Mostrar erroresy cancelar]
    ValidarPrestamo -->|Cumple| ConfirmarPrestamo[Confirmar y procesar préstamo• Actualizar disponibilidad• Registrar en historial• Generar recibo]
    ErrorPrestamo --> Regresar
    ConfirmarPrestamo --> Regresar
    
    OpcionDevolucion --> BuscarPrestamo[Buscar préstamo activopor ID]
    BuscarPrestamo --> ProcesarDevolucion[Procesar devolución• Liberar libro• Actualizar estudiante]
    ProcesarDevolucion --> CalcularMultas{¿Hay díasde retraso?}
    CalcularMultas -->|Sí| AplicarMulta[Generar multa$2.00 por día]
    CalcularMultas -->|No| SinMulta[Devolución a tiemposin cargos]
    AplicarMulta --> Regresar
    SinMulta --> Regresar
    
    OpcionHistorial --> MostrarHistorial[Mostrar todos los préstamosactivos y devueltos]
    MostrarHistorial --> Regresar
    
    Regresar --> LimpiarPantalla[Limpiar pantalla]
    LimpiarPantalla --> Menu
    
    style Start fill:#e1f5e1
    style Salir fill:#ffe1e1
    style Menu fill:#e3f2fd
    style ValidarPrestamo fill:#fff9c4
    style CalcularMultas fill:#fff9c4
    style ErrorPrestamo fill:#ffcccc
    style ConfirmarPrestamo fill:#c8e6c9
    style AplicarMulta fill:#ffcccc
    style SinMulta fill:#c8e6c9
```

## Funcionalidades del Sistema
- Gestión de estudiantes
- Catálogo de libros
- Sistema de préstamos
- Control de devoluciones
- Cálculo automático de multas
- Historial de transacciones

## Tecnologías Utilizadas
- JavaScript
- Node.js
- Módulo readline para interfaz CLI