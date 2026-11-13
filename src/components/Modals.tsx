import React, { useState } from 'react';
import { X, Check, Mail, Send, Sparkles, Plus, Edit3, QrCode, Download, Copy, ShieldCheck } from 'lucide-react';
import type { Product } from '../types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupplierModal: React.FC<ModalProps & { supplierName?: string; requirement?: string }> = ({
  isOpen,
  onClose,
  supplierName = 'Vetro Verde SRL',
  requirement = 'Bottle heavy-metal declaration renewal (EU PPWR & UK pEPR)',
}) => {
  const [sent, setSent] = useState(false);
  const [recipient, setRecipient] = useState('technical.compliance@vetroverde.it');
  const [subject, setSubject] = useState(`URGENT: ${requirement} (Ref: Vetro 50ml Flint)`);
  const [body, setBody] = useState(`Dear Vetro Verde Compliance Team,\n\nOur current declaration for component PACKSET-018 (50 ml Flint Glass Flacon) expires on 12 September 2026.\n\nTo ensure uninterrupted compliance with EU PPWR and UK pEPR statutory audits, please provide the renewed Heavy Metal Migration and lead/cadmium certificate according to EN 13428.\n\nThank you,\nCRFT Compliance Operations\nOn behalf of Dkhoon The Emirates`);

  if (!isOpen) return null;

  return (
    <div className="crft-modal-overlay">
      <div className="crft-modal-card">
        <div className="crft-modal-header">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-[#0f172a]" />
            <h3 className="font-semibold text-base text-[#0f172a]">Ask Supplier · {supplierName}</h3>
          </div>
          <button type="button" onClick={onClose} className="text-[#64748b] hover:text-[#0f172a]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {sent ? (
          <div className="p-6 text-center">
            <div className="w-12 h-12 bg-[#ecfdf5] text-[#059669] rounded-full flex items-center justify-center mx-auto mb-3">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="font-semibold text-base text-[#0f172a] mb-1">Inquiry Dispatched</h4>
            <p className="text-xs text-[#64748b] mb-4">
              CRFT has logged this dispatch under audit ref <code>TX-VV-8841</code>. A copy is stored in Evidence Vault.
            </p>
            <button
              type="button"
              onClick={() => {
                setSent(false);
                onClose();
              }}
              className="bg-[#182635] text-white text-xs font-medium px-4 py-2 rounded-xl hover:bg-[#0f172a]"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="p-5 space-y-3.5">
            <div>
              <label className="block text-[11px] font-medium text-[#64748b] mb-1">Recipient</label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full text-xs bg-[#f8fafc] border border-[#e2e8f0] rounded-lg px-3 py-2 text-[#0f172a]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-[#64748b] mb-1">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full text-xs bg-[#f8fafc] border border-[#e2e8f0] rounded-lg px-3 py-2 text-[#0f172a]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-[#64748b] mb-1">Message Body</label>
              <textarea
                rows={6}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full text-xs bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-3 text-[#0f172a] font-mono leading-relaxed"
              />
            </div>
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#e2e8f0]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs text-[#64748b] hover:bg-[#f1f5f9]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setSent(true)}
                className="flex items-center gap-2 bg-[#182635] hover:bg-[#0f172a] text-white text-xs font-medium px-4 py-2 rounded-xl"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send via CRFT Gateway</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const NudgeModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [nudged, setNudged] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="crft-modal-overlay">
      <div className="crft-modal-card max-w-md">
        <div className="crft-modal-header">
          <h3 className="font-semibold text-base text-[#0f172a]">Nudge Supplier · PackWorks</h3>
          <button type="button" onClick={onClose} className="text-[#64748b] hover:text-[#0f172a]">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-5">
          {nudged ? (
            <div className="text-center py-4">
              <div className="w-10 h-10 bg-[#ecfdf5] text-[#059669] rounded-full flex items-center justify-center mx-auto mb-2">
                <Check className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-[#0f172a]">Reminder Nudge Sent to PackWorks</p>
              <p className="text-[11px] text-[#64748b] mt-1">SLA counter reset. Next automated alert in 48 hours.</p>
              <button
                type="button"
                onClick={() => {
                  setNudged(false);
                  onClose();
                }}
                className="mt-4 bg-[#182635] text-white text-xs px-4 py-2 rounded-xl"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <p className="text-xs text-[#475569] mb-4">
                PackWorks was sent the PFAS Declaration form <strong>2 days ago</strong>. Nudging will send a high-priority ping to their designated quality director with direct secure upload link.
              </p>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={onClose} className="px-3 py-1.5 text-xs text-[#64748b]">
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => setNudged(true)}
                  className="bg-[#182635] hover:bg-[#0f172a] text-white text-xs px-4 py-2 rounded-xl"
                >
                  Send Nudge
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const NewProductModal: React.FC<ModalProps & { onAddProduct: (prod: Partial<Product>) => void }> = ({
  isOpen,
  onClose,
  onAddProduct,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Skincare');
  const [size, setSize] = useState('50 ml');
  const [markets, setMarkets] = useState('EU, UK, UAE');
  const [illustrationType, setIllustrationType] = useState<any>('serum');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddProduct({
      name,
      category,
      size,
      brand: 'Dkhoon The Emirates',
      variant: 'Standard · v1',
      readiness: 75,
      missingCount: 3,
      markets: markets.split(',').map((m) => m.trim()),
      illustrationType,
    });
    setName('');
    onClose();
  };

  return (
    <div className="crft-modal-overlay">
      <div className="crft-modal-card">
        <div className="crft-modal-header">
          <div className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-[#0f172a]" />
            <h3 className="font-semibold text-base text-[#0f172a]">Create New Product Dossier</h3>
          </div>
          <button type="button" onClick={onClose} className="text-[#64748b] hover:text-[#0f172a]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-[11px] font-medium text-[#64748b] mb-1">Product Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Velvet Botanical Elixir"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full text-xs bg-[#f8fafc] border border-[#e2e8f0] rounded-lg px-3 py-2 text-[#0f172a]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-medium text-[#64748b] mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-xs bg-[#f8fafc] border border-[#e2e8f0] rounded-lg px-3 py-2 text-[#0f172a]"
              >
                <option value="Skincare">Skincare</option>
                <option value="Fragrance">Fragrance</option>
                <option value="Bodycare">Bodycare</option>
                <option value="Gift Sets">Gift Sets</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-medium text-[#64748b] mb-1">Fill Volume</label>
              <input
                type="text"
                placeholder="50 ml"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full text-xs bg-[#f8fafc] border border-[#e2e8f0] rounded-lg px-3 py-2 text-[#0f172a]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-medium text-[#64748b] mb-1">Target Markets</label>
              <input
                type="text"
                placeholder="UK, EU, UAE, KSA"
                value={markets}
                onChange={(e) => setMarkets(e.target.value)}
                className="w-full text-xs bg-[#f8fafc] border border-[#e2e8f0] rounded-lg px-3 py-2 text-[#0f172a]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-[#64748b] mb-1">Packaging Model</label>
              <select
                value={illustrationType}
                onChange={(e) => setIllustrationType(e.target.value)}
                className="w-full text-xs bg-[#f8fafc] border border-[#e2e8f0] rounded-lg px-3 py-2 text-[#0f172a]"
              >
                <option value="serum">Serum Dropper</option>
                <option value="amber-oud">Perfume Flacon</option>
                <option value="hydra-cream">Cosmetic Jar</option>
                <option value="body-wash">Body Wash Bottle</option>
                <option value="cleanser">Cleanser Tube</option>
                <option value="refill">Refill Cartridge</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#e2e8f0]">
            <button type="button" onClick={onClose} className="px-4 py-2 text-xs text-[#64748b]">
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#182635] hover:bg-[#0f172a] text-white text-xs font-medium px-4 py-2 rounded-xl"
            >
              Generate Digital Twin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const AISweepModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [progress, setProgress] = useState(0);

  React.useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 25;
      });
    }, 300);

    return () => {
      clearInterval(timer);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    setProgress(0);
    onClose();
  };

  return (
    <div className="crft-modal-overlay">
      <div className="crft-modal-card max-w-md">
        <div className="crft-modal-header">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#0d9488]" />
            <h3 className="font-semibold text-base text-[#0f172a]">Deterministic AI Regulatory Sweep</h3>
          </div>
          <button type="button" onClick={handleClose} className="text-[#64748b] hover:text-[#0f172a]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 text-center">
          {progress < 100 ? (
            <div className="py-6">
              <div className="w-full bg-[#e2e8f0] h-2 rounded-full overflow-hidden mb-3">
                <div
                  className="bg-[#0d9488] h-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-[#0f172a] font-medium">
                Evaluating 142 statutory rules across EU PPWR, UK EPR, MoCRA & GCRS...
              </p>
            </div>
          ) : (
            <div className="py-2">
              <div className="w-10 h-10 bg-[#ecfdf5] text-[#059669] rounded-full flex items-center justify-center mx-auto mb-2">
                <Check className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-sm text-[#0f172a]">Sweep Completed: 0 New Blocking Issues</h4>
              <p className="text-xs text-[#64748b] mt-1">
                All 6 layers re-indexed. 2 previously flagged supplier declarations remain outstanding.
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="mt-4 bg-[#182635] text-white text-xs px-4 py-2 rounded-xl"
              >
                Close Report
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onUpdateProduct: (productId: string, updatedFields: Partial<Product>) => void;
}

const EditProductModalContent: React.FC<{
  product: Product;
  onClose: () => void;
  onUpdateProduct: (productId: string, updatedFields: Partial<Product>) => void;
}> = ({ product, onClose, onUpdateProduct }) => {
  const [name, setName] = useState(product.name);
  const [brand, setBrand] = useState(product.brand);
  const [variant, setVariant] = useState(product.variant);
  const [size, setSize] = useState(product.size);
  const [category, setCategory] = useState(product.category);
  const [markets, setMarkets] = useState(product.markets.join(', '));
  const [illustrationType, setIllustrationType] = useState<Product['illustrationType']>(
    product.illustrationType
  );
  const [deadline, setDeadline] = useState(product.deadline || '12 Sep');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const parsedMarkets = markets
      .split(',')
      .map((m) => m.trim())
      .filter(Boolean);

    onUpdateProduct(product.id, {
      name: name.trim(),
      brand: brand.trim(),
      variant: variant.trim(),
      size: size.trim(),
      category: category.trim(),
      markets: parsedMarkets.length > 0 ? parsedMarkets : product.markets,
      illustrationType,
      deadline: deadline.trim(),
      subtext: `${size.trim()} · ${parsedMarkets.slice(0, 2).join(' + ')} · ${product.readiness}% ready`,
    });
    onClose();
  };

  return (
    <div className="crft-modal-overlay">
      <div className="crft-modal-card">
        <div className="crft-modal-header">
          <div className="flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-[#0f172a]" />
            <div>
              <h3 className="font-semibold text-base text-[#0f172a]">Edit Product Details</h3>
              <p className="text-[11px] text-[#64748b]">{product.name} · {product.id}</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="text-[#64748b] hover:text-[#0f172a]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-3.5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-medium text-[#64748b] mb-1">Product Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs bg-[#f8fafc] border border-[#e2e8f0] rounded-lg px-3 py-2 text-[#0f172a]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-[#64748b] mb-1">Brand Name</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full text-xs bg-[#f8fafc] border border-[#e2e8f0] rounded-lg px-3 py-2 text-[#0f172a]"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-medium text-[#64748b] mb-1">Fill Volume / Size</label>
              <input
                type="text"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full text-xs bg-[#f8fafc] border border-[#e2e8f0] rounded-lg px-3 py-2 text-[#0f172a]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-[#64748b] mb-1">Variant / Version</label>
              <input
                type="text"
                value={variant}
                onChange={(e) => setVariant(e.target.value)}
                className="w-full text-xs bg-[#f8fafc] border border-[#e2e8f0] rounded-lg px-3 py-2 text-[#0f172a]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-[#64748b] mb-1">Audit Deadline</label>
              <input
                type="text"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full text-xs bg-[#f8fafc] border border-[#e2e8f0] rounded-lg px-3 py-2 text-[#0f172a]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-medium text-[#64748b] mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-xs bg-[#f8fafc] border border-[#e2e8f0] rounded-lg px-3 py-2 text-[#0f172a]"
              >
                <option value="Skincare">Skincare</option>
                <option value="Fragrance">Fragrance</option>
                <option value="Bodycare">Bodycare</option>
                <option value="Gift Sets">Gift Sets</option>
                <option value="Refills">Refills</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-medium text-[#64748b] mb-1">Packaging Model</label>
              <select
                value={illustrationType}
                onChange={(e) => setIllustrationType(e.target.value as Product['illustrationType'])}
                className="w-full text-xs bg-[#f8fafc] border border-[#e2e8f0] rounded-lg px-3 py-2 text-[#0f172a]"
              >
                <option value="serum">Serum Dropper</option>
                <option value="amber-oud">Perfume Flacon</option>
                <option value="hydra-cream">Cosmetic Jar</option>
                <option value="body-wash">Body Wash Bottle</option>
                <option value="cleanser">Cleanser Tube</option>
                <option value="refill">Refill Cartridge</option>
                <option value="discovery-set">Gift Set Box</option>
                <option value="oud-intense">Extrait Flacon</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-[#64748b] mb-1">Target Markets (comma-separated)</label>
            <input
              type="text"
              placeholder="UK, EU, UAE, KSA"
              value={markets}
              onChange={(e) => setMarkets(e.target.value)}
              className="w-full text-xs bg-[#f8fafc] border border-[#e2e8f0] rounded-lg px-3 py-2 text-[#0f172a]"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#e2e8f0]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs text-[#64748b] hover:bg-[#f1f5f9] rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#0f172a] hover:bg-[#1e293b] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors"
            >
              Save Product Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const EditProductModal: React.FC<EditProductModalProps> = ({
  isOpen,
  onClose,
  product,
  onUpdateProduct,
}) => {
  if (!isOpen || !product) return null;

  return (
    <EditProductModalContent
      key={product.id}
      product={product}
      onClose={onClose}
      onUpdateProduct={onUpdateProduct}
    />
  );
};

export interface PassportModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

export const PassportModal: React.FC<PassportModalProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const dppUrl = `https://passport.crft.io/dpp/${product.id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(dppUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQR = () => {
    const svgEl = document.getElementById('passport-qr-code');
    if (!svgEl) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgEl);
    const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `CRFT-DPP-QR-${product.id}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  return (
    <div className="crft-modal-overlay" onClick={onClose}>
      <div
        className="crft-modal-card max-w-xl passport-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="crft-modal-header border-b border-[#eef2f6]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#f5f3ff] text-[#7c3aed] flex items-center justify-center">
              <QrCode className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-base text-[#0f172a]">
                Digital Product Passport (DPP)
              </h3>
              <p className="text-[11px] text-[#64748b]">
                EU PPWR & GS1 Digital Link Statutory Protocol
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#64748b] hover:text-[#0f172a]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 p-4 bg-[#f8fafc] rounded-2xl border border-[#eef2f6]">
            <div className="bg-white p-3 rounded-xl border border-[#e2e8f0] shadow-sm shrink-0 flex flex-col items-center">
              <svg
                id="passport-qr-code"
                viewBox="0 0 120 120"
                className="w-28 h-28"
                fill="#0f172a"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="10" y="10" width="30" height="30" rx="3" fill="#0f172a" />
                <rect x="15" y="15" width="20" height="20" rx="2" fill="#ffffff" />
                <rect x="20" y="20" width="10" height="10" rx="1.5" fill="#0f172a" />

                <rect x="80" y="10" width="30" height="30" rx="3" fill="#0f172a" />
                <rect x="85" y="15" width="20" height="20" rx="2" fill="#ffffff" />
                <rect x="90" y="20" width="10" height="10" rx="1.5" fill="#0f172a" />

                <rect x="10" y="80" width="30" height="30" rx="3" fill="#0f172a" />
                <rect x="15" y="85" width="20" height="20" rx="2" fill="#ffffff" />
                <rect x="20" y="90" width="10" height="10" rx="1.5" fill="#0f172a" />

                <rect x="44" y="22" width="6" height="6" rx="1" />
                <rect x="54" y="22" width="6" height="6" rx="1" />
                <rect x="64" y="22" width="6" height="6" rx="1" />
                <rect x="22" y="44" width="6" height="6" rx="1" />
                <rect x="22" y="54" width="6" height="6" rx="1" />
                <rect x="22" y="64" width="6" height="6" rx="1" />

                <rect x="46" y="46" width="6" height="6" rx="1" fill="#7c3aed" />
                <rect x="56" y="46" width="6" height="6" rx="1" />
                <rect x="66" y="46" width="6" height="6" rx="1" />
                <rect x="76" y="46" width="6" height="6" rx="1" fill="#7c3aed" />
                <rect x="46" y="56" width="6" height="6" rx="1" />
                <rect x="56" y="56" width="8" height="8" rx="2" fill="#0f172a" />
                <rect x="68" y="56" width="6" height="6" rx="1" />
                <rect x="78" y="56" width="6" height="6" rx="1" fill="#7c3aed" />
                <rect x="46" y="66" width="6" height="6" rx="1" fill="#7c3aed" />
                <rect x="56" y="66" width="6" height="6" rx="1" />
                <rect x="66" y="66" width="6" height="6" rx="1" />
                <rect x="88" y="46" width="6" height="6" rx="1" />
                <rect x="98" y="46" width="6" height="6" rx="1" />
                <rect x="88" y="66" width="6" height="6" rx="1" />
                <rect x="98" y="76" width="6" height="6" rx="1" />
                <rect x="46" y="78" width="6" height="6" rx="1" />
                <rect x="56" y="88" width="6" height="6" rx="1" />
                <rect x="66" y="78" width="6" height="6" rx="1" />
                <rect x="76" y="88" width="6" height="6" rx="1" />
                <rect x="86" y="88" width="6" height="6" rx="1" fill="#7c3aed" />
                <rect x="96" y="88" width="6" height="6" rx="1" />
                <rect x="86" y="98" width="6" height="6" rx="1" />
                <rect x="96" y="98" width="6" height="6" rx="1" fill="#7c3aed" />
                <rect x="46" y="98" width="6" height="6" rx="1" />
                <rect x="56" y="98" width="6" height="6" rx="1" />
                <rect x="66" y="98" width="6" height="6" rx="1" />
              </svg>
              <span className="text-[10px] text-[#64748b] font-mono mt-1 font-semibold">
                GS1 DIGITAL LINK
              </span>
            </div>

            <div className="flex-1 space-y-2 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
                <span className="bg-[#ecfdf5] text-[#059669] text-[10.5px] font-semibold px-2 py-0.5 rounded-full border border-[#a7f3d0]">
                  ✓ Verified Live
                </span>
                <span className="bg-[#f5f3ff] text-[#7c3aed] text-[10.5px] font-semibold px-2 py-0.5 rounded-full border border-[#ddd6fe]">
                  EU PPWR Art. 11 Compliant
                </span>
              </div>
              <h4 className="font-bold text-base text-[#0f172a] leading-tight">
                {product.name}
              </h4>
              <p className="text-xs text-[#64748b]">
                {product.brand} · {product.size} · {product.variant}
              </p>
              <div className="text-[11px] text-[#475569] font-mono bg-white px-2.5 py-1.5 rounded-lg border border-[#e2e8f0] break-all">
                {dppUrl}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3 bg-white rounded-xl border border-[#eef2f6] text-center">
              <span className="text-[10px] font-semibold text-[#8c9ba5] block uppercase">
                Recyclability
              </span>
              <span className="text-sm font-bold text-[#059669] block mt-0.5">
                Grade A (94%)
              </span>
              <span className="text-[10px] text-[#64748b] block">Flint glass stream</span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-[#eef2f6] text-center">
              <span className="text-[10px] font-semibold text-[#8c9ba5] block uppercase">
                CO2 Footprint
              </span>
              <span className="text-sm font-bold text-[#0f172a] block mt-0.5">
                0.142 kg
              </span>
              <span className="text-[10px] text-[#64748b] block">Per unit lifecycle</span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-[#eef2f6] text-center">
              <span className="text-[10px] font-semibold text-[#8c9ba5] block uppercase">
                Batch Registry
              </span>
              <span className="text-sm font-bold text-[#0f172a] block mt-0.5">
                #DX-8841-B
              </span>
              <span className="text-[10px] text-[#64748b] block">Exp: Aug 2029</span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-[#eef2f6] text-center">
              <span className="text-[10px] font-semibold text-[#8c9ba5] block uppercase">
                EU CPNP
              </span>
              <span className="text-sm font-bold text-[#7c3aed] block mt-0.5">
                #4109823
              </span>
              <span className="text-[10px] text-[#64748b] block">UK OPSS Active</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-[#f0fdf4] rounded-xl border border-[#bbf7d0]">
            <ShieldCheck className="w-5 h-5 text-[#16a34a] shrink-0" />
            <div className="text-xs text-[#166534]">
              <span className="font-semibold block">Cryptographically Signed DPP Evidence</span>
              <span>
                Immutable proof logged in CRFT Evidence Vault under hash <code>0x98f2...b71c</code>.
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#e2e8f0]">
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border border-[#cbd5e1] hover:bg-[#f8fafc] text-[#1e293b] transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#059669]" />
                  <span>Public Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#64748b]" />
                  <span>Copy Public DPP Link</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleDownloadQR}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-[#0f172a] hover:bg-[#1e293b] text-white transition-all shadow-sm"
            >
              {downloaded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Download QR Code (.SVG)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
