# MongoDB Atlas Setup (100% Gratis)

## Crear Cluster Gratis

1. **Registrarse en MongoDB Atlas:**
   - Ve a: https://www.mongodb.com/cloud/atlas/register
   - Crea cuenta con Google/email (NO requiere tarjeta)

2. **Crear Cluster M0 Free:**
   - Elige plan **M0 Sandbox** (FREE FOREVER)
   - Región: Elige la más cercana (ej: Virginia, São Paulo)
   - Cluster Name: `Cluster0` (o el que quieras)
   - Click "Create Cluster" (tarda 3-5 minutos)

3. **Configurar Acceso:**

   **a) Database User:**
   - Security → Database Access → Add New Database User
   - Username: `rize-user` (o el que quieras)
   - Password: Genera uno seguro (guárdalo!)
   - Database User Privileges: `Atlas admin`
   - Click "Add User"

   **b) Network Access:**
   - Security → Network Access → Add IP Address
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

4. **Obtener Connection String:**
   - Databases → Click "Connect" en tu cluster
   - Choose "Connect your application"
   - Driver: Node.js, Version: 5.5 or later
   - Copia el string que se ve así:
     ```
     mongodb+srv://rize-user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```

5. **Configurar en RIZE:**
   - Abre `backend/.env`
   - Reemplaza `MONGODB_URI` con tu string
   - Reemplaza `<password>` con tu password real
   - Agrega `/rize` antes de `?retryWrites`:
     ```
     MONGODB_URI=mongodb+srv://rize-user:TuPassword123@cluster0.xxxxx.mongodb.net/rize?retryWrites=true&w=majority
     ```

## Límites del Free Tier (M0)

- ✅ 512MB storage
- ✅ Conexiones compartidas (suficiente para desarrollo)
- ✅ Sin límite de tiempo
- ✅ No requiere tarjeta de crédito
- ✅ Backups automáticos
- ❌ No tiene alta disponibilidad (pero es gratis!)

## Alternativa: MongoDB Local (Opcional)

Si prefieres usar MongoDB local:

**Windows:**
```powershell
# Instalar con Chocolatey
choco install mongodb

# O descargar desde:
https://www.mongodb.com/try/download/community

# Iniciar servicio
net start MongoDB
```

**Actualizar .env:**
```env
MONGODB_URI=mongodb://localhost:27017/rize
```

---

**Recomendación:** Usa Atlas desde el inicio, así cuando despliegues a Render.com no tienes que cambiar nada.
