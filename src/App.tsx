import { useState, useEffect, useRef } from 'react';
import type { MainNavId, Product } from './types';
import { mockProducts } from './data/mockData';
import { Sidebar } from './components/Sidebar';
import { Header, SecondaryNavTabs } from './components/Header';
import { GenieDrawer } from './components/GenieDrawer';
import { SupplierModal, NudgeModal, NewProductModal, AISweepModal, EditProductModal } from './components/Modals';
import { parseCurrentRoute, navigateTo } from './utils/router';

import { ProductsPage } from './pages/ProductsPage';
import { ProductOverviewPage } from './pages/ProductOverviewPage';
import { VerifiedPage } from './pages/VerifiedPage';
import { PackagingPage } from './pages/PackagingPage';
import { ClaimsPage } from './pages/ClaimsPage';
import { LabPage } from './pages/LabPage';
import { SignInPage } from './pages/SignInPage';
import { GenericProductPage } from './pages/GenericProductPage';

export function App() {
  const initialRoute = parseCurrentRoute();

  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('crft_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
    return mockProducts;
  });

  const [selectedProduct, setSelectedProduct] = useState<Product>(() => {
    const targetId = initialRoute.productId || 'night-repair-serum';
    return (
      mockProducts.find((p) => p.id === targetId) ||
      mockProducts.find((p) => p.id === 'night-repair-serum') ||
      mockProducts[0]
    );
  });
  const [currentNav, setCurrentNav] = useState<MainNavId>(initialRoute.nav);

  const [isGenieOpen, setIsGenieOpen] = useState(false);
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);
  const [isNudgeModalOpen, setIsNudgeModalOpen] = useState(false);
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);
  const [isSweepModalOpen, setIsSweepModalOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const mainContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem('crft_products', JSON.stringify(products));
    } catch {
      // Ignore storage errors
    }
  }, [products]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    if (scrollTop > 8) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const resetScrollToTop = () => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTop = 0;
    }
    setIsScrolled(false);
  };

  useEffect(() => {
    const handlePopState = () => {
      const route = parseCurrentRoute();
      if (route.productId) {
        const found = products.find((p) => p.id === route.productId);
        if (found) setSelectedProduct(found);
      }
      setCurrentNav(route.nav);
      resetScrollToTop();
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [products]);

  useEffect(() => {
    navigateTo(currentNav, selectedProduct?.id);
  }, [currentNav, selectedProduct?.id]);

  const handleNavigate = (nav: MainNavId) => {
    setCurrentNav(nav);
    navigateTo(nav, selectedProduct?.id);
    resetScrollToTop();
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentNav('overview');
    navigateTo('overview', product.id);
    resetScrollToTop();
  };

  const handleSelectPortfolio = () => {
    setCurrentNav('products');
    navigateTo('products');
    resetScrollToTop();
  };

  const handleOpenSignIn = () => {
    setCurrentNav('signin');
    navigateTo('signin');
    resetScrollToTop();
  };

  const handleUpdateProduct = (updatedFields: Partial<Product>) => {
    setSelectedProduct((prev) => ({ ...prev, ...updatedFields }));
    setProducts((prev) =>
      prev.map((p) => (p.id === selectedProduct.id ? { ...p, ...updatedFields } : p))
    );
  };

  const handleUpdateSpecificProduct = (productId: string, updatedFields: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, ...updatedFields } : p))
    );
    if (selectedProduct.id === productId) {
      setSelectedProduct((prev) => ({ ...prev, ...updatedFields }));
    }
  };

  const handleAddNewProduct = (newProdData: Partial<Product>) => {
    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      name: newProdData.name || 'New Product',
      brand: newProdData.brand || 'Dkhoon The Emirates',
      variant: newProdData.variant || 'Standard',
      size: newProdData.size || '50 ml',
      category: newProdData.category || 'Skincare',
      readiness: newProdData.readiness || 75,
      missingCount: newProdData.missingCount || 2,
      markets: newProdData.markets || ['EU', 'UK'],
      illustrationType: newProdData.illustrationType || 'serum',
      subtext: `${newProdData.size} · 75% ready`,
      layers: [
        { number: 1, title: 'This is the product', subtitle: 'Formula', status: 'complete', statusText: 'Complete', icon: 'image' },
        { number: 2, title: "What's inside", subtitle: 'Toxicology', status: 'complete', statusText: 'Complete', icon: 'beaker' },
        { number: 3, title: "What it's wrapped in", subtitle: 'Packaging', status: 'missing', statusText: '70% · something missing', percentage: 70, icon: 'box' },
        { number: 4, title: 'What it says', subtitle: 'Artwork', status: 'missing', statusText: '80% · something missing', percentage: 80, icon: 'file-text' },
        { number: 5, title: "How it's sold", subtitle: 'Trade', status: 'complete', statusText: 'Complete', icon: 'shopping-bag' },
        { number: 6, title: 'Where it goes', subtitle: 'Markets', status: 'complete', statusText: 'Complete', icon: 'globe' },
      ],
      missingItems: [
        {
          id: `missing-${Date.now()}-1`,
          title: 'Packaging barrier compliance confirmation',
          description: 'Required for EU PPWR Article 11 declaration',
          urgency: 'normal',
          category: 'Packaging',
          actions: { primary: 'Ask my supplier', secondary: 'Ask GCRS', tertiary: 'Not applicable' },
        },
      ],
    };

    setProducts((prev) => [newProduct, ...prev]);
    setSelectedProduct(newProduct);
    setCurrentNav('overview');
    navigateTo('overview', newProduct.id);
  };

  if (currentNav === 'signin') {
    return (
      <SignInPage
        onSignInSuccess={handleSelectPortfolio}
        onBackToApp={handleSelectPortfolio}
      />
    );
  }

  const isProductScope = currentNav !== 'products';

  return (
    <div className="crft-app-wrapper">
      <Sidebar
        currentNav={currentNav}
        onNavigate={handleNavigate}
        selectedProduct={selectedProduct}
        onSelectPortfolio={handleSelectPortfolio}
        onOpenSignIn={handleOpenSignIn}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      <div
        ref={mainContentRef}
        className="crft-main-content-area"
        onScroll={handleScroll}
      >
        <div className={`crft-sticky-header-container ${isScrolled ? 'scrolled' : ''}`}>
          <Header
            currentNav={currentNav}
            product={selectedProduct}
            onNavigate={handleNavigate}
            onOpenGenie={() => setIsGenieOpen(true)}
            onSelectPortfolio={handleSelectPortfolio}
            onToggleMobileSidebar={() => setIsMobileSidebarOpen((prev) => !prev)}
          />
        </div>

        <div className="crft-page-shell">
          {isProductScope && currentNav !== 'verified' && (
            <SecondaryNavTabs
              currentNav={currentNav}
              onNavigate={handleNavigate}
            />
          )}

          <main className="crft-page-main">
            {currentNav === 'products' && (
              <ProductsPage
                products={products}
                onSelectProduct={handleSelectProduct}
                onOpenNewProductModal={() => setIsNewProductModalOpen(true)}
                onOpenGenie={() => setIsGenieOpen(true)}
                onAskHelpQuestion={() => {
                  setIsGenieOpen(true);
                }}
                onToggleMobileSidebar={() => setIsMobileSidebarOpen((prev) => !prev)}
              />
            )}

            {currentNav === 'overview' && (
              <ProductOverviewPage
                product={selectedProduct}
                onNavigateTab={handleNavigate}
                onOpenSupplierModal={() => setIsSupplierModalOpen(true)}
                onOpenNudgeModal={() => setIsNudgeModalOpen(true)}
                onOpenGenie={() => setIsGenieOpen(true)}
                onSelectPortfolio={handleSelectPortfolio}
                onUpdateProduct={handleUpdateProduct}
              />
            )}

            {currentNav === 'verified' && (
              <VerifiedPage
                product={selectedProduct}
                onOpenGenie={() => setIsGenieOpen(true)}
                onOpenSweep={() => setIsSweepModalOpen(true)}
              />
            )}

            {currentNav === 'packaging' && (
              <PackagingPage
                product={selectedProduct}
                onOpenGenie={() => setIsGenieOpen(true)}
                onOpenSweep={() => setIsSweepModalOpen(true)}
                onOpenSupplierModal={() => setIsSupplierModalOpen(true)}
              />
            )}

            {currentNav === 'claims' && (
              <ClaimsPage
                product={selectedProduct}
                onOpenGenie={() => setIsGenieOpen(true)}
                onOpenSweep={() => setIsSweepModalOpen(true)}
              />
            )}

            {currentNav === 'testing' && (
              <LabPage
                product={selectedProduct}
                onOpenGenie={() => setIsGenieOpen(true)}
                onOpenSweep={() => setIsSweepModalOpen(true)}
                onNavigateOverview={() => handleNavigate('overview')}
              />
            )}

            {[
              'sustainability',
              'horizon',
              'passport',
              'commerce',
              'retail',
              'borderpass',
              'authentic',
            ].includes(currentNav) && (
              <GenericProductPage
                navId={currentNav}
                product={selectedProduct}
                onOpenGenie={() => setIsGenieOpen(true)}
                onOpenSweep={() => setIsSweepModalOpen(true)}
              />
            )}
          </main>
        </div>
      </div>

      <GenieDrawer
        isOpen={isGenieOpen}
        onClose={() => setIsGenieOpen(false)}
        product={selectedProduct}
      />

      <button
        type="button"
        className="floating-genie-btn"
        onClick={() => setIsGenieOpen((prev) => !prev)}
        aria-label="Open CRFT Genie"
        title="Open CRFT Genie"
      >
        <svg
          viewBox="0 0 24 24"
          className="genie-sparkle-star"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>
        <span>CRFT Genie</span>
      </button>

      <SupplierModal
        isOpen={isSupplierModalOpen}
        onClose={() => setIsSupplierModalOpen(false)}
        supplierName="Vetro Verde SRL"
        requirement="Bottle heavy-metal declaration renewal"
      />

      <NudgeModal
        isOpen={isNudgeModalOpen}
        onClose={() => setIsNudgeModalOpen(false)}
      />

      <NewProductModal
        isOpen={isNewProductModalOpen}
        onClose={() => setIsNewProductModalOpen(false)}
        onAddProduct={handleAddNewProduct}
      />

      <AISweepModal
        isOpen={isSweepModalOpen}
        onClose={() => setIsSweepModalOpen(false)}
      />
    </div>
  );
}

export default App;
