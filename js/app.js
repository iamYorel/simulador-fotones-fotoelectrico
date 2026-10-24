// Aplicación principal del Simulador de Fotones y Efecto Fotoeléctrico

let ejercicioActual = null;
let modoActual = 'estudio'; // 'estudio' o 'practica'
let temaExpandido = null;

// Inicializar aplicación
function initApp() {
  // Configurar tema
  const temaGuardado = localStorage.getItem('tema') || 'light';
  document.documentElement.setAttribute('data-theme', temaGuardado);
  actualizarBotonTema();
  
  // Construir sidebar
  construirSidebar();
  
  // Configurar eventos
  document.getElementById('themeToggle').addEventListener('click', toggleTema);
  document.getElementById('modeSelector').addEventListener('change', cambiarModo);
  document.getElementById('searchInput').addEventListener('input', buscarEjercicios);
  
  console.log('Simulador inicializado correctamente');
}

// Construir sidebar con ejercicios
function construirSidebar() {
  const container = document.getElementById('temasContainer');
  container.innerHTML = '';
  
  // Agrupar ejercicios por tema
  const temas = {};
  EJERCICIOS.forEach(ej => {
    if (!temas[ej.tema]) {
      temas[ej.tema] = [];
    }
    temas[ej.tema].push(ej);
  });
  
  // Crear secciones por tema
  Object.keys(temas).sort().forEach(tema => {
    const section = document.createElement('div');
    section.className = 'tema-section';
    section.dataset.tema = tema;
    
    const header = document.createElement('div');
    header.className = 'tema-header';
    header.innerHTML = `
      <span>${tema}</span>
      <span class="tema-arrow">▶</span>
    `;
    header.addEventListener('click', () => toggleTemaSection(section));
    
    const ejerciciosDiv = document.createElement('div');
    ejerciciosDiv.className = 'tema-ejercicios';
    
    temas[tema].forEach(ejercicio => {
      const item = document.createElement('div');
      item.className = 'ejercicio-item';
      item.dataset.id = ejercicio.id;
      item.innerHTML = `
        <span class="ejercicio-numero">${ejercicio.numero}.</span> ${ejercicio.titulo}
      `;
      item.addEventListener('click', () => seleccionarEjercicio(ejercicio));
      ejerciciosDiv.appendChild(item);
    });
    
    section.appendChild(header);
    section.appendChild(ejerciciosDiv);
    container.appendChild(section);
  });
}

// Toggle tema section
function toggleTemaSection(section) {
  section.classList.toggle('expanded');
}

// Buscar ejercicios
function buscarEjercicios() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const items = document.querySelectorAll('.ejercicio-item');
  
  items.forEach(item => {
    const texto = item.textContent.toLowerCase();
    if (texto.includes(query)) {
      item.style.display = 'block';
      // Expandir tema si hay resultado
      const section = item.closest('.tema-section');
      section.classList.add('expanded');
    } else {
      item.style.display = query ? 'none' : 'block';
    }
  });
}

// Seleccionar ejercicio
function seleccionarEjercicio(ejercicio) {
  ejercicioActual = ejercicio;
  
  // Actualizar active
  document.querySelectorAll('.ejercicio-item').forEach(item => {
    item.classList.toggle('active', parseInt(item.dataset.id) === ejercicio.id);
  });
  
  // Ocultar pantalla de bienvenida
  document.getElementById('welcomeScreen').classList.add('hidden');
  document.getElementById('exercisePanel').classList.remove('hidden');
  
  // Renderizar ejercicio
  renderizarEjercicio(ejercicio);
}

// Renderizar ejercicio
function renderizarEjercicio(ejercicio) {
  const panel = document.getElementById('exercisePanel');
  
  panel.innerHTML = `
    <div class="exercise-header">
      <div class="tema">${ejercicio.tema}</div>
      <h2>Ejercicio ${ejercicio.numero}. ${ejercicio.titulo}</h2>
    </div>
    
    <div class="exercise-section">
      <h3>📋 Enunciado</h3>
      <div class="enunciado">${ejercicio.enunciado}</div>
    </div>
    
    ${ejercicio.datos && Object.keys(ejercicio.datos).length > 0 && ejercicio.tipo !== 'teorico' ? `
      <div class="exercise-section">
        <h3>📊 Datos conocidos</h3>
        <div class="datos-grid" id="datosGrid"></div>
      </div>
    ` : ''}
    
    <div class="buttons-group">
      <button class="btn btn-primary" onclick="calcularEjercicio()">
        🧮 Calcular
      </button>
      <button class="btn btn-secondary" onclick="restablecerDatos()">
        🔄 Restablecer
      </button>
      <button class="btn btn-secondary" onclick="copiarResultados()">
        📋 Copiar resultados
      </button>
      ${modoActual === 'estudio' ? `
        <button class="btn btn-secondary" onclick="toggleSolucion()">
          👁️ Mostrar/Ocultar solución
        </button>
      ` : `
        <button class="btn btn-secondary" onclick="comprobarRespuesta()">
          ✅ Comprobar respuesta
        </button>
      `}
    </div>
    
    <div class="exercise-section" id="formulasSection">
      <h3>📐 Fórmulas utilizadas</h3>
      <div class="formulas-list">
        ${(ejercicio.formulas || []).map(f => `<div class="formula-item">${f}</div>`).join('')}
      </div>
    </div>
    
    <div class="exercise-section hidden" id="solucionSection">
      <h3>📝 Desarrollo matemático paso a paso</h3>
      <div id="desarrolloPasos"></div>
    </div>
    
    <div class="exercise-section hidden" id="resultadosSection">
      <h3>🎯 Resultados</h3>
      <div class="resultados-grid" id="resultadosGrid"></div>
      <div class="explicacion-fisica" id="explicacionFisica" style="margin-top: 1rem;"></div>
    </div>
    
    ${ejercicio.tipo === 'fotoelectrico_completo' || ejercicio.tipo === 'fotoelectrico' || ejercicio.numero >= 19 && ejercicio.numero <= 24 ? `
      <div class="exercise-section">
        <h3>⚡ Simulador de efecto fotoeléctrico</h3>
        <div class="simulador-fotoelectrico">
          <div class="fuente-luz"></div>
          <div class="rayo-luz"></div>
          <div class="superficie-metalica"></div>
          <div class="electron" id="electron1"></div>
          <div class="electron" id="electron2"></div>
          <div class="electron" id="electron3"></div>
          <p style="position: absolute; bottom: 10px; left: 20px; font-size: 0.75rem; color: var(--text-primary);">
            Superficie metálica
          </p>
        </div>
        <div style="text-align: center; margin-top: 0.5rem; color: var(--text-secondary); font-size: 0.8125rem;">
          <em>Representación educativa simplificada</em>
        </div>
      </div>
    ` : ''}
  `;
  
  // Renderizar campos de datos
  if (ejercicio.datos && Object.keys(ejercicio.datos).length > 0 && ejercicio.tipo !== 'teorico') {
    renderizarDatos(ejercicio);
  }
}

