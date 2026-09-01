export interface Product {
  id: string;
  name: string;
  category: 'Fruits' | 'Vegetables' | 'Grains' | 'Organic' | 'Exotic';
  farmerName: string;
  fpoName: string;
  location: string;
  state: string;
  pricePerKg: number;
  marketPricePerKg: number;
  availableQuantityTons: number;
  minOrderKg: number;
  harvestDate: string;
  qualityRating: number;
  isOrganic: boolean;
  organicCertNumber?: string;
  badge: 'Organic' | 'Fresh Harvest' | 'GI Tagged' | 'Hydroponic' | 'A-Grade';
  image: string;
  description: string;
  shelfLifeDays: number;
  moisturePercentage: number;
  brixSweetnessScore?: number;
  temperatureRequired: string;
  farmerStory: {
    experienceYears: number;
    farmSizeAcres: number;
    soilType: string;
    waterSource: string;
    verifiedDate: string;
    avatar: string;
    quote: string;
  };
  priceBreakdown: {
    farmerShare: number;
    agriBridgeFee: number;
    coldChainLogistics: number;
    qualityTestingPackaging: number;
    totalConsumerPrice: number;
    traditionalPrice: number;
  };
  demandTrend: {
    month: string;
    marketDemand: number;
    priceForecast: number;
  }[];
  bulkTiers: {
    minKg: number;
    discountPercent: number;
    pricePerKg: number;
  }[];
  logisticsRoute: {
    origin: string;
    collectionCenter: string;
    hub: string;
    estimatedHours: number;
    tempControl: string;
  };
}

export interface CartItem {
  product: Product;
  quantityKg: number;
  selectedTierPrice: number;
}

export interface FarmerEarningCalculation {
  crop: string;
  acres: number;
  traditionalPayout: number;
  agriBridgePayout: number;
  extraIncome: number;
  percentageGain: number;
}

export interface Shipment {
  id: string;
  code: string;
  origin: string;
  destination: string;
  productName: string;
  quantityTons: number;
  farmerFpo: string;
  buyerName: string;
  distanceKm: number;
  eta: string;
  status: 'In Transit' | 'Delivered' | 'Scheduled' | 'Delayed';
  temperatureC: number;
  humidityPercent: number;
  aiOptimizationScore: number;
  fuelSavedLiters: number;
  carbonReducedKg: number;
  currentLocation: string;
}

export interface DemandPrediction {
  crop: string;
  trend: 'up' | 'down';
  changePercent: number;
  projectedVolumeTons: number;
  confidenceScore: number;
  recommendedAction: string;
  topBuyingHub: string;
  priceOutlook: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: 'Farmer' | 'Restaurant Owner' | 'Consumer' | 'Wholesaler';
  organization: string;
  location: string;
  avatar: string;
  quote: string;
  metricBadge: string;
  rating: number;
}

export interface AIChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  dataSnippet?: {
    title: string;
    type: 'price' | 'demand' | 'route' | 'crop';
    metrics: { label: string; value: string }[];
    recommendation: string;
  };
}

export interface UserProfile {
  name: string;
  email: string;
  role: 'Farmer' | 'Buyer' | 'Restaurant' | 'Wholesaler' | 'Logistics';
  fpoOrCompany: string;
  location: string;
  avatar: string;
}
