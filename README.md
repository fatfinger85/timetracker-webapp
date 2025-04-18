# TimeTracker - Despliegue en Netlify & Railway

## 🔧 Estructura

- /backend → Express API para empleados y registros
- /frontend → React App visual para trabajadores y admin

## 🌐 Variables de entorno

### En Netlify (frontend)
REACT_APP_API_URL=https://timetracker-api.up.railway.app

### En Railway (backend)
PORT=4000

## 🛠 Build Commands

### Netlify (frontend)
Build command: npm run build
Publish directory: frontend/build

### Railway (backend)
Root directory: backend

## 🚀 Resultado

Frontend: https://timetracker.netlify.app  
Backend: https://timetracker-api.up.railway.app
