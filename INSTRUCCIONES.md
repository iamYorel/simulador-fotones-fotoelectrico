# Instrucciones para Abrir y Ejecutar el Simulador

## Requisitos
- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- No requiere instalación de programas adicionales

## Formas de Ejecución

### Método 1: Directamente (Recomendado)
1. Navega a la carpeta `SimuladorFotonesEfectoFotoelectrico`
2. Haz doble clic en `index.html`
3. Se abrirá automáticamente en tu navegador predeterminado

### Método 2: Desde línea de comandos
```bash
# En Linux/Mac
xdg-open index.html  # o open index.html

# En Windows
start index.html
```

### Método 3: Con servidor local
Si prefieres usar un servidor HTTP local:

**Con Python:**
```bash
cd SimuladorFotonesEfectoFotoelectrico
python3 -m http.server 8080
```
Luego abre http://localhost:8080

**Con Node.js:**
```bash
npx http-server
```

## Verificación Rápida
- Al abrir, debe aparecer la pantalla de bienvenida
- El menú lateral debe mostrar los 8 temas con sus ejercicios
- Puedes buscar ejercicios con el buscador
- Cambiar entre modo claro/oscuro con el botón
- Seleccionar cualquier ejercicio debe cargar su contenido

## Solución de Problemas

**Si no se cargan los estilos:**
- Asegúrate de abrir desde la carpeta completa, no movas archivos individualmente
- Usa un servidor local si hay restricciones CORS

**Si las gráficas no aparecen:**
- Se requiere conexión a internet para cargar Chart.js desde CDN
- O descarga Chart.js localmente

**Si las fórmulas no se renderizan:**
- MathJax necesita conexión a internet
- Las fórmulas básicas se muestran sin MathJax

## Funcionalidades Implementadas

- [x] 34 ejercicios completos con datos del taller
- [x] Organización por 8 temas
- [x] Menú lateral con navegación
- [x] Buscador de ejercicios
- [x] Cálculos para fotones básicos (E, f, λ, p)
- [x] Cálculos de flujo de fotones
- [x] Cálculos de radiación (fuerza/presión)
- [x] Simulador de efecto fotoeléctrico
- [x] Cálculos fotoeléctricos completos
- [x] Problemas integradores (31-34)
- [x] Modo estudio y práctica
- [x] Validaciones
- [x] Modo claro/oscuro
- [x] Diseño responsive
- [x] Animación de electrones
- [x] Desarrollo paso a paso

## Próximas Mejoras (Opcionales)
- Gráficas interactivas con Chart.js completas
- Cuestionario múltiple
- Guardado de progreso en localStorage
- Impresión/PDF
- Más ejercicios con controles avanzados
