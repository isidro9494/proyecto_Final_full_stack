# React + Vite

# Proyecto BME - Gestión de Cartera del IBEX35

**Autor:** Isidro Rodríguez Freile  
**Versión:** 1.0.0  
**Última actualización:** {24/03/2025}
**Para logearse**
**Úsuario           Password:** 
 - IsidroRF15       P@ssword99
 - MariaG12         M@ria2023
 - CarlosTech      TuNuevaContraseña123!
 - LuciaStar        L*cia4567
 - PedroDev         P3dr0@@2023

## 🔍 Descripción
Aplicación completa para gestión de inversiones en el IBEX35 con:
- Registro de operaciones de compra/venta
- Modificación de operaciones existentes
- Seguimiento en tiempo real de posiciones
- Cálculo automático del valor de la cartera

## 🛠 Tecnologías
### Backend (Node.js - Puerto 3000)
- Express
- MongoDB (Docker)
- JWT Authentication
- Yahoo Finance API

### Frontend (React - Puerto 5173)
- React + Redux
- CSS Modules
- Chart.js

## 🌐 Endpoints Principales

### Operaciones con Acciones
| Método | Endpoint | Descripción | Body Ejemplo |
|--------|----------|-------------|--------------|
| PUT    | `http://localhost:3000/acciones/:id` | Modificar acción existente | ```json { "ticker": "SAN", "cantidad": 150, "precioCompra": 3.50 }``` |
| GET    | `http://localhost:3000/acciones/:id` | Obtener detalles de acción específica | - |
| DELETE | `http://localhost:3000/acciones/:id` | Eliminar/venta de acción | - |
| Post | `http://localhost:3000/acciones/` | compra de acción | - |

## 💡 Ejemplo de Modificación
Para modificar una acción existente:

1. **Obtener el ID** de la acción a modificar (disponible en el listado)
2. **Enviar request PUT**:

```bash
curl -X PUT http://localhost:3000/acciones/5f8d3b7a2c1d9e3f6a2b3c4d \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <tu_token>" \
  -d '{"ticker":"SAN", "cantidad":150, "precioCompra":3.50}'

