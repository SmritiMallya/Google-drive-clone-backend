export const logger = (msg, type = "info") => {
  const timestamp = new Date().toISOString();
  console.log(`[${type.toUpperCase()}] ${timestamp}: ${msg}`);
};
