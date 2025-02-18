// BlobStorageTrigger/index.js
const { app } = require('@azure/functions');

app.storageBlob('BlobStorageTrigger', {
  connection: 'AzureWebJobsStorage', // 存储账户连接字符串的环境变量
  path: 'lab3/{name}', // 请确保容器名称与：https://8917lab3xiao.blob.core.windows.net/lab3 一致
  handler: async (context, blob) => {
    context.log("BlobStorageTrigger 处理了新上传的 Blob。最终报告内容：");
    context.log(blob);
  }
});
