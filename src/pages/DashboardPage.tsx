import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const { user, logout, isAdmin, isPartner } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">AutoReplyChat</h1>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">
              {user?.name} 
              {isAdmin && <span className="ml-2 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">Admin</span>}
              {isPartner && <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">Partner</span>}
            </div>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-500 hover:text-gray-700 transition"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* Dashboard content - placeholder */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome, {user?.name}!</h2>
          <p className="text-gray-500 mb-6">
            Your dashboard is being built. The full dashboard with documents, Q&amp;A, bot config, messages, and appearance tabs is coming in the next phase.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg text-sm text-gray-600">
            <span>Customer ID:</span>
            <span className="font-mono font-medium">{user?.customerId}</span>
          </div>

          {/* Temporary link to old dashboard */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-400 mb-3">In the meantime, your existing dashboard is still available:</p>
            <a
              href={`https://api.autoreplychat.com/login`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
            >
              Open current dashboard
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