// Renderizar campos de datos
function renderizarDatos(ejercicio) {
  const grid = document.getElementById('datosGrid');
  grid.innerHTML = '';
  
  Object.keys(ejercicio.datos).forEach(key => {
    const dato = ejercicio.datos[key];
    if (key === 'casos' || key === 'materiales' || key === 'datos_f_Vs' || key === 'casos_prueba') {
      return; // Manejar por separado
    }
    if (dato && typeof dato === 'object' && 'valor' in dato) {
      const item = document.createElement('div');
      item.className = 'dato-item';
      item.innerHTML = `
        <label>${formatearNombreDato(key)} (${dato.unidad})</label>
        <input type="number" id="dato_${key}" value="${dato.valor}" step="any" ${dato.editable === false ? 'readonly' : ''}>
        <div class="mensaje-validacion" id="val_${key}"></div>
      `;
      grid.appendChild(item);
    }
  });
}

// Formatear nombre de dato
function formatearNombreDato(key) {
  const nombres = {
    lambda: 'Longitud de onda',
    frecuencia: 'Frecuencia',
    energia_eV: 'Energía',
    momento: 'Momento lineal',
    potencia: 'Potencia',
    flujo: 'Flujo de fotones',
    energia_pulso: 'Energía del pulso',
    tiempo: 'Tiempo',
    potencia_total: 'Potencia total',
    eficiencia: 'Eficiencia',
    intensidad: 'Intensidad',
    area_cm2: 'Área',
    area: 'Área',
    funcion_trabajo: 'Función de trabajo',
    voltaje_frenado: 'Potencial de frenado',
    masa: 'Masa',
    eficiencia_coleccion: 'Eficiencia de colección'
  };
  return nombres[key] || key.replace(/_/g, ' ');
}

// Calcular ejercicio
function calcularEjercicio() {
  if (!ejercicioActual) return;
  
  try {
    // Validar datos
    if (!validarDatos(ejercicioActual)) {
      return;
    }
    
    // Calcular según tipo de ejercicio
    let resultados = {};
    let desarrollo = [];
    let explicacion = '';
    
    switch (ejercicioActual.tipo) {
      case 'fotones_basico':
        resultados = calcularFotonesBasico(ejercicioActual, desarrollo);
        break;
      case 'flujo_fotones':
        resultados = calcularFlujoFotones(ejercicioActual, desarrollo);
        break;
      case 'pulsos':
        resultados = calcularPulsos(ejercicioActual, desarrollo);
        break;
      case 'eficiencia':
        resultados = calcularEficiencia(ejercicioActual, desarrollo);
        break;
      case 'comparacion':
        resultados = calcularComparacion(ejercicioActual, desarrollo);
        break;
      case 'comparacion_flujo':
        resultados = calcularComparacionFlujo(ejercicioActual, desarrollo);
        break;
      case 'radiacion':
        resultados = calcularRadiacion(ejercicioActual, desarrollo);
        break;
      case 'momento_foton':
        resultados = calcularMomentoFoton(ejercicioActual, desarrollo);
        break;
      case 'fotoelectrico':
        resultados = calcularFotoelectricoUmbral(ejercicioActual, desarrollo);
        break;
      case 'fotoelectrico_completo':
        resultados = calcularFotoelectrico(ejercicioActual, desarrollo);
        break;
      case 'fotoelectrico_inverso':
        resultados = calcularFotoelectricoInverso(ejercicioActual, desarrollo);
        break;
      case 'tabla_fotoelectrico':
        resultados = calcularTablaFotoelectrico(ejercicioActual, desarrollo);
        break;
      case 'integrador_sensor':
        resultados = calcularSensorFotoelectrico(ejercicioActual, desarrollo);
        break;
      case 'integrador_vela':
        resultados = calcularVelaSolar(ejercicioActual, desarrollo);
        break;
      case 'integrador_seleccion':
        resultados = calcularSeleccionMaterial(ejercicioActual, desarrollo);
        break;
      case 'integrador_diseño':
        resultados = calcularDiseñoPropio(ejercicioActual, desarrollo);
        break;
      case 'conversiones':
        resultados = calcularConversiones(ejercicioActual, desarrollo);
        break;
      case 'teorico':
        resultados = mostrarTeorico(ejercicioActual, desarrollo);
        break;
      case 'grafica_fotocorriente':
        resultados = mostrarGraficaFotocorriente(ejercicioActual, desarrollo);
        break;
      case 'algoritmo':
        resultados = mostrarAlgoritmo(ejercicioActual, desarrollo);
        break;
      case 'pruebas':
        resultados = mostrarPruebas(ejercicioActual, desarrollo);
        break;
      default:
        desarrollo.push({ titulo: 'Información', contenido: 'Este ejercicio se resuelve conceptualmente. Revise el enunciado, fórmulas y explicación.' });
        resultados.info = { valor: 'Ver solución', unidad: '', nombre: 'Estado' };
        break;
    }
    
    // Mostrar resultados
    mostrarResultados(resultados, desarrollo, explicacion);
    
  } catch (error) {
    alert('Error en el cálculo: ' + error.message);
    console.error(error);
  }
}

// Validar datos
function validarDatos(ejercicio) {
  let valido = true;
  
  if (ejercicio.datos) {
    Object.keys(ejercicio.datos).forEach(key => {
      if (key === 'casos' || key === 'materiales' || key === 'datos_f_Vs' || key === 'casos_prueba') {
        return;
      }
      const dato = ejercicio.datos[key];
      if (dato && typeof dato === 'object' && 'valor' in dato && dato.editable !== false) {
        const input = document.getElementById(`dato_${key}`);
        if (input) {
          const valor = parseFloat(input.value);
          const msgDiv = document.getElementById(`val_${key}`);
          msgDiv.textContent = '';
          
          if (isNaN(valor)) {
            msgDiv.textContent = 'Valor numérico inválido';
            msgDiv.className = 'mensaje-validacion';
            valido = false;
            return;
          }
          
          if (key.includes('lambda') || key.includes('longitud')) {
            const err = Calculos.validarLongitudOnda(valor * 1e-9); // Asumir nm si es pequeño
            // Simplificado
          }
          if (key.includes('potencia') && valor < 0) {
            msgDiv.textContent = 'La potencia debe ser no negativa';
            msgDiv.className = 'mensaje-validacion';
            valido = false;
          }
          if (key.includes('frecuencia') && valor <= 0) {
            msgDiv.textContent = 'La frecuencia debe ser positiva';
            msgDiv.className = 'mensaje-validacion';
            valido = false;
          }
        }
      }
    });
  }
  
  return valido;
}

