// TimeTrigger/index.js
const { app } = require('@azure/functions');

app.timer('TimeTrigger', {
  schedule: '*/5 * * * *',
  handler: async (context) => {
    const httpTriggerUrl = process.env.HTTP_TRIGGER_URI;
    if (!httpTriggerUrl) {
        console.log('Error HTTP_TRIGGER_URI not configured');
      return;
    }
    try {
      const response = await fetch(httpTriggerUrl, { method: 'POST' });
    } catch (error) {
        console.log('HTTPTrigger error', error);
    }
  }
});
