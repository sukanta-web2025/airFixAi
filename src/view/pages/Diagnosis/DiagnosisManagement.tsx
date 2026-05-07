import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  ListTree, 
  HelpCircle, 
  ChevronRight,
  LayoutGrid
} from 'lucide-react';
import WarningModal from '../../components/Modals/WarningModal';

const initialQuestions = [
  { 
    id: 1, 
    question: 'Select your AC system type', 
    type: 'Grid Selection', 
    options: ['Mini-Split', 'Split Systems', 'Packaged Units', 'Window AC', 'Central AC'],
    step: 1,
    status: 'Active'
  },
  { 
    id: 2, 
    question: 'What type of issue are you facing?', 
    type: 'Single Choice', 
    options: ['Not Cooling', 'Weak Airflow', 'Unusual Noise', 'Water Leakage', 'Not Turning On'],
    step: 2,
    status: 'Active'
  },
  { 
    id: 3, 
    question: 'Is your AC running?', 
    type: 'Yes/No', 
    options: ['Yes', 'No'],
    step: 3,
    status: 'Active'
  },
  { 
    id: 4, 
    question: 'How long does it take to cool the room?', 
    type: 'Single Choice', 
    options: ['Takes longer than usual', 'Quickly (normal)', "Doesn't cool at all"],
    step: 4,
    status: 'Active'
  },
  { 
    id: 5, 
    question: 'When was the last maintenance?', 
    type: 'Single Choice', 
    options: ['Recently', '6+ months ago', 'Not sure'],
    step: 5,
    status: 'Active'
  }
];

const DiagnosisManagement: React.FC = () => {
  const [questions, setQuestions] = useState(initialQuestions);
  const [activeActionId, setActiveActionId] = useState<number | null>(null);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(null);
  const navigate = useNavigate();

  // Close tooltip on outside click
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.action-tooltip') && !target.closest('.action-toggle-btn')) {
        setActiveActionId(null);
      }
    };

    if (activeActionId) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeActionId]);

  const handleDelete = (id: number) => {
    setSelectedQuestionId(id);
    setShowDeleteWarning(true);
    setActiveActionId(null);
  };

  const confirmDelete = () => {
    setQuestions(questions.filter(q => q.id !== selectedQuestionId));
    setShowDeleteWarning(false);
  };

  return (
    <>
      <style>{`
        .action-tooltip {
          position: absolute;
          right: 50px;
          top: 0;
          background: var(--bg-card);
          backdrop-filter: blur(30px) saturate(160%);
          border: 1px solid var(--border-color);
          border-radius: 18px;
          padding: 8px;
          z-index: 200;
          display: flex;
          flex-direction: column;
          gap: 2px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
          animation: tooltipPop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          min-width: 180px;
          transform-origin: right top;
        }

        @keyframes tooltipPop {
          from { opacity: 0; transform: scale(0.9) translateY(-10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .action-item {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          width: 100%;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 12px;
          color: var(--text-main);
          font-size: 0.9rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s;
          border: 1px solid transparent;
          text-align: left;
        }

        .action-item:hover {
          background: rgba(255, 255, 255, 0.05);
          color: var(--color-primary);
          transform: translateX(-4px);
        }

        .action-danger:hover {
          color: var(--color-danger) !important;
        }
      `}</style>

      <WarningModal 
        isOpen={showDeleteWarning}
        onClose={() => setShowDeleteWarning(false)}
        title="Delete Question"
        description="Are you sure you want to remove this diagnostic question? This will affect the AI diagnosis flow in the user application."
        buttons={[
          { text: 'Keep It', variant: 'secondary', onClick: () => setShowDeleteWarning(false) },
          { text: 'Delete Question', variant: 'danger', onClick: confirmDelete }
        ]}
      />

      <div className="view-header flex justify-between items-center mb-8">
        <div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--text-title)', letterSpacing: '-1.5px', margin: 0 }}>
            Diagnosis <span className="gradient-text">Manager</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 600, marginTop: '6px' }}>
            Configure questions, options, and logic for the AC Diagnostic AI.
          </p>
        </div>
        <button className="primary-btn" onClick={() => navigate('/admin/diagnosis/add')}>
          <Plus size={20} />
          <span>Add Question</span>
        </button>
      </div>

      <div className="glass-panel" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search questions by title or type..." 
              className="form-input"
              style={{ paddingLeft: '48px' }}
            />
          </div>
          <button className="secondary-btn">
            <Filter size={18} />
            <span>Step Filter</span>
          </button>
        </div>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: '80px' }}>Step</th>
                <th>Diagnostic Question</th>
                <th>Input Type</th>
                <th>Options</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((q) => (
                <tr key={q.id}>
                  <td>
                    <div style={{ 
                      width: '32px', 
                      height: '32px', 
                      borderRadius: '8px', 
                      background: 'rgba(0, 150, 255, 0.1)', 
                      color: 'var(--color-primary)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.85rem'
                    }}>{q.step}</div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 800, color: 'var(--text-title)', fontSize: '0.95rem' }}>{q.question}</div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                      {q.type === 'Grid Selection' ? <LayoutGrid size={14} /> : <ListTree size={14} />}
                      {q.type}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {q.options.slice(0, 3).map((opt, i) => (
                        <span key={i} style={{ 
                          fontSize: '0.7rem', 
                          padding: '4px 10px', 
                          borderRadius: '6px', 
                          background: 'rgba(255,255,255,0.05)', 
                          border: '1px solid var(--border-color)',
                          color: 'var(--text-main)',
                          fontWeight: 700
                        }}>{opt}</span>
                      ))}
                      {q.options.length > 3 && <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 800 }}>+{q.options.length - 3} more</span>}
                    </div>
                  </td>
                  <td>
                    <span className={`badge badge-${q.status.toLowerCase()}`}>
                      {q.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right', position: 'relative' }}>
                    <button 
                      className="action-toggle-btn hover-glass"
                      onClick={() => setActiveActionId(activeActionId === q.id ? null : q.id)}
                      style={{ 
                        background: activeActionId === q.id ? 'var(--bg-card)' : 'transparent', 
                        border: '1px solid var(--border-color)',
                        cursor: 'pointer', 
                        color: 'var(--text-title)',
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <MoreVertical size={18} />
                    </button>

                    {activeActionId === q.id && (
                      <div className="action-tooltip">
                        <div className="action-item" onClick={() => navigate(`/admin/diagnosis/edit/${q.id}`, { state: { question: q } })}>
                          <Edit3 size={16} /> Edit
                        </div>
                        <div style={{ borderTop: '1px solid var(--border-color)', margin: '4px 0' }}></div>
                        <div className="action-item action-danger" style={{ color: 'var(--color-danger)' }} onClick={() => handleDelete(q.id)}>
                          <Trash2 size={16} /> Delete
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ marginTop: '32px' }}>
        <div 
          className="glass-panel hover-glass" 
          style={{ padding: '24px', display: 'flex', gap: '20px', alignItems: 'center', cursor: 'pointer', maxWidth: '400px' }}
          onClick={() => navigate('/admin/diagnosis/preview')}
        >
          <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'var(--grad-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            <HelpCircle size={28} />
          </div>
          <div>
            <div style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--text-title)' }}>Total Steps</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>5 questions in current sequence</div>
          </div>
          <ChevronRight size={20} style={{ marginLeft: 'auto', opacity: 0.5 }} />
        </div>
      </div>
    </>
  );
};

export default DiagnosisManagement;
