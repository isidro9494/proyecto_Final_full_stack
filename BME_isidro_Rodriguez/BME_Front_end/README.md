# React + Vite

# Proyecto BME - Gestión de Cartera del IBEX35

# Guía para Restaurar Backup de MongoDB

Este repositorio contiene una copia de seguridad comprimida de MongoDB (`BME_backup.tar.gz`). Sigue estos pasos para restaurarla en tu entorno local.

## 📥 1. Descargar y preparar el backup

Clona el repositorio y extrae el archivo comprimido:

```bash
git https://github.com/isidro9494/proyecto_Final_full_stack/tree/develop
cd proyecto
tar -xzvf BME_backup.tar.gz

## 📦 Contenido del Backup
El archivo `BME_backup.tar.gz` contiene:
- 4 colecciones principales:
  - `users` (usuarios)
  - `indices` (índices)
  - `indexes` (índices alternativos)
  - `actions` (acciones)
- Archivos en formato BSON (datos) y JSON (metadatos)

Al extraer, verás una carpeta BME_backup_local/BME
users.metadata.json
users.bson
indices.metadata.json
indices.bson
indexes.metadata.json
indexes.bson
actions.metadata.json
actions.bson

 para restaurar las colecciones se debe ejecutar:

mongorestore --db BME BME_backup_local/BME

verificar si ha funcionado
mongosh
> show dbs
> use BME
> show collections
> db.users.countDocuments()  
> db.users.findOne() 

## Guía para Restaurar Backup de Docker

tener instalado docker ejecutar estos comandos:

docker run --name mongo-bme -d -p 27017:27017 mongo

Copia y restaura la backup

docker cp BME_backup_local/BME mongo-bme:/backup
docker exec -it mongo-bme mongorestore --db BME /backup

primero :ejecutar la base de datos en mongo una vez obtenida

segundo: en mi ruta ir a backend donde este el archivo index.js y hacer un node index.js

tercero: ir a cd proyecto bmeFront una vez dentro ejecutar npm run dev




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

