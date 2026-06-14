import { useMemo, useState } from 'react';
import { STATES, StateData } from '@/data/states';
import StateDrawer from '@/components/StateDrawer';
import { RevealAnimation } from '@/components/ui/reveal-animation';
import { Search, MapPin } from 'lucide-react';

// Stylized grid layout — circus tents arranged in a loose India silhouette.
// Each cell is a state/UT "tent". Empty cells = ocean/borders.
const GRID: (string | null)[][] = [
  // 8 cols x 9 rows
  [null, null, null, 'JK', null, null, null, null],
  [null, null, 'PB', 'HP', 'UK', 'AR', null, null],
  [null, null, 'HR', 'DL', 'SK', 'AS', 'NL', null],
  [null, 'RJ', 'UP', 'BR', 'WB', 'ML', 'MN', null],
  ['GJ', 'MP', 'CG', 'JH', 'OD', 'TR', 'MZ', null],
  ['DN', 'MH', 'TG', 'AP', null, null, null, null],
  [null, 'GA', 'KA', 'PY', 'TN', null, null, null],
  [null, null, 'LD', 'KL', null, null, null, 'AN'],
  [null, null, null, null, null, null, null, null],
];

function dramaColor(score: number): string {
  if (score >= 85) return 'from-red-600 to-red-900 border-yellow-400 shadow-red-500/50';
  if (score >= 70) return 'from-orange-600 to-red-800 border-yellow-400 shadow-orange-500/40';
  if (score >= 50) return 'from-yellow-700 to-orange-800 border-yellow-300 shadow-yellow-500/30';
  return 'from-stone-700 to-stone-900 border-stone-500 shadow-none';
}

export default function RingmasterMap() {
  const [selected, setSelected] = useState<StateData | null>(null);
  const [query, setQuery] = useState('');

  const stateMap = useMemo(() => Object.fromEntries(STATES.map(s => [s.code, s])), []);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    const states = STATES.filter(s =>
      s.name.toLowerCase().includes(q) || s.capital.toLowerCase().includes(q)
    );
    const politicians = STATES.flatMap(s =>
      s.topPoliticians
        .filter(p => p.name.toLowerCase().includes(q) || p.party.toLowerCase().includes(q))
        .map(p => ({ ...p, state: s }))
    );
    return [
      ...states.map(s => ({ kind: 'state' as const, state: s })),
      ...politicians.map(p => ({ kind: 'politician' as const, ...p })),
    ].slice(0, 8);
  }, [query]);

  return (
    <section id="ringmasters" className="bg-gradient-to-b from-black via-red-950/40 to-black py-20 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <RevealAnimation>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl circus-title text-yellow-400 mb-4">
              Pick Your Tent
            </h2>
            <p className="text-yellow-200 italic text-lg max-w-2xl mx-auto">
              28 states. 8 UTs. One never-ending show. Tap a tent to meet your local ringmasters and the scams that made them famous.
            </p>
          </div>
        </RevealAnimation>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-10 relative">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-yellow-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              maxLength={60}
              placeholder="Find your ringmaster, state, or party..."
              className="w-full pl-12 pr-4 py-3 bg-black/60 border-2 border-yellow-400/40 rounded-lg text-yellow-100 placeholder:text-yellow-400/50 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/30"
            />
          </div>
          {searchResults.length > 0 && (
            <div className="absolute z-20 mt-2 w-full bg-black border-2 border-yellow-400/50 rounded-lg overflow-hidden shadow-2xl">
              {searchResults.map((r, i) => (
                <button
                  key={i}
                  onClick={() => { setSelected(r.state); setQuery(''); }}
                  className="w-full text-left px-4 py-3 hover:bg-red-900/50 border-b border-yellow-400/10 last:border-0 transition-colors"
                >
                  {r.kind === 'state' ? (
                    <div>
                      <span className="text-yellow-400 font-bold">{r.state.name}</span>
                      <span className="text-yellow-200/60 text-sm ml-2">{r.state.capital}</span>
                    </div>
                  ) : (
                    <div>
                      <span className="text-yellow-400 font-bold">{r.name}</span>
                      <span className="text-yellow-200/60 text-sm ml-2">{r.party} • {r.state.name}</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tent grid */}
        <div className="grid grid-cols-8 gap-1.5 md:gap-2 max-w-4xl mx-auto">
          {GRID.flat().map((code, i) => {
            if (!code) return <div key={i} className="aspect-square" />;
            const s = stateMap[code];
            if (!s) return <div key={i} className="aspect-square" />;
            const isStub = s.status === 'stub';
            return (
              <button
                key={i}
                onClick={() => setSelected(s)}
                className={`group aspect-square rounded-md border-2 bg-gradient-to-br ${dramaColor(s.dramaScore)} transition-all duration-200 hover:scale-110 hover:z-10 hover:shadow-lg relative flex flex-col items-center justify-center p-1 ${isStub ? 'opacity-50' : ''}`}
                title={`${s.name} — ${isStub ? 'Coming soon' : s.cm}`}
              >
                <span className="text-[10px] md:text-xs font-black text-yellow-100 leading-none">{s.code}</span>
                {!isStub && (
                  <span className="hidden md:inline text-[9px] text-yellow-200/80 mt-0.5 leading-none">
                    {s.dramaScore}
                  </span>
                )}
                {/* spotlight on hover */}
                <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-md bg-yellow-300/20 mix-blend-overlay" />
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-yellow-200/80">
          <span className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-gradient-to-br from-red-600 to-red-900 border border-yellow-400" /> Headline act (85+)</span>
          <span className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-gradient-to-br from-orange-600 to-red-800 border border-yellow-400" /> Main stage (70-84)</span>
          <span className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-gradient-to-br from-yellow-700 to-orange-800 border border-yellow-300" /> Side show (50-69)</span>
          <span className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-gradient-to-br from-stone-700 to-stone-900 border border-stone-500" /> Tent under construction</span>
        </div>

        <p className="text-center text-yellow-400/50 text-xs mt-6 flex items-center justify-center gap-1">
          <MapPin className="w-3 h-3" /> "Drama Score" = satirical composite. See sources for methodology.
        </p>
      </div>

      <StateDrawer state={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
