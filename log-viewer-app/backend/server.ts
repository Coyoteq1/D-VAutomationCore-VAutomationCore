
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { Tail } from 'tail';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const LOG_FILE_PATH = 'D:\\DedicatedServerLauncher\\VRisingServer\\BepInEx\\LogOutput.log';
const PORT = 3001;

// Ensure log file exists or handle missing file
if (!fs.existsSync(LOG_FILE_PATH)) {
  console.error(`Log file not found: ${LOG_FILE_PATH}`);
  // In a real scenario, we might want to wait or exit. 
  // For now, let's just log it.
} else {
    console.log(`Watching log file: ${LOG_FILE_PATH}`);
    const tail = new Tail(LOG_FILE_PATH);

    tail.on("line", (data) => {
      io.emit('log-line', {
        timestamp: new Date().toISOString(),
        message: data
      });
    });

    tail.on("error", (error) => {
      console.error('Tail Error:', error);
    });
}

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  // Send a greeting or some initial data if needed
  socket.emit('status', 'Connected to log stream');

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
