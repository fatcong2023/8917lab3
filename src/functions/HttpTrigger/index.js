// HTTPTrigger/index.js
const df = require("durable-functions");
const { app } = require('@azure/functions');

app.http('HTTPTrigger', {
  methods: ['POST'],
  authLevel: 'anonymous',
  extraInputs: [df.input.durableClient()],
  handler: async (request, context) => {
    context.log('HTTPTrigger 收到请求。');
    
    // 定义要检查的 URL 列表（可根据实际情况修改或从请求中获取）
    const urlList = [
      "https://www.google.ca",
      "https://www.bing.com",
      "https://www.yahoo.com"
    ];

    // 使用 Durable Functions 客户端启动编排
    const client = df.getClient(context);
    const instanceId = await client.startNew("DFO", undefined, { urls: urlList });
    context.log(`启动编排函数，实例 ID = ${instanceId}`);
    
    return client.createCheckStatusResponse(request, instanceId);
  }
});
