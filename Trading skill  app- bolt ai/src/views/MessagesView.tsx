import { useState, useEffect, useRef } from 'react';
import { Send, ChevronLeft, ArrowRightLeft, Check, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Bloomer, Message as MessageType } from '../types';

interface MessagesViewProps {
  activeChatBloomer: Bloomer | null;
  onSelectChat: (bloomer: Bloomer | null) => void;
}

export default function MessagesView({ activeChatBloomer, onSelectChat }: MessagesViewProps) {
  const [bloomers, setBloomers] = useState<Bloomer[]>([]);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [tradeStatus, setTradeStatus] = useState<'pending' | 'active' | 'completed'>('pending');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchBloomers();
  }, []);

  useEffect(() => {
    if (activeChatBloomer) {
      fetchMessages(activeChatBloomer.id);
    }
  }, [activeChatBloomer]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  async function fetchBloomers() {
    setLoading(true);
    const { data } = await supabase.from('bloomers').select('*').order('match_score', { ascending: false });
    if (data) setBloomers(data as Bloomer[]);
    setLoading(false);
  }

  async function fetchMessages(bloomerId: string) {
    const { data } = await supabase
      .from('messages')
      .select('*')
      .eq('bloomer_id', bloomerId)
      .order('created_at', { ascending: true });
    if (data) setMessages(data as MessageType[]);
  }

  async function sendMessage() {
    if (!input.trim() || !activeChatBloomer) return;
    const { data, error } = await supabase
      .from('messages')
      .insert({ bloomer_id: activeChatBloomer.id, sender: 'me', text: input.trim() })
      .select()
      .single();
    if (!error && data) {
      setMessages((prev) => [...prev, data as MessageType]);
      setInput('');
    }
  }

  const acceptTrade = () => {
    setTradeStatus('active');
  };

  if (activeChatBloomer) {
    return (
      <div className="fixed inset-0 bg-bloom-cream z-50 flex flex-col lg:static lg:z-auto lg:bg-transparent">
        <div className="bg-white px-4 py-3 flex items-center gap-3 shadow-sm border-b border-bloom-warmgray">
          <button onClick={() => onSelectChat(null)} className="p-2 -ml-2 rounded-full hover:bg-bloom-warmgray lg:hidden">
            <ChevronLeft className="w-5 h-5 text-bloom-charcoal" />
          </button>
          <img src={activeChatBloomer.avatar_url || ''} alt={activeChatBloomer.name} className="w-10 h-10 rounded-full" />
          <div className="flex-1">
            <h3 className="font-heading font-bold text-sm text-bloom-charcoal">{activeChatBloomer.name}</h3>
            <p className="text-xs font-body text-bloom-charcoal/60">Age {activeChatBloomer.age} &middot; {activeChatBloomer.category}</p>
          </div>
        </div>

        {tradeStatus === 'pending' && (
          <div className="mx-4 mt-3 p-4 rounded-2xl bg-gradient-to-r from-bloom-coral to-bloom-burgundy text-white">
            <p className="text-[10px] font-body font-semibold uppercase tracking-wide opacity-80 mb-2">Pending Swap Proposal</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-white/20 rounded-xl p-2 text-center">
                <p className="text-[10px] opacity-80">YOU GIVE</p>
                <p className="text-sm font-heading font-bold">{activeChatBloomer.wants}</p>
              </div>
              <ArrowRightLeft className="w-5 h-5" />
              <div className="flex-1 bg-white/20 rounded-xl p-2 text-center">
                <p className="text-[10px] opacity-80">YOU GET</p>
                <p className="text-sm font-heading font-bold">{activeChatBloomer.offering}</p>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <button onClick={acceptTrade} className="flex-1 py-2 rounded-xl bg-white text-bloom-coral font-heading font-semibold text-sm">Accept Trade</button>
              <button onClick={() => setTradeStatus('completed')} className="flex-1 py-2 rounded-xl bg-white/20 text-white font-heading font-semibold text-sm">Decline</button>
            </div>
          </div>
        )}

        {tradeStatus === 'active' && (
          <div className="mx-4 mt-3 p-3 rounded-2xl bg-bloom-sage/20 border border-bloom-sage/30 flex items-center gap-2">
            <Check className="w-5 h-5 text-bloom-sage" />
            <p className="text-sm font-body text-bloom-charcoal">Trade accepted! You're now learning partners.</p>
          </div>
        )}

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, i) => {
            const isMe = msg.sender === 'me';
            const showTime = i === 0 || messages[i - 1]?.sender !== msg.sender;
            return (
              <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] ${isMe ? 'order-1' : ''}`}>
                  {showTime && (
                    <p className="text-[10px] font-body text-bloom-charcoal/40 mb-1 px-1">
                      {msg.created_at ? new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                    </p>
                  )}
                  <div className={`px-4 py-3 rounded-2xl text-sm font-body ${isMe ? 'bg-bloom-coral text-white rounded-br-md' : 'bg-white text-bloom-charcoal rounded-bl-md shadow-sm'}`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white px-4 py-3 flex items-center gap-2 border-t border-bloom-warmgray">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Message..."
            className="flex-1 px-4 py-3 rounded-2xl bg-bloom-warmgray text-sm font-body outline-none focus:ring-2 focus:ring-bloom-coral/30"
          />
          <button onClick={sendMessage} className="w-11 h-11 rounded-full gradient-sunflower-coral flex items-center justify-center text-white shadow-md">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading font-bold text-2xl text-bloom-charcoal">Messages</h2>
        <p className="text-sm font-body text-bloom-charcoal/50 mt-1">Chat with your skill-swap partners</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-bloom-coral animate-spin" />
        </div>
      ) : (
        <div className="space-y-2">
          {bloomers.map((bloomer, i) => (
            <div
              key={bloomer.id}
              onClick={() => onSelectChat(bloomer)}
              className="bg-white rounded-2xl p-4 flex items-center gap-3 cursor-pointer hover:shadow-sm transition-shadow"
            >
              <div className="relative">
                <img src={bloomer.avatar_url || ''} alt={bloomer.name} className="w-12 h-12 rounded-full" />
                {i === 0 && <div className="absolute -top-1 -right-1 w-4 h-4 bg-bloom-coral rounded-full border-2 border-bloom-cream" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading font-bold text-sm text-bloom-charcoal">{bloomer.name}</h4>
                  <span className="text-[10px] font-body text-bloom-charcoal/40">2h ago</span>
                </div>
                <p className="text-xs font-body text-bloom-charcoal/60 truncate">Tap to start chatting about {bloomer.offering}!</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