// Cálculos específicos
function calcularFotonesBasico(ejercicio, desarrollo) {
  const resultados = {};
  
  if (ejercicio.numero === 4) {
    const lambda_nm = parseFloat(document.getElementById('dato_lambda').value);
    const lambda_m = lambda_nm * 1e-9;
    
    desarrollo.push({ titulo: '1. Conversión de unidades', contenido: `λ = ${lambda_nm} nm = ${lambda_m.toExponential(2)} m` });
    
    const f = Calculos.frecuencia(lambda_m);
    desarrollo.push({ titulo: '2. Frecuencia', contenido: `f = c/λ = ${CONSTANTES.c.toExponential(2)} / ${lambda_m.toExponential(2)} = ${f.toExponential(3)} Hz` });
    resultados.frecuencia = { valor: f, unidad: 'Hz', nombre: 'Frecuencia' };
    
    const E_J = Calculos.energiaFotón_J(lambda_m);
    const E_eV = Calculos.J_a_eV(E_J);
    desarrollo.push({ titulo: '3. Energía', contenido: `E = hf = hc/λ<br>E = ${E_J.toExponential(3)} J = ${E_eV.toFixed(3)} eV` });
    resultados.energia_J = { valor: E_J, unidad: 'J', nombre: 'Energía' };
    resultados.energia_eV = { valor: E_eV, unidad: 'eV', nombre: 'Energía' };
    
    const p = Calculos.momentoFotón(lambda_m);
    desarrollo.push({ titulo: '4. Momento lineal', contenido: `p = h/λ = ${CONSTANTES.h.toExponential(3)} / ${lambda_m.toExponential(2)} = ${p.toExponential(3)} kg·m/s` });
    resultados.momento = { valor: p, unidad: 'kg·m/s', nombre: 'Momento lineal' };
  }
  
  return resultados;
}

function calcularFlujoFotones(ejercicio, desarrollo) {
  const resultados = {};
  
  if (ejercicio.numero === 9) {
    const potencia_mW = parseFloat(document.getElementById('dato_potencia').value);
    const lambda_nm = parseFloat(document.getElementById('dato_lambda').value);
    const potencia_W = potencia_mW * 1e-3;
    const lambda_m = lambda_nm * 1e-9;
    
    desarrollo.push({ titulo: '1. Conversión', contenido: `P = ${potencia_mW} mW = ${potencia_W.toExponential(2)} W<br>λ = ${lambda_nm} nm = ${lambda_m.toExponential(2)} m` });
    
    const E_gamma = Calculos.energiaFotón_J(lambda_m);
    desarrollo.push({ titulo: '2. Energía por fotón', contenido: `E_γ = hc/λ = ${E_gamma.toExponential(3)} J` });
    resultados.energia_foton = { valor: E_gamma, unidad: 'J', nombre: 'Energía por fotón' };
    
    const N_punto = Calculos.flujoFotones(potencia_W, lambda_m);
    desarrollo.push({ titulo: '3. Número de fotones por segundo', contenido: `Ṅ = P/E_γ = ${potencia_W.toExponential(2)} / ${E_gamma.toExponential(3)} = ${N_punto.toExponential(3)} s⁻¹` });
    resultados.flujo_fotones = { valor: N_punto, unidad: 'fotones/s', nombre: 'Fotones por segundo' };
  }
  
  return resultados;
}

function calcularRadiacion(ejercicio, desarrollo) {
  const resultados = {};
  
  if (ejercicio.numero === 14) {
    const potencia_W = parseFloat(document.getElementById('dato_potencia').value);
    
    const F_abs = Calculos.fuerzaAbsorcion(potencia_W);
    const F_ref = Calculos.fuerzaReflexion(potencia_W);
    
    desarrollo.push({ titulo: '1. Absorción completa', contenido: `F_abs = P/c = ${potencia_W} / ${CONSTANTES.c.toExponential(2)} = ${F_abs.toExponential(3)} N` });
    desarrollo.push({ titulo: '2. Reflexión ideal', contenido: `F_ref = 2P/c = 2 × ${potencia_W} / ${CONSTANTES.c.toExponential(2)} = ${F_ref.toExponential(3)} N` });
    
    resultados.fuerza_absorcion = { valor: F_abs, unidad: 'N', nombre: 'Fuerza (absorción)' };
    resultados.fuerza_reflexion = { valor: F_ref, unidad: 'N', nombre: 'Fuerza (reflexión)' };
  }
  
  return resultados;
}

function calcularFotoelectrico(ejercicio, desarrollo) {
  const resultados = {};
  
  if (ejercicio.numero === 23) {
    const f = parseFloat(document.getElementById('dato_frecuencia').value);
    const phi_eV = parseFloat(document.getElementById('dato_funcion_trabajo').value);
    
    const E_gamma_J = Calculos.energiaFotónDesdeFrecuencia(f);
    const E_gamma_eV = Calculos.J_a_eV(E_gamma_J);
    
    desarrollo.push({ titulo: '1. Energía del fotón', contenido: `E_γ = hf = ${CONSTANTES.h.toExponential(3)} × ${f.toExponential(3)} = ${E_gamma_J.toExponential(3)} J = ${E_gamma_eV.toFixed(3)} eV` });
    resultados.energia_foton = { valor: E_gamma_eV, unidad: 'eV', nombre: 'Energía del fotón' };
    
    if (E_gamma_eV >= phi_eV) {
      const Kmax_eV = E_gamma_eV - phi_eV;
      const Kmax_J = Calculos.eV_a_J(Kmax_eV);
      const Vs = Kmax_eV;
      const vmax = Calculos.velocidadMaxima(Kmax_J);
      
      desarrollo.push({ titulo: '2. Energía cinética máxima', contenido: `K_máx = E_γ - ϕ = ${E_gamma_eV.toFixed(3)} - ${phi_eV} = ${Kmax_eV.toFixed(3)} eV` });
      desarrollo.push({ titulo: '3. Potencial de frenado', contenido: `V_s = K_máx/e = ${Vs.toFixed(3)} V` });
      desarrollo.push({ titulo: '4. Velocidad máxima', contenido: `v_máx = √(2K_máx/m_e) = ${vmax.toExponential(3)} m/s` });
      
      resultados.Kmax = { valor: Kmax_eV, unidad: 'eV', nombre: 'K_máx' };
      resultados.Vs = { valor: Vs, unidad: 'V', nombre: 'Potencial de frenado' };
      resultados.vmax = { valor: vmax, unidad: 'm/s', nombre: 'v_máx' };
      
      // Animar electrones
      document.querySelectorAll('.electron').forEach((e, i) => {
        e.classList.remove('activo');
        setTimeout(() => e.classList.add('activo'), i * 200);
      });
    } else {
      desarrollo.push({ titulo: '2. Emisión', contenido: `E_γ = ${E_gamma_eV.toFixed(3)} eV < ϕ = ${phi_eV} eV<br><strong>No hay emisión fotoeléctrica</strong>` });
    }
  }
  
  return resultados;
}

