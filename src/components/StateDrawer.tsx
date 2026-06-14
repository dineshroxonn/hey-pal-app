import { StateData } from '@/data/states';
import { X, Users, AlertTriangle, Briefcase, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  state: StateData | null;
  onClose: () => void;
}

export default function StateDrawer({ state, onClose }: Props) {
  if (!state) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />
      <aside className="relative w-full max-w-xl h-full bg-gradient-to-b from-black via-red-950/80 to-black border-l-4 border-yellow-400 overflow-y-auto animate-in slide-in-from-right duration-300">
        <button
          onClick={onClose}
          className="sticky top-4 float-right mr-4 text-yellow-300 hover:text-yellow-400 bg-black/60 rounded-full p-2 z-10"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="border-b-2 border-yellow-400/40 pb-6 mb-6">
            <div className="text-yellow-400/70 text-xs uppercase tracking-widest">Tent No. {state.code}</div>
            <h2 className="text-4xl md:text-5xl circus-title text-yellow-400 mt-1">{state.name}</h2>
            <div className="text-yellow-200/80 mt-2 italic">Capital: {state.capital} · Pop: {state.population}</div>
          </div>

          {state.status === 'stub' ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🎪</div>
              <h3 className="text-2xl circus-title text-yellow-400 mb-2">Tent Under Construction</h3>
              <p className="text-yellow-200/70 max-w-sm mx-auto">
                Our investigators are still rigging the lights here. Detailed data coming soon. Want to help? Send a tip via the Report map.
              </p>
              <Link to="/report" className="inline-block mt-6 px-6 py-2 bg-yellow-400 text-black font-bold rounded hover:bg-yellow-300 transition-colors">
                Report from {state.name}
              </Link>
            </div>
          ) : (
            <>
              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                <StatBox icon={AlertTriangle} label="Pending Cases" value={state.pendingCases.toString()} />
                <StatBox icon={Briefcase} label="Scam Value" value={state.scamValue} />
                <StatBox icon={TrendingUp} label="Drama Score" value={`${state.dramaScore}/100`} />
              </div>

              {/* Ringmasters */}
              <h3 className="text-2xl circus-title text-yellow-400 mb-4 flex items-center gap-2">
                <Users className="w-6 h-6" /> Star Ringmasters
              </h3>
              <div className="space-y-3 mb-8">
                {state.topPoliticians.map((p, i) => (
                  <div key={i} className="bg-black/40 border border-yellow-400/30 rounded-lg p-4 hover:border-yellow-400 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-bold text-yellow-300 text-lg">{p.name}</div>
                        <div className="text-yellow-200/60 text-sm">{p.role} · {p.party}</div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full font-bold ${p.cases > 5 ? 'bg-red-900/60 text-red-200' : p.cases > 0 ? 'bg-orange-900/60 text-orange-200' : 'bg-green-900/60 text-green-200'}`}>
                        {p.cases} cases
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs mt-3">
                      <div>
                        <div className="text-yellow-400/60 uppercase tracking-wide">Assets</div>
                        <div className="text-yellow-100 font-bold">{p.assets}</div>
                      </div>
                      {p.attendance !== undefined && (
                        <div>
                          <div className="text-yellow-400/60 uppercase tracking-wide">Attendance</div>
                          <div className="text-yellow-100 font-bold">{p.attendance}%</div>
                        </div>
                      )}
                      {p.questions !== undefined && (
                        <div>
                          <div className="text-yellow-400/60 uppercase tracking-wide">Qs Asked</div>
                          <div className="text-yellow-100 font-bold">{p.questions}</div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Notable scams */}
              <h3 className="text-xl circus-title text-yellow-400 mb-3">Greatest Hits</h3>
              <div className="flex flex-wrap gap-2 mb-8">
                {state.notableScams.map((s, i) => (
                  <span key={i} className="px-3 py-1 bg-red-900/40 border border-red-700/50 rounded-full text-red-200 text-sm">
                    {s}
                  </span>
                ))}
              </div>

              <Link to="/report" className="block w-full text-center px-6 py-3 bg-yellow-400 text-black font-bold rounded hover:bg-yellow-300 transition-colors">
                Report corruption in {state.name} →
              </Link>

              <p className="text-yellow-400/40 text-[10px] mt-4 text-center">
                Data illustrative for satire. See <Link to="/sources" className="underline">/sources</Link> for methodology.
              </p>
            </>
          )}
        </div>
      </aside>
    </div>
  );
}

function StatBox({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="bg-gradient-to-br from-yellow-400/10 to-red-600/10 border border-yellow-400/40 rounded p-3 text-center">
      <Icon className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
      <div className="text-yellow-100 font-bold text-sm md:text-base leading-tight">{value}</div>
      <div className="text-yellow-400/60 text-[10px] uppercase mt-1 tracking-wide">{label}</div>
    </div>
  );
}
