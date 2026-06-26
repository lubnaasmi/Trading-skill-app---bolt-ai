import { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { CATEGORIES } from '../types';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
}

export default function SearchBar({
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
}: SearchBarProps) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-bloom-charcoal/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search skills, names, or topics..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-bloom-warmgray text-bloom-charcoal placeholder:text-bloom-charcoal/40 font-body text-sm outline-none focus:ring-2 focus:ring-bloom-coral/20 focus:border-bloom-coral/30 transition-all shadow-sm"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${
            showFilters
              ? 'gradient-sunflower-coral text-white shadow-md'
              : 'bg-white text-bloom-charcoal/60 border border-bloom-warmgray shadow-sm hover:bg-bloom-warmgray'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>

      <div
        className="overflow-hidden"
        style={{
          height: showFilters ? 'auto' : 0,
          opacity: showFilters ? 1 : 0,
          transition: 'all 0.25s ease'
        }}
      >
        <div className="flex flex-wrap gap-2 pb-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-4 py-2 rounded-full text-xs font-body font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-bloom-charcoal text-white shadow-md'
                  : 'bg-white text-bloom-charcoal/60 border border-bloom-warmgray hover:bg-bloom-warmgray'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {!showFilters && (
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-body font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-bloom-charcoal text-white shadow-sm'
                  : 'bg-white/60 text-bloom-charcoal/50 hover:bg-white hover:text-bloom-charcoal/70'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
