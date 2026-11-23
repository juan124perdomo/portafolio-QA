# Proyecto 3 · Automation Exercise (interfaz + API)

Una tienda en línea que expone **interfaz y API en la misma aplicación**. Eso permite probar los dos lados de un mismo flujo, algo que los proyectos 1 y 2 muestran por separado.

[← Volver al portafolio](../README.md)

**Aplicación bajo prueba:** [Automation Exercise](https://automationexercise.com)
**Módulos cubiertos:** Autenticación (registro, inicio y cierre de sesión, eliminación de cuenta) · Productos (catálogo, búsqueda, categorías, marcas y detalle)

| Etapa | Estado |
|---|---|
| Análisis funcional | ✅ Terminado |
| Plan de pruebas | ✅ Terminado |
| Ejecución manual con evidencias | ✅ Terminado: 30 casos, todos OK |
| Automatización de la API (Playwright `request`) | 🔨 En curso |
| Automatización de la interfaz e integración continua | ⏳ Pendiente |

---

## Qué hay en cada carpeta

| Carpeta | Contenido |
|---|---|
| `01 - Analisis funcional` | Dos historias de usuario con cabecera Rol / Funcionalidad / Objetivo, restricciones del módulo y criterios de aceptación en formato Given / When / Then. |
| `02 - Plan de pruebas` | Matrices de casos diseñados antes de ejecutar: tipo de prueba, datos, elemento a probar y resultado esperado. |
| `03 - Modulos probados` | Ejecución real: matrices con estado (OK / NOK / PDTE) y fecha, y un documento de evidencias por módulo con las capturas de cada caso. |

---

## Análisis funcional

La aplicación es pública y no tiene documentación de requisitos. Las historias de usuario las escribí como analista, a partir de explorar la aplicación, y cada regla del apartado **Restricciones** salió de verificarla en el sistema.

| Historia de usuario | Escenarios |
|---|---|
| **HU 1 · Registro e inicio de sesión** | 8: acceso, registro con email repetido, registro con campos vacíos, registro exitoso, inicio de sesión fallido y exitoso, cierre de sesión y eliminación de cuenta |
| **HU 2 · Productos y búsqueda** | 7: acceso al catálogo, búsqueda sin resultados, con el campo vacío y exitosa, filtro por categoría, filtro por marca y detalle de producto |

---

## Ejecución manual

| Módulo | Casos | Positivos | Negativos | Borde | Exploratorios | Resultado |
|---|---|---|---|---|---|---|
| Autenticación | 15 | 7 | 7 | 1 | — | 15 OK |
| Productos | 15 | 8 | 2 | 3 | 2 | 15 OK |
| **Total** | **30** | **15** | **9** | **4** | **2** | **30 OK** |

El diseño no se queda en el camino feliz: la mitad de los casos de Autenticación son negativos (email repetido, formato de email inválido, campos obligatorios vacíos, contraseña incorrecta, iniciar sesión con una cuenta ya eliminada).

Los casos exploratorios documentan comportamientos que no se ven a simple vista. Por ejemplo, el buscador no compara solo con el nombre del producto, sino también con su categoría: buscar *"top"* devuelve camisas de la subcategoría *Tops & Shirts*.

---

## Lo que sigue

La API de Automation Exercise no tiene límite de uso, así que puede correr en integración continua. El plan es:

1. **API con el `request` de Playwright:** consulta de productos, búsqueda y el ciclo de vida de una cuenta (crear, consultar y eliminar).
2. **Prueba híbrida:** crear la cuenta por API, iniciar sesión por la interfaz y eliminarla por API al terminar. Así la prueba no depende de datos creados a mano.
3. **GitHub Actions**, igual que en el [Proyecto 1](../1%20-%20SauceDemo%20%28UI%29/README.md).
