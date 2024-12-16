import express from 'express';
import http from 'http';
import axios from 'axios';
import { WebSocketServer, WebSocket } from 'ws'; 
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const stockSymbols = ["AAPL", "GOOGL", "MSFT"]
const apiKey = process.env.ALPHA_VANTAGE_API_KEY

wss.on('connection', (ws) => {
    console.log('A user connected');

    ws.send(JSON.stringify({ message: 'Hello from the server!' }));

    ws.on('message', (message: string) => {
        console.log('Received message: %s', message);
    });

    ws.on('close', () => {
        console.log('A user disconnected');
    });
});

const backendPort = process.env.BACKEND_PORT || 4000;

server.listen(backendPort, () => {
    console.log('Listening on port: ' + backendPort);
});