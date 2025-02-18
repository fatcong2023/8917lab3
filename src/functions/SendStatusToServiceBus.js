const { app } = require('@azure/functions');
const df = require("durable-functions");
const { ServiceBusClient } = require("@azure/service-bus");

df.app.activity("SendStatusToServiceBus", {
  handler: async (results, context) => {
    console.log("Starting Service Bus status sending activity.");
    console.log("Results received:", results);

    // Retrieve the connection string from environment variables
    const connectionString = process.env.ServiceBusConnection;
    const queueName = "lab3"; // Make sure this matches your Service Bus queue name

    const sbClient = new ServiceBusClient(connectionString);
    const sender = sbClient.createSender(queueName);

    try {
      // Here we're sending the entire results array as a single message.
      // Adjust the message format as needed.
      console.log("RESULTS:", results);
      await sender.sendMessages({ body: results });
      console.log("Results have been sent to Service Bus.");
    } catch (error) {
      console.log.error("Error sending message to Service Bus:", error);
      throw error;
    } finally {
      await sender.close();
      await sbClient.close();
    }

    return; // Or return some confirmation value if needed.
  }
});
