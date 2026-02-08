import type { DashMessage } from '../../pages/DashboardPage';

interface Props {
  stats: { documents: number; leads: number; messages: number; bots: number };
  messages: DashMessage[];
}

export default function OverviewTab({ stats, messages }: Props) {
  const statCards = [
    { label: 'Documents', value: stats.documents, color: 'blue', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> },
    { label: 'Leads Captured', value: stats.leads, color: 'green', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
    { label: 'Messages', value: stats.messages, color: 'purple', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg> },
    { label: 'Total Bots', value: stats.bots, color: 'orange', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> },
  ];

  const colorMap: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-500',
    green: 'bg-green-50 text-green-500',
    purple: 'bg-purple-50 text-purple-500',
    orange: 'bg-orange-50 text-orange-500',
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {statCards.map(card => (
          <div key={card.label} className="bg-white rounded-xl p-5 border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorMap[card.color]}`}>{card.icon}</div>
            </div>
            <div className="text-3xl font-bold text-slate-800">{card.value}</div>
            <div className="text-sm text-slate-500 mt-1">{card.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200">
        <div className="px-5 py-4 border-b border-slate-200">
          <h3 className="text-base font-semibold text-slate-800">Recent Activity</h3>
        </div>
        <div className="px-5 py-4">
          {messages.length > 0 ? (
            messages.slice(0, 5).map(msg => (
              <div key={msg.id} className="flex items-center justify-between py-4 border-b border-slate-100 last:border-0">
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-slate-800 truncate">
                    {msg.role === 'user' ? '👤' : '🤖'} {msg.content.substring(0, 60)}{msg.content.length > 60 ? '…' : ''}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    {msg.lead_name || 'Anonymous'} • {new Date(msg.created_at).toLocaleString()}
                  </div>
                </div>
                <span className={`ml-3 px-2.5 py-1 rounded-md text-xs font-medium ${
                  msg.role === 'user' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'
                }`}>{msg.role}</span>
              </div>
            ))
          ) : (
            <p className="text-slate-400 text-center py-5">No recent activity</p>
          )}
        </div>
      </div>
    </div>
  );
}
