# ✅ Configuración de Supabase - Guía Rápida

Ya creaste el proyecto en Supabase. Ahora sigue estos pasos para conectarlo con tu portafolio.

## 📋 Paso 1: Crear la Tabla en Supabase

1. En el panel de Supabase, ve a **SQL Editor** (ícono de terminal en el menú lateral)
2. Haz clic en **"New query"**
3. Copia y pega el siguiente SQL:

```sql
-- Crear tabla para mensajes de contacto
CREATE TABLE contact_messages (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índice para búsquedas por email
CREATE INDEX idx_contact_messages_email ON contact_messages(email);

-- Crear índice para ordenar por fecha
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at DESC);

-- Habilitar Row Level Security (RLS)
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Crear política para permitir inserción de datos desde la API
CREATE POLICY "Allow anonymous inserts" ON contact_messages
  FOR INSERT
  TO anon
  WITH CHECK (true);
```

4. Haz clic en **"Run"** o presiona `Ctrl+Enter` (Windows) / `Cmd+Enter` (Mac)
5. Deberías ver un mensaje de éxito

## 🔑 Paso 2: Obtener las Credenciales de API

1. En el panel de Supabase, ve a **Settings** (ícono de engranaje en el menú lateral)
2. Haz clic en **API**
3. Encontrarás dos valores importantes:
   - **Project URL**: Copia esta URL (ej: `https://xxxxxxxxxxxxx.supabase.co`)
   - **anon public key**: Copia esta clave (empieza con `eyJ...`)

   > 💡 **Tip**: Estas son las credenciales que necesitarás en el siguiente paso.

## ⚙️ Paso 3: Configurar Variables de Entorno en Vercel

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. Haz clic en tu proyecto
3. Ve a **Settings** → **Environment Variables**
4. Agrega las siguientes variables:

   **Variable 1:**
   - **Nombre**: `SUPABASE_URL`
   - **Valor**: Tu Project URL de Supabase (la que copiaste en el Paso 2)
   - **Environment**: Marca todas (Production, Preview, Development)

   **Variable 2:**
   - **Nombre**: `SUPABASE_ANON_KEY`
   - **Valor**: Tu anon public key de Supabase (la que copiaste en el Paso 2)
   - **Environment**: Marca todas (Production, Preview, Development)

5. Haz clic en **"Save"**

## 🚀 Paso 4: Desplegar el Proyecto

1. Si ya tenías el proyecto desplegado, necesitas hacer un nuevo deploy:
   - Ve a **Deployments**
   - Haz clic en los tres puntos del último deployment
   - Selecciona **"Redeploy"**
   - Esto asegura que las variables de entorno estén disponibles

2. O si es la primera vez:
   - Sube tu código a GitHub
   - Conecta el repositorio en Vercel
   - Vercel desplegará automáticamente

## ✅ Paso 5: Verificar que Funciona

1. Visita tu sitio desplegado (ej: `tu-proyecto.vercel.app`)
2. Completa el formulario de contacto
3. Deberías ver un mensaje de éxito: "Mensaje enviado"
4. Ve a Supabase → **Table Editor** → `contact_messages`
5. Deberías ver el mensaje que acabas de enviar

## 🎉 ¡Listo!

Tu formulario de contacto está completamente funcional y los mensajes se guardan en Supabase.

## 📊 Ver los Mensajes

Puedes ver todos los mensajes en cualquier momento:

1. Ve a Supabase Dashboard
2. Haz clic en **Table Editor** (en el menú lateral)
3. Selecciona la tabla `contact_messages`
4. Verás todos los mensajes recibidos

## 🐛 Solución de Problemas

### Error: "Variables de entorno de Supabase no configuradas"
- Verifica que agregaste las variables `SUPABASE_URL` y `SUPABASE_ANON_KEY` en Vercel
- Asegúrate de haber marcado todas las opciones (Production, Preview, Development)
- Haz un nuevo deploy después de agregar las variables

### Error: "Error al guardar el mensaje"
- Verifica que la tabla `contact_messages` existe en Supabase
- Verifica que ejecutaste el SQL correctamente
- Verifica que las políticas RLS están configuradas (el SQL las crea automáticamente)
- Revisa los logs de Vercel para ver el error específico

### Los mensajes no aparecen en la tabla
- Verifica que las políticas RLS permiten inserción desde anon
- Verifica que el nombre de la tabla es exactamente `contact_messages`
- Revisa los logs de Supabase en el dashboard

## 📚 Recursos Adicionales

- [Documentación de Supabase](https://supabase.com/docs)
- [Supabase REST API](https://supabase.com/docs/reference/javascript/introduction)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

¡Felicitaciones! Tu formulario de contacto está funcionando con Supabase. 🚀

