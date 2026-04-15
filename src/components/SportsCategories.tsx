import { Shield, Star, Music2, Trophy, Brain, Circle, Goal, Waves, Target } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface Sport {
  id: string;
  name: string;
  description: string;
  icon: string;
  registration_fee: number;
  july_event: boolean;
}

const iconMap: Record<string, React.ElementType> = {
  shield: Shield,
  star: Star,
  music2: Music2,
  brain: Brain,
  circle: Circle,
  goal: Goal,
  waves: Waves,
  trophy: Trophy,
  target: Target,
};

const cardPalette = [
  { gradient: 'from-green-600 to-green-800', badge: 'bg-green-100 text-green-700', btn: 'from-green-600 to-green-700', border: 'hover:border-green-300' },
  { gradient: 'from-blue-600 to-blue-800', badge: 'bg-blue-100 text-blue-700', btn: 'from-blue-600 to-blue-700', border: 'hover:border-blue-300' },
  { gradient: 'from-teal-600 to-teal-800', badge: 'bg-teal-100 text-teal-700', btn: 'from-teal-600 to-teal-700', border: 'hover:border-teal-300' },
  { gradient: 'from-slate-600 to-slate-800', badge: 'bg-slate-100 text-slate-700', btn: 'from-slate-600 to-slate-700', border: 'hover:border-slate-300' },
  { gradient: 'from-cyan-600 to-cyan-800', badge: 'bg-cyan-100 text-cyan-700', btn: 'from-cyan-600 to-cyan-700', border: 'hover:border-cyan-300' },
  { gradient: 'from-emerald-600 to-emerald-800', badge: 'bg-emerald-100 text-emerald-700', btn: 'from-emerald-600 to-emerald-700', border: 'hover:border-emerald-300' },
  { gradient: 'from-sky-600 to-sky-800', badge: 'bg-sky-100 text-sky-700', btn: 'from-sky-600 to-sky-700', border: 'hover:border-sky-300' },
  { gradient: 'from-green-700 to-teal-700', badge: 'bg-green-100 text-green-700', btn: 'from-green-700 to-teal-700', border: 'hover:border-green-300' },
  { gradient: 'from-blue-700 to-cyan-700', badge: 'bg-blue-100 text-blue-700', btn: 'from-blue-700 to-cyan-700', border: 'hover:border-blue-300' },
  { gradient: 'from-teal-700 to-green-700', badge: 'bg-teal-100 text-teal-700', btn: 'from-teal-700 to-green-700', border: 'hover:border-teal-300' },
];

const JULY_EVENT_DATE = 'July 25th, 2026';
const JULY_EVENT_VENUE = 'Kenyatta University';

export default function SportsCategories() {
  const [sports, setSports] = useState<Sport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSports() {
      const { data, error } = await supabase
        .from('sports_categories')
        .select('id, name, description, icon, registration_fee, july_event')
        .eq('is_active', true)
        .order('name');

      if (data && !error) setSports(data);
      setLoading(false);
    }
    fetchSports();
  }, []);

  return (
    <section id="sports" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Sports Categories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Compete in multiple disciplines and showcase your talent across various sports
          </p>
        </div>

        <div className="mb-12 flex justify-center">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl px-6 py-4 max-w-2xl w-full text-center shadow-sm">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse inline-block"></span>
              <span className="text-amber-700 font-bold text-sm uppercase tracking-wide">Next Event</span>
            </div>
            <p className="text-gray-900 font-bold text-lg">{JULY_EVENT_DATE} &mdash; {JULY_EVENT_VENUE}</p>
            <p className="text-gray-500 text-sm mt-1">
              Competing on this date: <span className="font-semibold text-gray-700">Martial Arts, Classical Ballet &amp; Modern Dance</span>
            </p>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-2xl h-72 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sports.map((sport, index) => {
              const IconComponent = iconMap[sport.icon] ?? Trophy;
              const style = cardPalette[index % cardPalette.length];
              return (
                <div
                  key={sport.id}
                  className={`group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 ${style.border} flex flex-col`}
                >
                  <div className={`bg-gradient-to-br ${style.gradient} p-6 flex flex-col items-center justify-center gap-3 relative`}>
                    {sport.july_event && (
                      <span className="absolute top-3 right-3 bg-amber-400 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide shadow">
                        July 25
                      </span>
                    )}
                    <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-9 h-9 text-white" />
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-base font-bold text-gray-900 leading-tight">{sport.name}</h3>
                      {sport.july_event && (
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0 ${style.badge}`}>
                          Sh 1,000
                        </span>
                      )}
                    </div>

                    <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-3">
                      {sport.description}
                    </p>

                    {sport.july_event && (
                      <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-3 text-xs text-amber-800">
                        <span className="font-semibold">Next Event:</span> {JULY_EVENT_DATE}<br />
                        <span className="text-amber-600">{JULY_EVENT_VENUE}</span>
                      </div>
                    )}

                    {sport.july_event && (
                      <div className="border-t border-gray-100 pt-3 flex items-center justify-between text-xs text-gray-500 mb-3">
                        <span>Registration Fee</span>
                        <span className="font-bold text-gray-800 text-sm">Sh 1,000</span>
                      </div>
                    )}

                    <a
                      href="#register"
                      className={`w-full bg-gradient-to-r ${style.btn} text-white py-2.5 rounded-lg text-sm font-semibold text-center hover:opacity-90 transition-opacity block`}
                    >
                      Register Now
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
