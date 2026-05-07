import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Save, 
  LayoutGrid, 
  ListTree, 
  HelpCircle,
  Check
} from 'lucide-react';

const AddEditDiagnosis: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const editData = location.state?.question;

  const [formData, setFormData] = useState({
    question: '',
    type: 'Single Choice',
    step: 1,
    status: 'Active',
    options: ['']
  });

  const [customOptions, setCustomOptions] = useState<string[]>(['']);

  useEffect(() => {
    if (editData) {
      setFormData(editData);
      if (editData.type !== 'Yes/No') {
        setCustomOptions(editData.options);
      }
    }
  }, [editData]);

  const addOption = () => {
    setFormData({ ...formData, options: [...formData.options, ''] });
  };

  const removeOption = (index: number) => {
    const newOptions = formData.options.filter((_, i) => i !== index);
    setFormData({ ...formData, options: newOptions });
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to save/update would go here
    navigate('/admin/diagnosis');
  };

  return (
    <div style={{ paddingBottom: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            onClick={() => navigate(-1)}
            className="hover-glass"
            style={{ 
              background: 'var(--bg-card)', 
              border: '1px solid var(--border-color)', 
              padding: '12px', 
              borderRadius: '12px', 
              color: 'var(--text-title)',
              cursor: 'pointer'
            }}
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-title)', letterSpacing: '-1.5px', margin: 0 }}>
              {id ? 'Edit' : 'Add New'} <span className="gradient-text">Question</span>
            </h2>
          </div>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '32px' }}>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '24px' }}>
            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '10px', color: 'var(--text-muted)', fontWeight: 700, fontSize: '0.9rem' }}>Diagnostic Question</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. What type of issue are you facing?"
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '10px', color: 'var(--text-muted)', fontWeight: 700, fontSize: '0.9rem' }}>Step Number</label>
              <input 
                type="number" 
                className="form-input" 
                value={formData.step}
                onChange={(e) => setFormData({ ...formData, step: parseInt(e.target.value) })}
                min="1"
                required
              />
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '12px', color: 'var(--text-muted)', fontWeight: 700, fontSize: '0.9rem' }}>Input Type</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {[
                { id: 'Grid Selection', icon: LayoutGrid, desc: 'Visual cards' },
                { id: 'Single Choice', icon: ListTree, desc: 'Radio list' },
                { id: 'Yes/No', icon: HelpCircle, desc: 'Binary choice' },
              ].map(t => (
                <div 
                  key={t.id}
                  onClick={() => {
                    const newType = t.id;
                    let newOptions: string[] = [];
                    
                    if (newType === 'Yes/No') {
                      // Ensure exactly 2 options for binary choice
                      if (formData.options.length !== 2) {
                        newOptions = ['Yes', 'No'];
                      } else {
                        newOptions = [...formData.options];
                      }
                      // Save custom if it was multi-option
                      if (formData.type !== 'Yes/No' && formData.options.length > 2) {
                        setCustomOptions(formData.options);
                      }
                    } else {
                      // Restore previously saved custom options
                      newOptions = customOptions.length > 0 ? customOptions : [''];
                    }
                    
                    setFormData({ ...formData, type: newType, options: newOptions });
                  }}
                  style={{
                    padding: '20px 16px',
                    borderRadius: '20px',
                    background: 'var(--bg-page)',
                    border: '2px solid',
                    borderColor: formData.type === t.id ? 'var(--color-primary)' : 'var(--border-color)',
                    color: 'var(--text-title)',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    position: 'relative',
                    boxShadow: formData.type === t.id ? '0 10px 20px rgba(0, 150, 255, 0.1)' : 'none'
                  }}
                >
                  {formData.type === t.id && (
                    <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'var(--color-primary)', color: 'white', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Check size={12} strokeWidth={4} />
                    </div>
                  )}
                  <t.icon size={20} />
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>{t.id}</div>
                    <div style={{ fontSize: '0.7rem', opacity: 0.7, fontWeight: 600 }}>{t.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <label style={{ color: 'var(--text-muted)', fontWeight: 700, fontSize: '0.9rem' }}>Answer Options</label>
              {formData.type !== 'Yes/No' && (
                <button 
                  type="button"
                  onClick={addOption}
                  className="secondary-btn"
                  style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                >
                  <Plus size={16} /> Add Option
                </button>
              )}
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {formData.options.map((opt, index) => (
                <div key={index} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div style={{ 
                    width: '32px', 
                    height: '32px', 
                    borderRadius: '8px', 
                    background: 'var(--bg-page)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontSize: '0.85rem', 
                    fontWeight: 800,
                    color: 'var(--text-muted)',
                    border: '1px solid var(--border-color)'
                  }}>{index + 1}</div>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Enter option text..."
                    value={opt}
                    onChange={(e) => updateOption(index, e.target.value)}
                    required
                  />
                  {formData.options.length > 1 && formData.type !== 'Yes/No' && (
                    <button 
                      type="button"
                      onClick={() => removeOption(index)}
                      style={{ 
                        padding: '10px', 
                        borderRadius: '10px', 
                        background: 'rgba(239, 68, 68, 0.05)', 
                        border: 'none', 
                        color: 'var(--color-danger)', 
                        cursor: 'pointer' 
                      }}
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', paddingTop: '24px', borderTop: '1px solid var(--border-color)' }}>
            <button 
              type="button" 
              onClick={() => navigate(-1)} 
              className="secondary-btn" 
              style={{ flex: 1, padding: '16px', fontSize: '1rem', fontWeight: 700 }}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="primary-btn" 
              style={{ flex: 1, padding: '16px', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
            >
              <Save size={20} />
              {id ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditDiagnosis;
