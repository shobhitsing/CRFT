import type { MainNavId } from '../types';

export const NAV_PATHS: Record<MainNavId, string> = {
  products: '/products',
  overview: '/overview',
  packaging: '/packaging',
  claims: '/claims',
  testing: '/testing',
  verified: '/verified',
  sustainability: '/sustainability',
  horizon: '/horizon',
  passport: '/passport',
  commerce: '/commerce',
  retail: '/retail',
  borderpass: '/borderpass',
  authentic: '/authentic',
  signin: '/signin',
};

export const PATH_TO_NAV: Record<string, MainNavId> = {
  '/': 'products',
  '/products': 'products',
  '/overview': 'overview',
  '/product-360': 'overview',
  '/packaging': 'packaging',
  '/claims': 'claims',
  '/lab': 'testing',
  '/testing': 'testing',
  '/verified': 'verified',
  '/sustainability': 'sustainability',
  '/horizon': 'horizon',
  '/passport': 'passport',
  '/commerce': 'commerce',
  '/retail': 'retail',
  '/borderpass': 'borderpass',
  '/authentic': 'authentic',
  '/signin': 'signin',
};

export interface ParsedRoute {
  nav: MainNavId;
  productId?: string;
}

export function parseCurrentRoute(): ParsedRoute {
  let rawPath = window.location.hash ? window.location.hash.replace(/^#/, '') : window.location.pathname;
  if (!rawPath || rawPath === '') rawPath = '/';

  const path = rawPath.replace(/\/+$/, '') || '/';

  const searchParams = new URLSearchParams(window.location.search);
  const queryProduct = searchParams.get('product') || undefined;

  if (PATH_TO_NAV[path]) {
    return { nav: PATH_TO_NAV[path], productId: queryProduct };
  }

  const match = path.match(/^\/products?\/([^/]+)(?:\/([^/]+))?$/);
  if (match) {
    const productId = match[1];
    const subpage = match[2];
    if (subpage && PATH_TO_NAV['/' + subpage]) {
      return { nav: PATH_TO_NAV['/' + subpage], productId };
    }
    return { nav: 'overview', productId };
  }

  return { nav: 'products', productId: queryProduct };
}

export function getPathForNav(nav: MainNavId, _productId?: string): string {
  return NAV_PATHS[nav] || '/products';
}

export function navigateTo(nav: MainNavId, productId?: string) {
  const targetPath = getPathForNav(nav, productId);
  const currentPathWithSearch = window.location.pathname + window.location.search;
  if (currentPathWithSearch !== targetPath) {
    window.history.pushState({ nav, productId }, '', targetPath);
  }
}

