// Datos completos de los 34 ejercicios
// Taller de fotones y efecto fotoeléctrico - Universidad de La Guajira
// Fuente: Taller_de_fotones_y_efecto_fotoeléctrico_Física_Moderna__1_.pdf

const EJERCICIOS = [
  // TEMA 1: Conceptos, unidades y notación científica (1-3)
  {
    id: 1,
    numero: 1,
    tema: "TEMA 1. Conceptos, unidades y notación científica",
    titulo: "Conversiones",
    enunciado: "Realice las siguientes conversiones: a) 420 nm a metros, b) 2,50 µm a metros, c) 7,20 × 10^14 Hz a THz, d) 3,40 eV a julios, e) 5,00 mW a vatios, f) 0,075 nm a metros.",
    datos: {
      a: { valor: 420, unidad: "nm" },
      b: { valor: 2.50, unidad: "µm" },
      c: { valor: 7.20e14, unidad: "Hz" },
      d: { valor: 3.40, unidad: "eV" },
      e: { valor: 5.00, unidad: "mW" },
      f: { valor: 0.075, unidad: "nm" }
    },
    variablesBuscar: ["a_m", "b_m", "c_THz", "d_J", "e_W", "f_m"],
    formulas: ["1 nm = 10^-9 m", "1 µm = 10^-6 m", "1 THz = 10^12 Hz", "1 eV = 1,602×10^-19 J", "1 mW = 10^-3 W"],
    tipo: "conversiones",
    editable: false
  },
  {
    id: 2,
    numero: 2,
    tema: "TEMA 1. Conceptos, unidades y notación científica",
    titulo: "Verdadero o falso",
    enunciado: "Justifique si son verdaderas o falsas las siguientes afirmaciones: a) Al duplicar la longitud de onda, la energía del fotón se duplica. b) Un fotón no tiene masa, pero no transporta momento. c) A frecuencia fija, mayor potencia significa mayor número de fotones por segundo. d) La energía cinética máxima depende únicamente de la intensidad de la luz.",
    datos: {},
    tipo: "teorico",
    editable: false
  },
  {
    id: 3,
    numero: 3,
    tema: "TEMA 1. Conceptos, unidades y notación científica",
    titulo: "Orden de menor a mayor energía",
    enunciado: "Ordene los siguientes fotones de menor a mayor energía: λ = 2,0 µm, λ = 700 nm, λ = 450 nm, λ = 0,10 nm.",
    datos: {},
    tipo: "teorico",
    editable: false
  },
  // TEMA 2: Energía, frecuencia y momento de fotones (4-8)
  {
    id: 4,
    numero: 4,
    tema: "TEMA 2. Energía, frecuencia y momento de los fotones",
    titulo: "Fotón de 520 nm",
    enunciado: "Calcule la frecuencia, la energía (en J y eV), y el momento de un fotón de longitud de onda λ = 520 nm.",
    datos: { lambda: { valor: 520, unidad: "nm", editable: true } },
    variablesBuscar: ["frecuencia", "energia_J", "energia_eV", "momento"],
    formulas: ["c = fλ", "E = hf = hc/λ", "p = h/λ = E/c"],
    tipo: "fotones_basico",
    editable: true
  },
  {
    id: 5,
    numero: 5,
    tema: "TEMA 2. Energía, frecuencia y momento de los fotones",
    titulo: "Frecuencia 8,00 × 10^14 Hz",
    enunciado: "Un fotón tiene frecuencia f = 8,00 × 10^14 Hz. Calcule su longitud de onda, energía en julios y en electronvoltios, y su momento lineal.",
    datos: { frecuencia: { valor: 8.00e14, unidad: "Hz", editable: true } },
    variablesBuscar: ["lambda_m", "lambda_nm", "energia_J", "energia_eV", "momento"],
    formulas: ["c = fλ", "E = hf", "p = E/c"],
    tipo: "fotones_basico",
    editable: true
  },
  {
    id: 6,
    numero: 6,
    tema: "TEMA 2. Energía, frecuencia y momento de los fotones",
    titulo: "Fotón de 2,50 eV",
    enunciado: "Calcule la longitud de onda (en nm) y el momento de un fotón cuya energía es E = 2,50 eV.",
    datos: { energia_eV: { valor: 2.50, unidad: "eV", editable: true } },
    variablesBuscar: ["lambda_nm", "momento"],
    formulas: ["λ = hc/E", "p = E/c"],
    tipo: "fotones_basico",
    editable: true
  },
  {
    id: 7,
    numero: 7,
    tema: "TEMA 2. Energía, frecuencia y momento de los fotones",
    titulo: "Fotón visible de 600 nm y rayos X de 0,060 nm",
    enunciado: "Compare un fotón visible de λ = 600 nm con uno de rayos X de λ = 0,060 nm. ¿Cuántas veces mayor es la energía del fotón de rayos X respecto al visible? ¿Y su momento?",
    datos: { 
      lambda1: { valor: 600, unidad: "nm", editable: true },
      lambda2: { valor: 0.060, unidad: "nm", editable: true }
    },
    variablesBuscar: ["razon_energia", "razon_momento"],
    formulas: ["E ∝ 1/λ", "p = E/c"],
    tipo: "comparacion",
    editable: true
  },
  {
    id: 8,
    numero: 8,
    tema: "TEMA 2. Energía, frecuencia y momento de los fotones",
    titulo: "Momento 4,50 × 10^-27 kg m/s",
    enunciado: "Un fotón tiene momento lineal p = 4,50 × 10^-27 kg·m/s. Calcule su energía, frecuencia y longitud de onda.",
    datos: { momento: { valor: 4.50e-27, unidad: "kg·m/s", editable: true } },
    variablesBuscar: ["energia_J", "frecuencia", "lambda_m", "lambda_nm"],
    formulas: ["E = pc", "f = E/h", "λ = h/p"],
    tipo: "fotones_basico",
    editable: true
  },
  // TEMA 3: Potencia y flujo de fotones (9-13)
  {
    id: 9,
    numero: 9,
    tema: "TEMA 3. Potencia y flujo de fotones",
    titulo: "Láser de 3,00 mW y 650 nm",
    enunciado: "Un láser emite potencia P = 3,00 mW a λ = 650 nm. Calcule la energía de cada fotón y el número de fotones emitidos por segundo.",
    datos: { 
      potencia: { valor: 3.00, unidad: "mW", editable: true },
      lambda: { valor: 650, unidad: "nm", editable: true }
    },
    variablesBuscar: ["energia_foton", "flujo_fotones"],
    formulas: ["Eγ = hc/λ", "Ṅ = P/Eγ"],
    tipo: "flujo_fotones",
    editable: true
  },
  {
    id: 10,
    numero: 10,
    tema: "TEMA 3. Potencia y flujo de fotones",
    titulo: "Flujo 2,50 × 10^16 fotones/s a 450 nm",
    enunciado: "Un haz tiene un flujo de 2,50 × 10^16 fotones/s a λ = 450 nm. Calcule la potencia óptica del haz.",
    datos: { 
      flujo: { valor: 2.50e16, unidad: "fotones/s", editable: true },
      lambda: { valor: 450, unidad: "nm", editable: true }
    },
    variablesBuscar: ["potencia_W", "potencia_mW"],
    formulas: ["Eγ = hc/λ", "P = Ṅ Eγ"],
    tipo: "flujo_fotones",
    editable: true
  },
  {
    id: 11,
    numero: 11,
    tema: "TEMA 3. Potencia y flujo de fotones",
    titulo: "Pulso de 4,00 mJ, 532 nm y 8,00 ns",
    enunciado: "Un pulso láser de energía 4,00 mJ y duración 8,00 ns tiene longitud de onda 532 nm. Calcule el número de fotones en el pulso y la potencia media.",
    datos: { 
      energia_pulso: { valor: 4.00, unidad: "mJ", editable: true },
      lambda: { valor: 532, unidad: "nm", editable: true },
      tiempo: { valor: 8.00, unidad: "ns", editable: true }
    },
    variablesBuscar: ["num_fotones", "potencia_media"],
    formulas: ["Eγ = hc/λ", "N = E_pulso/Eγ", "Pmedia = E_pulso/Δt"],
    tipo: "pulsos",
    editable: true
  },
  {
    id: 12,
    numero: 12,
    tema: "TEMA 3. Potencia y flujo de fotones",
    titulo: "Haces de igual potencia: 400 nm y 800 nm",
    enunciado: "Dos haces tienen la misma potencia óptica. Uno es de λ = 400 nm y otro de λ = 800 nm. ¿Cuál emite más fotones por segundo y en qué razón?",
    datos: { 
      lambda1: { valor: 400, unidad: "nm", editable: true },
      lambda2: { valor: 800, unidad: "nm", editable: true }
    },
    variablesBuscar: ["razon_flujo"],
    formulas: ["Ṅ = P/Eγ", "Eγ ∝ 1/λ"],
    tipo: "comparacion_flujo",
    editable: true
  },
  {
    id: 13,
    numero: 13,
    tema: "TEMA 3. Potencia y flujo de fotones",
    titulo: "Lámpara de 6,0 W y eficiencia luminosa del 12 %",
    enunciado: "Una lámpara incandescente consume 6,0 W y tiene una eficiencia luminosa del 12 %. Considerando una longitud de onda promedio de 550 nm, calcule el número de fotones emitidos por segundo.",
    datos: { 
      potencia_total: { valor: 6.0, unidad: "W", editable: true },
      eficiencia: { valor: 12, unidad: "%", editable: true },
      lambda: { valor: 550, unidad: "nm", editable: true }
    },
    variablesBuscar: ["potencia_optica", "flujo_fotones"],
    formulas: ["Pópt = η Ptotal", "Eγ = hc/λ", "Ṅ = Pópt/Eγ"],
    tipo: "eficiencia",
    editable: true
  },
  // TEMA 4: Momento, fuerza y presión de radiación (14-18)
  {
    id: 14,
    numero: 14,
    tema: "TEMA 4. Momento, fuerza y presión de radiación",
    titulo: "Haz de 5,00 W",
    enunciado: "Un haz de luz de 5,00 W incide sobre una superficie. Calcule la fuerza sobre ella si la absorbe completamente y si la refleja idealmente.",
    datos: { potencia: { valor: 5.00, unidad: "W", editable: true } },
    variablesBuscar: ["fuerza_absorcion", "fuerza_reflexion"],
    formulas: ["F_abs = P/c", "F_ref = 2P/c"],
    tipo: "radiacion",
    editable: true
  },
  {
    id: 15,
    numero: 15,
    tema: "TEMA 4. Momento, fuerza y presión de radiación",
    titulo: "Intensidad 1,20 × 10^3 W/m^2",
    enunciado: "Una onda electromagnética tiene intensidad I = 1,20 × 10^3 W/m^2. Calcule la presión de radiación si la superficie absorbe completamente y si refleja idealmente.",
    datos: { intensidad: { valor: 1.20e3, unidad: "W/m^2", editable: true } },
    variablesBuscar: ["presion_absorcion", "presion_reflexion"],
    formulas: ["P_rad_abs = I/c", "P_rad_ref = 2I/c"],
    tipo: "radiacion",
    editable: true
  },
  {
    id: 16,
    numero: 16,
    tema: "TEMA 4. Momento, fuerza y presión de radiación",
    titulo: "Espejo de área 2,50 cm^2 , potencia 1,80 W",
    enunciado: "Un espejo de área A = 2,50 cm^2 recibe un haz de potencia P = 1,80 W perpendicularmente. Calcule la intensidad, la presión de radiación y la fuerza ejercida (reflexión ideal).",
    datos: { 
      area_cm2: { valor: 2.50, unidad: "cm^2", editable: true },
      potencia: { valor: 1.80, unidad: "W", editable: true }
    },
    variablesBuscar: ["intensidad", "presion", "fuerza"],
    formulas: ["I = P/A", "P_rad = 2I/c", "F = P_rad A"],
    tipo: "radiacion",
    editable: true
  },
  {
    id: 17,
    numero: 17,
    tema: "TEMA 4. Momento, fuerza y presión de radiación",
    titulo: "Fotón de 500 nm reflejado",
    enunciado: "Un fotón de λ = 500 nm incide perpendicularmente sobre un espejo y se refleja en la misma dirección pero sentido contrario. Calcule el cambio de momento del fotón y explique el efecto sobre el espejo.",
    datos: { lambda: { valor: 500, unidad: "nm", editable: true } },
    variablesBuscar: ["momento_inicial", "momento_final", "cambio_momento"],
    formulas: ["p = h/λ", "Δp = p_f - p_i"],
    tipo: "momento_foton",
    editable: true
  },
  {
    id: 18,
    numero: 18,
    tema: "TEMA 4. Momento, fuerza y presión de radiación",
    titulo: "Diagrama vectorial: absorción y reflexión",
    enunciado: "Explique, con apoyo vectorial, por qué la fuerza de reflexión ideal es el doble que la de absorción completa para la misma intensidad.",
    datos: {},
    tipo: "teorico",
    editable: false
  },
  // TEMA 5: Fundamentos del efecto fotoeléctrico (19-24)
  {
    id: 19,
    numero: 19,
    tema: "TEMA 5. Fundamentos del efecto fotoeléctrico",
    titulo: "Significado de hf = ϕ + Kmáx",
    enunciado: "Explique el significado de cada término en la ecuación hf = ϕ + Kmáx.",
    datos: {},
    tipo: "teorico",
    editable: false
  },
  {
    id: 20,
    numero: 20,
    tema: "TEMA 5. Fundamentos del efecto fotoeléctrico",
    titulo: "Tabla conceptual",
    enunciado: "Complete e interprete la tabla sobre los efectos de variar intensidad, frecuencia, material y potencial de frenado.",
    datos: {},
    tipo: "teorico",
    editable: false
  },
  {
    id: 21,
    numero: 21,
    tema: "TEMA 5. Fundamentos del efecto fotoeléctrico",
    titulo: "Metal con ϕ = 2,40 eV",
    enunciado: "Para un metal con función de trabajo ϕ = 2,40 eV, calcule la frecuencia umbral y la longitud de onda umbral. ¿Para qué longitudes de onda habrá emisión fotoeléctrica?",
    datos: { funcion_trabajo: { valor: 2.40, unidad: "eV", editable: true } },
    variablesBuscar: ["frecuencia_umbral", "longitud_onda_umbral"],
    formulas: ["f0 = ϕ/h", "λ0 = hc/ϕ"],
    tipo: "fotoelectrico",
    editable: true
  },
  {
    id: 22,
    numero: 22,
    tema: "TEMA 5. Fundamentos del efecto fotoeléctrico",
    titulo: "Decisión de emisión para cada caso",
    enunciado: "Para los casos A-D, determine si hay emisión fotoeléctrica, calcule Kmáx y el potencial de frenado Vs cuando corresponda.",
    datos: {
      casos: [
        { id: "A", lambda: 300, phi: 2.20 },
        { id: "B", lambda: 550, phi: 2.80 },
        { id: "C", lambda: 450, phi: 1.90 },
        { id: "D", lambda: 250, phi: 4.50 }
      ]
    },
    tipo: "tabla_fotoelectrico",
    editable: true
  },
  {
    id: 23,
    numero: 23,
    tema: "TEMA 5. Fundamentos del efecto fotoeléctrico",
    titulo: "Frecuencia 9,00 × 10^14 Hz, ϕ = 2,10 eV",
    enunciado: "Luz de frecuencia f = 9,00 × 10^14 Hz incide sobre un metal con ϕ = 2,10 eV. Calcule la energía del fotón, Kmáx, el potencial de frenado y la velocidad máxima de los electrones emitidos.",
    datos: { 
      frecuencia: { valor: 9.00e14, unidad: "Hz", editable: true },
      funcion_trabajo: { valor: 2.10, unidad: "eV", editable: true }
    },
    variablesBuscar: ["energia_foton", "Kmax", "Vs", "vmax"],
    formulas: ["Eγ = hf", "Kmax = Eγ - ϕ", "Vs = Kmax/e", "Kmax = 1/2 me v^2"],
    tipo: "fotoelectrico_completo",
    editable: true
  },
  {
    id: 24,
    numero: 24,
    tema: "TEMA 5. Fundamentos del efecto fotoeléctrico",
    titulo: "Vs = 1,35 V con luz de 365 nm",
    enunciado: "Se determina un potencial de frenado Vs = 1,35 V al iluminar un metal con luz de λ = 365 nm. Calcule la función de trabajo del metal en eV y su longitud de onda umbral.",
    datos: { 
      voltaje_frenado: { valor: 1.35, unidad: "V", editable: true },
      lambda: { valor: 365, unidad: "nm", editable: true }
    },
    variablesBuscar: ["funcion_trabajo", "longitud_onda_umbral"],
    formulas: ["Eγ = hc/λ", "ϕ = Eγ - eVs", "λ0 = hc/ϕ"],
    tipo: "fotoelectrico_inverso",
    editable: true
  },
  // TEMA 6: Gráficas y análisis de datos fotoeléctricos (25-27)
  {
    id: 25,
    numero: 25,
    tema: "TEMA 6. Gráficas y análisis de datos fotoeléctricos",
    titulo: "Tres materiales: ϕ = 1,8, 2,4 y 3,1 eV",
    enunciado: "Para tres metales con funciones de trabajo ϕ = 1,8 eV, 2,4 eV y 3,1 eV, grafique Kmáx en función de la frecuencia. Determine las frecuencias umbral y la pendiente.",
    datos: { 
      materiales: [
        { phi: 1.8, color: "#ff6b6b" },
        { phi: 2.4, color: "#4ecdc4" },
        { phi: 3.1, color: "#45b7d1" }
      ]
    },
    tipo: "grafica_kmax_f",
    editable: true
  },
  {
    id: 26,
    numero: 26,
    tema: "TEMA 6. Gráficas y análisis de datos fotoeléctricos",
    titulo: "Datos simulados: ajuste de Vs frente a f",
    enunciado: "Se obtuvieron los siguientes datos: f (×10^14 Hz) = (5,00; 5,50; 6,00; 6,50; 7,00; 7,50), Vs (V) = (0,07; 0,28; 0,49; 0,69; 0,90; 1,11). Ajuste una recta, determine h/e y ϕ.",
    datos: {
      datos_f_Vs: {
        f: [5.00e14, 5.50e14, 6.00e14, 6.50e14, 7.00e14, 7.50e14],
        Vs: [0.07, 0.28, 0.49, 0.69, 0.90, 1.11]
      }
    },
    tipo: "ajuste_datos",
    editable: true
  },
  {
    id: 27,
    numero: 27,
    tema: "TEMA 6. Gráficas y análisis de datos fotoeléctricos",
    titulo: "Fotocorriente frente al voltaje",
    enunciado: "Explique y esquematice las curvas de fotocorriente vs voltaje aplicado para dos intensidades distintas a frecuencia fija superior al umbral.",
    datos: {},
    tipo: "grafica_fotocorriente",
    editable: false
  },
  // TEMA 7: Algoritmos y verificación computacional (28-30)
  {
    id: 28,
    numero: 28,
    tema: "TEMA 7. Algoritmos y verificación computacional",
    titulo: "Pseudocódigo del efecto fotoeléctrico",
    enunciado: "Escriba el pseudocódigo para determinar si hay emisión fotoeléctrica, calcular Kmáx y Vs a partir de λ y ϕ.",
    datos: {},
    tipo: "algoritmo",
    editable: false
  },
  {
    id: 29,
    numero: 29,
    tema: "TEMA 7. Algoritmos y verificación computacional",
    titulo: "Pseudocódigo de energía, momento y flujo",
    enunciado: "Desarrolle un algoritmo que lea potencia (mW) y longitud de onda (nm) y calcule energía por fotón, momento y flujo de fotones.",
    datos: {},
    tipo: "algoritmo",
    editable: false
  },
  {
    id: 30,
    numero: 30,
    tema: "TEMA 7. Algoritmos y verificación computacional",
    titulo: "Casos de prueba",
    enunciado: "Pruebe los algoritmos con los casos propuestos y complete la tabla de verificación.",
    datos: {
      casos_prueba: [
        { caso: 1, entrada1: "λ = -10 nm", entrada2: "ϕ = 2,0 eV", esperado: "Entrada inválida; mostrar error." },
        { caso: 2, entrada1: "λ = 700 nm", entrada2: "ϕ = 2,5 eV", esperado: "Eγ = 1,77 eV; no hay emisión." },
        { caso: 3, entrada1: "λ = 619,92 nm", entrada2: "ϕ = 2,00 eV", esperado: "Umbral: Eγ ≈ 2,00 eV y Kmáx = 0." },
        { caso: 4, entrada1: "λ = 400 nm", entrada2: "ϕ = 2,00 eV", esperado: "Eγ = 3,10 eV; Kmáx ≈ 1,10 eV, Vs ≈ 1,10 V." },
        { caso: 5, entrada1: "λ = 300 nm", entrada2: "ϕ = 1,50 eV", esperado: "Emisión; Eγ = 4,13 eV y Kmáx ≈ 2,63 eV." }
      ]
    },
    tipo: "pruebas",
    editable: true
  },
  // TEMA 8: Problemas integradores (31-34)
  {
    id: 31,
    numero: 31,
    tema: "TEMA 8. Problemas integradores",
    titulo: "Sensor fotoeléctrico",
    enunciado: "Un sensor utiliza un cátodo con ϕ = 2,15 eV iluminado con λ = 405 nm y potencia 1,50 mW. Calcule Eγ, momento por fotón, flujo, Kmáx, Vs y la fotocorriente si se recolecta el 8 % de los electrones.",
    datos: { 
      funcion_trabajo: { valor: 2.15, unidad: "eV", editable: true },
      lambda: { valor: 405, unidad: "nm", editable: true },
      potencia: { valor: 1.50, unidad: "mW", editable: true },
      eficiencia_coleccion: { valor: 8, unidad: "%", editable: true }
    },
    variablesBuscar: ["energia_foton", "momento_foton", "flujo_fotones", "Kmax", "Vs", "fotocorriente"],
    formulas: ["Eγ = hc/λ", "p = Eγ/c", "Ṅ = P/Eγ", "Kmax = Eγ - ϕ", "Iq = e η Ṅ"],
    tipo: "integrador_sensor",
    editable: true
  },
  {
    id: 32,
    numero: 32,
    tema: "TEMA 8. Problemas integradores",
    titulo: "Vela solar ideal",
    enunciado: "Una 'vela solar' ideal de área A = 12,0 m^2 se encuentra a una distancia tal que recibe intensidad I = 1,36 × 10^3 W/m^2. Calcule la potencia incidente, presión de radiación, fuerza y aceleración para reflexión ideal y compare con absorción completa. Masa m = 18,0 kg.",
    datos: { 
      area: { valor: 12.0, unidad: "m^2", editable: true },
      intensidad: { valor: 1.36e3, unidad: "W/m^2", editable: true },
      masa: { valor: 18.0, unidad: "kg", editable: true }
    },
    variablesBuscar: ["potencia", "presion_ref", "presion_abs", "fuerza_ref", "fuerza_abs", "aceleracion_ref", "aceleracion_abs"],
    formulas: ["P = I A", "P_rad_ref = 2I/c", "P_rad_abs = I/c", "F = P_rad A", "a = F/m"],
    tipo: "integrador_vela",
    editable: true
  },
  {
    id: 33,
    numero: 33,
    tema: "TEMA 8. Problemas integradores",
    titulo: "Selección de material",
    enunciado: "Se dispone de tres materiales con funciones de trabajo ϕ_A = 1,90 eV, ϕ_B = 2,70 eV, ϕ_C = 4,20 eV. Se ilumina con λ = 430 nm. Determine cuál(es) emiten electrones, Kmáx para cada uno y cuál es el más sensible.",
    datos: { 
      lambda: { valor: 430, unidad: "nm", editable: true },
      materiales: [
        { id: "A", phi: 1.90 },
        { id: "B", phi: 2.70 },
        { id: "C", phi: 4.20 }
      ]
    },
    variablesBuscar: ["energia_foton", "emision_A", "emision_B", "emision_C", "Kmax_A", "Kmax_B", "Kmax_C"],
    formulas: ["Eγ = hc/λ", "Kmax = Eγ - ϕ si Eγ ≥ ϕ"],
    tipo: "integrador_seleccion",
    editable: true
  },
  {
    id: 34,
    numero: 34,
    tema: "TEMA 8. Problemas integradores",
    titulo: "Diseño propio",
    enunciado: "Un láser de longitud de onda 500 nm y potencia 2,00 mW ilumina un metal cuya función de trabajo es 2,00 eV. Determine la energía y el momento de cada fotón, el flujo de fotones, la energía cinética máxima de los electrones y el potencial de frenado.",
    datos: { 
      lambda: { valor: 500, unidad: "nm", editable: true },
      potencia: { valor: 2.00, unidad: "mW", editable: true },
      funcion_trabajo: { valor: 2.00, unidad: "eV", editable: true }
    },
    variablesBuscar: ["energia_foton", "momento_foton", "flujo_fotones", "Kmax", "Vs"],
    formulas: ["Eγ = hc/λ", "p = Eγ/c", "Ṅ = P/Eγ", "Kmax = Eγ - ϕ", "Vs = Kmax (en eV)"],
    tipo: "integrador_diseño",
    editable: true
  }
];

// Constantes físicas
const CONSTANTES = {
  h: 6.626e-34,      // J·s
  c: 3.00e8,         // m/s
  e: 1.602e-19,      // C
  me: 9.11e-31,      // kg
  hc_eV_nm: 1239.84, // eV·nm
  hc_J_m: 6.626e-34 * 3.00e8
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { EJERCICIOS, CONSTANTES };
}
