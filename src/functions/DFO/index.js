const df = require("durable-functions");

module.exports = df.app.orchestration("DFO", function*(context) {
  const input = context.df.getInput();
  const urls = input.urls;
  const tasks = [];

  // Fan-out：为每个 URL 调用 Activity 函数
  for (const url of urls) {
    tasks.push(context.df.callActivity("CheckUrlStatusActivity", url));
  }

  // Fan-in：等待所有 Activity 返回结果
  const results = yield context.df.Task.all(tasks);
  return results;
});
