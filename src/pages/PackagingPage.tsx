import React from 'react';
import { Upload, Library, CheckCircle2, AlertTriangle } from 'lucide-react';
import type { Product } from '../types';
import { AIBanner } from '../components/AIBanner';
import { CircularProgress } from '../components/CircularProgress';

interface PackagingPageProps {
  product: Product;
  onOpenGenie: () => void;
  onOpenSweep: () => void;
  onOpenSupplierModal: () => void;
}

export const PackagingPage: React.FC<PackagingPageProps> = ({
  product,
  onOpenGenie,
  onOpenSweep,
  onOpenSupplierModal,
}) => {
  return (
    <div className="crft-page-stack">
      <div className="intelligence-hero-card">
        <span className="intel-hero-eyebrow">CRFT · {product.brand.toUpperCase()}</span>
        <h1 className="intel-hero-title">Packaging Intelligence</h1>
        <p className="intel-hero-description">
          {product.name} · one packaging digital twin for PPWR, Sustainability, EPR/pEPR, artwork, suppliers and Product Passport. Upload engineering evidence once; CRFT reuses it everywhere.
        </p>

        <div className="intel-hero-actions">
          <button
            type="button"
            className="intel-primary-btn"
            onClick={() => alert("Upload dialog initialized: Accept .STEP, .PDF specifications, and CAD drawings.")}
          >
            <Upload className="w-4 h-4" />
            <span>Upload packaging folder</span>
          </button>
          <button
            type="button"
            className="intel-secondary-btn"
            onClick={() => alert("Opening Global Packaging Component Library with 14,000 certified components.")}
          >
            <Library className="w-4 h-4" />
            <span>Open component library</span>
          </button>
        </div>
      </div>

      <AIBanner
        watcherName="CRFT Genie is monitoring Packaging Intelligence"
        description="CRFT AI reads, connects and prepares. Versioned rules decide deterministic compliance outcomes. People verify and approve controlled publication."
        onAskGenie={onOpenGenie}
        onWhatChanged={() => alert("Packaging change log: Weight of secondary carton reduced by 4.2g on 04 Sep.")}
        onRunSweep={onOpenSweep}
      />

      <div className="packaging-system-card">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#eef2f6] gap-4">
          <div>
            <span className="packset-badge">
              PACKSET-{product.id.slice(0, 3).toUpperCase()} · {product.variant ? product.variant.toUpperCase() : 'VERSION 7'}
            </span>
            <h2 className="packset-title">Primary + secondary packaging system</h2>
            <p className="packset-subtitle">Unified Bill of Materials for EU PPWR & UK pEPR</p>
          </div>
          <div className="flex items-center gap-3">
            <CircularProgress value={86} size={54} strokeWidth={4} />
            <div className="text-right">
              <span className="text-xs font-semibold text-[#0f172a] block">86% Compliance</span>
              <span className="text-[11px] text-[#d97706]">1 supplier cert pending</span>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <div className="p-3.5 bg-[#f8fafc] rounded-xl border border-[#eef2f6] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white border border-[#cbd5e1] flex items-center justify-center font-mono text-xs font-bold text-[#0f172a]">
                C1
              </div>
              <div>
                <h4 className="text-xs font-semibold text-[#0f172a]">Flint Glass Bottle 50ml</h4>
                <p className="text-[11px] text-[#64748b]">110g · Type III Soda-Lime Glass · Vetro Verde</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] bg-[#fef3c7] text-[#92400e] px-2.5 py-0.5 rounded-full border border-[#fde68a] flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> Declaration Expires 12 Sep
              </span>
              <button
                type="button"
                onClick={onOpenSupplierModal}
                className="text-xs text-[#0f172a] font-semibold hover:underline"
              >
                Renew ›
              </button>
            </div>
          </div>

          <div className="p-3.5 bg-[#f8fafc] rounded-xl border border-[#eef2f6] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white border border-[#cbd5e1] flex items-center justify-center font-mono text-xs font-bold text-[#0f172a]">
                C2
              </div>
              <div>
                <h4 className="text-xs font-semibold text-[#0f172a]">Pipette Dropper Assembly</h4>
                <p className="text-[11px] text-[#64748b]">Polypropylene collar, NBR bulb, borosilicate tube</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] bg-[#ecfdf5] text-[#065f46] px-2.5 py-0.5 rounded-full border border-[#a7f3d0] flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Verified Monomaterial PP Collar
              </span>
            </div>
          </div>

          <div className="p-3.5 bg-[#f8fafc] rounded-xl border border-[#eef2f6] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white border border-[#cbd5e1] flex items-center justify-center font-mono text-xs font-bold text-[#0f172a]">
                C3
              </div>
              <div>
                <h4 className="text-xs font-semibold text-[#0f172a]">Folding Carton Box</h4>
                <p className="text-[11px] text-[#64748b]">FSC Certified Virgin Board · 350 gsm · PackWorks</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] bg-[#ecfdf5] text-[#065f46] px-2.5 py-0.5 rounded-full border border-[#a7f3d0] flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Recyclability Score: 98% (EN 13430)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
