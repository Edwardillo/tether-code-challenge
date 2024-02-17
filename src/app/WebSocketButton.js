import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBook } from "./store";

const WebSocketButton = () => {
  const [websocket, setWebsocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const currentPresicion = useSelector((state) => state.books.presicion);
  const dispatch = useDispatch();

  useEffect(() => {
    if (websocket) {
      websocket.send(
        JSON.stringify({
          event: "subscribe",
          channel: "book",
          symbol: "tBTCUSD",
          precision: currentPresicion,
        }),
      );
    }
  }, [currentPresicion]);

  useEffect(() => {
    return () => {
      if (websocket) {
        websocket.close();
      }
    };
  }, []);

  const connectWebSocket = () => {
    const ws = new WebSocket("ws://api-pub.bitfinex.com/ws/2");

    ws.onopen = () => {
      setIsConnected(true);
      ws.send(
        JSON.stringify({
          event: "subscribe",
          channel: "book",
          symbol: "tBTCUSD",
          precision: currentPresicion,
        }),
      );
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (Array.isArray(data)) {
        const [channelId, ...rest] = data;

        dispatch(addBook(rest.flat()));
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
    };

    setWebsocket(ws);
  };

  const disconnectWebSocket = () => {
    if (websocket) {
      websocket.close();
    }
  };

  const toggleConnection = () => {
    if (isConnected) {
      disconnectWebSocket();
    } else {
      connectWebSocket();
    }
  };

  return (
    <button onClick={toggleConnection}>
      {isConnected ? "Disconnect" : "Connect"}
    </button>
  );
};

export default WebSocketButton;
