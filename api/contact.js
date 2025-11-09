// API endpoint para recibir mensajes del formulario de contacto
// Usando Supabase (base de datos PostgreSQL con API REST)
// Esta función se ejecuta en Vercel Serverless Functions

export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { name, email, company, message } = req.body;

    // Validar campos requeridos
    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Faltan campos requeridos: name, email, message' 
      });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Email inválido' });
    }

    // Obtener variables de entorno de Supabase
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Variables de entorno de Supabase no configuradas');
      return res.status(500).json({ 
        error: 'Error de configuración del servidor. Verifica que las variables de entorno SUPABASE_URL y SUPABASE_ANON_KEY estén configuradas en Vercel.' 
      });
    }

    // Enviar datos a Supabase usando la API REST
    const response = await fetch(`${supabaseUrl}/rest/v1/contact_messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        name,
        email,
        company: company || null,
        message,
        created_at: new Date().toISOString()
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error de Supabase:', response.status, errorText);
      return res.status(500).json({ 
        error: 'Error al guardar el mensaje',
        details: process.env.NODE_ENV === 'development' ? errorText : undefined
      });
    }

    // Respuesta exitosa
    return res.status(200).json({ 
      success: true,
      message: 'Mensaje recibido correctamente' 
    });

  } catch (error) {
    console.error('Error en el endpoint:', error);
    return res.status(500).json({ 
      error: 'Error interno del servidor',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

