# 🚀 Configuración de Vercel - Guía Rápida

## ⚙️ Configuración en el Dashboard de Vercel

Para que tu proyecto funcione correctamente en Vercel, sigue estos pasos:

### Paso 1: Configurar el Proyecto

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. Haz clic en **Settings**
3. Ve a **General**
4. En la sección **Build & Development Settings**:
   - **Framework Preset**: Selecciona **"Other"**
   - **Build Command**: Déjalo vacío o pon `echo 'No build step required'`
   - **Output Directory**: Déjalo vacío (no pongas nada)
   - **Install Command**: Déjalo vacío
5. Haz clic en **Save**

### Paso 2: Configurar Variables de Entorno

1. Ve a **Settings** → **Environment Variables**
2. Agrega las siguientes variables:
   - **Nombre**: `SUPABASE_URL`
     **Valor**: Tu Project URL de Supabase
     **Environment**: Marca todas (Production, Preview, Development)
   
   - **Nombre**: `SUPABASE_ANON_KEY`
     **Valor**: Tu anon public key de Supabase
     **Environment**: Marca todas (Production, Preview, Development)
3. Haz clic en **Save**

### Paso 3: Redesplegar

1. Ve a **Deployments**
2. Haz clic en los tres puntos del último deployment
3. Selecciona **"Redeploy"**
4. Esto aplicará los cambios de configuración

## ✅ Verificación

Una vez configurado:
- ✅ El sitio debería estar disponible en `tu-proyecto.vercel.app`
- ✅ Los archivos estáticos (HTML, CSS, JS) se servirán correctamente
- ✅ La API en `/api/contact` funcionará cuando configures Supabase

## 🐛 Solución de Problemas

### Error: "No Output Directory named 'public' found"

**Solución**: 
- Asegúrate de que el **Output Directory** esté vacío en la configuración de Vercel
- No uses `vercel.json` con outputDirectory para proyectos estáticos simples
- Configura el proyecto como **"Other"** en Framework Preset

### El sitio no carga

**Solución**:
- Verifica que `index.html` esté en la raíz del proyecto
- Verifica que la configuración en Vercel tenga Output Directory vacío
- Revisa los logs del deployment en Vercel

### La API no funciona

**Solución**:
- Verifica que las variables de entorno estén configuradas
- Verifica que `api/contact.js` exista
- Revisa los logs de la función serverless en Vercel

## 📚 Recursos

- [Documentación de Vercel](https://vercel.com/docs)
- [Vercel Static Files](https://vercel.com/docs/concepts/deployments/static-jamstack)
- [Vercel Serverless Functions](https://vercel.com/docs/functions)

