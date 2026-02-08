import { useState, useCallback, useEffect } from 'react';
import { api } from '../../lib/api';
import type { DashDocument } from '../../pages/DashboardPage';

interface Props {
  customerId: number;
  botId: number;
  documents: DashDocument[];
  showAlert: (type: 'success' | 'error', message: string) => void;
  refreshData: () => void;
}

function typeBadge(type: string) {
  const map: Record<string, { label: string; cls: string }> = {
    website: { label: 'website', cls: 'bg-blue-50 text-blue-600' },
    youtube: { label: 'youtube', cls: 'bg-green-50 text-green-600' },
    pdf: { label: 'pdf', cls: 'bg-red-50 text-red-600' },
    word: { label: 'word', cls: 'bg-blue-50 text-blue-600' },
    text: { label: 'text', cls: 'bg-slate-100 text-slate-500' },
    csv: { label: 'csv', cls: 'bg-green-50 text-green-600' },
  };
  const t = map[type?.toLowerCase()] || { label: type || 'unknown', cls: 'bg-slate-100 text-slate-500' };
  return <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-medium ${t.cls}`}>{t.label}</span>;
}

export default function DocumentsTab({ customerId, botId, documents, showAlert, refreshData }: Props) {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduleFreq, setScheduleFreq] = useState('none');
  const [scheduleTime, setScheduleTime] = useState('03:00');
  const [bulkLoading, setBulkLoading] = useState(false);

  // Reset selection when documents change
  useEffect(() => { setSelectedIds(new Set()); }, [documents]);

  const allSelected = documents.length > 0 && selectedIds.size === documents.length;
  const someSelected = selectedIds.size > 0;

  const toggleAll = () => {
    setSelectedIds(allSelected ? new Set() : new Set(documents.map(d => d.id)));
  };
  const toggle = (id: number) => {
    setSelectedIds(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  const retrainSelected = async () => {
    if (!someSelected) return;
    if (!confirm(`Retrain ${selectedIds.size} document(s)? Website pages will be re-scraped.`)) return;
    setBulkLoading(true);
    try {
      const data = await api.post('/api/content/retrain', { customerId, documentIds: Array.from(selectedIds) });
      showAlert('success', data.message || `${selectedIds.size} document(s) retrained`);
      setSelectedIds(new Set());
      refreshData();
    } catch (err: unknown) {
      showAlert('error', err instanceof Error ? err.message : 'Retrain failed');
    } finally {
      setBulkLoading(false);
    }
  };

  const deleteSelected = async () => {
    if (!someSelected) return;
    if (!confirm(`Delete ${selectedIds.size} document(s)? This cannot be undone.`)) return;
    setBulkLoading(true);
    try {
      await api.post('/api/content/delete-bulk', { customerId, documentIds: Array.from(selectedIds) });
      showAlert('success', `${selectedIds.size} document(s) deleted`);
      setSelectedIds(new Set());
      refreshData();
    } catch (err: unknown) {
      showAlert('error', err instanceof Error ? err.message : 'Delete failed');
    } finally {
      setBulkLoading(false);
    }
  };

  const loadSchedule = useCallback(async () => {
    try {
      const data = await api.get(`/api/content/retrain-schedule/${botId}`);
      setScheduleFreq(data.frequency || 'none');
      setScheduleTime(data.time || '03:00');
    } catch { /* no schedule yet */ }
  }, [botId]);

  const saveSchedule = async () => {
    try {
      const data = await api.post('/api/content/retrain-schedule', { customerId, botId, frequency: scheduleFreq, time: scheduleTime });
      showAlert('success', data.message || 'Schedule saved');
      setShowScheduleModal(false);
    } catch (err: unknown) {
      showAlert('error', err instanceof Error ? err.message : 'Failed to save');
    }
  };

  const selectCls = 'w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer';

  return (
    <div>
      <div className="bg-white rounded-xl border border-slate-200">
        <div className="px-5 py-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-base font-semibold text-slate-800">
            Training Documents <span className="font-normal text-sm text-slate-400">({documents.length})</span>
          </h3>
          <div className="flex items-center gap-2">
            {someSelected && (
              <>
                <button onClick={retrainSelected} disabled={bulkLoading} className="px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 disabled:opacity-50 transition inline-flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" /></svg>
                  Retrain Selected
                </button>
                <button onClick={deleteSelected} disabled={bulkLoading} className="px-3 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 disabled:opacity-50 transition">Delete Selected</button>
              </>
            )}
            <button onClick={() => { setShowScheduleModal(true); loadSchedule(); }} className="px-3 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition inline-flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" /></svg>
              Schedule
            </button>
          </div>
        </div>

        {documents.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ minWidth: 700 }}>
              <thead>
                <tr className="border-b-2 border-slate-200 text-left">
                  <th className="px-4 py-3 w-10"><input type="checkbox" checked={allSelected} onChange={toggleAll} className={selectCls} /></th>
                  <th className="px-2 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Status</th>
                  <th className="px-2 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Chars</th>
                  <th className="px-2 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Title / Source</th>
                  <th className="px-2 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Date Added</th>
                  <th className="px-2 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Type</th>
                </tr>
              </thead>
              <tbody>
                {documents.map(doc => (
                  <tr key={doc.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                    <td className="px-4 py-3"><input type="checkbox" checked={selectedIds.has(doc.id)} onChange={() => toggle(doc.id)} className={selectCls} /></td>
                    <td className="px-2 py-3">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="text-xs text-slate-500">Indexed</span>
                      </span>
                    </td>
                    <td className="px-2 py-3 font-medium text-slate-800 tabular-nums">{(parseInt(String(doc.char_count)) || 0).toLocaleString()}</td>
                    <td className="px-2 py-3">
                      <div className="font-medium text-slate-800 truncate max-w-[350px]">{doc.title || 'Untitled'}</div>
                      {doc.source_url && (
                        <a href={doc.source_url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline break-all">
                          {doc.source_url.substring(0, 60)}{doc.source_url.length > 60 ? '…' : ''}
                        </a>
                      )}
                    </td>
                    <td className="px-2 py-3 text-slate-500 text-xs whitespace-nowrap">{new Date(doc.created_at).toLocaleDateString()}</td>
                    <td className="px-2 py-3">{typeBadge(doc.content_type)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-slate-400 text-center py-10 text-sm">No documents yet. Upload content to get started.</p>
        )}
      </div>

      {/* Retrain Schedule Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/50 z-[10000] flex items-center justify-center p-4" onClick={() => setShowScheduleModal(false)}>
          <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowScheduleModal(false)} className="absolute top-3 right-4 text-2xl text-slate-400 hover:text-slate-600">&times;</button>
            <h3 className="text-xl font-semibold mb-2">Retrain Schedule</h3>
            <p className="text-sm text-slate-500 mb-6">Automatically re-scrape all website pages on a schedule to keep your bot up to date.</p>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1.5">Frequency</label>
              <select value={scheduleFreq} onChange={e => setScheduleFreq(e.target.value)} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm">
                <option value="none">None (manual only)</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-1.5">Time (UTC)</label>
              <select value={scheduleTime} onChange={e => setScheduleTime(e.target.value)} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm">
                {['00:00','01:00','02:00','03:00','04:00','05:00','06:00','12:00','18:00'].map(t => (
                  <option key={t} value={t}>{t === '00:00' ? '12:00 AM' : t === '12:00' ? '12:00 PM' : t === '18:00' ? '6:00 PM' : `${parseInt(t)}:00 AM`}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowScheduleModal(false)} className="flex-1 px-4 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition">Cancel</button>
              <button onClick={saveSchedule} className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition">Save Schedule</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
