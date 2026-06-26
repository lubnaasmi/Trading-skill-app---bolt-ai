import { useState } from 'react';
import type { Bloomer, View } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './views/Dashboard';
import MessagesView from './views/MessagesView';
import TradesView from './views/TradesView';
import SafetyView from './views/SafetyView';

export default function App() {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeChatBloomer, setActiveChatBloomer] = useState<Bloomer | null>(null);
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [swapBloomer, setSwapBloomer] = useState<Bloomer | null>(null);

  const handleOpenChat = (bloomer: Bloomer) => {
    setActiveChatBloomer(bloomer);
    setActiveView('messages');
  };

  const handleOpenSwap = (bloomer: Bloomer) => {
    setSwapBloomer(bloomer);
    setShowSwapModal(true);
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard key="dashboard" onOpenChat={handleOpenChat} onOpenSwap={handleOpenSwap} />;
      case 'messages':
        return (
          <MessagesView
            key="messages"
            activeChatBloomer={activeChatBloomer}
            onSelectChat={(b) => {
              setActiveChatBloomer(b);
              if (!b) setActiveView('messages');
            }}
          />
        );
      case 'trades':
        return <TradesView key="trades" />;
      case 'safety':
        return <SafetyView key="safety" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-bloom-cream flex">
      <Sidebar
        activeView={activeView}
        onViewChange={(view) => {
          setActiveView(view);
          setActiveChatBloomer(null);
        }}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen((p) => !p)}
      />

      <main className="flex-1 min-w-0 lg:ml-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          {renderView()}
        </div>
      </main>

      {showSwapModal && swapBloomer && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowSwapModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl"
          >
            <h3 className="font-heading font-bold text-xl text-bloom-charcoal mb-4">Propose a Swap</h3>
            <div className="flex items-center gap-3 mb-4">
              <img src={swapBloomer.avatar_url || ''} alt={swapBloomer.name} className="w-12 h-12 rounded-full" />
              <div>
                <p className="font-heading font-bold text-sm text-bloom-charcoal">{swapBloomer.name}</p>
                <p className="text-xs font-body text-bloom-charcoal/60">Age {swapBloomer.age}</p>
              </div>
            </div>
            <div className="space-y-3 mb-6">
              <div className="bg-bloom-warmgray rounded-xl p-3">
                <p className="text-[10px] font-body font-bold text-bloom-charcoal/40 uppercase">You Give</p>
                <p className="text-sm font-heading font-bold text-bloom-charcoal">{swapBloomer.wants}</p>
              </div>
              <div className="bg-bloom-warmgray rounded-xl p-3">
                <p className="text-[10px] font-body font-bold text-bloom-charcoal/40 uppercase">You Get</p>
                <p className="text-sm font-heading font-bold text-bloom-charcoal">{swapBloomer.offering}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowSwapModal(false);
                  handleOpenChat(swapBloomer);
                }}
                className="flex-1 py-3 rounded-2xl gradient-sunflower-coral text-white font-heading font-semibold text-sm shadow-lg"
              >
                Send Proposal
              </button>
              <button
                onClick={() => setShowSwapModal(false)}
                className="flex-1 py-3 rounded-2xl bg-bloom-warmgray text-bloom-charcoal font-heading font-semibold text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
