import {
  LayoutDashboard,
  MessageCircle,
  ArrowRightLeft,
  Shield,
  Sprout,
  Menu,
  X,
} from 'lucide-react';
import type { View } from '../types';

interface SidebarProps {
  activeView: View;
  onViewChange: (view: View) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const navItems: { view: View; label: string; icon: React.ElementType }[] = [
  { view: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { view: 'messages', label: 'Messages', icon: MessageCircle },
  { view: 'trades', label: 'My Trades', icon: ArrowRightLeft },
  { view: 'safety', label: 'Safety Center', icon: Shield },
];

export default function Sidebar({ activeView, onViewChange, isOpen, onToggle }: SidebarProps) {
  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={onToggle}
        className="fixed top-4 left-4 z-50 w-10 h-10 rounded-xl bg-white shadow-md flex items-center justify-center lg:hidden"
      >
        {isOpen ? <X className="w-5 h-5 text-bloom-charcoal" /> : <Menu className="w-5 h-5 text-bloom-charcoal" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className="fixed top-0 left-0 h-full w-[260px] bg-white border-r border-bloom-warmgray z-40 flex flex-col lg:translate-x-0 lg:static lg:h-screen"
        style={{ transform: `translateX(${isOpen ? 0 : -280}px)`, transition: 'transform 0.3s ease' }}
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl gradient-sunflower-coral flex items-center justify-center">
              <Sprout className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-heading font-bold text-lg text-bloom-charcoal">Bloom</h1>
              <p className="text-[10px] font-body text-bloom-charcoal/50">Peer skill-swap</p>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = activeView === item.view;
              const Icon = item.icon;
              return (
                <button
                  key={item.view}
                  onClick={() => {
                    onViewChange(item.view);
                    onToggle();
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-body font-medium transition-all duration-200 ${
                    isActive
                      ? 'gradient-sunflower-coral text-white shadow-md shadow-bloom-coral/20'
                      : 'text-bloom-charcoal/60 hover:bg-bloom-warmgray'
                  }`}
                >
                  <Icon className="w-[18px] h-[18px]" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-6">
          <div className="rounded-2xl bg-bloom-warmgray p-4">
            <div className="flex items-center gap-3">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=F5C842"
                alt="You"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-sm font-heading font-bold text-bloom-charcoal">Alex</p>
                <p className="text-[10px] font-body text-bloom-charcoal/50">Aspiring Developer</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