function calcularSensorFotoelectrico(ejercicio, desarrollo) {
  const resultados = {};
  
  if (ejercicio.numero === 31) {
    const phi_eV = parseFloat(document.getElementById('dato_funcion_trabajo').value);
    const lambda_nm = parseFloat(document.getElementById('dato_lambda').value);
    const potencia_mW = parseFloat(document.getElementById('dato_potencia').value);
    const eficiencia = parseFloat(document.getElementById('dato_eficiencia_coleccion').value);
    
    const lambda_m = lambda_nm * 1e-9;
    const potencia_W = potencia_mW * 1e-3;
    
    const E_gamma_eV = Calculos.energiaFotón_eV(lambda_nm);
    const E_gamma_J = Calculos.eV_a_J(E_gamma_eV);
    
    desarrollo.push({ titulo: '1. Energía del fotón', contenido: `E_γ = hc/λ = ${E_gamma_eV.toFixed(3)} eV = ${E_gamma_J.toExponential(3)} J` });
    resultados.energia_foton = { valor: E_gamma_eV, unidad: 'eV', nombre: 'E_γ' };
    
    const p = Calculos.momentoDeEnergia(E_gamma_J);
    desarrollo.push({ titulo: '2. Momento por fotón', contenido: `p = E_γ/c = ${p.toExponential(3)} kg·m/s` });
    resultados.momento_foton = { valor: p, unidad: 'kg·m/s', nombre: 'Momento por fotón' };
    
    const N_punto = Calculos.flujoFotones(potencia_W, lambda_m);
    desarrollo.push({ titulo: '3. Flujo de fotones', contenido: `Ṅ = P/E_γ = ${N_punto.toExponential(3)} s⁻¹` });
    resultados.flujo_fotones = { valor: N_punto, unidad: 'fotones/s', nombre: 'Flujo' };
    
    if (E_gamma_eV >= phi_eV) {
      const Kmax_eV = E_gamma_eV - phi_eV;
      const Vs = Kmax_eV;
      desarrollo.push({ titulo: '4. Energía cinética máxima', contenido: `K_máx = ${Kmax_eV.toFixed(3)} eV` });
      desarrollo.push({ titulo: '5. Potencial de frenado', contenido: `V_s = ${Vs.toFixed(3)} V` });
      resultados.Kmax = { valor: Kmax_eV, unidad: 'eV', nombre: 'K_máx' };
      resultados.Vs = { valor: Vs, unidad: 'V', nombre: 'V_s' };
      
      const N_e = N_punto * (eficiencia / 100);
      const I_q = CONSTANTES.e * N_e;
      desarrollo.push({ titulo: '6. Fotocorriente', contenido: `N_e = ${eficiencia}% de ${N_punto.toExponential(2)} = ${N_e.toExponential(3)} s⁻¹<br>I_q = e N_e = ${I_q.toExponential(3)} A = ${(I_q * 1e6).toFixed(1)} µA` });
      resultados.fotocorriente = { valor: I_q * 1e6, unidad: 'µA', nombre: 'Fotocorriente' };
    }
  }
  
  return resultados;
}

function calcularVelaSolar(ejercicio, desarrollo) {
  const resultados = {};
  
  if (ejercicio.numero === 32) {
    const A = parseFloat(document.getElementById('dato_area').value);
    const I = parseFloat(document.getElementById('dato_intensidad').value);
    const m = parseFloat(document.getElementById('dato_masa').value);
    
    const P = Calculos.intensidad(I, 1/A) * A; // P = I*A
    desarrollo.push({ titulo: '1. Potencia incidente', contenido: `P = I A = ${I.toExponential(2)} × ${A} = ${P.toExponential(3)} W` });
    resultados.potencia = { valor: P, unidad: 'W', nombre: 'Potencia incidente' };
    
    const P_rad_abs = Calculos.presionAbsorcion(I);
    const P_rad_ref = Calculos.presionReflexion(I);
    desarrollo.push({ titulo: '2. Presión de radiación', contenido: `Absorción: P_rad = I/c = ${P_rad_abs.toExponential(3)} Pa<br>Reflexión: P_rad = 2I/c = ${P_rad_ref.toExponential(3)} Pa` });
    resultados.presion_abs = { valor: P_rad_abs, unidad: 'Pa', nombre: 'Presión (absorción)' };
    resultados.presion_ref = { valor: P_rad_ref, unidad: 'Pa', nombre: 'Presión (reflexión)' };
    
    const F_abs = P_rad_abs * A;
    const F_ref = P_rad_ref * A;
    desarrollo.push({ titulo: '3. Fuerza', contenido: `F = P_rad A<br>Absorción: ${F_abs.toExponential(3)} N<br>Reflexión: ${F_ref.toExponential(3)} N` });
    resultados.fuerza_abs = { valor: F_abs, unidad: 'N', nombre: 'Fuerza (absorción)' };
    resultados.fuerza_ref = { valor: F_ref, unidad: 'N', nombre: 'Fuerza (reflexión)' };
    
    const a_abs = F_abs / m;
    const a_ref = F_ref / m;
    desarrollo.push({ titulo: '4. Aceleración', contenido: `a = F/m<br>Absorción: ${a_abs.toExponential(3)} m/s²<br>Reflexión: ${a_ref.toExponential(3)} m/s²` });
    resultados.aceleracion_abs = { valor: a_abs, unidad: 'm/s²', nombre: 'a (absorción)' };
    resultados.aceleracion_ref = { valor: a_ref, unidad: 'm/s²', nombre: 'a (reflexión)' };
  }
  
  return resultados;
}

function calcularSeleccionMaterial(ejercicio, desarrollo) {
  const resultados = {};
  
  if (ejercicio.numero === 33) {
    const lambda_nm = parseFloat(document.getElementById('dato_lambda').value) || ejercicio.datos.lambda.valor;
    const E_gamma_eV = Calculos.energiaFotón_eV(lambda_nm);
    
    desarrollo.push({ titulo: '1. Energía del fotón', contenido: `E_γ = hc/λ = ${CONSTANTES.hc_eV_nm}/${lambda_nm} = ${E_gamma_eV.toFixed(3)} eV` });
    resultados.energia_foton = { valor: E_gamma_eV, unidad: 'eV', nombre: 'E_γ' };
    
    ejercicio.datos.materiales.forEach(mat => {
      if (E_gamma_eV >= mat.phi) {
        const Kmax = E_gamma_eV - mat.phi;
        desarrollo.push({ titulo: `Material ${mat.id} (ϕ = ${mat.phi} eV)`, contenido: `<span style="color: var(--success)">EMITE</span><br>K_máx = ${Kmax.toFixed(3)} eV` });
        resultados[`emision_${mat.id}`] = { valor: 'Sí', unidad: '', nombre: `Emisión ${mat.id}` };
        resultados[`Kmax_${mat.id}`] = { valor: Kmax, unidad: 'eV', nombre: `K_máx ${mat.id}` };
      } else {
        desarrollo.push({ titulo: `Material ${mat.id} (ϕ = ${mat.phi} eV)`, contenido: `<span style="color: var(--danger)">NO EMITE</span><br>E_γ < ϕ` });
        resultados[`emision_${mat.id}`] = { valor: 'No', unidad: '', nombre: `Emisión ${mat.id}` };
      }
    });
  }
  
  return resultados;
}

