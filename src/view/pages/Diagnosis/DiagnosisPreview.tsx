import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronRight, 
  Wind, 
  Monitor, 
  Package, 
  Home, 
  Layers, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight,
  Loader2,
  Settings,
  ShieldCheck,
  Droplets,
  Zap,
  Activity,
  ArrowLeft,
  Check
} from 'lucide-react';

interface StepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  data: any;
}

const DiagnosisPreview: React.FC = () => {
  const [step, setStep] = useState(1);
  const [diagnosisData, setDiagnosisData] = useState<any>({});
  const [_, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const navigate = useNavigate();

  const totalSteps = 5;

  const handleNext = (stepData: any) => {
    setDiagnosisData({ ...diagnosisData, ...stepData });
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      startAnalysis();
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setStep(6);
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsAnalyzing(false);
          setStep(7);
        }, 1000);
      }
      setAnalysisProgress(progress);
    }, 500);
  };

  const reset = () => {
    setStep(1);
    setDiagnosisData({});
    setAnalysisProgress(0);
  };

  return (
    <div className="diagnosis-container" style={{ padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            onClick={() => navigate('/admin/diagnosis')}
            className="hover-glass"
            style={{ 
              background: 'var(--bg-card)', 
              border: '1px solid var(--border-color)', 
              padding: '10px', 
              borderRadius: '12px', 
              cursor: 'pointer', 
              color: 'var(--text-title)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ArrowLeft size={20} />
          </button>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-title)', margin: 0 }}>
            Diagnosis <span className="gradient-text">Preview</span>
          </h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {step > 1 && step < 6 && (
            <button 
              onClick={handleBack}
              className="hover-glass"
              style={{ 
                background: 'var(--bg-card)', 
                border: '1px solid var(--border-color)', 
                padding: '8px 16px', 
                borderRadius: '10px', 
                cursor: 'pointer', 
                color: 'var(--text-title)',
                fontWeight: 700,
                fontSize: '0.85rem'
              }}
            >
              Previous
            </button>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ height: '6px', width: '150px', background: 'var(--bg-card)', borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${(step / totalSteps) * 100}%`, background: 'var(--grad-primary)', transition: 'width 0.4s ease' }}></div>
            </div>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-muted)' }}>Step {step} of {totalSteps}</span>
          </div>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '40px', minHeight: '500px', display: 'flex', flexDirection: 'column' }}>
        {step === 1 && <SystemTypeStep onNext={handleNext} onBack={handleBack} data={diagnosisData} />}
        {step === 2 && <IssueTypeStep onNext={handleNext} onBack={handleBack} data={diagnosisData} />}
        {step === 3 && <IsRunningStep onNext={handleNext} onBack={handleBack} data={diagnosisData} />}
        {step === 4 && <CoolingTimeStep onNext={handleNext} onBack={handleBack} data={diagnosisData} />}
        {step === 5 && <MaintenanceStep onNext={handleNext} onBack={handleBack} data={diagnosisData} />}
        {step === 6 && <AnalyzingStep progress={analysisProgress} />}
        {step === 7 && <ResultStep data={diagnosisData} onReset={reset} />}
      </div>
    </div>
  );
};

// --- Step Components ---

const SystemTypeStep: React.FC<StepProps> = ({ onNext, data }) => {
  const [selected, setSelected] = useState(data.systemType || '');
  const types = [
    { id: 'mini-split', label: 'Mini-Split (Ductless)', icon: Wind },
    { id: 'split', label: 'Split Systems', icon: Layers },
    { id: 'packaged', label: 'Packaged Units', icon: Package },
    { id: 'window', label: 'Window AC', icon: Monitor },
    { id: 'central', label: 'Central AC', icon: Home },
  ];

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h3 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-title)', marginBottom: '12px' }}>Let's Diagnose Your AC Issue</h3>
        <p style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Answer a few simple questions and get AI-powered insights.</p>
      </div>

      <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '24px' }}>Select your AC system type</h4>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px', marginBottom: 'auto' }}>
        {types.map(t => (
          <div 
            key={t.id}
            onClick={() => setSelected(t.id)}
            style={{
              padding: '24px 16px',
              borderRadius: '24px',
              background: selected === t.id ? 'var(--bg-page)' : 'var(--bg-page)',
              border: '2.5px solid',
              borderColor: selected === t.id ? 'var(--color-primary)' : 'var(--border-color)',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              color: 'var(--text-title)',
              boxShadow: selected === t.id ? '0 15px 30px rgba(0, 150, 255, 0.15)' : 'none',
              position: 'relative'
            }}
          >
            {selected === t.id && (
              <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'var(--color-primary)', color: 'white', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 5px 10px rgba(0,150,255,0.3)' }}>
                <Check size={14} strokeWidth={4} />
              </div>
            )}
            <t.icon size={36} style={{ marginBottom: '16px', color: selected === t.id ? 'var(--color-primary)' : 'var(--text-muted)', transition: 'all 0.3s' }} />
            <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>{t.label}</div>
          </div>
        ))}
      </div>

      <button 
        disabled={!selected}
        onClick={() => onNext({ systemType: selected })}
        className="primary-btn"
        style={{ marginTop: '40px', width: '100%', padding: '16px', opacity: !selected ? 0.5 : 1 }}
      >
        <span>Continue</span>
        <ArrowRight size={18} />
      </button>
    </div>
  );
};

const IssueTypeStep: React.FC<StepProps> = ({ onNext, data }) => {
  const [selected, setSelected] = useState(data.issueType || '');
  const issues = [
    'Not Cooling',
    'Weak Airflow',
    'Unusual Noise',
    'Water Leakage',
    'Not Turning On'
  ];

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h3 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-title)', marginBottom: '12px' }}>What type of issue are you facing?</h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: 'auto' }}>
        {issues.map(issue => (
          <div 
            key={issue}
            onClick={() => setSelected(issue)}
            style={{
              padding: '22px 28px',
              borderRadius: '18px',
              background: selected === issue ? 'rgba(0, 150, 255, 0.03)' : 'var(--bg-page)',
              border: '2px solid',
              borderColor: selected === issue ? 'var(--color-primary)' : 'var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              gap: '18px',
              cursor: 'pointer',
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: selected === issue ? '0 8px 20px rgba(0,150,255,0.08)' : 'none'
            }}
          >
            <div style={{ 
              width: '24px', 
              height: '24px', 
              borderRadius: '50%', 
              border: '2px solid', 
              borderColor: selected === issue ? 'var(--color-primary)' : 'var(--border-color)',
              background: selected === issue ? 'var(--color-primary)' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.25s',
              boxShadow: selected === issue ? '0 4px 10px rgba(0,150,255,0.2)' : 'none'
            }}>
              {selected === issue && <Check size={14} color="white" strokeWidth={4} />}
            </div>
            <span style={{ fontWeight: 800, color: selected === issue ? 'var(--text-title)' : 'var(--text-main)', fontSize: '1rem' }}>{issue}</span>
          </div>
        ))}
      </div>

      <button 
        disabled={!selected}
        onClick={() => onNext({ issueType: selected })}
        className="primary-btn"
        style={{ marginTop: '40px', width: '100%', padding: '16px', opacity: !selected ? 0.5 : 1 }}
      >
        <span>Continue</span>
        <ArrowRight size={18} />
      </button>
    </div>
  );
};

const IsRunningStep: React.FC<StepProps> = ({ onNext, data }) => {
  const [selected, setSelected] = useState(data.isRunning || '');
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h3 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-title)', marginBottom: '12px' }}>Is your AC running?</h3>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: 'auto' }}>
        {['Yes', 'No'].map(opt => (
          <div 
            key={opt}
            onClick={() => setSelected(opt)}
            style={{
              padding: '22px 28px',
              borderRadius: '18px',
              background: selected === opt ? 'rgba(0, 150, 255, 0.03)' : 'var(--bg-page)',
              border: '2px solid',
              borderColor: selected === opt ? 'var(--color-primary)' : 'var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              gap: '18px',
              cursor: 'pointer',
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: selected === opt ? '0 8px 20px rgba(0,150,255,0.08)' : 'none'
            }}
          >
            <div style={{ 
              width: '24px', 
              height: '24px', 
              borderRadius: '50%', 
              border: '2px solid', 
              borderColor: selected === opt ? 'var(--color-primary)' : 'var(--border-color)',
              background: selected === opt ? 'var(--color-primary)' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.25s',
              boxShadow: selected === opt ? '0 4px 10px rgba(0,150,255,0.2)' : 'none'
            }}>
              {selected === opt && <Check size={14} color="white" strokeWidth={4} />}
            </div>
            <span style={{ fontWeight: 800, color: selected === opt ? 'var(--text-title)' : 'var(--text-main)', fontSize: '1rem' }}>{opt}</span>
          </div>
        ))}
      </div>
      <button 
        disabled={!selected}
        onClick={() => onNext({ isRunning: selected })}
        className="primary-btn"
        style={{ marginTop: '40px', width: '100%', padding: '16px', opacity: !selected ? 0.5 : 1 }}
      >
        <span>Continue</span>
        <ArrowRight size={18} />
      </button>
    </div>
  );
};

const CoolingTimeStep: React.FC<StepProps> = ({ onNext, data }) => {
  const [selected, setSelected] = useState(data.coolingTime || '');
  const options = ['Takes longer than usual', 'Quickly (normal)', "Doesn't cool at all"];
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h3 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-title)', marginBottom: '12px' }}>How long does it take to cool the room?</h3>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: 'auto' }}>
        {options.map(opt => (
          <div 
            key={opt}
            onClick={() => setSelected(opt)}
            style={{
              padding: '22px 28px',
              borderRadius: '18px',
              background: selected === opt ? 'rgba(0, 150, 255, 0.03)' : 'var(--bg-page)',
              border: '2px solid',
              borderColor: selected === opt ? 'var(--color-primary)' : 'var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              gap: '18px',
              cursor: 'pointer',
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: selected === opt ? '0 8px 20px rgba(0,150,255,0.08)' : 'none'
            }}
          >
            <div style={{ 
              width: '24px', 
              height: '24px', 
              borderRadius: '50%', 
              border: '2px solid', 
              borderColor: selected === opt ? 'var(--color-primary)' : 'var(--border-color)',
              background: selected === opt ? 'var(--color-primary)' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.25s',
              boxShadow: selected === opt ? '0 4px 10px rgba(0,150,255,0.2)' : 'none'
            }}>
              {selected === opt && <Check size={14} color="white" strokeWidth={4} />}
            </div>
            <span style={{ fontWeight: 800, color: selected === opt ? 'var(--text-title)' : 'var(--text-main)', fontSize: '1rem' }}>{opt}</span>
          </div>
        ))}
      </div>
      <button 
        disabled={!selected}
        onClick={() => onNext({ coolingTime: selected })}
        className="primary-btn"
        style={{ marginTop: '40px', width: '100%', padding: '16px', opacity: !selected ? 0.5 : 1 }}
      >
        <span>Continue</span>
        <ArrowRight size={18} />
      </button>
    </div>
  );
};

const MaintenanceStep: React.FC<StepProps> = ({ onNext, data }) => {
  const [selected, setSelected] = useState(data.lastMaintenance || '');
  const options = ['Recently', '6+ months ago', 'Not sure'];
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h3 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-title)', marginBottom: '12px' }}>When was the last maintenance?</h3>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: 'auto' }}>
        {options.map(opt => (
          <div 
            key={opt}
            onClick={() => setSelected(opt)}
            style={{
              padding: '22px 28px',
              borderRadius: '18px',
              background: selected === opt ? 'rgba(0, 150, 255, 0.03)' : 'var(--bg-page)',
              border: '2px solid',
              borderColor: selected === opt ? 'var(--color-primary)' : 'var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              gap: '18px',
              cursor: 'pointer',
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: selected === opt ? '0 8px 20px rgba(0,150,255,0.08)' : 'none'
            }}
          >
            <div style={{ 
              width: '24px', 
              height: '24px', 
              borderRadius: '50%', 
              border: '2px solid', 
              borderColor: selected === opt ? 'var(--color-primary)' : 'var(--border-color)',
              background: selected === opt ? 'var(--color-primary)' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.25s',
              boxShadow: selected === opt ? '0 4px 10px rgba(0,150,255,0.2)' : 'none'
            }}>
              {selected === opt && <Check size={14} color="white" strokeWidth={4} />}
            </div>
            <span style={{ fontWeight: 800, color: selected === opt ? 'var(--text-title)' : 'var(--text-main)', fontSize: '1rem' }}>{opt}</span>
          </div>
        ))}
      </div>
      <button 
        disabled={!selected}
        onClick={() => onNext({ lastMaintenance: selected })}
        className="primary-btn"
        style={{ marginTop: '40px', width: '100%', padding: '16px', opacity: !selected ? 0.5 : 1 }}
      >
        <span>Get Solution</span>
        <ArrowRight size={18} />
      </button>
    </div>
  );
};

const AnalyzingStep: React.FC<{ progress: number }> = ({ progress }) => {
  const checks = [
    { label: 'Checking system performance', status: progress > 25 ? 'done' : 'pending' },
    { label: 'Analyzing airflow', status: progress > 50 ? 'done' : 'pending' },
    { label: 'Evaluating temperature response', status: progress > 75 ? 'done' : 'pending' },
    { label: 'Inspecting for leaks', status: progress > 90 ? 'done' : 'pending' },
    { label: 'Checking electrical components', status: progress >= 100 ? 'done' : 'pending' },
  ];

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'relative', width: '120px', height: '120px', marginBottom: '40px' }}>
        <Loader2 size={120} color="var(--color-primary)" className="animate-spin" style={{ opacity: 0.2 }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Wind size={48} color="var(--color-primary)" className="animate-pulse" />
        </div>
      </div>
      
      <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-title)', marginBottom: '8px' }}>Analyzing Your System...</h3>
      <p style={{ color: 'var(--text-muted)', fontWeight: 600, marginBottom: '40px', textAlign: 'center' }}>Our AI is checking possible issues and finding the best solutions.</p>

      <div style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {checks.map((check, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', background: 'var(--bg-page)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {check.status === 'done' ? <CheckCircle2 size={18} color="var(--color-success)" /> : <Activity size={18} color="var(--color-primary)" style={{ opacity: 0.5 }} />}
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: check.status === 'done' ? 'var(--text-title)' : 'var(--text-muted)' }}>{check.label}</span>
            </div>
            {check.status === 'pending' && i === checks.findIndex(c => c.status === 'pending') && <Loader2 size={16} className="animate-spin" color="var(--color-primary)" />}
          </div>
        ))}
      </div>
    </div>
  );
};

const ResultStep: React.FC<{ data: any, onReset: () => void }> = ({ onReset }) => {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ 
          width: '64px', 
          height: '64px', 
          borderRadius: '20px', 
          background: 'var(--color-success)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          margin: '0 auto 20px',
          boxShadow: '0 10px 20px rgba(var(--color-success-rgb), 0.3)'
        }}>
          <ShieldCheck size={32} color="white" />
        </div>
        <h3 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-title)', marginBottom: '8px' }}>Diagnosis Complete!</h3>
        <p style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Here's what we found.</p>
      </div>

      <div style={{ padding: '24px', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '24px', border: '1px solid rgba(239, 68, 68, 0.1)', display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '32px' }}>
        <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <AlertTriangle size={32} color="var(--color-danger)" />
        </div>
        <div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px' }}>Possible Issue</div>
          <div style={{ color: 'var(--text-title)', fontSize: '1.25rem', fontWeight: 900 }}>Dirty Air Filter</div>
          <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>The air filter is dirty and restricting airflow, causing weak cooling.</p>
        </div>
      </div>

      <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-title)', marginBottom: '16px' }}>Recommended Actions</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
        {[
          { label: 'Clean or replace the air filter', desc: 'Improves cooling efficiency.', icon: Droplets, color: '#10B981' },
          { label: 'Clean indoor unit coils', desc: 'Improves cooling performance.', icon: Zap, color: '#8B5CF6' },
          { label: 'Regular maintenance', desc: 'Schedule a tune-up every 6 months.', icon: Settings, color: '#F59E0B' },
        ].map((action, i) => (
          <div key={i} style={{ padding: '16px 20px', borderRadius: '16px', background: 'var(--bg-page)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${action.color}15`, color: action.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <action.icon size={20} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-title)' }}>{action.label}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>{action.desc}</div>
            </div>
            <ChevronRight size={18} color="var(--text-muted)" />
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <button className="secondary-btn" style={{ padding: '16px', fontSize: '1rem', fontWeight: 700 }} onClick={onReset}>
          Start Over
        </button>
        <button className="primary-btn" style={{ padding: '16px', fontSize: '1rem' }}>
          Request Service
        </button>
      </div>
    </div>
  );
};

export default DiagnosisPreview;
