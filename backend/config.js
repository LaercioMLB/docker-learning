function loadConfig(env = process.env) {
  const mongoUri = (env.MONGO_URI || '').trim();
  if (!mongoUri.startsWith('mongodb://') && !mongoUri.startsWith('mongodb+srv://')) {
    throw new Error('MONGO_URI e obrigatoria e deve usar mongodb:// ou mongodb+srv://.');
  }

  const portValue = env.PORT === undefined ? '5000' : env.PORT;
  const port = Number(portValue);
  if (!/^\d+$/.test(portValue) || !Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT deve ser um inteiro entre 1 e 65535.');
  }

  const corsOrigins = (env.CORS_ORIGINS ?? 'http://localhost:3000,http://localhost')
    .split(',').map(origin => origin.trim()).filter(Boolean);
  if (!corsOrigins.length || corsOrigins.some(origin => {
    try {
      const url = new URL(origin);
      return !['http:', 'https:'].includes(url.protocol) || url.origin !== origin;
    } catch {
      return true;
    }
  })) {
    throw new Error('CORS_ORIGINS deve conter origens HTTP/HTTPS separadas por virgula, sem caminhos.');
  }

  return { mongoUri, port, corsOrigins };
}

module.exports = { loadConfig };
