// HTTPTrigger/index.js
const df = require("durable-functions");
const { app } = require('@azure/functions');

app.http('HTTPTrigger', {
  methods: ['POST'],
  authLevel: 'anonymous',
  extraInputs: [df.input.durableClient()],
  handler: async (request, context) => {
    context.log('HTTPTrigger Received a request');
    
    const urlList = [
      "https://www.google.ca",
      "https://www.bing.com",
      "https://www.yahoo.com"
    ];

    // 使用 Durable Functions 客户端启动编排
    const client = df.getClient(context);
    const instanceId = await client.startNew("DFO", undefined, JSON.stringify({ urls: urlList }));
    context.log(`启动编排函数，实例 ID = ${instanceId}`);
    
    return client.createCheckStatusResponse(request, instanceId);
  }
});
