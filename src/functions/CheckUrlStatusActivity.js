const { app } = require('@azure/functions');
const df = require("durable-functions");

df.app.activity("CheckUrlStatus", {
  handler: async (url, context) => {
    console.log(`Starting URL check: ${url}`);
    try {
      const response = await fetch(url, { method: 'GET' });
      if (response.ok) {
        return `URL ${url} is healthy (status code: ${response.status})`;
      } else {
        return `URL ${url} returned error status ${response.status}`;
      }
    } catch (error) {
      return `URL ${url} check failed: ${error.message}`;
    }
  }
});
