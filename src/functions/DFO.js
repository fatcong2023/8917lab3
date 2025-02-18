// DurableFanOutInTrigger/index.js
const df = require("durable-functions");

df.app.orchestration("DFO", function* (context) {
  // 从输入中获取 URL 列表
  const input = context.df.getInput();
  const urls = input.urls;
  const tasks = [];
  
  console.log(input);
  // Fan-out：为每个 URL 调用 CheckUrlStatus Activity 函数
  for (const url of urls) {
    tasks.push(context.df.callActivity("CheckUrlStatus", url));
  }
  
  // Fan-in：等待所有 Activity 函数返回结果
  const results = yield context.df.Task.all(tasks);
  context.log("所有 URL 检查结果：", results);
  
  // 调用 Activity 函数，将结果发送到 Service Bus 队列
  yield context.df.callActivity("SendStatusToServiceBus", results);
  
  return results;
});
