# Configuración de Supabase para el Formulario de Contacto

> ⚠️ **Nota**: Tu código actual está configurado para usar **Vercel Postgres**, que es más simple y no requiere Supabase. Solo sigue esta guía si realmente quieres usar Supabase.

> 💡 **Recomendación**: Usa Vercel Postgres siguiendo las instrucciones en `SETUP_COMPLETO.md` - es más simple y no requiere crear organizaciones.

Esta guía te ayudará a configurar Supabase de forma gratuita para recibir y almacenar los mensajes del formulario de contacto.

## ⚠️ Paso 0: Evitar Problemas de Organización

Si Supabase te pide crear una organización y no quieres hacerlo:

1. **Cierra sesión de Supabase**
2. **Crea una cuenta nueva usando:**
   - Email y contraseña (NO uses GitHub si está asociado a una organización)
   - O Google con un email personal
3. **Lee la guía completa en `SUPABASE_SIN_ORGANIZACION.md`**

## Paso 1: Crear cuenta en Supabase

1. Ve a [https://supabase.com](https://supabase.com)
2. Haz clic en "Start your project"
3. **Importante**: Inicia sesión con:
   - **Email y contraseña** (recomendado para evitar organizaciones)
   - **Google** (con email personal, NO organización)
   - **NO uses GitHub** si tu cuenta está asociada a una organización
4. Haz clic en "New Project"

## Paso 2: Crear el proyecto

1. **Nombre del proyecto**: Elige un nombre (ej: `portafolio-jdblandon`)
2. **Database Password**: Crea una contraseña segura y guárdala
3. **Region**: Elige la región más cercana (ej: `South America (São Paulo)`)
4. **Pricing Plan**: Selecciona el plan **Free**
5. Haz clic en "Create new project"
6. Espera 1-2 minutos mientras se crea el proyecto

## Paso 3: Crear la tabla en la base de datos

1. En el panel de Supabase, ve a **SQL Editor** (ícono de terminal en el menú lateral)
2. Haz clic en "New query"
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

-- Crear política para permitir lectura solo a usuarios autenticados (opcional)
-- Si quieres ver los mensajes desde el dashboard de Supabase, puedes comentar esta política
-- CREATE POLICY "Allow authenticated reads" ON contact_messages
--   FOR SELECT
--   TO authenticated
--   USING (true);
```

4. Haz clic en "Run" o presiona `Ctrl+Enter` (Windows) / `Cmd+Enter` (Mac)
5. Deberías ver un mensaje de éxito

## Paso 4: Obtener las credenciales de API

1. En el panel de Supabase, ve a **Settings** (ícono de engranaje)
2. Haz clic en **API**
3. Encontrarás dos valores importantes:
   - **Project URL**: Copia esta URL (ej: `https://xxxxxxxxxxxxx.supabase.co`)
   - **anon public key**: Copia esta clave (empieza con `eyJ...`)

## Paso 5: Configurar variables de entorno en Vercel

1. Ve a tu proyecto en [Vercel](https://vercel.com)
2. Haz clic en tu proyecto
3. Ve a **Settings** → **Environment Variables**
4. Agrega las siguientes variables:

   - **Nombre**: `SUPABASE_URL`
     **Valor**: Tu Project URL de Supabase
     **Environment**: Production, Preview, Development (marca todas)

   - **Nombre**: `SUPABASE_ANON_KEY`
     **Valor**: Tu anon public key de Supabase
     **Environment**: Production, Preview, Development (marca todas)

5. Haz clic en "Save"
6. **Importante**: Si ya tenías el proyecto desplegado, necesitas hacer un nuevo deploy para que las variables de entorno surtan efecto

## Paso 6: Verificar que funciona

1. Despliega tu proyecto en Vercel (si aún no lo has hecho)
2. Completa el formulario de contacto en tu sitio web
3. Ve a Supabase → **Table Editor** → `contact_messages`
4. Deberías ver el mensaje que acabas de enviar

## Opcional: Configurar notificaciones por email

Si quieres recibir un email cada vez que alguien envíe un mensaje, puedes:

1. En Supabase, ve a **Database** → **Triggers**
2. Crea un trigger que envíe un email cuando se inserte un nuevo mensaje
3. O usa un servicio como [Zapier](https://zapier.com) o [n8n](https://n8n.io) para conectar Supabase con tu email

## Límites del plan gratuito de Supabase

- ✅ 500 MB de base de datos
- ✅ 2 GB de ancho de banda
- ✅ 2 millones de requests por mes
- ✅ 50,000 usuarios activos mensuales

Esto es más que suficiente para un portafolio personal. Si en el futuro necesitas más, puedes actualizar a un plan de pago.

## Solución de problemas

### Error: "Variables de entorno de Supabase no configuradas"
- Verifica que agregaste las variables de entorno en Vercel
- Asegúrate de hacer un nuevo deploy después de agregar las variables

### Error: "Error al guardar el mensaje"
- Verifica que la tabla `contact_messages` existe en Supabase
- Verifica que las políticas RLS están configuradas correctamente
- Revisa los logs de Vercel para ver el error específico

### Los mensajes no aparecen en la tabla
- Verifica que las políticas RLS permiten inserción desde anon
- Verifica que el nombre de la tabla es exactamente `contact_messages`

## ¡Listo!

Ahora tu formulario de contacto está completamente funcional y los mensajes se guardan en Supabase de forma gratuita. Puedes ver todos los mensajes en el dashboard de Supabase en cualquier momento.

