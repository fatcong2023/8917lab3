const df = require("durable-functions");

df.app.orchestration("DFO", function* (context) {
  const input = context.df.getInput();
  const inputRaw = context.df.getInput();
  console.log("Orchestrator received raw input:", inputRaw);

  // Validate input
  if (!input || !Array.isArray(input.urls)) {
    var urls = [
      "https://www.google.ca",
      "https://www.bing.com",
      "https://www.yahoo.com"
    ];
  } else {
    urls = input.urls;
  }
  
  const tasks = [];
  
  // Fan-out: call CheckUrlStatus activity for each URL
  for (const url of urls) {
    tasks.push(context.df.callActivity("CheckUrlStatus", url));
  }
  
  // Fan-in: wait for all activity tasks to complete
  const results = yield context.df.Task.all(tasks);
  console.log("All results: ", results);
  
  // Call activity to send results to Service Bus
  yield context.df.callActivity("SendStatusToServiceBus", results);
  
  return results;
});
