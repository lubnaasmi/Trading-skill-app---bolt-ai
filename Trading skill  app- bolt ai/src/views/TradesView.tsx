import { useState, useEffect } from 'react';
import { ArrowRightLeft, Check, Clock, Loader2, Trophy } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Trade } from '../types';

export default function TradesView() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrades();
  }, []);

  async function fetchTrades() {
    setLoading(true);
    const { data } = await supabase
      .from('trades')
      .select('*, bloomer:bloomer_id(name, avatar_url)')
      .order('created_at', { ascending: false });
    if (data) {
      setTrades(data as unknown as Trade[]);
    }
    setLoading(false);
  }

  const statusConfig: Record<string, { label: string; icon: React.ElementType; color: string; bg: string }> = {
    pending: { label: 'Pending', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    active: { label: 'Active', icon: ArrowRightLeft, color: 'text-bloom-sage', bg: 'bg-bloom-sage/10' },
    completed: { label: 'Completed', icon: Check, color: 'text-blue-600', bg: 'bg-blue-50' },
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading font-bold text-2xl text-bloom-charcoal">My Trades</h2>
        <p className="text-sm font-body text-bloom-charcoal/50 mt-1">Track your skill swaps</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-bloom-coral animate-spin" />
        </div>
      ) : trades.length === 0 ? (
        <div className="text-center py-16">
          <Trophy className="w-12 h-12 text-bloom-charcoal/15 mx-auto mb-3" />
          <p className="font-heading font-bold text-lg text-bloom-charcoal/40">No trades yet</p>
          <p className="text-sm font-body text-bloom-charcoal/30 mt-1">Start swapping skills from the Dashboard</p>
        </div>
      ) : (
        <div className="space-y-3">
          {trades.map((trade, i) => {
            const config = statusConfig[trade.status] || statusConfig.pending;
            const StatusIcon = config.icon;
            const bloomer = trade.bloomer as { name: string; avatar_url: string } | undefined;

            return (
              <div
                key={trade.id}
                className="bg-white rounded-3xl p-5 shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {bloomer && (
                      <img src={bloomer.avatar_url} alt={bloomer.name} className="w-10 h-10 rounded-full" />
                    )}
                    <div>
                      <h4 className="font-heading font-bold text-sm text-bloom-charcoal">
                        {bloomer?.name || 'Bloomer'}
                      </h4>
                      <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${config.bg} mt-1`}>
                        <StatusIcon className={`w-3 h-3 ${config.color}`} />
                        <span className={`text-[10px] font-body font-bold ${config.color}`}>{config.label}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1 bg-bloom-warmgray rounded-xl p-3 text-center">
                    <p className="text-[10px] font-body font-bold text-bloom-charcoal/40 uppercase tracking-wide">You Give</p>
                    <p className="text-sm font-heading font-bold text-bloom-charcoal mt-0.5">{trade.you_give}</p>
                  </div>
                  <ArrowRightLeft className="w-5 h-5 text-bloom-coral shrink-0" />
                  <div className="flex-1 bg-bloom-warmgray rounded-xl p-3 text-center">
                    <p className="text-[10px] font-body font-bold text-bloom-charcoal/40 uppercase tracking-wide">You Get</p>
                    <p className="text-sm font-heading font-bold text-bloom-charcoal mt-0.5">{trade.you_get}</p>
                  </div>
                </div>

                {trade.status === 'active' && (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-body font-bold text-bloom-charcoal/40 uppercase tracking-wide">Progress</span>
                      <span className="text-[10px] font-heading font-bold text-bloom-coral">{trade.progress}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-bloom-warmgray rounded-full overflow-hidden">
                      <div
                        style={{ width: `${trade.progress}%` }}
                        className="h-full gradient-sunflower-coral rounded-full"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
