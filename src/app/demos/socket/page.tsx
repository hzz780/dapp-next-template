'use client';
import { io } from 'socket.io-client';
import { Button } from 'antd'
import {useEffect, useState} from 'react';
import {response} from 'express';

export default function SocketPage() {
  const [socket, setSocket] = useState<any>();
  const [answer, setAnswer] = useState<string>('');

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on('answer-chain-gpt', (socketId: string, message: string) => {
      console.log('answer-chain-gpt: ', socketId, message);
      setAnswer(message);
    });
  }, [socket]);

  return <>
    <p>Socket io demo.</p>
    <Button onClick={() => {
      const _socket = io({
        path: '/socket-io/'
      });
      console.log('_socket: ', _socket);
      setSocket(_socket);
      _socket.on("connect", () => {
        console.log(_socket); // x8WIv7-mJelg7on_ALbx
        console.log('connect !!!');
      });
    }}>Connect</Button>
    <Button onClick={() => {
      console.log('Question: ');
      socket.emit('question-chain-gpt', 'question socket case', (response: any) => {
        console.log(response.status);
        console.log(response.text);
        setAnswer(response.text);
      });
    }}>Question</Button>
    <Button onClick={() => {
      console.log('hello: ');
      socket.emit("hello", "world");
    }}>Hello</Button>
    <div>answer: </div>
    <div>{answer}</div>
  </>
}
