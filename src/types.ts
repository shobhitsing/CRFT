export type ViewMode = 'grid' | 'list';

export type ProductLayerStatus = 'complete' | 'missing' | 'in_progress';

export interface ProductLayer {
  number: number;
  title: string;
  subtitle: string;
  status: ProductLayerStatus;
  statusText: string;
  percentage?: number;
  icon: string;
}

export interface MissingItem {
  id: string;
  title: string;
  description: string;
  urgency: 'urgent' | 'normal' | 'low';
  category: string;
  actions: {
    primary?: string;
    secondary?: string;
    tertiary?: string;
  };
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  variant: string;
  size: string;
  category: string;
  readiness: number;
  missingCount: number;
  deadline?: string;
  markets: string[];
  illustrationType: 'serum' | 'amber-oud' | 'hydra-cream' | 'body-wash' | 'cleanser' | 'refill' | 'discovery-set' | 'oud-intense';
  layers: ProductLayer[];
  missingItems: MissingItem[];
  subtext?: string;
  isNew?: boolean;
  twinActive?: boolean;
}

export type MainNavId = 
  | 'products'
  | 'overview'
  | 'packaging'
  | 'claims'
  | 'testing'
  | 'verified'
  | 'sustainability'
  | 'horizon'
  | 'passport'
  | 'commerce'
  | 'retail'
  | 'borderpass'
  | 'authentic'
  | 'signin';

export type LabSubTab = 
  | 'command-centre'
  | 'ai-test-planner'
  | 'sample-passport'
  | 'lab-digital-twin'
  | 'instrument-cloud'
  | 'results-intelligence'
  | 'qms'
  | 'testing-taxonomy'
  | 'scale-capacity';

export interface GenieMessage {
  id: string;
  sender: 'user' | 'genie';
  text: string;
  timestamp: string;
  suggestions?: string[];
}

