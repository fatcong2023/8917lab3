// ServiceBusQueueTrigger/index.js
const { app } = require('@azure/functions');

app.serviceBusQueue('ServiceBusQueueTrigger', {
  connection: 'ServiceBusConnection', // 请确保该环境变量已配置好 Service Bus 连接字符串
  queueName: 'lab3', // 与上面 activity 中的队列名称保持一致
  handler: async (context, message) => {
    context.log("ServiceBusQueueTrigger 收到消息：", message);
    
    // 将消息转换为文本格式报告
    const reportContent = typeof message === 'object'
      ? JSON.stringify(message, null, 2)
      : message.toString();
    
    // 输出绑定：将报告内容上传到 Blob 存储（绑定名称 outputBlob 应在 function.json 中配置）
    context.bindings.outputBlob = reportContent;
    context.log("报告通过输出绑定上传到 Blob 存储。");
  }
});
