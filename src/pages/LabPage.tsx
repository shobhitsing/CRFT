import React from 'react';
import type { Product } from '../types';
import { AIBanner } from '../components/AIBanner';

interface LabPageProps {
  product: Product;
  onOpenGenie: () => void;
  onOpenSweep: () => void;
  onNavigateOverview?: () => void;
}

export const LabPage: React.FC<LabPageProps> = ({
  product,
  onOpenGenie,
  onOpenSweep,
  onNavigateOverview,
}) => {
  return (
    <div className="crft-page-stack">
      <div className="lab-hero-card">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="ai-orb-wrapper shrink-0">
              <div className="ai-orb" />
            </div>
            <div>
              <span className="lab-hero-eyebrow">CRFT LAB · AI-NATIVE LIMS + EVIDENCE ENGINE</span>
              <h1 className="lab-hero-title">Lab work that already understands the product.</h1>
              <p className="lab-hero-desc">
                Formulation, packaging, claims, markets and existing evidence arrive from CRFT Core. Lab decides what is really needed, reuses what can be defended, tracks every physical sample, controls execution and publishes approved evidence back into CRFT.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-start lg:self-center shrink-0">
            <button
              type="button"
              className="lab-top-btn"
              onClick={() => alert("AI Test Planner initialized: Generating accelerated stability and challenge protocol.")}
            >
              Plan tests
            </button>
            <button
              type="button"
              className="lab-top-btn"
              onClick={() => alert("Scanner initialized: Ready for 2D DataMatrix or RFID sample scan.")}
            >
              Scan sample
            </button>
            <button
              type="button"
              className="lab-top-btn font-semibold"
              onClick={onOpenGenie}
            >
              Ask Lab Genie
            </button>
          </div>
        </div>

        <div className="lab-stats-grid">
          <div className="lab-stat-item">
            <span className="lab-stat-number">23</span>
            <span className="lab-stat-label">actions handled overnight</span>
          </div>
          <div className="lab-stat-item">
            <span className="lab-stat-number">7</span>
            <span className="lab-stat-label">requirements for selected product</span>
          </div>
          <div className="lab-stat-item">
            <span className="lab-stat-number">3</span>
            <span className="lab-stat-label">existing evidence accepted</span>
          </div>
          <div className="lab-stat-item">
            <span className="lab-stat-number">1</span>
            <span className="lab-stat-label">bridge candidate</span>
          </div>
          <div className="lab-stat-item">
            <span className="lab-stat-number">78%</span>
            <span className="lab-stat-label">Cardiff live capacity</span>
          </div>
          <div className="lab-stat-item">
            <span className="lab-stat-number">18 Nov</span>
            <span className="lab-stat-label">predicted completion</span>
          </div>
        </div>
      </div>

      <AIBanner
        watcherName="Lab Orchestrator is watching this workspace"
        description="CRFT AI reads, connects and prepares. Versioned rules decide deterministic compliance outcomes. People verify and approve controlled publication."
        onAskGenie={onOpenGenie}
        onWhatChanged={() => alert("Telemetry: Cardiff incubator batch 4 verified at 40°C / 75% RH stability check.")}
        onRunSweep={onOpenSweep}
      />

      <div className="dossier-milestones-card">
        <div className="dossier-milestones-header">
          <h2 className="dossier-milestones-title">Dossier Status & Compliance Milestones</h2>
          <span className="dossier-status-pill">
            Status: Ready for Audit
          </span>
        </div>

        <p className="dossier-milestones-desc">
          All regulatory evidence requirements for <strong>Lab Testing & Evidence</strong> have been consolidated from formulation data, supplier certificates, and packaging specifications.
        </p>

        <div className="dossier-milestones-grid">
          <div className="dossier-milestone-item">
            <span className="dossier-milestone-status">Passed (100%)</span>
            <span className="dossier-milestone-detail">
              Clinical Trial CT-2024-09 · 4-Week Skin Repair
            </span>
          </div>

          <div className="dossier-milestone-item">
            <span className="dossier-milestone-status">Approved</span>
            <span className="dossier-milestone-detail">
              Toxicological CPSR Part A & B Safety Dossier
            </span>
          </div>

          <div className="dossier-milestone-item">
            <span className="dossier-milestone-status">Compliant</span>
            <span className="dossier-milestone-detail">
              ISO 11930 Preservative Challenge Efficacy
            </span>
          </div>

          <div className="dossier-milestone-item">
            <span className="dossier-milestone-status">Verified</span>
            <span className="dossier-milestone-detail">
              Packaging Compatibility & Migration Audit
            </span>
          </div>
        </div>

        <div className="dossier-milestones-actions">
          <button
            type="button"
            className="dossier-btn-export"
            onClick={() =>
              alert(`Regulatory Package generated for ${product.name}: Exporting consolidated dossier (CPSR Parts A/B, ISO 11930 reports, and clinical trial CT-2024-09 certs).`)
            }
          >
            Export Regulatory Package ↓
          </button>
          <button
            type="button"
            className="dossier-btn-return"
            onClick={() => {
              if (onNavigateOverview) {
                onNavigateOverview();
              } else {
                window.location.href = '/overview';
              }
            }}
          >
            ← Return to 360 Overview
          </button>
        </div>
      </div>
    </div>
  );
};
