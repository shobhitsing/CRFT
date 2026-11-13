import React, { useState } from 'react';
import { Menu, Search, SlidersHorizontal, Edit3 } from 'lucide-react';
import type { Product, ViewMode } from '../types';
import { ProductIllustration } from '../components/ProductIllustration';
import { CircularProgress } from '../components/CircularProgress';

interface ProductsPageProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onOpenNewProductModal: () => void;
  onOpenGenie: () => void;
  onAskHelpQuestion?: (q: string) => void;
  onToggleMobileSidebar?: () => void;
  onEditProduct?: (product: Product) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  products,
  onSelectProduct,
  onOpenNewProductModal,
  onOpenGenie,
  onAskHelpQuestion,
  onToggleMobileSidebar,
  onEditProduct,
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [activeHelpPill, setActiveHelpPill] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const helpPills = [
    'What is this?',
    'Why do I need it?',
    'Evidence is acceptable?',
    'Show me an example',
    'Ask CRFT',
    'Fix this for me',
  ];

  const readyCount = products.filter((p) => p.readiness >= 95).length;
  const needsAttentionCount = products.length - readyCount;

  const filteredProducts = products.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.size.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  });

  return (
    <div className="crft-page-stack">
      <div className="products-page-header">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              {onToggleMobileSidebar && (
                <button
                  type="button"
                  className="mobile-sidebar-toggle-btn p-2 text-[#64748b] hover:text-[#0f172a] rounded-xl bg-white border border-[#eef2f6] shadow-sm"
                  onClick={onToggleMobileSidebar}
                  title="Open Navigation Menu"
                >
                  <Menu className="w-5 h-5" />
                </button>
              )}
              <h1 className="products-page-title">Products</h1>
            </div>
            <p className="products-page-subtitle">
              {products.length} products · {readyCount} ready · {needsAttentionCount} needs attention
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0 self-start md:self-center">
            <div className="view-mode-toggle">
              <button
                type="button"
                className={`toggle-option ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                Grid
              </button>
              <button
                type="button"
                className={`toggle-option ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                List
              </button>
            </div>

            <button
              type="button"
              className="new-product-btn"
              onClick={onOpenNewProductModal}
            >
              <span>+ New product</span>
            </button>
          </div>
        </div>

        <div className="products-help-pills-row">
          {helpPills.map((pill, idx) => (
            <button
              key={idx}
              type="button"
              className={`help-pill-btn ${activeHelpPill === pill ? 'active' : ''}`}
              onClick={() => {
                setActiveHelpPill(pill);
                if (pill === 'Ask CRFT' || pill === 'Fix this for me') {
                  onOpenGenie();
                } else if (onAskHelpQuestion) {
                  onAskHelpQuestion(pill);
                }
              }}
            >
              {pill}
            </button>
          ))}
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="products-portfolio-grid">
          {products.map((product) => (
            <div
              key={product.id}
              className={`product-portfolio-card group ${
                product.isNew ? 'has-new-border' : ''
              }`}
              onClick={() => onSelectProduct(product)}
            >
              {product.isNew && (
                <span className="product-card-new-badge">
                  NEW
                </span>
              )}

              <div className="product-card-image-box">
                <ProductIllustration type={product.illustrationType} />
              </div>

              <div className="product-card-info-box">
                <h3 className="product-card-title group-hover:text-[#0d2137] transition-colors">
                  {product.name}
                </h3>
                <p className="product-card-spec">{product.size}</p>

                <div className="product-card-footer">
                  <CircularProgress
                    value={product.readiness}
                    size={52}
                    strokeWidth={4.5}
                  />
                  <div className="flex items-center gap-1.5 ml-auto">
                    {product.twinActive && (
                      <span className="product-card-twin-active">
                        Twin active
                      </span>
                    )}
                    {onEditProduct && (
                      <button
                        type="button"
                        className="product-card-edit-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditProduct(product);
                        }}
                        title="Edit product details"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-[#64748b] hover:text-[#0f172a]" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="products-list-view-container">
          <div className="products-list-metrics-grid">
            <div className="products-list-metric-card">
              <span className="products-metric-label">Total products</span>
              <span className="products-metric-value">{products.length}</span>
            </div>
            <div className="products-list-metric-card">
              <span className="products-metric-label">Ready</span>
              <span className="products-metric-value">
                {String(readyCount).padStart(2, '0')}
              </span>
            </div>
            <div className="products-list-metric-card">
              <span className="products-metric-label">Needs attention</span>
              <span className="products-metric-value orange">
                {String(needsAttentionCount).padStart(2, '0')}
              </span>
            </div>
          </div>

          <div className="products-list-search-row">
            <div className="products-list-search-input-wrap">
              <Search className="w-4 h-4 text-[#94a3b8] shrink-0" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="products-list-search-input"
              />
            </div>
            <button
              type="button"
              className="products-list-filter-btn"
              title="Filter Products"
              onClick={() => alert("Filter products by category, market, or readiness.")}
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>

          <div className="products-list-header-row">
            <h2 className="products-list-section-title">All products</h2>
            <span className="products-list-section-count">
              {filteredProducts.length} items
            </span>
          </div>

          <div className="products-list-cards-stack">
            {filteredProducts.map((product) => {
              const isReady = product.readiness >= 95;
              const hasNoMissing = product.missingCount === 0;

              return (
                <div
                  key={product.id}
                  className="product-list-card"
                  onClick={() => onSelectProduct(product)}
                >
                  <div className="product-list-card-top">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="product-list-card-title">{product.name}</h3>
                        {product.isNew && (
                          <span className="product-list-card-badge">NEW</span>
                        )}
                      </div>
                      <p className="product-list-card-subtitle">{product.size}</p>
                    </div>

                    <div>
                      {isReady ? (
                        <span className="product-list-status-pill ready">Ready</span>
                      ) : (
                        <span className="product-list-status-pill attention">
                          {product.missingCount} missing
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="product-list-score-row">
                    <span className="product-list-score-label">Readiness score</span>
                    <span className="product-list-score-value">{product.readiness}%</span>
                  </div>
                  <div className="product-list-progress-track">
                    <div
                      className={`product-list-progress-fill ${isReady ? 'ready' : 'attention'}`}
                      style={{ width: `${product.readiness}%` }}
                    />
                  </div>

                  <div className="product-list-card-bottom">
                    <span className={`product-list-missing-text ${hasNoMissing ? 'ready' : 'attention'}`}>
                      {hasNoMissing
                        ? 'No missing items'
                        : `${product.missingCount} things missing`}
                    </span>

                    <div className="flex items-center gap-2">
                      {onEditProduct && (
                        <button
                          type="button"
                          className="product-list-edit-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            onEditProduct(product);
                          }}
                          title="Edit product"
                        >
                          <Edit3 className="w-3 h-3 text-[#64748b]" />
                          <span>Edit</span>
                        </button>
                      )}
                      <button
                        type="button"
                        className="product-list-manage-link"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProduct(product);
                        }}
                      >
                        <span>Manage 360</span>
                        <span>–</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