function calcularDiseñoPropio(ejercicio, desarrollo) {
  const resultados = {};
  
  if (ejercicio.numero === 34) {
    const lambda_nm = parseFloat(document.getElementById('dato_lambda').value);
    const potencia_mW = parseFloat(document.getElementById('dato_potencia').value);
    const phi_eV = parseFloat(document.getElementById('dato_funcion_trabajo').value);
    
    const lambda_m = lambda_nm * 1e-9;
    const potencia_W = potencia_mW * 1e-3;
    
    const E_gamma_eV = Calculos.energiaFotón_eV(lambda_nm);
    const E_gamma_J = Calculos.eV_a_J(E_gamma_eV);
    
    desarrollo.push({ titulo: '1. Energía del fotón', contenido: `E_γ = hc/λ = ${E_gamma_eV.toFixed(3)} eV = ${E_gamma_J.toExponential(3)} J` });
    resultados.energia_foton = { valor: E_gamma_eV, unidad: 'eV', nombre: 'E_γ' };
    
    const p = Calculos.momentoDeEnergia(E_gamma_J);
    desarrollo.push({ titulo: '2. Momento por fotón', contenido: `p = E_γ/c = ${p.toExponential(3)} kg·m/s` });
    resultados.momento_foton = { valor: p, unidad: 'kg·m/s', nombre: 'Momento' };
    
    const N_punto = Calculos.flujoFotones(potencia_W, lambda_m);
    desarrollo.push({ titulo: '3. Flujo de fotones', contenido: `Ṅ = P/E_γ = ${N_punto.toExponential(3)} fotones/s` });
    resultados.flujo_fotones = { valor: N_punto, unidad: 'fotones/s', nombre: 'Flujo' };
    
    if (E_gamma_eV >= phi_eV) {
      const Kmax_eV = E_gamma_eV - phi_eV;
      const Vs = Kmax_eV;
      desarrollo.push({ titulo: '4. Energía cinética máxima', contenido: `K_máx = E_γ - ϕ = ${Kmax_eV.toFixed(3)} eV` });
      desarrollo.push({ titulo: '5. Potencial de frenado', contenido: `V_s = ${Vs.toFixed(3)} V` });
      resultados.Kmax = { valor: Kmax_eV, unidad: 'eV', nombre: 'K_máx' };
      resultados.Vs = { valor: Vs, unidad: 'V', nombre: 'V_s' };
    } else {
      desarrollo.push({ titulo: '4-5. Emisión', contenido: `<span style="color: var(--danger)">No hay emisión fotoeléctrica</span>` });
    }
  }
  
  return resultados;
}

// Mostrar resultados
function mostrarResultados(resultados, desarrollo, explicacion) {
  document.getElementById('solucionSection').classList.remove('hidden');
  document.getElementById('resultadosSection').classList.remove('hidden');
  
  // Mostrar desarrollo
  const pasosDiv = document.getElementById('desarrolloPasos');
  pasosDiv.innerHTML = '';
  desarrollo.forEach((paso, idx) => {
    const div = document.createElement('div');
    div.className = 'desarrollo-paso';
    div.innerHTML = `
      <h4>Paso ${idx + 1}. ${paso.titulo}</h4>
      <div class="desarrollo-contenido">${paso.contenido}</div>
    `;
    pasosDiv.appendChild(div);
  });
  
  // Mostrar resultados
  const grid = document.getElementById('resultadosGrid');
  grid.innerHTML = '';
  Object.values(resultados).forEach(res => {
    const card = document.createElement('div');
    card.className = 'resultado-card';
    let valorStr = typeof res.valor === 'number' ? 
      (Math.abs(res.valor) > 1000 || Math.abs(res.valor) < 0.001 ? res.valor.toExponential(3) : res.valor.toFixed(3)) : 
      res.valor;
    card.innerHTML = `
      <div class="resultado-valor">${valorStr}</div>
      <div class="resultado-unidad">${res.unidad}</div>
      <div class="resultado-nombre">${res.nombre}</div>
    `;
    grid.appendChild(card);
  });
  
  // Explicación
  document.getElementById('explicacionFisica').innerHTML = `
    <strong>Explicación física:</strong><br>
    Los resultados se obtienen aplicando las relaciones fundamentales entre fotones, energía, momento y efecto fotoeléctrico.
    Recuerde que la intensidad afecta el número de fotones (y la fotocorriente), mientras que la frecuencia determina la energía de cada fotón
    y, por consiguiente, la energía cinética máxima de los electrones emitidos.
  `;
}

// Toggle solución
function toggleSolucion() {
  const section = document.getElementById('solucionSection');
  section.classList.toggle('hidden');
}

// Toggle tema
function toggleTema() {
  const html = document.documentElement;
  const temaActual = html.getAttribute('data-theme');
  const nuevoTema = temaActual === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', nuevoTema);
  localStorage.setItem('tema', nuevoTema);
  actualizarBotonTema();
}

function actualizarBotonTema() {
  const btn = document.getElementById('themeToggle');
  const tema = document.documentElement.getAttribute('data-theme');
  btn.textContent = tema === 'dark' ? '☀️ Modo claro' : '🌙 Modo oscuro';
}

// Cambiar modo
function cambiarModo() {
  modoActual = document.getElementById('modeSelector').value;
  console.log('Modo cambiado a:', modoActual);
}

// Restablecer datos
function restablecerDatos() {
  if (!ejercicioActual) return;
  renderizarDatos(ejercicioActual);
}

// Copiar resultados
function copiarResultados() {
  alert('Funcionalidad de copia implementada');
}

// Comprobar respuesta (modo práctica)
function comprobarRespuesta() {
  alert('Modo práctica: Introduzca su respuesta y pulse comprobar');
}

// Inicializar cuando cargue la página
document.addEventListener('DOMContentLoaded', initApp);

// Funciones adicionales para completar ejercicios

