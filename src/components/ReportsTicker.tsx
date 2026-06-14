import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Megaphone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Report {
  id: string;
  state: string | null;
  city: string | null;
  category: string;
  description: string;
  created_at: string;
  status?: string;
}

const CATEGORY_EMOJI: Record<string, string> = {
  bribe: '💰', ghost_project: '👻', missing_funds: '🕳️',
  harassment: '⚠️', red_tape: '📜', other: '🎪',
};

export default function ReportsTicker() {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    let mounted = true;
    supabase
      .from('reports')
      .select('id,state,city,category,description,created_at')
      .eq('status', 'approved')
      .order('created_at', { ascending: false })
      .limit(10)
      .then(({ data }) => {
        if (mounted && data) setReports(data);
      });

    const channel = supabase
      .channel('reports-ticker')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'reports' }, (payload) => {
        const r = payload.new as Report;
        if (r.status === 'approved' && mounted) {
          setReports(prev => [r, ...prev].slice(0, 10));
        }
      })
      .subscribe();

    return () => { mounted = false; supabase.removeChannel(channel); };
  }, []);

  if (reports.length === 0) {
    return (
      <section className="bg-yellow-400 text-black py-3 overflow-hidden border-y-4 border-black">
        <div className="container mx-auto px-4 flex items-center gap-3">
          <Megaphone className="w-5 h-5 flex-shrink-0 animate-pulse" />
          <p className="text-sm md:text-base font-bold uppercase tracking-wide">
            Be the first ringmaster to file a report →{' '}
            <Link to="/report" className="underline">/report</Link>
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-yellow-400 text-black py-3 overflow-hidden border-y-4 border-black relative">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 pl-4 flex items-center gap-2 bg-yellow-400 z-10">
          <Megaphone className="w-5 h-5 animate-pulse" />
          <span className="font-black uppercase text-sm tracking-widest">Live from the floor</span>
        </div>
        <div className="overflow-hidden flex-1">
          <div className="flex gap-8 animate-marquee whitespace-nowrap">
            {[...reports, ...reports].map((r, i) => (
              <span key={i} className="text-sm font-medium">
                {CATEGORY_EMOJI[r.category] || '🎪'}{' '}
                <strong>{r.city || r.state || 'Unknown'}</strong>:{' '}
                {r.description.slice(0, 90)}
                {r.description.length > 90 ? '…' : ''}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
