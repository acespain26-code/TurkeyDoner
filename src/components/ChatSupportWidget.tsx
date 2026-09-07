import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { RESTAURANT_INFO } from '../data/menuData';
import { 
  MessageCircle, 
  X, 
  Send, 
  Headphones, 
  ChevronRight
} from 'lucide-react';

export const ChatSupportWidget: React.FC = () => {
  const {
    isChatOpen,
    setIsChatOpen,
    chatMessages,
    sendChatMessage,
    setIsTrackingOpen,
    language,
    t,
  } = useStore();

  const [inputVal, setInputVal] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isChatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isChatOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    sendChatMessage(inputVal.trim());
    setInputVal('');
  };

  const handleActionClick = (actionKey: string) => {
    if (actionKey === 'horario') {
      sendChatMessage(language === 'es' ? '¿Cuál es el horario de apertura y reparto a domicilio?' : 'What are your opening hours and delivery times?');
    } else if (actionKey === 'estado_pedido') {
      sendChatMessage(language === 'es' ? '¿Dónde está mi pedido?' : 'Where is my order?');
    } else if (actionKey === 'halal') {
      sendChatMessage(language === 'es' ? '¿Es carne 100% Halal?' : 'Is your meat 100% Halal?');
    } else if (actionKey === 'telefono') {
      sendChatMessage(language === 'es' ? '¿Cuál es el teléfono para encargos?' : 'What is the phone number for orders?');
    } else if (actionKey === 'open_tracking') {
      setIsChatOpen(false);
      setIsTrackingOpen(true);
    } else if (actionKey === 'ver_menu') {
      setIsChatOpen(false);
      const el = document.getElementById('carta-menu');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (actionKey === 'google_review') {
      window.open(RESTAURANT_INFO.googleProfileUrl, '_blank');
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      {!isChatOpen && (
        <button
          id="open-chat-widget-btn"
          type="button"
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-5 right-5 z-40 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white p-3.5 sm:p-4 rounded-2xl shadow-xl shadow-amber-900/20 flex items-center gap-2.5 transition-all hover:scale-105 active:scale-95 group cursor-pointer"
          aria-label={language === 'es' ? 'Abrir chat de soporte' : 'Open support chat'}
        >
          <div className="relative">
            <MessageCircle className="w-6 h-6" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 absolute -top-0.5 -right-0.5 ring-2 ring-amber-700" />
          </div>
          <span className="hidden sm:inline font-bold text-xs tracking-wide">
            {t('needHelpChat')}
          </span>
        </button>
      )}

      {/* Expandable Chat Window */}
      {isChatOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col h-[500px] max-h-[80vh] text-stone-900 animate-in fade-in slide-in-from-bottom-5">
          
          {/* Header */}
          <div className="bg-stone-900 text-white p-3.5 sm:p-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center text-white">
                <Headphones className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm leading-none">
                  {language === 'es' ? 'Soporte Turki-Pollito' : 'Turki-Pollito Support'}
                </h3>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] text-stone-300">
                    {language === 'es' ? 'En línea · La Zubia' : 'Online · La Zubia'}
                  </span>
                </div>
              </div>
            </div>

            <button
              id="close-chat-widget-btn"
              type="button"
              onClick={() => setIsChatOpen(false)}
              className="w-7 h-7 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Info Bar */}
          <div className="bg-amber-50 px-3 py-1.5 border-b border-amber-200/80 text-[11px] text-amber-900 flex items-center justify-between">
            <span>📞 {language === 'es' ? 'Encargos:' : 'Orders:'} 958 890 208</span>
            <span className="font-bold">
              {language === 'es' ? 'Mínimo 10€ domicilio' : 'Min. €10 delivery'}
            </span>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3 bg-stone-50 text-xs">
            {chatMessages.map((msg) => {
              const isBot = msg.sender === 'bot';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed whitespace-pre-line ${
                      isBot
                        ? 'bg-white text-stone-800 border border-stone-200 shadow-2xs'
                        : 'bg-amber-700 text-white font-medium shadow-2xs'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Actions / Suggestion chips if present */}
                  {isBot && msg.actions && (
                    <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                      {msg.actions.map((act, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleActionClick(act.actionKey)}
                          className="bg-white hover:bg-amber-50 border border-amber-300/80 text-amber-900 text-[11px] font-semibold px-2.5 py-1 rounded-lg shadow-2xs transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <span>{act.label}</span>
                          <ChevronRight className="w-3 h-3 text-amber-600" />
                        </button>
                      ))}
                    </div>
                  )}

                  <span className="text-[9px] text-stone-400 mt-1 px-1 font-mono">
                    {msg.timestamp}
                  </span>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSend}
            className="p-3 bg-white border-t border-stone-200 shrink-0 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={t('chatInputPlaceholder')}
              className="flex-1 bg-stone-100 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-600/30"
            />
            <button
              id="send-chat-msg-btn"
              type="submit"
              disabled={!inputVal.trim()}
              className={`p-2 rounded-xl text-white transition-colors cursor-pointer ${
                inputVal.trim()
                  ? 'bg-amber-700 hover:bg-amber-800'
                  : 'bg-stone-300 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
