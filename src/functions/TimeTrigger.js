// TimeTrigger/index.js
const { app } = require('@azure/functions');

app.timer('TimeTrigger', {
  // 每天午夜运行一次（可根据需要调整 Cron 表达式）
  schedule: '*/5 * * * * *',
  handler: async (context) => {
    console.log('TimeTrigger 触发，调用 HTTPTrigger。');
    const httpTriggerUrl = process.env.HTTP_TRIGGER_URI;
    if (!httpTriggerUrl) {
        console.log('Error HTTP_TRIGGER_URI not configured');
      return;
    }
    try {
      // Node.js 20 LTS 中全局支持 fetch
      const response = await fetch(httpTriggerUrl, { method: 'POST' });
      console.log(`HTTPTrigger 返回状态：${response.status}`);
    } catch (error) {
        console.log('调用 HTTPTrigger 时出错：', error);
    }
  }
});
