"use client";
import React, { useRef } from 'react';
import UserMessage from './UserMessage';
import AgentMessage from './AgentMessage';
import InputBar from './InputBar';
import ErrorResponse from './ErrorResponse';
import { createSession, runQuery } from '@/lib/utils/api';
import cuid from 'cuid';

type RestaurantCard = {
  name: string;
  description: string;
  image: string;
};

type UserMessage = {
  type: 'user';
  text: string;
};

type AgentMessage = {
  type: 'agent';
  text: string;
  card?: RestaurantCard;
};

type ErrorMessage = {
  type: 'error';
  errorType: string;
  message?: string;
};

type Message = UserMessage | AgentMessage | ErrorMessage;

type LocationApiResponse =
  | { status: 'success'; data: RestaurantCard }
  | { status: 'noResults'; data: null };


function ChatWindow() {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [sessionId, setSessionId] = React.useState<string | null>(null);
  const appName = 'amala_finder_agent';
  const userId = 'u_123';
  const sessionStarted = useRef(false);

  // Start session on first message
  const ensureSession = async () => {
    if (!sessionStarted.current) {
      const sid = `s_${cuid()}`;
      await createSession(appName, userId, sid);
      setSessionId(sid);
      sessionStarted.current = true;
      return sid;
    }
    return sessionId;
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { type: 'user', text: input }]);
    setInput('');
    setIsLoading(true);
    try {
      // Ensure session
      let sid = sessionId;
      if (!sid) {
        sid = await ensureSession();
      }
      // Send message to API
      const result = await runQuery({ appName, userId, sessionId: sid!, text: input });
      // Parse agent response (customize as needed)
      if (result?.reply) {
        setMessages(prev => [
          ...prev,
          { type: 'agent', text: result.reply },
        ]);
      } else {
        setMessages(prev => [
          ...prev,
          { type: 'error', errorType: 'noReply', message: 'No reply from agent.' },
        ]);
      }
    } catch (error) {
      setMessages(prev => [
        ...prev,
        { type: 'error', errorType: 'apiFailure', message: typeof error === 'object' && error !== null && 'message' in error ? String((error as { message?: unknown }).message) : undefined },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[80vh] bg-[#0A0A0A] p-4">
      <div className="flex-1 overflow-y-auto space-y-4 flex flex-col-reverse">
        {messages.slice().reverse().map((msg, index) => {
          const key = messages.length - 1 - index; // Reverse key to match order
          if (msg.type === 'user') {
            return <UserMessage key={key} text={msg.text} />;
          } else if (msg.type === 'agent' && msg.card) {
            return <AgentMessage key={key} text={msg.text} card={msg.card} />;
          } else if (msg.type === 'error') {
            return <ErrorResponse key={key} type={msg.errorType} message={msg.message} />;
          }
          return null;
        })}
        {isLoading && (
          <div className="flex items-start gap-2 max-w-md ml-auto">
            <div className="bg-[#1E1E1E] text-white px-4 py-4 rounded-2xl border-2 border-lime-500 shadow w-full flex items-center">
              <span className="animate-pulse">Typing...</span>
            </div>
          </div>
        )}
      </div>
      <InputBar input={input} setInput={setInput} onSend={handleSend} />
    </div>
  );
}

// Mock API function for location data
// const fetchLocationData = (query: string): Promise<LocationApiResponse> => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (query.toLowerCase().includes('invalid')) {
//         reject(new Error('Backend error: Invalid query'));
//       } else if (query.toLowerCase().includes('none')) {
//         resolve({ status: 'noResults', data: null });
//       } else {
//         resolve({
//           status: 'success',
//           data: { name: 'Iya Basira Amala Joint', description: 'Authentic Amala & Ewedu soup', image: '/amala.jpg' },
//         });
//       }
//     }, 2000);
//   });
// };

export default ChatWindow;