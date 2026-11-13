import React, { useState } from 'react';
import type { Product } from '../types';
import { AIBanner } from '../components/AIBanner';

interface VerifiedPageProps {
  product: Product;
  onOpenGenie: () => void;
  onOpenSweep: () => void;
}

export const VerifiedPage: React.FC<VerifiedPageProps> = ({
  product: _product,
  onOpenGenie,
  onOpenSweep,
}) => {
  const [appliedProducts, setAppliedProducts] = useState<string[]>([]);
  const [activeHelpPill, setActiveHelpPill] = useState<string | null>(null);

  const helpPillsRow1 = [
    'What is this?',
    'Why do I need it?',
    'What evidence is acceptable?',
  ];

  const helpPillsRow2 = [
    'Show me an example',
    'Ask CRFT',
    'Fix this for me',
  ];

  const applyPills = [
    'Hydra Cream',
    'Body Wash',
    'Daily Cleanser',
    'Night Repair Serum Refill',
    'A whole range',
  ];

  const handleApply = (name: string) => {
    if (appliedProducts.includes(name)) {
      setAppliedProducts(appliedProducts.filter((p) => p !== name));
    } else {
      setAppliedProducts([...appliedProducts, name]);
    }
  };

  return (
    <div className="crft-page-stack verified-page-container">
      <AIBanner
        watcherName="Certification Analyst is watching this workspace"
        description="CRFT AI reads, connects and prepares. Versioned rules decide deterministic compliance outcomes. People verify and approve controlled publication."
        onAskGenie={onOpenGenie}
        onWhatChanged={() => alert("Recent changes: IFRA 51st Amendment check passed; GCRS audit log synchronized 4 hours ago.")}
        onRunSweep={onOpenSweep}
      />

      <div className="verified-header-section">
        <div className="verified-title-block">
          <h1 className="verified-main-title">Verified</h1>
          <p className="verified-main-subtitle">
            GCRS Certified Vegan and GCRS Cruelty-Free. The dossier already exists in CRFT, so assessment takes days, not months.
          </p>
        </div>

        <div className="verified-help-pills-col">
          <div className="flex items-center gap-2.5">
            {helpPillsRow1.map((pill, idx) => (
              <button
                key={idx}
                type="button"
                className={`help-pill-btn ${activeHelpPill === pill ? 'active' : ''}`}
                onClick={() => {
                  setActiveHelpPill(pill);
                  onOpenGenie();
                }}
              >
                {pill}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2.5">
            {helpPillsRow2.map((pill, idx) => (
              <button
                key={idx}
                type="button"
                className={`help-pill-btn ${activeHelpPill === pill ? 'active' : ''}`}
                onClick={() => {
                  setActiveHelpPill(pill);
                  onOpenGenie();
                }}
              >
                {pill}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="verified-cert-grid">
        <div className="verified-cert-card">
          <div className="cert-badge-circle vegan-badge">
            <span>V</span>
          </div>
          <div className="cert-info">
            <h3 className="cert-name">GCRS Certified Vegan</h3>
            <p className="cert-details">
              Four criteria: no animal-derived ingredients · no animal testing · manufacturing controls · traceability. 24-month certificate, licensed mark, public register.
            </p>
          </div>
        </div>

        <div className="verified-cert-card">
          <div className="cert-badge-circle cruelty-free-badge">
            <span>CF</span>
          </div>
          <div className="cert-info">
            <h3 className="cert-name">GCRS Cruelty-Free</h3>
            <p className="cert-details">
              No animal testing by the brand or suppliers after a fixed cut-off date; excluded in markets that mandate testing. Runs on the same evidence.
            </p>
          </div>
        </div>
      </div>

      <div className="verified-apply-section">
        <div className="apply-header-row">
          <h3 className="apply-title">Apply</h3>
          <span className="apply-subtitle">Pre-filled from the product record</span>
        </div>

        <div className="apply-chips-row">
          {applyPills.map((item, idx) => {
            const isSelected = appliedProducts.includes(item);
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleApply(item)}
                className={`apply-chip-btn ${isSelected ? 'selected' : ''}`}
              >
                <span>+ {item}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="verified-assessments-section">
        <h3 className="assessments-title">Assessments</h3>

        <div className="assessment-card">
          <div className="assessment-card-header">
            <div>
              <h4 className="assessment-batch-title">GCRS Dossier Batch #2026-EU09</h4>
              <p className="assessment-batch-date">
                Audit certified on 14 Jan 2026 · Valid until 14 Jan 2028
              </p>
            </div>
            <span className="assessment-approved-badge">
              Approved
            </span>
          </div>

          <div className="assessment-divider" />

          <p className="assessment-footer-text">
            All ingredients verified against non-animal databases. Supplier declarations stored in immutable CRFT ledger.
          </p>
        </div>
      </div>
    </div>
  );
};
