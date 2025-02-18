const df = require("durable-functions");

df.app.orchestration("DFO", function* (context) {
  const input = context.df.getInput();
  

  context.log("CONTEXT input:", context);
  // Debug log the input
  context.log("Orchestrator input:", input);

  // Validate input
  if (!input || !Array.isArray(input.urls)) {
    throw new Error("Input must be an object with a 'urls' property that is an array");
  }
  
  const urls = input.urls;
  const tasks = [];
  
  // Fan-out: call CheckUrlStatus activity for each URL
  for (const url of urls) {
    tasks.push(context.df.callActivity("CheckUrlStatus", url));
  }
  
  // Fan-in: wait for all activity tasks to complete
  const results = yield context.df.Task.all(tasks);
  context.log("所有 URL 检查结果：", results);
  
  // Call activity to send results to Service Bus
  yield context.df.callActivity("SendStatusToServiceBus", results);
  
  return results;
});
