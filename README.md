# High-Volume Data Input Simulation


## Technology Stack

- **Message Queue**: [Choose an open-source message queue system]
- **Backend (Publisher)**: Node.js
- **Backend (Subscriber)**: Node.js
- **Frontend**: React.js
- **Real-Time Communication**: Socket.IO
- **Containerization**: Docker

## Project Overview

This project aims to simulate a high-volume data input environment using the specified technology stack. It involves the following components:

- A message queue to handle data.
- A Node.js backend responsible for publishing random messages to the message queue at a rate of 20 messages per second.
- Another Node.js backend that subscribes to the message queue, filters messages with a priority of 7 or higher, and pushes them to the frontend via Socket.IO.
- A React.js frontend that receives and displays real-time messages.
# Run the application
Access the application in your web browser at http://localhost:3000.

# Usage
Start the Node.js publisher backend to generate and publish random messages.
Start the Node.js subscriber backend to filter messages and push them to the frontend.
Launch the React.js frontend to view and display real-time messages.
## Architecture and Design

This application follows a microservices architecture with the following components:

- **Publisher**: Responsible for generating random messages and publishing them to Redis.
- **Subscriber**: Listens to Redis for messages with a priority of 7 or higher and sends them to the frontend.
- **Frontend**: A React.js application that displays real-time messages received via Socket.IO.

## TO-DOs

- [ ] Implement error handling for Redis connection issues.
- [ ] Add unit tests for the subscriber component.
- [ ] Improve frontend styling and responsiveness.
