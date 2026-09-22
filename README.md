# Portafolio QA — Juan Felipe Perdomo Merchán

[![Pruebas automatizadas](https://github.com/juan124perdomo/portafolio-QA/actions/workflows/playwright.yml/badge.svg)](https://github.com/juan124perdomo/portafolio-QA/actions/workflows/playwright.yml)

Analista Funcional y de Calidad de Software (QA). Este repositorio muestra un ciclo de pruebas completo sobre una aplicación pública: **análisis funcional → plan de pruebas → ejecución manual con evidencias → automatización**.

**Aplicación bajo prueba:** [SauceDemo](https://www.saucedemo.com) · usuario `standard_user`
**Módulos cubiertos:** Login · Tienda (catálogo, carrito y checkout)

---

## Qué hay en cada carpeta

| Carpeta | Contenido |
|---|---|
| `01 - Analisis funcional` | Historias de usuario con criterios de aceptación en formato Given / When / Then. |
| `02 - Plan de pruebas` | Matrices de casos diseñados antes de ejecutar: tipo de prueba, datos, elemento a probar y resultado esperado. |
| `03 - Modulos probados` | Ejecución real: matrices con estado (OK / NOK / PDTE), fecha y evidencias en capturas. Incluye el reporte del defecto encontrado. |
| `04 - automatizacion-playwright` | Suite automatizada con Playwright y TypeScript, organizada con Page Object Model. |

---

## Defecto encontrado

**Se puede completar una compra con el carrito vacío** (caso `CP-CAR-011`).

Con el carrito en cero, el sistema permite avanzar al checkout, muestra `Total: $0.00` y confirma la orden con *"Thank you for your order!"*. Está documentado con los pasos para reproducirlo y cinco capturas, en `03 - Modulos probados/Tienda`.

**Y está automatizado como prueba de regresión.** El test *"El botón Checkout debe estar deshabilitado con el carrito vacío"* afirma el comportamiento **esperado**, no el actual: verifica que con el carrito en cero no se pueda avanzar a pagar.

Hoy falla a propósito, porque el defecto sigue ahí. Está marcado con `test.fail`, así que la suite lo cuenta como falla esperada y el pipeline se mantiene en verde. El día que se corrija, el test va a pasar y Playwright avisará con `Expected to fail, but passed`.

Ese es el ciclo completo: el defecto se encontró probando a mano, se documentó con evidencias, y quedó convertido en una prueba que vigila sola si vuelve a aparecer.

---

## La automatización

```
04 - automatizacion-playwright/
├── pages/                     # Page Objects: dónde está cada elemento y cómo se usa
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   ├── CheckoutOverviewPage.ts
│   └── CheckoutCompletePage.ts
├── tests/                     # Casos de prueba y verificaciones
│   ├── Login.spec.ts
│   └── tienda.spec.ts
└── playwright.config.ts
```

**Criterios que sigue la suite:**

- Selectores por `data-test`, no por clases de CSS: sobreviven a cambios de diseño.
- Sin esperas fijas; se usa el auto-waiting de Playwright y aserciones que reintentan.
- Cada prueba se para sola: el login y las pantallas compartidas se montan en un hook `beforeEach`, así que ninguna prueba depende del resultado de otra.
- Las aserciones viven en los tests; los Page Objects solo actúan.

**Pruebas incluidas:**

| Archivo | Caso |
|---|---|
| `Login.spec.ts` | Inicio de sesión con credenciales válidas |
| `Login.spec.ts` | Inicio de sesión con contraseña incorrecta (mensaje de error) |
| `tienda.spec.ts` | Compra completa: login → agregar producto → carrito → datos → resumen → confirmación |
| `tienda.spec.ts` | El botón Checkout debe estar deshabilitado con el carrito vacío — prueba de regresión del defecto de arriba, marcada como falla esperada |

### Cómo ejecutarla

```bash
cd "04 - automatizacion-playwright"
npm install
npx playwright install
npx playwright test
```

Variantes útiles:

```bash
npx playwright test --project=chromium   # un solo navegador
npx playwright test --headed             # viendo el navegador
npx playwright show-report               # reporte de la última corrida
```

### Integración continua

La suite no depende de que alguien se acuerde de correrla. En cada push a `master`, GitHub Actions levanta una máquina limpia de Linux, instala Node y los tres navegadores desde cero, y ejecuta los cuatro casos. El badge del encabezado muestra el resultado de la última corrida.

El reporte HTML de cada ejecución queda disponible para descargar desde la pestaña **Actions**.

En ese entorno la configuración cambia sola: un solo worker y dos reintentos, para que la carga de la máquina no genere fallas intermitentes. El workflow está en `.github/workflows/playwright.yml`.

---

## Herramientas

Playwright · TypeScript · Node.js · Git y GitHub · Excel y Word para la documentación de pruebas · Azure DevOps (gestión de defectos, en entorno laboral)

---

## Contacto

[LinkedIn](https://www.linkedin.com/in/juan-felipe-perdomo-merchan/) · juanfelipeperdomo41@gmail.com
