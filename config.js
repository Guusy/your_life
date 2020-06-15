// getConfig order: env param, production, develop, local. All are based on NODE_ENV
// getConfig priorities: env param > production > develop > local

const self = {};
const { env } = process;

self.version = '1.0';

function getConfig(processValue, productionValue, developValue, localValue) {
  if (processValue) return processValue;
  const value =
    process.env.NODE_ENV === `production`
      ? productionValue
      : process.env.NODE_ENV === `develop`
      ? developValue || productionValue
      : localValue || developValue || productionValue;
  if (typeof value === `undefined`) {
    console.log(`config value undefined`);
  }
  return value;
}

self.port = getConfig(env.PORT, 3000);

self.redis = {
  url: getConfig(env.REDISURL, 'redis', '127.0.0.1'),
  port: getConfig(env.REDISPORT, 6379)
};

self.endpoints = {
  backend: getConfig(
    env.URLBACKEND,
    `https://example.com`,
    `https://dev.example.com`,
    `http://localhost:3001`
  )
};

module.exports = self;
