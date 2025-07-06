# 🛣️ SmatCargo - Plataforma de Gestión de Transporte de Carga

SmatCargo es una plataforma web que conecta **clientes**, **transportadores** y **administradores** para gestionar eficientemente cargas, vehículos y viajes en tiempo real.

## 🚀 Características

### 👤 Roles disponibles:

- **Cliente**: crear cargas, obtener sus cargas.
- **Transportador**: registrar vehículos, eliminar vehiculos, toma cargas y genera viajes(en desarrollo, todavia no esta disponible).
- **Administrador**: gestiona usuarios, crea tarifas y actualiza.

### 📌 Funcionalidades:

#### Clientes:

- Crear y consultar cargas.
- Ver estado de sus cargas.
- Consultar tarifas con filtro dinamico. 
- En desarrollo chat entre cliente y transportador

#### Transportadores:

- Registrar vehículos con SOAT y Tecnomecánica.
- Consultar sus vehículos y por filtro de placa.
- Ver todas las cargas disponibles o consultar por id.
- Consultar tarifas. 
- Tomar cargas disponibles y generar viajes (En proceso de desarrollo).
- Entregar cargas o cancelar viajes (En proceso de desarrollo).
- En desarrollo registrar incidencias.

#### Administrador (futuro):

- Gestionar usuarios, creador y consultor de tarifas.

---

## 🧱 Tecnologías utilizadas

### Backend:

- Node.js
- Express.js
- Sequelize ORM + PostgreSQL
- Autenticación JWT
- Cors
- Nodemon
- dotenv
- bcrypt

### Frontend:

- React.js
- Axios
- Tailwind CSS
- Vite.js
- react-router-dom
- postcss

---

## ⚙️ Instalación

### Requisitos previos:

- Node.js ≥ v18
- PostgreSQL
- Git

### 1. Clonar el repositorio

```bash
git clone https://github.com/Joanizquierdoarce/SmatCargo.git
cd SmatCargo

```
### Configuración del backend
1. crear carpeta backend
2. dentro del cmd poner cd C:\gestor-eventos\backend
3. para la instalación de dependencias empezamos con npm init -y
4. seguidamente se instalan las otras dependencias npm install express pg bcryptjs jsonwebtoken dotenv cors nodemon sequelize

### Configuración del frontend
1. verificar que estamos en la ubicacion de gestor-eventos
2. una vez verificado introducir el siguiente código npm create vite@latest frontend
3. una vez creada la carpeta dentro del cmd se introduce cd frontend
4. luego de estar en la carpeta frotend hacemos npm install
5. para verificar que quedo bien instalado el vite se ejecuta el código npm run dev y debe de mostrar en la página web lo correspondiente.
6. Luego se instalan las demas dependencias npm y react-router-dom fontawesome bootstrap axios tailwind.

### Codigos de subida al github:
1. git init
2. git add .
3. git commit -m
4. rama git -M stg
5. git remoto
6. git push origen stg

### Desarrolladores: 
1. Joan Sebastian Izquierdo Arce
2. Jessica Viviana Viscue
