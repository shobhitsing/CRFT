import React, { useState } from 'react';
import { X, ArrowLeft } from 'lucide-react';
import type { Product } from '../types';

interface GenieDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product;
}

interface Message {
  id: string;
  sender: 'genie' | 'user';
  text: string;
  time: string;
}

export const GenieDrawer: React.FC<GenieDrawerProps> = ({ isOpen, onClose, product }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');

  if (!isOpen) return null;

  const quickQueries = [
    { icon: '🔍', text: `What changed in ${product?.name || 'Night Repair Serum'}?` },
    { icon: '📦', text: 'Check PPWR Packaging conformity' },
    { icon: '🌿', text: 'Verify Cruelty-Free dossier status' },
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    setTimeout(() => {
      let responseText = `I have verified the master record against the latest statutory guidelines.`;

      if (text.toLowerCase().includes('what changed') || text.toLowerCase().includes('night repair serum')) {
        responseText = `Recent telemetry and change log for Night Repair Serum 50ml:
• Vetro Verde heavy-metal declaration expires 12 Sep (needed for Recyclable claim).
• PackWorks PFAS certification for the outer sleeve is awaiting reply.
• Formula safety dossier and toxicology limits remain 100% compliant and active.`;
      } else if (text.toLowerCase().includes('ppwr') || text.toLowerCase().includes('packaging')) {
        responseText = `Under EU PPWR Article 11, the "eco-friendly packaging" claim flagged on the front panel requires third-party certified recycled content proof. CRFT recommends switching to "100% Recyclable Glass Flacon" to qualify for green lane approval.`;
      } else if (text.toLowerCase().includes('cruelty') || text.toLowerCase().includes('vegan') || text.toLowerCase().includes('status')) {
        responseText = `Both GCRS Certified Vegan and GCRS Cruelty-Free qualifications are verified against the INCI formula dossier. Zero animal testing declared past the cut-off date (Jan 2022). Ready to license marks.`;
      } else {
        responseText = `Verified against deterministic compliance models. All extracted values are cross-checked with certified supplier declarations and active EU + UK ledgers.`;
      }

      const genieMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'genie',
        text: responseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, genieMsg]);
    }, 450);
  };

  return (
    <div className="genie-drawer-overlay" onClick={onClose}>
      <div className="genie-drawer-container" onClick={(e) => e.stopPropagation()}>
        <div className="genie-drawer-header">
          <div className="flex items-center gap-3">
            <div className="genie-avatar-orb" />
            <div>
              <h3 className="font-bold text-[#0f172a] text-[15px] leading-tight">
                CRFT Genie
              </h3>
              <p className="text-[12px] font-semibold text-[#059669] flex items-center mt-0.5">
                <span className="genie-status-dot" />
                Active & Governed
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-[#64748b] hover:text-[#0f172a] transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="genie-chat-body">
          {messages.length === 0 ? (
            <div>
              <p className="genie-intro-text">
                CRFT AI monitors your portfolio dossiers, flags regulatory changes, and prepares instant compliance filings.
              </p>

              <div className="genie-quick-header">QUICK QUERIES</div>

              <div className="genie-quick-list">
                {quickQueries.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSend(item.text)}
                    className="genie-quick-card"
                  >
                    <span className="text-base">{item.icon}</span>
                    <span>{item.text}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col flex-1">
              <button
                type="button"
                onClick={() => setMessages([])}
                className="self-start text-[11px] text-[#64748b] hover:text-[#0f172a] flex items-center gap-1 mb-3 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to quick queries</span>
              </button>

              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[88%] rounded-2xl p-3 text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-[#182230] text-white rounded-tr-none'
                          : 'bg-[#f8fafc] text-[#1e293b] border border-[#e2e8f0] rounded-tl-none'
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.text}</p>
                    </div>
                    <span className="text-[9.5px] text-[#94a3b8] mt-1 px-1">{msg.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="genie-chat-footer">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="genie-input-row"
          >
            <input
              type="text"
              placeholder="Ask CRFT Genie anything..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="genie-input-field"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="genie-ask-btn"
            >
              Ask
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
