import React, { useState } from 'react';
import styles from './styles.module.css';
import SendWait from '@/assets/chain-gpt/send-wait.svg';
import SendReady from '@/assets/chain-gpt/send-ready.svg';
import Image from 'next/image';

export const ChatInput = ({
                     sendMessage
                   }) => {
  const [message, setMessage] = useState('');
  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSend = () => {
    if (message.trim() === '') {
      return;
    }
    sendMessage(message);
    setMessage('');
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="flex px-[16px]">
      <div className="flex-1">
        <input
          className={styles.inputCustomPlaceholder}
          type="text"
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything..."
        />
      </div>
      <div className="w-[24px] flex justify-center">
        <Image
          onClick={handleSend}
          src={message.trim() ? SendReady : SendWait}
          alt="send ready"
        />
      </div>
    </div>
  );
};
