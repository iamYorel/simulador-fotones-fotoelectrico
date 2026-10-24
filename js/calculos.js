// Motor de cálculos para el simulador de fotones y efecto fotoeléctrico

const Calculos = {
  // Conversiones
  nm_a_m: (nm) => nm * 1e-9,
  m_a_nm: (m) => m * 1e9,
  um_a_m: (um) => um * 1e-6,
  mW_a_W: (mW) => mW * 1e-3,
  W_a_mW: (W) => W * 1e3,
  eV_a_J: (eV) => eV * CONSTANTES.e,
  J_a_eV: (J) => J / CONSTANTES.e,
  cm2_a_m2: (cm2) => cm2 * 1e-4,
  THz_a_Hz: (THz) => THz * 1e12,
  Hz_a_THz: (Hz) => Hz * 1e-12,
  
  // Fotones básicos
  frecuencia: (lambda_m) => CONSTANTES.c / lambda_m,
  longitudOnda: (frecuencia_Hz) => CONSTANTES.c / frecuencia_Hz,
  
  energiaFotón_J: (lambda_m) => {
    if (lambda_m <= 0) throw new Error("Longitud de onda debe ser positiva");
    return (CONSTANTES.h * CONSTANTES.c) / lambda_m;
  },
  
  energiaFotón_eV: (lambda_nm) => {
    if (lambda_nm <= 0) throw new Error("Longitud de onda debe ser positiva");
    return CONSTANTES.hc_eV_nm / lambda_nm;
  },
  
  longitudOndaDeEnergia: (energia_eV) => {
    if (energia_eV <= 0) throw new Error("Energía debe ser positiva");
    return CONSTANTES.hc_eV_nm / energia_eV;
  },
  
  momentoFotón: (lambda_m) => {
    if (lambda_m <= 0) throw new Error("Longitud de onda debe ser positiva");
    return CONSTANTES.h / lambda_m;
  },
  
  momentoDeEnergia: (energia_J) => {
    if (energia_J < 0) throw new Error("Energía debe ser positiva");
    return energia_J / CONSTANTES.c;
  },
  
  // Flujo de fotones
  energiaFotónDesdeFrecuencia: (f_Hz) => {
    if (f_Hz <= 0) throw new Error("Frecuencia debe ser positiva");
    return CONSTANTES.h * f_Hz;
  },
  
  flujoFotones: (potencia_W, lambda_m) => {
    if (potencia_W < 0) throw new Error("Potencia debe ser positiva");
    if (lambda_m <= 0) throw new Error("Longitud de onda debe ser positiva");
    const E_foton = Calculos.energiaFotón_J(lambda_m);
    if (E_foton <= 0) throw new Error("Energía del fotón inválida");
    return potencia_W / E_foton;
  },
  
  potenciaDesdeFlujo: (flujo_fotones_s, lambda_m) => {
    if (flujo_fotones_s < 0) throw new Error("Flujo debe ser positivo");
    if (lambda_m <= 0) throw new Error("Longitud de onda debe ser positiva");
    const E_foton = Calculos.energiaFotón_J(lambda_m);
    return flujo_fotones_s * E_foton;
  },
  
  // Radiación
  fuerzaAbsorcion: (potencia_W) => {
    if (potencia_W < 0) throw new Error("Potencia debe ser positiva");
    return potencia_W / CONSTANTES.c;
  },
  
  fuerzaReflexion: (potencia_W) => {
    if (potencia_W < 0) throw new Error("Potencia debe ser positiva");
    return 2 * potencia_W / CONSTANTES.c;
  },
  
  presionAbsorcion: (intensidad_W_m2) => {
    if (intensidad_W_m2 < 0) throw new Error("Intensidad debe ser positiva");
    return intensidad_W_m2 / CONSTANTES.c;
  },
  
  presionReflexion: (intensidad_W_m2) => {
    if (intensidad_W_m2 < 0) throw new Error("Intensidad debe ser positiva");
    return 2 * intensidad_W_m2 / CONSTANTES.c;
  },
  
  intensidad: (potencia_W, area_m2) => {
    if (area_m2 <= 0) throw new Error("Área debe ser positiva");
    if (potencia_W < 0) throw new Error("Potencia debe ser positiva");
    return potencia_W / area_m2;
  },
  
  // Efecto fotoeléctrico
  frecuenciaUmbral: (phi_eV) => {
    if (phi_eV <= 0) throw new Error("Función de trabajo debe ser positiva");
    const phi_J = Calculos.eV_a_J(phi_eV);
    return phi_J / CONSTANTES.h;
  },
  
  longitudOndaUmbral: (phi_eV) => {
    if (phi_eV <= 0) throw new Error("Función de trabajo debe ser positiva");
    return Calculos.longitudOndaDeEnergia(phi_eV);
  },
  
  energiaCineticaMax_eV: (E_foton_eV, phi_eV) => {
    if (E_foton_eV < 0 || phi_eV < 0) throw new Error("Valores deben ser positivos");
    if (E_foton_eV < phi_eV) return 0; // No hay emisión
    return E_foton_eV - phi_eV;
  },
  
  energiaCineticaMax_J: (E_foton_J, phi_eV) => {
    if (E_foton_J < 0 || phi_eV < 0) throw new Error("Valores deben ser positivos");
    const phi_J = Calculos.eV_a_J(phi_eV);
    if (E_foton_J < phi_J) return 0;
    return E_foton_J - phi_J;
  },
  
  potencialFrenado: (Kmax_eV) => {
    if (Kmax_eV < 0) throw new Error("Energía cinética debe ser positiva");
    return Kmax_eV; // Numéricamente igual cuando en eV
  },
  
  velocidadMaxima: (Kmax_J) => {
    if (Kmax_J <= 0) throw new Error("No hay emisión o energía cinética nula");
    return Math.sqrt((2 * Kmax_J) / CONSTANTES.me);
  },
  
  // Validaciones
  esPositivo: (valor) => {
    return typeof valor === 'number' && !isNaN(valor) && valor > 0;
  },
  
  esNoNegativo: (valor) => {
    return typeof valor === 'number' && !isNaN(valor) && valor >= 0;
  },
  
  validarLongitudOnda: (lambda) => {
    if (typeof lambda !== 'number' || isNaN(lambda)) return "Valor numérico inválido";
    if (lambda <= 0) return "La longitud de onda debe ser positiva";
    if (lambda > 1e-3) return "Longitud de onda muy grande (verificar unidades)";
    if (lambda < 1e-12) return "Longitud de onda muy pequeña (verificar unidades)";
    return null;
  },
  
  validarFrecuencia: (f) => {
    if (typeof f !== 'number' || isNaN(f)) return "Valor numérico inválido";
    if (f <= 0) return "La frecuencia debe ser positiva";
    if (f < 1e6) return "Frecuencia muy baja (verificar unidades)";
    if (f > 1e21) return "Frecuencia muy alta (verificar unidades)";
    return null;
  },
  
  validarPotencia: (p) => {
    if (typeof p !== 'number' || isNaN(p)) return "Valor numérico inválido";
    if (p < 0) return "La potencia debe ser no negativa";
    return null;
  },
  
  validarArea: (a) => {
    if (typeof a !== 'number' || isNaN(a)) return "Valor numérico inválido";
    if (a <= 0) return "El área debe ser positiva";
    return null;
  },
  
  validarMasa: (m) => {
    if (typeof m !== 'number' || isNaN(m)) return "Valor numérico inválido";
    if (m <= 0) return "La masa debe ser positiva";
    return null;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Calculos;
}
