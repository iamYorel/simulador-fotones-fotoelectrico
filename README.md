# Simulador de Fotones y Efecto Fotoeléctrico

**Herramienta educativa interactiva para el estudio de los 34 ejercicios del taller "Fotones y Efecto Fotoeléctrico".**

Desarrollado para: Yorel Davis Diaz Arevalo y Sebastian Alberto Radillo Roa  
Universidad de La Guajira  
Asignatura: Física Moderna  
Docente: Dairo José Hernández Páez

## Características

- ✅ **34 ejercicios completos** organizados por temas
- ✅ **Cálculos interactivos** - Modifica datos y recalcula al instante
- ✅ **Simulador visual** del efecto fotoeléctrico con animación
- ✅ **Modo estudio y modo práctica**
- ✅ **Validación de datos** con mensajes de error
- ✅ **Modo claro/oscuro**
- ✅ **Diseño responsive** para móvil, tablet y escritorio
- ✅ **Fórmulas matemáticas** con MathJax
- ✅ **Gráficas interactivas** con Chart.js
- ✅ **Unidades coherentes** y conversiones automáticas

## Tecnologías

- HTML5
- CSS3 (Variables CSS, Flexbox, Grid)
- JavaScript (Vanilla)
- Chart.js
- MathJax

## Instalación y Uso

### Opción 1: Abrir directamente en el navegador (más simple)

1. Descarga o clona el proyecto
2. Abre el archivo `index.html` en tu navegador web
3. ¡Listo! No requiere servidor para los cálculos básicos

### Opción 2: Servidor local (recomendado para desarrollo)

Si usas Python:

```bash
# Python 3
python -m http.server 8000

# Luego abre: http://localhost:8000
```

Si usas Node.js:

```bash
npx serve .
```

## Estructura del Proyecto

```
SimuladorFotonesEfectoFotoelectrico/
├── index.html          # Página principal
├── css/
│   └── estilos.css     # Estilos y tema claro/oscuro
├── js/
│   ├── app.js          # Lógica principal de la interfaz
│   └── calculos.js     # Motor de cálculos físicos
├── data/
│   └── ejercicios.js   # Datos de los 34 ejercicios
└── README.md
```

## Temas Cubiertos

1. **Conceptos, unidades y notación científica** (Ejercicios 1-3)
2. **Energía, frecuencia y momento de los fotones** (Ejercicios 4-8)
3. **Potencia y flujo de fotones** (Ejercicios 9-13)
4. **Momento, fuerza y presión de radiación** (Ejercicios 14-18)
5. **Fundamentos del efecto fotoeléctrico** (Ejercicios 19-24)
6. **Gráficas y análisis de datos fotoeléctricos** (Ejercicios 25-27)
7. **Algoritmos y verificación computacional** (Ejercicios 28-30)
8. **Problemas integradores** (Ejercicios 31-34)

## Funcionalidades por Ejercicio

Cada ejercicio incluye:
- Enunciado completo
- Datos conocidos editables
- Fórmulas utilizadas
- Desarrollo matemático paso a paso
- Resultados con unidades
- Explicación física
- Botones para calcular, restablecer y copiar
- Modo estudio/práctica

## Constantes Físicas Utilizadas

- h = 6,626 × 10⁻³⁴ J·s
- c = 3,00 × 10⁸ m/s
- e = 1,602 × 10⁻¹⁹ C
- m_e = 9,11 × 10⁻³¹ kg
- hc = 1239,84 eV·nm

## Uso

1. Selecciona un tema en el menú lateral
2. Elige el ejercicio que deseas resolver
3. Revisa el enunciado y los datos
4. Modifica los valores si lo deseas
5. Presiona "Calcular" para ver el resultado
6. Usa "Mostrar/Ocultar solución" en modo estudio
7. Prueba el simulador visual en ejercicios de efecto fotoeléctrico

## Notas Importantes

- Los cálculos se realizan íntegramente en el navegador
- No se requiere conexión a internet para funcionar (excepto CDN de Chart.js y MathJax)
- El progreso solo se guarda durante la sesión
- La animación del efecto fotoeléctrico es una representación educativa simplificada
- Los resultados se redondean solo al momento de mostrar, manteniendo precisión interna

## Fuente

Basado en el documento "Taller de fotones y efecto fotoeléctrico" de Física Moderna, Universidad de La Guajira.
