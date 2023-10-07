const express = require('express');
const redis = require('redis');
const util = require('util');
const { faker } = require('@faker-js/faker');
const app = express();
require('dotenv').config();
const CHANNEL_NAME = 'messages';

const port = process.env.PORT || 3004;
const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD
});


const publishAsync = util.promisify(client.publish).bind(client);
async function publishMessage() {
  const message = {
    message: faker.lorem.sentence(),
    timestamp: new Date().toString(),
    priority: Math.floor(Math.random() * 10) + 1,
  };

  try {
    if (client.connected) {
      const reply = await publishAsync(CHANNEL_NAME, JSON.stringify(message));
      console.log('Message published:', reply);
    } else {
      throw new Error('Redis client is not connected.');
    }
  } catch (err) {
    console.error('Redis Publish Error:', err);
  }
}

const messagesPerSecond = 20;
const intervalMilliseconds = 1000 / messagesPerSecond;
const intervalId = setInterval(publishMessage, intervalMilliseconds);
setTimeout(() => {
  clearInterval(intervalId);
  client.quit(); // Close the Redis connection gracefully
  console.log('Publisher stopped.');
}, 60000);

app.listen(port, () => {
  console.log(`Publisher is running on port ${port}`);
});
