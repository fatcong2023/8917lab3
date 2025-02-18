const { app } = require('@azure/functions');
const { BlobServiceClient } = require('@azure/storage-blob');
const { v4: uuidv4 } = require('uuid'); // For generating unique blob names

app.serviceBusQueue('ServiceBusQueueTrigger', {
  connection: 'ServiceBusConnection',
  queueName: 'lab3',
  handler: async (context, message) => {
    console.log("full context ", context);
    // console.log("ServiceBusQueueTrigger received message:", message);

    // Convert the message to a text format report
    const reportContent = typeof context === 'object'
      ? JSON.stringify(context, null, 2)
      : context.toString();

    // Use the Azure Blob Storage SDK to upload the report
    try {
      const connectionString = process.env.AzureWebJobsStorage;
      const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

      // Get a container client (this container must exist or you can create it)
      const containerName = 'reports';
      const containerClient = blobServiceClient.getContainerClient(containerName);
      // Create the container if it doesn't exist
      await containerClient.createIfNotExists();

      // Generate a unique blob name
      const blobName = `${uuidv4()}.txt`;
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      // Upload the report content to the blob
      await blockBlobClient.upload(reportContent, Buffer.byteLength(reportContent));

      console.log(`Report uploaded to Blob Storage as: ${blobName}`);
    } catch (error) {
      console.error("Error uploading to Blob Storage:", error);
      throw error;
    }
  }
});
