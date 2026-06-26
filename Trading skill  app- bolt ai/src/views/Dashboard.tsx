import { useState, useEffect, useMemo } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Bloomer } from '../types';
import SearchBar from '../components/SearchBar';
import SkillCard from '../components/SkillCard';
import AddBloomerModal from '../components/AddBloomerModal';

interface DashboardProps {
  onOpenChat: (bloomer: Bloomer) => void;
  onOpenSwap: (bloomer: Bloomer) => void;
}

export default function Dashboard({ onOpenChat, onOpenSwap }: DashboardProps) {
  const [bloomers, setBloomers] = useState<Bloomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchBloomers();
  }, []);

  async function fetchBloomers() {
    setLoading(true);
    const { data, error } = await supabase
      .from('bloomers')
      .select('*')
      .order('match_score', { ascending: false });
    if (!error && data) {
      setBloomers(data as Bloomer[]);
    }
    setLoading(false);
  }

  const filtered = useMemo(() => {
    return bloomers.filter((b) => {
      const matchesSearch =
        !searchQuery ||
        b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.offering.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.wants.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || b.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [bloomers, searchQuery, activeCategory]);

  async function handleAddBloomer(newBloomer: {
    name: string;
    age: number;
    offering: string;
    wants: string;
    category: string;
  }) {
    const colors = ['#b6e3f4', '#c0aede', '#ffdfbf', '#d1d4f9', '#ffd5e5', '#c8e6c9', '#ffe0b2', '#b3e5fc', '#f8bbd0', '#d1c4e9'];
    const watermarks = ['music', 'code', 'art', 'fitness', 'cooking', 'school'];
    const bgColor = colors[Math.floor(Math.random() * colors.length)];
    const watermark = watermarks[Math.floor(Math.random() * watermarks.length)];

    const { data, error } = await supabase
      .from('bloomers')
      .insert({
        ...newBloomer,
        avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}&backgroundColor=${bgColor.replace('#', '')}`,
        bg_color: bgColor,
        match_score: Math.floor(Math.random() * 25) + 70,
        watermark,
      })
      .select()
      .single();

    if (!error && data) {
      setBloomers((prev) => [data as Bloomer, ...prev]);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading font-bold text-2xl text-bloom-charcoal">Discover Bloomers</h2>
          <p className="text-sm font-body text-bloom-charcoal/50 mt-1">
            {filtered.length} peer{filtered.length !== 1 ? 's' : ''} ready to swap skills
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="hidden sm:flex items-center gap-2 px-5 py-3 rounded-2xl gradient-coral-burgundy text-white font-heading font-semibold text-sm shadow-lg shadow-bloom-burgundy/20"
        >
          <Plus className="w-4 h-4" />
          Add Bloomer
        </button>
      </div>

      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-bloom-coral animate-spin" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((bloomer, i) => (
              <SkillCard
                key={bloomer.id}
                bloomer={bloomer}
                index={i}
                onMessage={onOpenChat}
                onSwap={onOpenSwap}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="font-heading font-bold text-lg text-bloom-charcoal/40">No bloomers found</p>
              <p className="text-sm font-body text-bloom-charcoal/30 mt-1">Try a different search or category</p>
            </div>
          )}
        </>
      )}

      <button
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full gradient-coral-burgundy text-white shadow-xl shadow-bloom-burgundy/30 flex items-center justify-center sm:hidden z-40"
      >
        <Plus className="w-6 h-6" />
      </button>

      <AddBloomerModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddBloomer}
      />
    </div>
  );
}
