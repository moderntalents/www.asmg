import { useEffect } from 'react';
import { Radio, Tv } from 'lucide-react';

const streams = [
  { label: 'Mat 1', category: 'Martial Arts' },
  { label: 'Stage A', category: 'Classical Ballet' },
  { label: 'Stage B', category: 'Modern Dance' },
  { label: 'Table 1', category: 'Chess' },
  { label: 'Pool 1', category: 'Swimming' },
  { label: 'Field 1', category: 'Football' },
  { label: 'Court 1', category: 'Basketball' },
  { label: 'Court 2', category: 'Volleyball' },
  { label: 'Track 1', category: 'Athletics' },
  { label: 'Floor 1', category: 'Gymnastics' },
];

export default function MemberStream() {
  useEffect(() => {
    const prev = document.title;
    document.title = 'ASMG Member Stream 2026';
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => {
      document.title = prev;
      document.head.removeChild(meta);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-green-950 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/40 rounded-full px-5 py-2 mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse inline-block" />
            <span className="text-red-300 font-bold text-sm uppercase tracking-widest">ASMG Live — Members Access</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 leading-tight">
            ASMG Live: July 25th, 2026
          </h1>
          <p className="text-gray-300 text-base">
            Broadcasting <span className="text-green-400 font-bold">10 categories</span> live from{' '}
            <span className="text-white font-bold">Kenyatta University</span>. Stream begins at{' '}
            <span className="text-white font-bold">8:00 AM</span>.
          </p>
        </div>

        <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10 aspect-video max-w-4xl mx-auto mb-14">
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-green-950">
            <div className="w-20 h-20 rounded-full bg-green-800/50 border border-green-600/40 flex items-center justify-center mb-5">
              <Tv className="w-9 h-9 text-green-400" />
            </div>
            <p className="text-white font-bold text-xl mb-1">Main Broadcast</p>
            <p className="text-gray-400 text-sm mb-6">Live stream begins July 25th at 8:00 AM</p>
            <div className="flex items-center gap-2 bg-red-600/20 border border-red-500/30 rounded-full px-4 py-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse inline-block" />
              <span className="text-red-300 text-xs font-bold uppercase tracking-widest">Stream Coming Soon</span>
            </div>
          </div>
        </div>

        <h2 className="text-center text-white/60 text-xs font-bold uppercase tracking-widest mb-6">
          Category Streams
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {streams.map((stream) => (
            <div
              key={stream.label}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:border-green-500/40 hover:bg-white/[0.08] transition-all duration-300"
            >
              <div className="relative bg-black aspect-video w-full">
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-green-950/80">
                  <Radio className="w-8 h-8 text-green-500 mb-2 opacity-60" />
                  <span className="text-green-300 font-semibold text-sm uppercase tracking-wider">Coming Soon</span>
                  <span className="text-gray-500 text-xs mt-1">Stream starts July 25th at 8:00 AM</span>
                </div>
              </div>
              <div className="px-5 py-4 flex items-center justify-between">
                <div>
                  <div className="text-white font-bold text-base">{stream.category}</div>
                  <div className="text-green-400 text-sm font-medium mt-0.5">{stream.label}</div>
                </div>
                <div className="flex items-center gap-1.5 bg-red-600/15 border border-red-500/25 rounded-full px-3 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse inline-block" />
                  <span className="text-red-300 text-xs font-semibold uppercase tracking-wide">Live Soon</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-600 text-xs mt-12">
          ASMG 2026 &mdash; Kenyatta University, Nairobi &mdash; Members Only
        </p>
      </div>
    </div>
  );
}
