import React from 'react';
import { 
  Hexagon, 
  FileText, 
  FlaskConical, 
  ShieldCheck, 
  Sparkles, 
  Compass, 
  IdCard, 
  ShoppingBag, 
  ShoppingCart, 
  Ticket, 
  BadgeCheck, 
  LogOut,
  X
} from 'lucide-react';
import type { MainNavId, Product } from '../types';

interface SidebarProps {
  currentNav: MainNavId;
  onNavigate: (nav: MainNavId) => void;
  selectedProduct: Product;
  onSelectPortfolio: () => void;
  onOpenSignIn: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

const OverviewIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-[18px] h-[18px] shrink-0"
  >
    <line x1="4" y1="7" x2="16" y2="7" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="17" x2="14" y2="17" />
  </svg>
);

export const Sidebar: React.FC<SidebarProps> = ({
  currentNav,
  onNavigate,
  selectedProduct,
  onSelectPortfolio,
  onOpenSignIn,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const isProduct360Active = (id: MainNavId) => currentNav === id;

  const handleNavClick = (id: MainNavId) => {
    onNavigate(id);
    if (onCloseMobile) onCloseMobile();
  };

  const handlePortfolioClick = () => {
    onSelectPortfolio();
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {isMobileOpen && (
        <div
          className="sidebar-mobile-backdrop"
          onClick={onCloseMobile}
        />
      )}

      <aside className={`crft-sidebar ${isMobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-brand-wrapper flex items-center justify-between">
          <button 
            type="button" 
            className="sidebar-brand-btn"
            onClick={handlePortfolioClick}
            title="Return to Products Portfolio"
          >
            <div className="brand-logo-icon">CR</div>
            <span className="brand-logo-text">CRFT</span>
          </button>

          <button
            type="button"
            className="sidebar-mobile-close-btn lg:hidden"
            onClick={onCloseMobile}
          >
            <X className="w-5 h-5 text-[#64748b]" />
          </button>
        </div>

        <div 
          className="sidebar-working-card cursor-pointer text-left"
          onClick={() => handleNavClick('overview')}
        >
          <span className="working-label">WORKING ON</span>
          <h4 className="working-title">{selectedProduct.name}</h4>
          <p className="working-details">{selectedProduct.subtext || `${selectedProduct.size} · 91% ready`}</p>
        </div>

        <div className="sidebar-nav-scroll">
          <div className="sidebar-nav-group">
            <div className="nav-group-header">
              <span>PRODUCT 360</span>
            </div>

            <button
              type="button"
              className={`nav-item-btn ${isProduct360Active('overview') ? 'active' : ''}`}
              onClick={() => handleNavClick('overview')}
            >
              <OverviewIcon />
              <span className="nav-label">Overview</span>
            </button>

            <button
              type="button"
              className={`nav-item-btn ${isProduct360Active('packaging') ? 'active' : ''}`}
              onClick={() => handleNavClick('packaging')}
            >
              <Hexagon className="w-[18px] h-[18px] shrink-0" strokeWidth={1.8} />
              <span className="nav-label">Packaging</span>
            </button>

            <button
              type="button"
              className={`nav-item-btn ${isProduct360Active('claims') ? 'active' : ''}`}
              onClick={() => handleNavClick('claims')}
            >
              <FileText className="w-[18px] h-[18px] shrink-0" strokeWidth={1.8} />
              <span className="nav-label">Claims</span>
            </button>

            <button
              type="button"
              className={`nav-item-btn ${isProduct360Active('testing') ? 'active' : ''}`}
              onClick={() => handleNavClick('testing')}
            >
              <FlaskConical className="w-[18px] h-[18px] shrink-0" strokeWidth={1.8} />
              <span className="nav-label">Testing</span>
            </button>

            <button
              type="button"
              className={`nav-item-btn ${isProduct360Active('verified') ? 'active' : ''}`}
              onClick={() => handleNavClick('verified')}
            >
              <ShieldCheck className="w-[18px] h-[18px] shrink-0" strokeWidth={1.8} />
              <span className="nav-label">Verified</span>
            </button>

            <button
              type="button"
              className={`nav-item-btn ${isProduct360Active('sustainability') ? 'active' : ''}`}
              onClick={() => handleNavClick('sustainability')}
            >
              <Sparkles className="w-[18px] h-[18px] shrink-0" strokeWidth={1.8} />
              <span className="nav-label">Sustainability</span>
            </button>

            <button
              type="button"
              className={`nav-item-btn ${isProduct360Active('horizon') ? 'active' : ''}`}
              onClick={() => handleNavClick('horizon')}
            >
              <Compass className="w-[18px] h-[18px] shrink-0" strokeWidth={1.8} />
              <span className="nav-label">Horizon</span>
            </button>

            <button
              type="button"
              className={`nav-item-btn ${isProduct360Active('passport') ? 'active' : ''}`}
              onClick={() => handleNavClick('passport')}
            >
              <IdCard className="w-[18px] h-[18px] shrink-0" strokeWidth={1.8} />
              <span className="nav-label">Passport</span>
            </button>
          </div>

          <div className="sidebar-nav-group">
            <div className="nav-group-header">TRADE</div>

            <button
              type="button"
              className={`nav-item-btn ${isProduct360Active('commerce') ? 'active' : ''}`}
              onClick={() => handleNavClick('commerce')}
            >
              <ShoppingBag className="w-[18px] h-[18px] shrink-0" strokeWidth={1.8} />
              <span className="nav-label">Commerce</span>
            </button>

            <button
              type="button"
              className={`nav-item-btn ${isProduct360Active('retail') ? 'active' : ''}`}
              onClick={() => handleNavClick('retail')}
            >
              <ShoppingCart className="w-[18px] h-[18px] shrink-0" strokeWidth={1.8} />
              <span className="nav-label">Retail</span>
            </button>

            <button
              type="button"
              className={`nav-item-btn ${isProduct360Active('borderpass') ? 'active' : ''}`}
              onClick={() => handleNavClick('borderpass')}
            >
              <Ticket className="w-[18px] h-[18px] shrink-0" strokeWidth={1.8} />
              <span className="nav-label">BorderPass</span>
            </button>

            <button
              type="button"
              className={`nav-item-btn ${isProduct360Active('authentic') ? 'active' : ''}`}
              onClick={() => handleNavClick('authentic')}
            >
              <BadgeCheck className="w-[18px] h-[18px] shrink-0" strokeWidth={1.8} />
              <span className="nav-label">Authentic</span>
            </button>
          </div>
        </div>

        <div className="sidebar-footer">
          <hr className="sidebar-divider" />
          <button
            type="button"
            className="sidebar-signout-btn"
            onClick={() => {
              onOpenSignIn();
              if (onCloseMobile) onCloseMobile();
            }}
          >
            <LogOut className="w-[18px] h-[18px] shrink-0 text-[#64748b]" strokeWidth={1.8} />
            <span>Sign out</span>
          </button>
        </div>
      </aside>
    </>
  );
};
