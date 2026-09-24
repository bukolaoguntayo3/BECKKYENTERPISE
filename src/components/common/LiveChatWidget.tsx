import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, ShieldCheck, Sparkles, User, Bot } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const LiveChatWidget: React.FC = () => {
  const { isChatOpen, setIsChatOpen, chatMessages, sendChatMessage } = useShop();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isChatOpen) {
      scrollToBottom();
    }
  }, [chatMessages, isChatOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendChatMessage(inputText);
    setInputText('');
  };

  const handleQuickQuestion = (question: string) => {
    sendChatMessage(question);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Floating Toggle Button */}
      {!isChatOpen ? (
        <button
          onClick={() => setIsChatOpen(true)}
          className="group relative flex items-center gap-2.5 bg-[#0B1B33] text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-xl hover:bg-amber-600 transition-all duration-200 border border-amber-400/30"
          aria-label="Open Live Luxury Concierge"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5 text-amber-300 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-[#0B1B33]" />
          </div>
          <span className="hidden sm:inline text-xs font-bold tracking-wide">
            Luxury Concierge
          </span>
        </button>
      ) : (
        /* Expanded Chat Panel */
        <div className="w-[92vw] sm:w-96 max-h-[550px] h-[520px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-[#0B1B33] p-4 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-bold font-serif-luxury text-white">
                    BECKKYENTERPRISE
                  </h3>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
                <p className="text-[10px] text-slate-300">Live Luxury Client Concierge</p>
              </div>
            </div>

            <button
              onClick={() => setIsChatOpen(false)}
              className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Close Chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick FAQ Prompts bar */}
          <div className="bg-slate-50 border-b border-slate-200 px-3 py-2 flex items-center gap-1.5 overflow-x-auto text-[11px] no-scrollbar">
            <button
              onClick={() => handleQuickQuestion('Are all gold pieces genuine solid gold?')}
              className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-amber-400 whitespace-nowrap"
            >
              Gold Authenticity
            </button>
            <button
              onClick={() => handleQuickQuestion('How fast is international delivery?')}
              className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-amber-400 whitespace-nowrap"
            >
              Shipping ETA
            </button>
            <button
              onClick={() => handleQuickQuestion('Tell me about the Marine Collagen & Glutathione supplement.')}
              className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-amber-400 whitespace-nowrap"
            >
              Supplements
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#F8F9FA] text-xs">
            {chatMessages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2 ${isUser ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[10px] ${
                      isUser
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'bg-[#0B1B33] text-amber-300 font-bold'
                    }`}
                  >
                    {isUser ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                  </div>

                  <div
                    className={`max-w-[78%] rounded-2xl p-3 shadow-2xs ${
                      isUser
                        ? 'bg-[#0B1B33] text-white rounded-tr-xs'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-tl-xs'
                    }`}
                  >
                    <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    <span
                      className={`text-[9px] mt-1 block ${
                        isUser ? 'text-slate-300 text-right' : 'text-slate-400'
                      }`}
                    >
                      {msg.time}
                    </span>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask a question or request styling advice..."
              className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-lg outline-none focus:border-amber-500 placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2 rounded-lg bg-[#0B1B33] text-white hover:bg-amber-600 transition-colors disabled:opacity-40"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Trust reassurance footer */}
          <div className="bg-slate-50 py-1.5 px-3 border-t border-slate-200 text-[10px] text-slate-500 text-center flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            <span>24/7 Monitored VIP Concierge · Confidential</span>
          </div>
        </div>
      )}
    </div>
  );
};
