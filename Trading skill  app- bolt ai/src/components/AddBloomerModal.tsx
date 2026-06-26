import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { CATEGORIES } from '../types';

interface AddBloomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (bloomer: {
    name: string;
    age: number;
    offering: string;
    wants: string;
    category: string;
  }) => void;
}

export default function AddBloomerModal({ isOpen, onClose, onAdd }: AddBloomerModalProps) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('16');
  const [offering, setOffering] = useState('');
  const [wants, setWants] = useState('');
  const [category, setCategory] = useState('Tech');

  const handleSubmit = () => {
    if (!name.trim() || !offering.trim() || !wants.trim()) return;
    onAdd({
      name: name.trim(),
      age: parseInt(age) || 16,
      offering: offering.trim(),
      wants: wants.trim(),
      category,
    });
    setName('');
    setAge('16');
    setOffering('');
    setWants('');
    setCategory('Tech');
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center"
          onClick={onClose}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-t-3xl sm:rounded-3xl p-6 w-full max-w-md sm:mx-4 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading font-bold text-xl text-bloom-charcoal">Add a Bloomer</h3>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-bloom-warmgray flex items-center justify-center hover:bg-bloom-sand transition-colors"
              >
                <X className="w-4 h-4 text-bloom-charcoal/60" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-body font-bold text-bloom-charcoal/50 uppercase tracking-wide mb-2 block">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Riley"
                  className="w-full px-4 py-3 rounded-2xl bg-bloom-warmgray text-sm font-body text-bloom-charcoal outline-none focus:ring-2 focus:ring-bloom-coral/30 placeholder:text-bloom-charcoal/30"
                />
              </div>

              <div>
                <label className="text-[10px] font-body font-bold text-bloom-charcoal/50 uppercase tracking-wide mb-2 block">Age</label>
                <input
                  type="number"
                  min={13}
                  max={19}
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-bloom-warmgray text-sm font-body text-bloom-charcoal outline-none focus:ring-2 focus:ring-bloom-coral/30"
                />
              </div>

              <div>
                <label className="text-[10px] font-body font-bold text-bloom-charcoal/50 uppercase tracking-wide mb-2 block">Category</label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.filter(c => c !== 'All').map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`px-3 py-1.5 rounded-full text-xs font-body font-medium transition-all ${
                        category === cat
                          ? 'bg-bloom-charcoal text-white'
                          : 'bg-bloom-warmgray text-bloom-charcoal/60 hover:bg-bloom-sand'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-body font-bold text-bloom-charcoal/50 uppercase tracking-wide mb-2 block">Offering (skill they teach)</label>
                <input
                  value={offering}
                  onChange={(e) => setOffering(e.target.value)}
                  placeholder="e.g. Making Lo-Fi Beats"
                  className="w-full px-4 py-3 rounded-2xl bg-bloom-warmgray text-sm font-body text-bloom-charcoal outline-none focus:ring-2 focus:ring-bloom-coral/30 placeholder:text-bloom-charcoal/30"
                />
              </div>

              <div>
                <label className="text-[10px] font-body font-bold text-bloom-charcoal/50 uppercase tracking-wide mb-2 block">Wants (skill they want)</label>
                <input
                  value={wants}
                  onChange={(e) => setWants(e.target.value)}
                  placeholder="e.g. Help with Python"
                  className="w-full px-4 py-3 rounded-2xl bg-bloom-warmgray text-sm font-body text-bloom-charcoal outline-none focus:ring-2 focus:ring-bloom-coral/30 placeholder:text-bloom-charcoal/30"
                />
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!name.trim() || !offering.trim() || !wants.trim()}
              className="mt-6 w-full py-4 rounded-2xl gradient-sunflower-coral text-white font-heading font-semibold shadow-lg disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Bloomer
            </button>
          </div>
        </div>
      )}
    </>
  );
}
