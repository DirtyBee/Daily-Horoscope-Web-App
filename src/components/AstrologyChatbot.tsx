import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Send, Mic, X } from 'lucide-react';

interface Message {
  text: string;
  isUser: boolean;
}

const AstrologyChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, isUser: true }]);
      // Here you would typically send the message to a backend or AI service
      // For now, we'll just echo the message back
      setTimeout(() => {
        setMessages(prev => [...prev, { text: `You said: ${input}`, isUser: false }]);
      }, 1000);
      setInput('');
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // Here you would typically implement speech recognition
    // For now, we'll just toggle the state
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition duration-300 z-50"
      >
        <Sparkles size={24} />
      </button>
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 h-96 bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-lg overflow-hidden z-50 flex flex-col">
          <div className="bg-indigo-600 bg-opacity-50 text-white p-4 flex justify-between items-center">
            <h3 className="text-xl font-light">AI Astrology Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-3/4 p-2 rounded-lg ${message.isUser ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 bg-white bg-opacity-20">
            <div className="flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about your stars..."
                className="flex-1 bg-transparent border-none focus:outline-none text-white placeholder-gray-300"
              />
              <button onClick={toggleListening} className={`mr-2 ${isListening ? 'text-red-500' : 'text-white'}`}>
                <Mic size={20} />
              </button>
              <button onClick={handleSend} className="text-white">
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AstrologyChatbot;