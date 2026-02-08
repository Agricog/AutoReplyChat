import type { DashQA } from '../../pages/DashboardPage';

interface Props { qaPairs: DashQA[]; }

export default function QAPairsTab({ qaPairs }: Props) {
  return (
    <div className="bg-white rounded-xl border border-slate-200">
      <div className="px-5 py-4 border-b border-slate-200">
        <h3 className="text-base font-semibold text-slate-800">Q&A Training Pairs</h3>
      </div>
      <div className="px-5 py-4">
        {qaPairs.length > 0 ? qaPairs.map(qa => {
          const lines = qa.content.split('\n').filter((l: string) => l.trim());
          const question = lines[0]?.replace('Q: ', '') || '';
          const answerLine = lines.find((l: string) => l.startsWith('A: '));
          const answer = answerLine?.replace('A: ', '') || '';
          return (
            <div key={qa.id} className="py-4 border-b border-slate-100 last:border-0">
              <div className="font-semibold text-blue-600 mb-2">Q: {question}</div>
              <div className="text-slate-700 leading-relaxed">A: {answer}</div>
              <div className="text-xs text-slate-400 mt-2">{new Date(qa.created_at).toLocaleDateString()}</div>
            </div>
          );
        }) : (
          <p className="text-slate-400 text-center py-10 text-sm">No Q&A pairs yet. Add some in Upload Content.</p>
        )}
      </div>
    </div>
  );
}
