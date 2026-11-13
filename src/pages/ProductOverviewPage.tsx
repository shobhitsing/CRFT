import React, { useState } from 'react';
import {
  Image as ImageIcon,
  FlaskConical,
  Box,
  FileText,
  ShoppingBag,
  Globe,
  QrCode,
  Check,
  CheckCircle2,
  RotateCcw
} from 'lucide-react';
import type { Product, ProductLayer } from '../types';
import { ProductIllustration } from '../components/ProductIllustration';
import { CircularProgress } from '../components/CircularProgress';
import { PassportModal } from '../components/Modals';

interface ProductOverviewPageProps {
  product: Product;
  onNavigateTab: (tab: any) => void;
  onOpenSupplierModal: () => void;
  onOpenNudgeModal: () => void;
  onOpenGenie: () => void;
  onSelectPortfolio: () => void;
  onUpdateProduct?: (updatedProduct: Partial<Product>) => void;
}

export const ProductOverviewPage: React.FC<ProductOverviewPageProps> = ({
  product,
  onNavigateTab: _onNavigateTab,
  onOpenSupplierModal,
  onOpenNudgeModal,
  onOpenGenie,
  onSelectPortfolio,
  onUpdateProduct,
}) => {
  const [editingLayer, setEditingLayer] = useState<ProductLayer | null>(null);
  const [editName, setEditName] = useState(product.name);
  const [editSize, setEditSize] = useState(product.size);
  const [editCategory, setEditCategory] = useState(product.category || 'Skincare');
  const [isPassportOpen, setIsPassportOpen] = useState(false);

  const handleResolveMissingItem = (itemId: string) => {
    const currentList = product.missingItems && product.missingItems.length > 0
      ? product.missingItems
      : defaultMissingItems;
    const updatedMissing = currentList.filter((m) => m.id !== itemId);
    const newMissingCount = updatedMissing.length;
    const newReadiness = newMissingCount === 0 ? 100 : Math.min(99, product.readiness + 5);

    if (onUpdateProduct) {
      onUpdateProduct({
        missingItems: updatedMissing,
        missingCount: newMissingCount,
        readiness: newReadiness,
      });
    }
  };

  const handleResetMissingItems = () => {
    if (onUpdateProduct) {
      onUpdateProduct({
        missingItems: defaultMissingItems,
        missingCount: defaultMissingItems.length,
        readiness: 91,
      });
    }
  };

  const handleOpenEdit = (layer: ProductLayer) => {
    setEditingLayer(layer);
    setEditName(product.name);
    setEditSize(product.size);
    setEditCategory(product.category || 'Skincare');
  };

  const handleSaveDraft = () => {
    if (onUpdateProduct) {
      onUpdateProduct({
        name: editName,
        size: editSize,
        category: editCategory,
      });
    }
    setEditingLayer(null);
  };

  const handleCompleteLayer = () => {
    if (!editingLayer) return;
    const updatedLayers = product.layers.map((l) =>
      l.number === editingLayer.number
        ? { ...l, status: 'complete' as const, statusText: 'Complete' }
        : l
    );
    const completeCount = updatedLayers.filter((l) => l.status === 'complete').length;
    const newReadiness = Math.round((completeCount / updatedLayers.length) * 100);

    if (onUpdateProduct) {
      onUpdateProduct({
        name: editName,
        size: editSize,
        category: editCategory,
        layers: updatedLayers,
        readiness: newReadiness,
      });
    }
    setEditingLayer(null);
  };
  const defaultMissingItems = [
    {
      id: 'missing-1',
      title: 'Bottle heavy-metal declaration',
      description: 'Vetro Verde declaration expires 12 Sep · needed for Recyclable claim, EU PPWR and UK pEPR',
      urgency: 'normal' as const,
      category: 'Packaging',
      actions: {
        primary: 'Ask my supplier',
        secondary: 'Ask GCRS',
        tertiary: 'Not applicable',
      },
    },
    {
      id: 'missing-2',
      title: 'Sleeve PFAS answer',
      description: 'Waiting for PackWorks (sent 2 days ago) · needed for EU PPWR',
      urgency: 'normal' as const,
      category: 'Compliance',
      actions: {
        primary: 'Nudge',
        secondary: 'Ask GCRS',
        tertiary: 'Not applicable',
      },
    },
  ];

  const missingItemsToRender = (product.missingItems && product.missingItems.length > 0)
    ? product.missingItems
    : defaultMissingItems;
  const getLayerIcon = (iconName: string) => {
    switch (iconName) {
      case 'image':
        return <ImageIcon className="w-4 h-4 text-[#64748b]" />;
      case 'beaker':
        return <FlaskConical className="w-4 h-4 text-[#64748b]" />;
      case 'box':
        return <Box className="w-4 h-4 text-[#64748b]" />;
      case 'file-text':
        return <FileText className="w-4 h-4 text-[#64748b]" />;
      case 'shopping-bag':
        return <ShoppingBag className="w-4 h-4 text-[#64748b]" />;
      case 'globe':
        return <Globe className="w-4 h-4 text-[#64748b]" />;
      default:
        return <Box className="w-4 h-4 text-[#64748b]" />;
    }
  };



  return (
    <div className="crft-page-stack overview-page-stack">
      <div className="overview-breadcrumb">
        <button
          type="button"
          onClick={onSelectPortfolio}
          className="overview-breadcrumb-link"
        >
          Products
        </button>
        <span className="overview-breadcrumb-sep">›</span>
        <span className="overview-breadcrumb-current">{product.name}</span>
      </div>

      <div className="product-overview-hero-card">
        <div className="hero-product-thumb">
          <ProductIllustration type={product.illustrationType} />
        </div>

        <div className="hero-product-center">
          <h1 className="hero-product-title">
            {product.name} <span className="hero-product-size">{product.size}</span>
          </h1>

          <p className="hero-product-status-line">
            <strong>{product.readiness}% ready.</strong>{' '}
            {product.missingCount} things missing, none urgent yet. Next deadline {product.deadline || '12 Sep'}.
          </p>

          <div className="hero-progress-bar-track">
            <div
              className="hero-progress-bar-fill"
              style={{ width: `${product.readiness}%` }}
            />
          </div>

          <p className="hero-product-markets">
            On its own · {product.markets.join(', ')}
          </p>
        </div>

        <div className="hero-product-right">
          <CircularProgress value={product.readiness} size={56} strokeWidth={4.5} />
          <button
            type="button"
            className="overview-passport-btn"
            onClick={() => setIsPassportOpen(true)}
            title="Open EU Digital Product Passport & QR Code"
          >
            <QrCode className="w-3.5 h-3.5 text-[#7c3aed]" />
            <span>Digital Passport</span>
          </button>
        </div>
      </div>

      <div className="product-layers-grid">
        {product.layers.map((layer) => {
          const isComplete = layer.status === 'complete';
          return (
            <div
              key={layer.number}
              className="layer-card"
            >
              <div className="layer-card-icon-box">
                {getLayerIcon(layer.icon)}
              </div>
              <div className="layer-card-number">LAYER {layer.number}</div>
              <div className="layer-card-title">{layer.title}</div>
              <div className={`layer-card-status ${isComplete ? 'complete' : 'missing'}`}>
                {layer.statusText}
              </div>
              <button
                type="button"
                className="layer-card-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenEdit(layer);
                }}
              >
                Edit details
              </button>
            </div>
          );
        })}
      </div>

      <div className="whats-missing-section">
        <div className="whats-missing-header">
          <div className="flex items-center gap-3">
            <h2 className="whats-missing-title">What's missing</h2>
            <span className="whats-missing-subtitle">One action each. Nothing else to read.</span>
          </div>
          {missingItemsToRender.length < defaultMissingItems.length && (
            <button
              type="button"
              className="text-xs text-[#64748b] hover:text-[#0f172a] inline-flex items-center gap-1 font-medium"
              onClick={handleResetMissingItems}
              title="Reset all tasks to original state"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset tasks</span>
            </button>
          )}
        </div>

        {missingItemsToRender.length === 0 ? (
          <div className="whats-missing-completed-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#ecfdf5] text-[#059669] flex items-center justify-center shrink-0 border border-[#a7f3d0]">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-[#0f172a]">All Requirements Fulfilled (100% Ready)</h4>
                <p className="text-xs text-[#64748b]">Zero blocking compliance tasks. Digital Product Passport is fully approved.</p>
              </div>
            </div>
            <button
              type="button"
              className="whats-missing-reset-btn"
              onClick={handleResetMissingItems}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Re-audit Tasks</span>
            </button>
          </div>
        ) : (
          <div className="whats-missing-list">
            {missingItemsToRender.map((item) => (
              <div key={item.id} className="missing-item-row">
                <div className="missing-item-info">
                  <span className="missing-dot" />
                  <div>
                    <h4 className="missing-item-title">{item.title}</h4>
                    <p className="missing-item-desc">{item.description}</p>
                  </div>
                </div>

                <div className="missing-item-actions">
                  {item.actions.primary === 'Ask my supplier' && (
                    <button
                      type="button"
                      className="missing-btn-primary"
                      onClick={onOpenSupplierModal}
                    >
                      Ask my supplier
                    </button>
                  )}

                  {item.actions.primary === 'Nudge' && (
                    <button
                      type="button"
                      className="missing-btn-outline"
                      onClick={onOpenNudgeModal}
                    >
                      Nudge
                    </button>
                  )}

                  {item.actions.primary && !['Ask my supplier', 'Nudge'].includes(item.actions.primary) && (
                    <button
                      type="button"
                      className="missing-btn-outline"
                      onClick={onOpenSupplierModal}
                    >
                      {item.actions.primary}
                    </button>
                  )}

                  <button
                    type="button"
                    className="missing-btn-resolve"
                    onClick={() => handleResolveMissingItem(item.id)}
                    title="Mark resolved and boost readiness"
                  >
                    <Check className="w-3 h-3 text-[#059669]" />
                    <span>Resolve</span>
                  </button>

                  {item.actions.secondary && (
                    <button
                      type="button"
                      className="missing-btn-outline"
                      onClick={onOpenGenie}
                    >
                      {item.actions.secondary}
                    </button>
                  )}

                  {item.actions.tertiary && (
                    <button
                      type="button"
                      className="missing-btn-outline"
                      onClick={() => handleResolveMissingItem(item.id)}
                      title="Mark as not applicable for this market"
                    >
                      {item.actions.tertiary}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <PassportModal
        isOpen={isPassportOpen}
        onClose={() => setIsPassportOpen(false)}
        product={product}
      />

      {editingLayer && (
        <div
          className="crft-modal-overlay"
          onClick={() => setEditingLayer(null)}
        >
          <div
            className="edit-layer-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="edit-layer-header">
              <div>
                <span className="edit-layer-eyebrow">
                  PRODUCT LAYER {editingLayer.number}
                </span>
                <h2 className="edit-layer-title">
                  {editingLayer.title}
                </h2>
                <p className="edit-layer-subtitle">
                  {editName} {editSize}
                </p>
              </div>
              <button
                type="button"
                className="edit-layer-close-btn"
                onClick={() => setEditingLayer(null)}
              >
                Close
              </button>
            </div>

            <div className="edit-layer-form">
              <div className="edit-layer-field">
                <label className="edit-layer-label">Product name *</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="edit-layer-input"
                  placeholder="e.g. Night Repair Serum"
                />
              </div>

              <div className="edit-layer-field">
                <label className="edit-layer-label">Pack size *</label>
                <input
                  type="text"
                  value={editSize}
                  onChange={(e) => setEditSize(e.target.value)}
                  className="edit-layer-input"
                  placeholder="e.g. 50 ml"
                />
              </div>

              <div className="edit-layer-field">
                <label className="edit-layer-label">Product type</label>
                <input
                  type="text"
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  className="edit-layer-input"
                  placeholder=""
                />
              </div>
            </div>

            <p className="edit-layer-disclaimer">
              Edits are saved in this browser only and are not shared with other users or devices.
            </p>

            <div className="edit-layer-actions">
              <button
                type="button"
                className="edit-layer-btn-draft"
                onClick={handleSaveDraft}
              >
                Save draft
              </button>
              <button
                type="button"
                className="edit-layer-btn-cancel"
                onClick={() => setEditingLayer(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="edit-layer-btn-complete"
                onClick={handleCompleteLayer}
              >
                Complete layer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
