import { useState } from 'react';
import AdminLogin from './AdminLogin';
import AdminGallery from './AdminGallery';
import { LogOut, Images } from 'lucide-react';

export default function AdminApp() {
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem('asmg_admin') === 'true'
  );

  function handleLogin() {
    sessionStorage.setItem('asmg_admin', 'true');
    setUnlocked(true);
  }

  function handleSignOut() {
    sessionStorage.removeItem('asmg_admin');
    setUnlocked(false);
  }

  if (!unlocked) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <Images className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-base font-bold text-gray-900">ASMG Admin</span>
              <span className="hidden sm:inline text-xs text-gray-400 ml-2">Gallery Manager</span>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-600 transition-colors font-medium"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <AdminGallery />
      </main>
    </div>
  );
}
