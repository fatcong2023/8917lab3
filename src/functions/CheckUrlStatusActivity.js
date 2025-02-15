// CheckUrlStatus/index.js
const { app } = require('@azure/functions');

app.activity("CheckUrlStatus", {
  handler: async (url, context) => {
    context.log(`开始检查 URL: ${url}`);
    try {
      const response = await fetch(url, { method: 'GET' });
      if (response.ok) {
        return `URL ${url} 状态正常 (状态码: ${response.status})`;
      } else {
        return `URL ${url} 返回错误状态 ${response.status}`;
      }
    } catch (error) {
      return `URL ${url} 检查失败：${error.message}`;
    }
  }
});
