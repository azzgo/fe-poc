
const configSchemaMap = new Map();

export function registerConfigSchema(key, configSchema) {

  if (configSchemaMap.has(key)) {
    throw new Error(`[key] ${key} already registered.`);
  }

  configSchemaMap.set(key, configSchema);

}

export function resolveConfigSchema(key) {
  return configSchemaMap.get(key);
}

export function resetConfigSchema() {
  configSchemaMap.clear();
}