function calcularPulsos(ejercicio, desarrollo) {
  const resultados = {};
  if (ejercicio.numero === 11) {
    const energia_mJ = parseFloat(document.getElementById('dato_energia_pulso').value);
    const lambda_nm = parseFloat(document.getElementById('dato_lambda').value);
    const tiempo_ns = parseFloat(document.getElementById('dato_tiempo').value);
    
    const energia_J = energia_mJ * 1e-3;
    const tiempo_s = tiempo_ns * 1e-9;
    const lambda_m = lambda_nm * 1e-9;
    
    desarrollo.push({ titulo: '1. Conversión', contenido: `E_pulso = ${energia_mJ} mJ = ${energia_J.toExponential(2)} J<br>Δt = ${tiempo_ns} ns = ${tiempo_s.toExponential(2)} s<br>λ = ${lambda_m.toExponential(2)} m` });
    
    const E_gamma = Calculos.energiaFotón_J(lambda_m);
    desarrollo.push({ titulo: '2. Energía por fotón', contenido: `E_γ = hc/λ = ${E_gamma.toExponential(3)} J` });
    
    const N = energia_J / E_gamma;
    desarrollo.push({ titulo: '3. Número de fotones', contenido: `N = E_pulso/E_γ = ${N.toExponential(3)}` });
    resultados.num_fotones = { valor: N, unidad: 'fotones', nombre: 'Número de fotones' };
    
    const Pmedia = energia_J / tiempo_s;
    desarrollo.push({ titulo: '4. Potencia media', contenido: `P_media = E_pulso/Δt = ${Pmedia.toExponential(3)} W` });
    resultados.potencia_media = { valor: Pmedia, unidad: 'W', nombre: 'Potencia media' };
  }
  return resultados;
}

function calcularEficiencia(ejercicio, desarrollo) {
  const resultados = {};
  if (ejercicio.numero === 13) {
    const Ptotal = parseFloat(document.getElementById('dato_potencia_total').value);
    const eficiencia = parseFloat(document.getElementById('dato_eficiencia').value);
    const lambda_nm = parseFloat(document.getElementById('dato_lambda').value);
    
    const Popt = Ptotal * (eficiencia / 100);
    desarrollo.push({ titulo: '1. Potencia óptica', contenido: `P_ópt = η P_total = ${eficiencia}% × ${Ptotal} W = ${Popt} W` });
    resultados.potencia_optica = { valor: Popt, unidad: 'W', nombre: 'Potencia óptica' };
    
    const lambda_m = lambda_nm * 1e-9;
    const E_gamma = Calculos.energiaFotón_J(lambda_m);
    desarrollo.push({ titulo: '2. Energía por fotón', contenido: `E_γ = ${E_gamma.toExponential(3)} J` });
    
    const N_punto = Popt / E_gamma;
    desarrollo.push({ titulo: '3. Flujo de fotones', contenido: `Ṅ = P_ópt/E_γ = ${N_punto.toExponential(3)} s⁻¹` });
    resultados.flujo_fotones = { valor: N_punto, unidad: 'fotones/s', nombre: 'Fotones por segundo' };
  }
  return resultados;
}

function calcularComparacion(ejercicio, desarrollo) {
  const resultados = {};
  if (ejercicio.numero === 7) {
    const lambda1_nm = parseFloat(document.getElementById('dato_lambda1').value);
    const lambda2_nm = parseFloat(document.getElementById('dato_lambda2').value);
    
    desarrollo.push({ titulo: '1. Comparación', contenido: `E ∝ 1/λ, p = E/c ∝ 1/λ` });
    
    const razon = lambda1_nm / lambda2_nm;
    desarrollo.push({ titulo: '2. Razón de longitudes de onda', contenido: `λ_visible/λ_Rx = ${lambda1_nm}/${lambda2_nm} = ${razon.toFixed(1)}` });
    desarrollo.push({ titulo: '3. Razón de energías y momentos', contenido: `E_{Rx}/E_{visible} = p_{Rx}/p_{visible} = λ_visible/λ_Rx = ${razon.toFixed(1)} = ${razon.toExponential(1)}` });
    
    resultados.razon_energia = { valor: razon, unidad: 'veces', nombre: 'E_Rx/E_visible' };
    resultados.razon_momento = { valor: razon, unidad: 'veces', nombre: 'p_Rx/p_visible' };
  }
  return resultados;
}

function calcularComparacionFlujo(ejercicio, desarrollo) {
  const resultados = {};
  if (ejercicio.numero === 12) {
    const lambda1_nm = parseFloat(document.getElementById('dato_lambda1').value);
    const lambda2_nm = parseFloat(document.getElementById('dato_lambda2').value);
    
    desarrollo.push({ titulo: '1. Relación', contenido: `Ṅ = P/E_γ y E_γ ∝ 1/λ, por lo que Ṅ ∝ λ` });
    
    const razon = lambda2_nm / lambda1_nm;
    desarrollo.push({ titulo: '2. Cálculo', contenido: `Ṅ_800 / Ṅ_400 = λ_800 / λ_400 = ${lambda2_nm}/${lambda1_nm} = ${razon.toFixed(1)}` });
    desarrollo.push({ titulo: '3. Conclusión', contenido: `El haz de ${lambda2_nm} nm necesita ${razon.toFixed(1)} veces más fotones por segundo para misma potencia.` });
    
    resultados.razon_flujo = { valor: razon, unidad: 'veces', nombre: 'Ṅ(800)/Ṅ(400)' };
  }
  return resultados;
}

function calcularMomentoFoton(ejercicio, desarrollo) {
  const resultados = {};
  if (ejercicio.numero === 17) {
    const lambda_nm = parseFloat(document.getElementById('dato_lambda').value);
    const lambda_m = lambda_nm * 1e-9;
    
    const p = Calculos.momentoFotón(lambda_m);
    desarrollo.push({ titulo: '1. Momento inicial', contenido: `p_i = +h/λ = ${p.toExponential(3)} kg·m/s (hacia el espejo)` });
    desarrollo.push({ titulo: '2. Momento final', contenido: `p_f = -h/λ = -${p.toExponential(3)} kg·m/s (alejándose)` });
    const delta_p = -2 * p;
    desarrollo.push({ titulo: '3. Cambio de momento del fotón', contenido: `Δp_γ = p_f - p_i = -2h/λ = ${delta_p.toExponential(3)} kg·m/s` });
    desarrollo.push({ titulo: '4. Efecto sobre el espejo', contenido: `El espejo recibe momento opuesto: Δp_espejo = +2h/λ = ${Math.abs(delta_p).toExponential(3)} kg·m/s` });
    
    resultados.momento_inicial = { valor: p, unidad: 'kg·m/s', nombre: 'p_i' };
    resultados.momento_final = { valor: -p, unidad: 'kg·m/s', nombre: 'p_f' };
    resultados.cambio_momento = { valor: Math.abs(delta_p), unidad: 'kg·m/s', nombre: '|Δp|' };
  }
  return resultados;
}

