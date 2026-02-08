import type { DashMessage } from '../../pages/DashboardPage';

interface Props { messages: DashMessage[]; }

export default function MessagesTab({ messages }: Props) {
  return (
    <div className="bg-white rounded-xl border border-slate-200">
      <div className="px-5 py-4 border-b border-slate-200">
        <h3 className="text-base font-semibold text-slate-800">Chat History</h3>
      </div>
      <div className="px-5 py-4 max-h-[600px] overflow-y-auto">
        {messages.length > 0 ? messages.map(msg => (
          <div key={msg.id} className={`p-4 rounded-lg mb-3 ${msg.role === 'user' ? 'bg-slate-100' : 'bg-blue-50'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-800">
                {msg.role === 'user' ? '👤 User' : '🤖 Assistant'} • {msg.lead_name || 'Anonymous'}
              </span>
              <span className="text-xs text-slate-400">{new Date(msg.created_at).toLocaleString()}</span>
            </div>
            <div className="text-sm text-slate-700 leading-relaxed">{msg.content}</div>
          </div>
        )) : (
          <p className="text-slate-400 text-center py-10 text-sm">No messages yet.</p>
        )}
      </div>
    </div>
  );
}
