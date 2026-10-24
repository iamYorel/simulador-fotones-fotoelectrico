# Pruebas de Funcionamiento

## Pruebas de Cálculos Principales

### Ejercicio 4: Fotón de 520 nm
**Datos:** λ = 520 nm
**Esperado:**
- f = 5,77 × 10^14 Hz
- E = 3,82 × 10^-19 J = 2,38 eV
- p = 1,27 × 10^-27 kg·m/s

### Ejercicio 9: Láser de 3,00 mW y 650 nm
**Datos:** P = 3,00 mW, λ = 650 nm
**Esperado:**
- E_γ = 3,06 × 10^-19 J
- Ṅ = 9,80 × 10^15 fotones/s

### Ejercicio 14: Haz de 5,00 W
**Datos:** P = 5,00 W
**Esperado:**
- F_abs = 1,67 × 10^-8 N
- F_ref = 3,33 × 10^-8 N

### Ejercicio 23: f = 9,00 × 10^14 Hz, ϕ = 2,10 eV
**Datos:** f = 9,00×10^14 Hz, ϕ = 2,10 eV
**Esperado:**
- E_γ = 3,72 eV
- K_máx = 1,62 eV
- V_s = 1,62 V
- v_máx = 7,54 × 10^5 m/s

### Ejercicio 31: Sensor fotoeléctrico
**Datos:** ϕ = 2,15 eV, λ = 405 nm, P = 1,50 mW, η = 8%
**Esperado:**
- E_γ = 3,061 eV
- Ṅ = 3,06 × 10^15 s^-1
- K_máx = 0,911 eV
- I_q ≈ 39,2 µA

### Ejercicio 32: Vela solar
**Datos:** A = 12,0 m², I = 1,36×10^3 W/m², m = 18,0 kg
**Esperado:**
- P = 1,632 × 10^4 W
- P_rad_ref = 9,07 × 10^-6 Pa
- a_ref = 6,04 × 10^-6 m/s²

### Ejercicio 33: Selección de material, λ = 430 nm
**Datos:** λ = 430 nm
**E_γ = 2,883 eV**
- Material A (1,90 eV): EMITE, K_máx = 0,983 eV
- Material B (2,70 eV): EMITE, K_máx = 0,183 eV
- Material C (4,20 eV): NO EMITE

### Ejercicio 34: Diseño propio
**Datos:** λ = 500 nm, P = 2,00 mW, ϕ = 2,00 eV
**Esperado:**
- E_γ = 2,480 eV
- Ṅ = 5,02 × 10^15 s^-1
- K_máx = 0,480 eV
- V_s = 0,480 V

## Verificación de Validaciones
- [ ] Longitud de onda negativa → Error
- [ ] Frecuencia negativa → Error
- [ ] Potencia negativa → Error
- [ ] División por cero → Evitado
- [ ] E_γ < ϕ → "No hay emisión fotoeléctrica"
- [ ] Valores no numéricos → Error

## Verificación de Interfaz
- [ ] Todos los 34 ejercicios aparecen en el menú
- [ ] Búsqueda funciona
- [ ] Cambio de tema claro/oscuro funciona
- [ ] Modo estudio/práctica cambia
- [ ] Responsive en móvil
- [ ] Simulador visual aparece en ejercicios 19-24, 31
- [ ] Botones funcionan correctamente