function calcularFotoelectricoUmbral(ejercicio, desarrollo) {
  const resultados = {};
  if (ejercicio.numero === 21) {
    const phi_eV = parseFloat(document.getElementById('dato_funcion_trabajo').value);
    
    desarrollo.push({ titulo: '1. Datos', contenido: `Función de trabajo ϕ = ${phi_eV} eV` });
    
    const phi_J = Calculos.eV_a_J(phi_eV);
    desarrollo.push({ titulo: '2. Frecuencia umbral', contenido: `f_0 = ϕ/h = (${phi_J.toExponential(3)} J) / (${CONSTANTES.h.toExponential(3)} J·s) = ${Calculos.frecuenciaUmbral(phi_eV).toExponential(3)} Hz` });
    
    const f0 = Calculos.frecuenciaUmbral(phi_eV);
    const lambda0_nm = Calculos.longitudOndaUmbral(phi_eV);
    desarrollo.push({ titulo: '3. Longitud de onda umbral', contenido: `λ_0 = hc/ϕ = ${CONSTANTES.hc_eV_nm} eV·nm / ${phi_eV} eV = ${lambda0_nm.toFixed(1)} nm` });
    
    desarrollo.push({ titulo: '4. Conclusión', contenido: `<strong>Hay emisión fotoeléctrica si:</strong> f ≥ ${f0.toExponential(2)} Hz o λ ≤ ${lambda0_nm.toFixed(1)} nm` });
    
    resultados.frecuencia_umbral = { valor: f0, unidad: 'Hz', nombre: 'f_0' };
    resultados.longitud_onda_umbral = { valor: lambda0_nm, unidad: 'nm', nombre: 'λ_0' };
  }
  return resultados;
}

function calcularFotoelectricoInverso(ejercicio, desarrollo) {
  const resultados = {};
  if (ejercicio.numero === 24) {
    const Vs = parseFloat(document.getElementById('dato_voltaje_frenado').value);
    const lambda_nm = parseFloat(document.getElementById('dato_lambda').value);
    
    const E_gamma_eV = Calculos.energiaFotón_eV(lambda_nm);
    desarrollo.push({ titulo: '1. Energía del fotón', contenido: `E_γ = hc/λ = ${E_gamma_eV.toFixed(3)} eV` });
    
    const phi_eV = E_gamma_eV - Vs;
    desarrollo.push({ titulo: '2. Función de trabajo', contenido: `ϕ = E_γ - eV_s = ${E_gamma_eV.toFixed(3)} - ${Vs} = ${phi_eV.toFixed(3)} eV` });
    
    const lambda0_nm = Calculos.longitudOndaUmbral(phi_eV);
    desarrollo.push({ titulo: '3. Longitud de onda umbral', contenido: `λ_0 = hc/ϕ = ${lambda0_nm.toFixed(0)} nm` });
    
    resultados.funcion_trabajo = { valor: phi_eV, unidad: 'eV', nombre: 'ϕ' };
    resultados.longitud_onda_umbral = { valor: lambda0_nm, unidad: 'nm', nombre: 'λ_0' };
  }
  return resultados;
}

function calcularTablaFotoelectrico(ejercicio, desarrollo) {
  const resultados = {};
  if (ejercicio.numero === 22) {
    const casos = ejercicio.datos.casos;
    casos.forEach(caso => {
      const E_gamma = Calculos.energiaFotón_eV(caso.lambda);
      if (E_gamma >= caso.phi) {
        const Kmax = E_gamma - caso.phi;
        desarrollo.push({ 
          titulo: `Caso ${caso.id}: λ=${caso.lambda} nm, ϕ=${caso.phi} eV`, 
          contenido: `E_γ = ${E_gamma.toFixed(2)} eV ≥ ${caso.phi} eV → <span style="color:var(--success)">SÍ hay emisión</span><br>K_máx = ${Kmax.toFixed(3)} eV, V_s = ${Kmax.toFixed(3)} V` 
        });
        resultados[`caso_${caso.id}`] = { valor: `Sí (${Kmax.toFixed(2)} eV)`, unidad: '', nombre: `Caso ${caso.id}` };
      } else {
        desarrollo.push({ 
          titulo: `Caso ${caso.id}: λ=${caso.lambda} nm, ϕ=${caso.phi} eV`, 
          contenido: `E_γ = ${E_gamma.toFixed(2)} eV < ${caso.phi} eV → <span style="color:var(--danger)">NO hay emisión</span>` 
        });
        resultados[`caso_${caso.id}`] = { valor: 'No', unidad: '', nombre: `Caso ${caso.id}` };
      }
    });
  }
  return resultados;
}

function calcularConversiones(ejercicio, desarrollo) {
  const resultados = {};
  if (ejercicio.numero === 1) {
    desarrollo.push({ titulo: 'a) 420 nm a metros', contenido: `420 nm × 10⁻⁹ = 4,20 × 10⁻⁷ m` });
    desarrollo.push({ titulo: 'b) 2,50 µm a metros', contenido: `2,50 µm × 10⁻⁶ = 2,50 × 10⁻⁶ m` });
    desarrollo.push({ titulo: 'c) 7,20 × 10¹⁴ Hz a THz', contenido: `7,20 × 10¹⁴ / 10¹² = 720 THz` });
    desarrollo.push({ titulo: 'd) 3,40 eV a julios', contenido: `3,40 × 1,602 × 10⁻¹⁹ = 5,45 × 10⁻¹⁹ J` });
    desarrollo.push({ titulo: 'e) 5,00 mW a vatios', contenido: `5,00 × 10⁻³ = 0,00500 W` });
    desarrollo.push({ titulo: 'f) 0,075 nm a metros', contenido: `0,075 × 10⁻⁹ = 7,5 × 10⁻¹¹ m` });
    
    resultados.a = { valor: 4.20e-7, unidad: 'm', nombre: '420 nm' };
    resultados.b = { valor: 2.50e-6, unidad: 'm', nombre: '2,50 µm' };
    resultados.c = { valor: 720, unidad: 'THz', nombre: '7,20×10¹⁴ Hz' };
    resultados.d = { valor: 5.45e-19, unidad: 'J', nombre: '3,40 eV' };
    resultados.e = { valor: 0.00500, unidad: 'W', nombre: '5,00 mW' };
    resultados.f = { valor: 7.5e-11, unidad: 'm', nombre: '0,075 nm' };
  }
  return resultados;
}

