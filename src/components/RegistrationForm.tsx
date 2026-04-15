import { useState } from 'react';
import { CheckCircle, AlertCircle, User, Mail, Dumbbell, ScrollText } from 'lucide-react';
import RulesModal from './RulesModal';

const SPORTS = [
  'Martial Arts',
  'Classical Ballet',
  'Modern Dance',
  'Athletics',
  'Swimming',
  'Football',
  'Basketball',
  'Volleyball',
  'Chess',
  'Other',
];

interface InquiryForm {
  name: string;
  email: string;
  sport: string;
}

const EMPTY: InquiryForm = { name: '', email: '', sport: '' };

export default function RegistrationForm() {
  const [form, setForm] = useState<InquiryForm>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [showRules, setShowRules] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.sport) {
      setError('Please fill in all fields before submitting.');
      return;
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section id="register" className="py-20 bg-gradient-to-br from-white to-green-50">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-12 text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-5" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Inquiry Received!</h3>
            <p className="text-gray-600 mb-8">
              Thanks for your interest in the African Sports Mini Games. We'll be in touch soon with updates and next steps.
            </p>
            <button
              onClick={() => { setSubmitted(false); setForm(EMPTY); }}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
            >
              Submit Another Inquiry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="register" className="py-20 bg-gradient-to-br from-white to-green-50">
      {showRules && <RulesModal onClose={() => setShowRules(false)} />}
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border border-green-200">
            Free
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Athlete / Fan Inquiry
          </h2>
          <p className="text-lg text-gray-500 mb-5">
            Interested in competing or attending? Leave your details and we'll reach out with everything you need.
          </p>
          <button
            type="button"
            onClick={() => setShowRules(true)}
            className="inline-flex items-center gap-2 bg-white hover:bg-green-50 active:scale-95 text-green-700 font-semibold px-5 py-2.5 rounded-xl text-sm border border-green-200 hover:border-green-400 transition-all shadow-sm"
          >
            <ScrollText className="w-4 h-4" />
            View Official Rules &amp; Regulations
          </button>
        </div>

        {error && (
          <div className="mb-5 flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Jane Doe"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="e.g. jane@example.com"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Sport of Interest</label>
            <div className="relative">
              <Dumbbell className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                name="sport"
                value={form.sport}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition appearance-none bg-white"
              >
                <option value="">Select a sport</option>
                {SPORTS.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 active:scale-[0.99] text-white font-bold py-3.5 rounded-xl transition-all text-sm shadow-md hover:shadow-green-200"
          >
            Submit Inquiry
          </button>

          <p className="text-center text-xs text-gray-400">
            Free — no payment required. We'll follow up with details about the games.
          </p>
        </div>
      </div>
    </section>
  );
}
