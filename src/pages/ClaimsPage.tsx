import React, { useState } from 'react';
import { Upload, ScanLine, Info } from 'lucide-react';
import type { Product } from '../types';
import { AIBanner } from '../components/AIBanner';

interface ClaimsPageProps {
  product: Product;
  onOpenGenie: () => void;
  onOpenSweep: () => void;
}

export const ClaimsPage: React.FC<ClaimsPageProps> = ({
  product,
  onOpenGenie,
  onOpenSweep,
}) => {
  const [scanning, setScanning] = useState(false);

  const handleRunScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      alert("Claim Scan completed: 8 claims analyzed across Front/Back artwork and master packaging copy. 1 high-risk wording identified under EU Green Claims Directive.");
    }, 1200);
  };

  return (
    <div className="crft-page-stack">
      <div className="intelligence-hero-card">
        <span className="intel-hero-eyebrow">CRFT · {product.brand.toUpperCase()}</span>
        <h1 className="intel-hero-title">Claims Intelligence</h1>
        <p className="intel-hero-description">
          {product.name} · CRFT reads front/back artwork, web copy and product content, detects regulated or high-risk wording and connects every claim to evidence and market-specific review.
        </p>

        <div className="intel-hero-actions">
          <button
            type="button"
            className="intel-primary-btn"
            onClick={() => alert("Upload dialog initialized: PDF artwork / AI vector formats supported.")}
          >
            <Upload className="w-4 h-4" />
            <span>Upload artwork</span>
          </button>
          <button
            type="button"
            className="intel-secondary-btn"
            onClick={handleRunScan}
            disabled={scanning}
          >
            <ScanLine className="w-4 h-4" />
            <span>{scanning ? 'Scanning artwork...' : 'Run claim scan'}</span>
          </button>
        </div>
      </div>

      <AIBanner
        watcherName="CRFT Genie is monitoring Claims Intelligence"
        description="CRFT AI reads, connects and prepares. Versioned rules decide deterministic compliance outcomes. People verify and approve controlled publication."
        onAskGenie={onOpenGenie}
        onWhatChanged={() => alert("Claim rule update: EU Green Claims Directive provisional agreement ratified. Generic claims 'eco-friendly' require third-party certification.")}
        onRunSweep={onOpenSweep}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="claims-artwork-card">
          <div className="flex items-center justify-between pb-3 border-b border-[#eef2f6]">
            <div>
              <span className="text-[10.5px] font-bold tracking-wider text-[#8c9ba5] uppercase">ARTWORK</span>
              <h3 className="text-sm font-semibold text-[#0f172a]">FRONT PANEL - V5</h3>
            </div>
            <span className="text-[11px] font-semibold bg-[#fef3c7] text-[#b45309] px-2.5 py-0.5 rounded-full border border-[#fde68a]">
              1 claim needs review
            </span>
          </div>

          <div className="mt-4 p-4 bg-[#f8fafc] rounded-xl border border-[#eef2f6]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-[#64748b]">OCR Bounding Box #4</span>
              <span className="text-[10px] bg-[#fee2e2] text-[#991b1b] px-2 py-0.5 rounded font-semibold">
                High Regulatory Risk
              </span>
            </div>
            <p className="text-sm font-serif italic text-[#0f172a] bg-white p-3 rounded-lg border border-[#cbd5e1]">
              "Infused with botanical youth nectar · eco-friendly packaging · 50ml e"
            </p>
          </div>
        </div>

        <div className="claims-detection-card">
          <div className="flex items-center justify-between pb-3 border-b border-[#eef2f6]">
            <span className="text-[10.5px] font-bold tracking-wider text-[#8c9ba5] uppercase">AI CLAIM DETECTION</span>
            <span className="text-xs text-[#64748b]">Directive (EU) 2024/825</span>
          </div>

          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2">
              <h4 className="text-base font-serif font-semibold text-[#0f172a]">"eco-friendly packaging"</h4>
              <button 
                type="button" 
                onClick={onOpenGenie} 
                className="text-[#64748b] hover:text-[#0f172a]"
                title="Explain regulation"
              >
                <Info className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#475569] leading-relaxed mb-4">
              Generic environmental claims without substantiated LCA (Life Cycle Assessment) or recognized ecolabel scheme are restricted under EU PPWR Article 11.
            </p>

            <div className="p-3 bg-[#f0fdf4] rounded-xl border border-[#bbf7d0] text-xs">
              <span className="font-semibold text-[#166534] block mb-1">CRFT Deterministic Recommendation:</span>
              <p className="text-[#14532d]">
                Replace with substantiated specific claim: <code className="bg-white px-1.5 py-0.5 rounded border border-[#86efac]">"Bottle crafted with 40% recycled glass · 100% recyclable"</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