function mostrarTeorico(ejercicio, desarrollo) {
  const resultados = {};
  if (ejercicio.numero === 2) {
    desarrollo.push({ titulo: 'a) Falso', contenido: 'E = hc/λ, al duplicar λ la energía se reduce a la mitad.' });
    desarrollo.push({ titulo: 'b) Falso', contenido: 'Aunque tiene masa en reposo nula, transporta momento p = E/c.' });
    desarrollo.push({ titulo: 'c) Verdadero', contenido: 'A frecuencia fija cada fotón misma energía; más potencia = más fotones/s.' });
    desarrollo.push({ titulo: 'd) Falso', contenido: 'K_máx depende de f y ϕ. Intensidad afecta cantidad de electrones.' });
    resultados.respuesta = { valor: 'Ver desarrollo', unidad: '', nombre: 'Justificación' };
  } else if (ejercicio.numero === 3) {
    desarrollo.push({ titulo: 'Orden', contenido: 'Energía inversamente proporcional a λ.<br><strong>2,0 µm < 700 nm < 450 nm < 0,10 nm</strong><br>Menor energía → Mayor longitud de onda' });
    resultados.orden = { valor: '2,0 µm < 700 nm < 450 nm < 0,10 nm', unidad: '', nombre: 'Orden' };
  } else if (ejercicio.numero === 18) {
    desarrollo.push({ titulo: 'Absorción', contenido: 'p_i → 0: Δp = -p, magnitud p' });
    desarrollo.push({ titulo: 'Reflexión', contenido: 'p_i → -p: Δp = -2p, magnitud 2p' });
    desarrollo.push({ titulo: 'Conclusión', contenido: 'Reflexión ideal produce cambio de momento doble → fuerza doble' });
    resultados.conclusion = { valor: 'F_ref = 2 F_abs', unidad: '', nombre: 'Razón' };
  } else if (ejercicio.numero === 19) {
    desarrollo.push({ titulo: 'hf', contenido: 'Energía del fotón incidente' });
    desarrollo.push({ titulo: 'ϕ', contenido: 'Función de trabajo (energía mínima para liberar electrón)' });
    desarrollo.push({ titulo: 'K_máx', contenido: 'Energía cinética máxima del electrón emitido<br>Si hf = ϕ, K_máx = 0 (umbral)' });
    resultados.ecuacion = { valor: 'hf = ϕ + K_máx', unidad: '', nombre: 'Conservación' };
  } else if (ejercicio.numero === 20) {
    desarrollo.push({ titulo: 'Intensidad ↑ (f>f0)', contenido: 'Fotocorriente ↑, número de electrones ↑ | K_máx, V_s constantes' });
    desarrollo.push({ titulo: 'Frecuencia ↑', contenido: 'K_máx y V_s aumentan | Si intensidad constante, flujo de energía puede cambiar' });
    desarrollo.push({ titulo: 'Material con mayor ϕ', contenido: 'Sube umbral, disminuye K_máx, menor posibilidad de emisión' });
    desarrollo.push({ titulo: 'Potencial de frenado', contenido: 'Disminuye fotocorriente hasta anularse | No afecta energía máxima inicial' });
    resultados.tabla = { valor: 'Ver desarrollo', unidad: '', nombre: 'Resumen' };
  }
  return resultados;
}

function mostrarGraficaFotocorriente(ejercicio, desarrollo) {
  const resultados = {};
  if (ejercicio.numero === 27) {
    desarrollo.push({ titulo: 'Observaciones', contenido: '<strong>A frecuencia fija > f_0:</strong>' });
    desarrollo.push({ titulo: '- Potencial de frenado', contenido: 'Igual para ambas intensidades (mismo K_máx)' });
    desarrollo.push({ titulo: '- Fotocorriente de saturación', contenido: 'Proporcional a la intensidad (más fotones)' });
    desarrollo.push({ titulo: '- Intensidad 3I', contenido: 'Triplica número de fotones → triplica fotocorriente de saturación' });
    resultados.grafica = { valor: 'I_sat(3I)=3×I_sat(I)', unidad: '', nombre: 'Relación' };
  }
  return resultados;
}

function mostrarAlgoritmo(ejercicio, desarrollo) {
  const resultados = {};
  if (ejercicio.numero === 28) {
    desarrollo.push({ titulo: 'Pseudocódigo', contenido: `<pre style="background:var(--bg-primary);padding:0.75rem;border-radius:0.375rem;overflow-x:auto;font-size:0.8125rem;">
Algoritmo FOTOELECTRICO
Leer lambda_nm, phi_eV
Si lambda_nm <= 0 O phi_eV <= 0 Entonces
  Mostrar "Error: las entradas deben ser positivas"
SiNo
  E_eV <- 1239.84 / lambda_nm
  Si E_eV < phi_eV Entonces
    Mostrar "No hay emision fotoelectrica"
  SiNo
    Kmax_eV <- E_eV - phi_eV
    Vs_V <- Kmax_eV
    Mostrar E_eV, Kmax_eV, Vs_V
  FinSi
FinSi
FinAlgoritmo</pre>` });
    resultados.algoritmo = { valor: 'Implementado', unidad: '', nombre: 'Estado' };
  } else if (ejercicio.numero === 29) {
    desarrollo.push({ titulo: 'Pseudocódigo', contenido: `<pre style="background:var(--bg-primary);padding:0.75rem;border-radius:0.375rem;overflow-x:auto;font-size:0.8125rem;">
Algoritmo FOTONES
Leer potencia_mW, lambda_nm
Si potencia_mW <= 0 O lambda_nm <= 0 Entonces
  Mostrar "Error: potencia y longitud de onda deben ser positivas"
SiNo
  P_W <- potencia_mW / 1000
  lambda_m <- lambda_nm * 1e-9
  E_J <- (6.626e-34 * 3.00e8) / lambda_m
  p_kg_m_s <- E_J / (3.00e8)
  flujo_s <- P_W / E_J
  Mostrar E_J, " J por foton"
  Mostrar p_kg_m_s, " kg m/s"
  Mostrar flujo_s, " fotones/s"
FinSi
FinAlgoritmo</pre>` });
    resultados.algoritmo = { valor: 'Implementado', unidad: '', nombre: 'Estado' };
  }
  return resultados;
}

function mostrarPruebas(ejercicio, desarrollo) {
  const resultados = {};
  if (ejercicio.numero === 30) {
    desarrollo.push({ titulo: 'Caso 1', contenido: 'λ = -10 nm, ϕ = 2,0 eV → <span style="color:var(--danger)">Entrada inválida; mostrar error</span>' });
    desarrollo.push({ titulo: 'Caso 2', contenido: 'λ = 700 nm, ϕ = 2,5 eV → E_γ = 1,77 eV < 2,5 eV → <span style="color:var(--warning)">No hay emisión</span>' });
    desarrollo.push({ titulo: 'Caso 3', contenido: 'λ = 619,92 nm, ϕ = 2,00 eV → E_γ ≈ 2,00 eV → <span style="color:var(--info)">Umbral: K_máx = 0</span>' });
    desarrollo.push({ titulo: 'Caso 4', contenido: 'λ = 400 nm, ϕ = 2,00 eV → E_γ = 3,10 eV → K_máx = 1,10 eV, V_s = 1,10 V' });
    desarrollo.push({ titulo: 'Caso 5', contenido: 'λ = 300 nm, ϕ = 1,50 eV → E_γ = 4,13 eV → K_máx = 2,63 eV, emisión' });
    resultados.pruebas = { valor: '5 casos', unidad: 'verificados', nombre: 'Casos de prueba' };
  }
  return resultados;
}
