import { Music, Code2, Palette, Dumbbell, UtensilsCrossed, GraduationCap, ArrowRightLeft, MessageCircle } from 'lucide-react';
import type { Bloomer } from '../types';

interface SkillCardProps {
  bloomer: Bloomer;
  index: number;
  onMessage: (bloomer: Bloomer) => void;
  onSwap: (bloomer: Bloomer) => void;
}

function WatermarkIcon({ type }: { type?: string | null }) {
  const className = "w-24 h-24 text-white/8 absolute -right-2 top-1/2 -translate-y-1/2";
  switch (type) {
    case 'music': return <Music className={className + " rotate-12"} />;
    case 'code': return <Code2 className={className + " -rotate-12"} />;
    case 'art': return <Palette className={className + " rotate-6"} />;
    case 'fitness': return <Dumbbell className={className + " -rotate-6"} />;
    case 'cooking': return <UtensilsCrossed className={className + " rotate-12"} />;
    case 'school': return <GraduationCap className={className + " -rotate-6"} />;
    default: return null;
  }
}

function CategoryBadge({ category }: { category: string }) {
  const colors: Record<string, string> = {
    Tech: 'bg-blue-100 text-blue-700',
    Art: 'bg-pink-100 text-pink-700',
    School: 'bg-amber-100 text-amber-700',
    Music: 'bg-violet-100 text-violet-700',
    Sports: 'bg-emerald-100 text-emerald-700',
    Cooking: 'bg-orange-100 text-orange-700',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-body font-bold uppercase tracking-wider ${colors[category] || 'bg-gray-100 text-gray-600'}`}>
      {category}
    </span>
  );
}

export default function SkillCard({ bloomer, index, onMessage, onSwap }: SkillCardProps) {
  return (
    <div
      className="relative overflow-hidden rounded-3xl p-5 shadow-sm hover:shadow-lg transition-shadow cursor-default"
      style={{ backgroundColor: bloomer.bg_color || '#F5C842' }}
    >
      <WatermarkIcon type={bloomer.watermark} />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <img
              src={bloomer.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${bloomer.name}`}
              alt={bloomer.name}
              className="w-12 h-12 rounded-full bg-white/40 object-cover"
            />
            <div>
              <h3 className="font-heading font-bold text-bloom-charcoal text-sm">{bloomer.name}</h3>
              <p className="text-[11px] font-body text-bloom-charcoal/60">Age {bloomer.age}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <CategoryBadge category={bloomer.category} />
            {bloomer.match_score && (
              <span className="text-[10px] font-heading font-bold text-bloom-coral">
                {bloomer.match_score}% match
              </span>
            )}
          </div>
        </div>

        <div className="space-y-2.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-body font-bold text-bloom-charcoal/40 uppercase tracking-wide w-14 shrink-0">
              Offering
            </span>
            <span className="px-3 py-1 rounded-full bg-white/60 backdrop-blur-sm text-xs font-body font-medium text-bloom-charcoal">
              {bloomer.offering}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-body font-bold text-bloom-charcoal/40 uppercase tracking-wide w-14 shrink-0">
              Wants
            </span>
            <span className="px-3 py-1 rounded-full bg-white/60 backdrop-blur-sm text-xs font-body font-medium text-bloom-charcoal">
              {bloomer.wants}
            </span>
          </div>
        </div>

        <div className="flex gap-2 mt-5">
          <button
            onClick={() => onMessage(bloomer)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white/70 backdrop-blur-sm text-xs font-heading font-semibold text-bloom-charcoal hover:bg-white transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Message
          </button>
          <button
            onClick={() => onSwap(bloomer)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl gradient-coral-burgundy text-xs font-heading font-semibold text-white shadow-md shadow-bloom-burgundy/20 hover:shadow-lg transition-shadow"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            Swap
          </button>
        </div>
      </div>
    </div>
  );
}
