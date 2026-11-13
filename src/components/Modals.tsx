import React, { useState } from 'react';
import { X, Check, Mail, Send, Sparkles, Plus, Edit3 } from 'lucide-react';
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

export const EditProductModal: React.FC<EditProductModalProps> = ({
  isOpen,
  onClose,
  product,
  onUpdateProduct,
}) => {
  const [name, setName] = useState(product?.name || '');
  const [brand, setBrand] = useState(product?.brand || 'Dkhoon The Emirates');
  const [variant, setVariant] = useState(product?.variant || 'P1 · v7');
  const [size, setSize] = useState(product?.size || '50 ml');
  const [category, setCategory] = useState(product?.category || 'Skincare');
  const [markets, setMarkets] = useState(product?.markets.join(', ') || 'UK, EU, UAE, KSA');
  const [illustrationType, setIllustrationType] = useState<Product['illustrationType']>(
    product?.illustrationType || 'serum'
  );
  const [deadline, setDeadline] = useState(product?.deadline || '12 Sep');

  React.useEffect(() => {
    if (product) {
      setName(product.name);
      setBrand(product.brand);
      setVariant(product.variant);
      setSize(product.size);
      setCategory(product.category);
      setMarkets(product.markets.join(', '));
      setIllustrationType(product.illustrationType);
      setDeadline(product.deadline || '12 Sep');
    }
  }, [product]);

  if (!isOpen || !product) return null;

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
