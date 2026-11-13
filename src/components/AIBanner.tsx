import React from 'react';

interface AIBannerProps {
  title?: string;
  watcherName?: string;
  description?: string;
  onAskGenie?: () => void;
  onWhatChanged?: () => void;
  onRunSweep?: () => void;
}

export const AIBanner: React.FC<AIBannerProps> = ({
  watcherName = 'CRFT Genie is monitoring Claims Intelligence',
  description = 'CRFT AI reads, connects and prepares. Versioned rules decide deterministic compliance outcomes. People verify and approve controlled publication.',
  onAskGenie,
  onWhatChanged,
  onRunSweep,
}) => {
  return (
    <div className="crft-ai-banner">
      <div className="ai-banner-main">
        <div className="ai-orb-wrapper">
          <div className="ai-orb" />
        </div>

        <div className="ai-content">
          <div className="ai-status-row">
            <span className="ai-status-pill">
              <span className="ai-status-dot" />
              AI ACTIVE · HUMAN GOVERNED
            </span>
            <h2 className="ai-title">{watcherName}</h2>
          </div>
          <p className="ai-description">{description}</p>
        </div>

        <div className="ai-actions">
          <button type="button" className="ai-btn" onClick={onAskGenie}>
            Ask CRFT Genie
          </button>
          <button type="button" className="ai-btn" onClick={onWhatChanged}>
            What changed?
          </button>
          <button type="button" className="ai-btn" onClick={onRunSweep}>
            Run AI sweep
          </button>
        </div>
      </div>

      <div className="ai-pillars-grid">
        <div className="ai-pillar-card">
          <span className="pillar-label">SOURCE PROVENANCE</span>
          <span className="pillar-value">Attached to every extracted value</span>
        </div>
        <div className="ai-pillar-card">
          <span className="pillar-label">CONFIDENCE</span>
          <span className="pillar-value">Visible · low confidence queues for review</span>
        </div>
        <div className="ai-pillar-card">
          <span className="pillar-label">DECISION MODEL</span>
          <span className="pillar-value">Rules engine, not free-form AI</span>
        </div>
        <div className="ai-pillar-card">
          <span className="pillar-label">CHANGE IMPACT</span>
          <span className="pillar-value">All linked products re-checked</span>
        </div>
      </div>
    </div>
  );
};
