import React, { useState } from 'react';
import {
  Sparkles,
  Leaf,
  Compass,
  QrCode,
  ShoppingBag,
  Store,
  FileBadge,
  CheckCircle2
} from 'lucide-react';
import type { Product, MainNavId } from '../types';
import { AIBanner } from '../components/AIBanner';
import { PassportModal } from '../components/Modals';

interface GenericProductPageProps {
  navId: MainNavId;
  product: Product;
  onOpenGenie: () => void;
  onOpenSweep: () => void;
}

export const GenericProductPage: React.FC<GenericProductPageProps> = ({
  navId,
  product,
  onOpenGenie,
  onOpenSweep,
}) => {
  const [isPassportModalOpen, setIsPassportModalOpen] = useState(false);
  const getPageConfig = () => {
    switch (navId) {
      case 'sustainability':
        return {
          eyebrow: 'CRFT · ENVIRONMENTAL INTELLIGENCE',
          title: 'Sustainability & Carbon Footprint',
          description: `${product.name} · Cradle-to-grave Product Environmental Footprint (PEF), Scope 3 emissions, and plastic levy mitigation for UK, EU and UAE.`,
          watcher: 'CRFT Genie is monitoring Sustainability Intelligence',
          icon: <Leaf className="w-5 h-5 text-[#059669]" />,
          stats: [
            { label: 'CO2e per unit', value: '0.142 kg' },
            { label: 'PCR Content', value: '40% Glass' },
            { label: 'Recyclability Score', value: 'Grade A (94%)' },
            { label: 'Plastic Tax Exposure', value: '£0.00 (Exempt)' },
          ],
        };

      case 'horizon':
        return {
          eyebrow: 'CRFT · GLOBAL REGULATORY SCANNER',
          title: 'Horizon Watcher',
          description: `${product.name} · Real-time statutory radar tracking upcoming amendments in EU REACH, Cosmetics Regulation 1223/2009, and California Prop 65.`,
          watcher: 'CRFT Genie is monitoring Horizon Intelligence',
          icon: <Compass className="w-5 h-5 text-[#2563eb]" />,
          stats: [
            { label: 'Upcoming Mandates', value: '3 Active' },
            { label: 'Impact Risk', value: 'Low' },
            { label: 'Next Enforcement', value: '1 Jan 2027' },
            { label: 'Compliance Score', value: '98.4%' },
          ],
        };

      case 'passport':
        return {
          eyebrow: 'CRFT · DIGITAL PRODUCT PASSPORT (DPP)',
          title: 'Digital Product Passport',
          description: `${product.name} · Open GS1 Digital Link compliant passport for consumers, customs authorities, and recyclers across the European Single Market.`,
          watcher: 'CRFT Genie is monitoring Passport Intelligence',
          icon: <QrCode className="w-5 h-5 text-[#7c3aed]" />,
          stats: [
            { label: 'DPP Unique ID', value: 'urn:crft:dpp:dkhoon:nr-50' },
            { label: 'QR Scan Count', value: '14,208 scans' },
            { label: 'Authenticity Proof', value: 'Cryptographic Hash' },
            { label: 'Public Dossier', value: 'Active' },
          ],
        };

      case 'commerce':
        return {
          eyebrow: 'CRFT · TRADE & SUPPLY CHAIN',
          title: 'Commerce Operations',
          description: `${product.name} · Synchronized master SKU data, EAN/UPC barcodes, customs tariff codes (HS 3304.99), and country of origin declarations.`,
          watcher: 'CRFT Genie is monitoring Commerce Intelligence',
          icon: <ShoppingBag className="w-5 h-5 text-[#0d9488]" />,
          stats: [
            { label: 'HS Tariff Code', value: '3304.99.00' },
            { label: 'Country of Origin', value: 'United Kingdom' },
            { label: 'Global Trade Item', value: '05060891234567' },
            { label: 'Wholesale MoQ', value: '500 units' },
          ],
        };

      case 'retail':
        return {
          eyebrow: 'CRFT · RETAIL DISTRIBUTION',
          title: 'Retail Compliance & Space Management',
          description: `${product.name} · Sephora, Harrods, and Bloomingdale's clean beauty compliance checklists and shelf packaging specifications.`,
          watcher: 'CRFT Genie is monitoring Retail Compliance',
          icon: <Store className="w-5 h-5 text-[#ea580c]" />,
          stats: [
            { label: 'Harrods Clean Cert', value: 'Approved' },
            { label: 'Sephora Clean Seal', value: 'Eligible' },
            { label: 'Shelf Facing (WxHxD)', value: '45 x 135 x 45 mm' },
            { label: 'Weight Gross', value: '168 g' },
          ],
        };

      case 'borderpass':
        return {
          eyebrow: 'CRFT · CROSS-BORDER CLEARANCE',
          title: 'BorderPass Automated Customs Clearance',
          description: `${product.name} · One-click digital dossier generation for GCC SASO Saber, EU CPNP, and UK Submit Cosmetic Notification (SCPN).`,
          watcher: 'CRFT Genie is monitoring BorderPass Intelligence',
          icon: <FileBadge className="w-5 h-5 text-[#0284c7]" />,
          stats: [
            { label: 'UK SCPN Reference', value: 'UKCP-8841920' },
            { label: 'EU CPNP Reference', value: 'CPNP-4491021' },
            { label: 'GCC SASO Saber', value: 'SABER-991204' },
            { label: 'Fast-Track Status', value: 'Green Lane' },
          ],
        };

      case 'authentic':
        return {
          eyebrow: 'CRFT · BRAND INTEGRITY & ANTI-COUNTERFEIT',
          title: 'Brand Protection & Authentication',
          description: `${product.name} · Serialization tracking, covert micro-tagging verification, and grey-market redirection monitoring.`,
          watcher: 'CRFT Genie is monitoring Authentication Intelligence',
          icon: <CheckCircle2 className="w-5 h-5 text-[#16a34a]" />,
          stats: [
            { label: 'Unique Batch Tokens', value: '50,000 Generated' },
            { label: 'Grey Market Alerts', value: '0 Flagged' },
            { label: 'Tamper Verification', value: 'Cellulose Seal' },
            { label: 'Audit Trail', value: 'Immutable' },
          ],
        };

      default:
        return {
          eyebrow: 'CRFT INTELLIGENCE',
          title: 'Product Module',
          description: `${product.name} master workspace.`,
          watcher: 'CRFT Genie is monitoring Claims Intelligence',
          icon: <Sparkles className="w-5 h-5 text-[#0d9488]" />,
          stats: [],
        };
    }
  };

  const config = getPageConfig();

  return (
    <div className="crft-page-stack">
      <div className="intelligence-hero-card">
        <span className="intel-hero-eyebrow">{config.eyebrow}</span>
        <h1 className="intel-hero-title">{config.title}</h1>
        <p className="intel-hero-description">{config.description}</p>
      </div>

      <AIBanner
        watcherName={config.watcher}
        description="CRFT AI reads, connects and prepares. Versioned rules decide deterministic compliance outcomes. People verify and approve controlled publication."
        onAskGenie={onOpenGenie}
        onWhatChanged={() => alert(`Auditing real-time activity for ${config.title}.`)}
        onRunSweep={onOpenSweep}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
        {config.stats.map((stat, idx) => (
          <div key={idx} className="p-4 bg-white rounded-2xl border border-[#eef2f6] shadow-sm">
            <span className="text-[10.5px] font-bold text-[#8c9ba5] uppercase tracking-wider block mb-1">{stat.label}</span>
            <span className="text-base font-semibold text-[#0f172a]">{stat.value}</span>
          </div>
        ))}
      </div>

      {navId === 'passport' && (
        <div className="p-6 bg-white rounded-2xl border border-[#eef2f6] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
          <div>
            <span className="text-[11px] font-semibold text-[#7c3aed] uppercase tracking-wider block mb-1">
              Active Passport Gateway
            </span>
            <h3 className="text-base font-bold text-[#0f172a]">
              GS1 Digital Link · EU Single Market QR
            </h3>
            <p className="text-xs text-[#64748b] mt-0.5">
              Scan-ready SVG vector QR code compliant with ISO 18004 and EU PPWR Article 11.
            </p>
          </div>
          <button
            type="button"
            className="px-5 py-2.5 bg-[#0f172a] hover:bg-[#1e293b] text-white text-xs font-semibold rounded-xl flex items-center gap-2 shrink-0 transition-all shadow-sm"
            onClick={() => setIsPassportModalOpen(true)}
          >
            <QrCode className="w-4 h-4 text-white" />
            <span>Open Passport & QR</span>
          </button>
        </div>
      )}

      <PassportModal
        isOpen={isPassportModalOpen}
        onClose={() => setIsPassportModalOpen(false)}
        product={product}
      />
    </div>
  );
};
