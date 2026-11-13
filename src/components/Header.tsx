import React from 'react';
import { Menu, Sparkles, Edit3 } from 'lucide-react';
import type { MainNavId, Product } from '../types';

interface HeaderProps {
  currentNav: MainNavId;
  product: Product;
  onNavigate: (nav: MainNavId) => void;
  onOpenGenie: () => void;
  onSelectPortfolio: () => void;
  onToggleMobileSidebar?: () => void;
  onEditProduct?: (product: Product) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentNav,
  product,
  onNavigate,
  onOpenGenie,
  onSelectPortfolio,
  onToggleMobileSidebar,
  onEditProduct,
}) => {
  const getSubpageTitle = () => {
    switch (currentNav) {
      case 'overview':
        return 'Product 360';
      case 'verified':
        return 'Verified';
      case 'packaging':
        return 'Packaging';
      case 'claims':
        return 'Claims';
      case 'testing':
        return 'Lab';
      case 'sustainability':
        return 'Sustainability';
      case 'horizon':
        return 'Horizon';
      case 'passport':
        return 'Passport';
      case 'commerce':
        return 'Commerce';
      case 'retail':
        return 'Retail';
      case 'borderpass':
        return 'BorderPass';
      case 'authentic':
        return 'Authentic';
      default:
        return 'Product 360';
    }
  };

  return (
    <div className="crft-floating-header-card">
      <div className="header-card-left">
        {onToggleMobileSidebar && (
          <button
            type="button"
            className="header-mobile-toggle mobile-sidebar-toggle-btn p-1 mr-1 text-[#64748b] hover:text-[#0f172a] rounded-lg"
            onClick={onToggleMobileSidebar}
            title="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        {currentNav === 'products' ? (
          <>
            <button 
              type="button" 
              className="brand-link"
              onClick={onSelectPortfolio}
              title="Portfolio"
            >
              {product.brand}
            </button>
            <span className="chevron-sep">›</span>
            <span className="subpage-name-text font-medium text-[#475569]">
              Products
            </span>
          </>
        ) : (
          <>
            <button 
              type="button" 
              className="brand-link"
              onClick={onSelectPortfolio}
              title="Portfolio"
            >
              {product.brand}
            </button>
            <span className="dot-sep">·</span>
            <button 
              type="button" 
              className="product-name-link"
              onClick={() => onNavigate('overview')}
              title="Product Overview"
            >
              {product.name}
            </button>
            <span className="product-spec-text">
              {product.size} · {product.variant}
            </span>
            {onEditProduct && (
              <button
                type="button"
                className="header-edit-btn"
                onClick={() => onEditProduct(product)}
                title="Edit product details"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#64748b] hover:text-[#0f172a]" />
              </button>
            )}
            <span className="chevron-sep">›</span>
            <span className="subpage-name-text">
              {getSubpageTitle()}
            </span>
          </>
        )}
      </div>

      <div className="header-card-right">
        <span className="header-pill header-pill-neutral">
          {product.markets.slice(0, 2).join(' + ')}
        </span>
        <span className="header-pill header-pill-neutral">
          Readiness {product.readiness}%
        </span>
        <button 
          type="button"
          className="header-pill header-pill-genie"
          onClick={onOpenGenie}
          title="Ask CRFT Genie"
        >
          <Sparkles className="w-3.5 h-3.5 fill-current text-[#047857]" />
          <span>+ CRFT Genie aware</span>
        </button>
        <button
          type="button"
          className="header-pill header-pill-tasks"
          onClick={() => alert("6 Compliance Tasks:\n1. Renew Vetro Verde heavy metal declaration (12 Sep)\n2. PackWorks PFAS declaration confirmation\n3. Front artwork claim 'eco-friendly packaging' review\n4. Submit INCI dossier to GCRS\n5. Verify IFRA 51st amendment fragrance certificate\n6. Download CPNP XML notification summary")}
          title="View 6 Tasks"
        >
          <Menu className="w-3.5 h-3.5 text-[#334155]" />
          <span>6 tasks</span>
        </button>
      </div>
    </div>
  );
};

interface SecondaryNavTabsProps {
  currentNav: MainNavId;
  onNavigate: (nav: MainNavId) => void;
}

export const SecondaryNavTabs: React.FC<SecondaryNavTabsProps> = ({
  currentNav,
  onNavigate,
}) => {
  const navTabs: { id: MainNavId; label: string }[] = [
    { id: 'overview', label: 'Product 360' },
    { id: 'packaging', label: 'Packaging' },
    { id: 'claims', label: 'Claims' },
    { id: 'testing', label: 'Lab' },
    { id: 'verified', label: 'Verified' },
    { id: 'sustainability', label: 'Sustainability' },
    { id: 'horizon', label: 'Horizon' },
    { id: 'passport', label: 'Passport' },
    { id: 'commerce', label: 'Commerce' },
    { id: 'retail', label: 'Retail' },
    { id: 'borderpass', label: 'BorderPass' },
    { id: 'authentic', label: 'Authentic' },
  ];

  return (
    <div className="crft-secondary-nav-bar">
      <div className="secondary-nav-pills">
        {navTabs.map((tab) => {
          const isActive = currentNav === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              className={`sec-pill ${isActive ? 'active' : ''}`}
              onClick={() => onNavigate(tab.id)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
