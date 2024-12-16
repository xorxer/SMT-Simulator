"use client";

import { useEffect, useState } from 'react';

const WebSocketTest = () => {
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:4000');

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessage(data.message);
    };

    ws.onopen = () => {
      console.log('WebSocket connection opened');
      ws.send(JSON.stringify({ message: 'Hello from the client!' }));
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <h1>WebSocket Test</h1>
      <p>Message from server: {message}</p>
    </div>
  );
};

export default WebSocketTest;
