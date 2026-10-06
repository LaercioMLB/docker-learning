const test = require('node:test');
const assert = require('node:assert/strict');
const { loadConfig } = require('./config');

const mongoUri = 'mongodb://example:27017/test';

test('requires a MongoDB URI without exposing its value in errors', () => {
  for (const value of [undefined, '', 'http://user:secret@example']) {
    assert.throws(() => loadConfig({ MONGO_URI: value }), error =>
      error.message.includes('MONGO_URI') && !error.message.includes('secret'));
  }
});

test('uses local defaults and accepts MongoDB SRV', () => {
  const config = loadConfig({ MONGO_URI: 'mongodb+srv://example/test' });
  assert.equal(config.port, 5000);
  assert.deepEqual(config.corsOrigins, ['http://localhost:3000', 'http://localhost']);
});

test('reads the configured port and trims multiple origins', () => {
  const config = loadConfig({ MONGO_URI: mongoUri, PORT: '8080',
    CORS_ORIGINS: ' https://app.example, http://localhost:30080 ' });
  assert.equal(config.port, 8080);
  assert.deepEqual(config.corsOrigins, ['https://app.example', 'http://localhost:30080']);
});

test('rejects invalid ports', () => {
  for (const port of ['', '0', '-1', '65536', '5000.5', 'abc', '5e3']) {
    assert.throws(() => loadConfig({ MONGO_URI: mongoUri, PORT: port }), /PORT/);
  }
});

test('rejects empty, wildcard and malformed CORS origins', () => {
  for (const origins of ['', ',', '*', 'example.com', 'https://app.example/path']) {
    assert.throws(() => loadConfig({ MONGO_URI: mongoUri, CORS_ORIGINS: origins }), /CORS_ORIGINS/);
  }
});
