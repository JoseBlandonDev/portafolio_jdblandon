# Portafolio - José David Blandon Aguirre

Portafolio personal de desarrollador web freelance especializado en páginas web, automatizaciones y software a medida.

## 🚀 Tecnologías

- HTML5
- CSS3
- JavaScript (Vanilla)
- Supabase (Base de datos)
- Vercel (Hosting)

## 📋 Características

- ✅ Diseño responsive y moderno
- ✅ Formulario de contacto funcional
- ✅ Animaciones y transiciones suaves
- ✅ Optimizado para SEO
- ✅ Integración con Supabase para almacenar mensajes

## 🛠️ Configuración

### Prerrequisitos

- Node.js 18.x o superior
- Cuenta en Vercel
- Cuenta en Supabase

### Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/JoseBlandonDev/portafolio_jdblandon.git
cd portafolio_jdblandon
```

2. Instala las dependencias (si las hay):
```bash
npm install
```

### Configuración de Supabase

1. Crea un proyecto en [Supabase](https://supabase.com)
2. Crea la tabla `contact_messages` ejecutando el SQL en `CONFIGURACION_SUPABASE.md`
3. Obtén tus credenciales de API (URL y anon key)
4. Configura las variables de entorno en Vercel:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`

Para más detalles, consulta `CONFIGURACION_SUPABASE.md`

### Despliegue en Vercel

1. Conecta tu repositorio de GitHub con Vercel
2. Configura las variables de entorno
3. Vercel desplegará automáticamente

## 📁 Estructura del Proyecto

```
portafolio_jdblandon/
├── api/
│   └── contact.js          # API endpoint para el formulario de contacto
├── index.html              # Página principal
├── styles.css              # Estilos
├── script.js               # JavaScript del frontend
├── logo.png                # Logo
├── package.json            # Configuración de Node.js
├── .gitignore              # Archivos a ignorar
└── CONFIGURACION_SUPABASE.md  # Guía de configuración
```

## 🔧 Desarrollo Local

Para ejecutar el proyecto localmente:

```bash
# Instalar Vercel CLI (opcional)
npm install -g vercel

# Ejecutar en modo desarrollo
vercel dev
```

## 📚 Documentación

- `CONFIGURACION_SUPABASE.md` - Guía completa de configuración de Supabase
- `SUPABASE_SETUP.md` - Configuración detallada de Supabase
- `SUPABASE_SIN_ORGANIZACION.md` - Solución de problemas con organizaciones

## 🎨 Personalización

Puedes personalizar:
- Colores en `styles.css` (variables CSS)
- Contenido en `index.html`
- Funcionalidades en `script.js`

## 📝 Licencia

MIT License

## 👤 Autor

José David Blandon Aguirre
- Email: jdblandondev@gmail.com
- LinkedIn: [josedavidblanodn](https://linkedin.com/in/josedavidblanodn)

## 🙏 Agradecimientos

- [Vercel](https://vercel.com) por el hosting gratuito
- [Supabase](https://supabase.com) por la base de datos gratuita
- [Lucide Icons](https://lucide.dev) por los iconos

