import { Product, Shipment, DemandPrediction, Testimonial, AIChatMessage } from '../types';

export const mockProducts: Product[] = [
  {
    id: 'prod-mango-1',
    name: 'Ratnagiri Alphonso Mango',
    category: 'Fruits',
    farmerName: 'Sanjay Salunkhe',
    fpoName: 'Konkan Krishi Vikas FPO',
    location: 'Ratnagiri',
    state: 'Maharashtra',
    pricePerKg: 180,
    marketPricePerKg: 260,
    availableQuantityTons: 2.4,
    minOrderKg: 10,
    harvestDate: 'Yesterday, 6:00 AM',
    qualityRating: 4.9,
    isOrganic: true,
    organicCertNumber: 'NPOP/NAB/0018-RTG',
    badge: 'GI Tagged',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80',
    description: 'Directly sourced naturally tree-ripened GI-tagged Alphonso mangoes from Devgad & Ratnagiri coastal orchards. Sweet aroma, rich creamy pulp with zero chemical ripening (carbide-free).',
    shelfLifeDays: 12,
    moisturePercentage: 14.2,
    brixSweetnessScore: 21.5,
    temperatureRequired: '13°C - 15°C',
    farmerStory: {
      experienceYears: 22,
      farmSizeAcres: 14,
      soilType: 'Laterite Red Loam',
      waterSource: 'Drip from Natural Spring',
      verifiedDate: 'Aug 2024',
      avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=200&q=80',
      quote: 'AgriBridge connected our coastal grower collective directly with premium Mumbai & Pune buyers, giving our community 28% higher net realizations.'
    },
    priceBreakdown: {
      farmerShare: 130,
      agriBridgeFee: 12,
      coldChainLogistics: 24,
      qualityTestingPackaging: 14,
      totalConsumerPrice: 180,
      traditionalPrice: 260
    },
    demandTrend: [
      { month: 'Mar', marketDemand: 120, priceForecast: 220 },
      { month: 'Apr', marketDemand: 280, priceForecast: 200 },
      { month: 'May', marketDemand: 450, priceForecast: 180 },
      { month: 'Jun', marketDemand: 310, priceForecast: 195 },
      { month: 'Jul', marketDemand: 110, priceForecast: 240 }
    ],
    bulkTiers: [
      { minKg: 20, discountPercent: 0, pricePerKg: 180 },
      { minKg: 100, discountPercent: 8, pricePerKg: 165 },
      { minKg: 500, discountPercent: 15, pricePerKg: 153 }
    ],
    logisticsRoute: {
      origin: 'Ratnagiri Farmgate',
      collectionCenter: 'Devgad Agro Hub #3',
      hub: 'Navi Mumbai Cold Matrix Hub',
      estimatedHours: 6.5,
      tempControl: 'Sensor Monitored 14°C'
    }
  },
  {
    id: 'prod-tomato-2',
    name: 'Nashik Vine-Ripened Hybrid Tomatoes',
    category: 'Vegetables',
    farmerName: 'Dnyaneshwar Shinde',
    fpoName: 'Godavari Valley Kisan Producer Co.',
    location: 'Dindori, Nashik',
    state: 'Maharashtra',
    pricePerKg: 28,
    marketPricePerKg: 42,
    availableQuantityTons: 8.5,
    minOrderKg: 25,
    harvestDate: 'Today, 5:30 AM',
    qualityRating: 4.8,
    isOrganic: true,
    organicCertNumber: 'INDOCERT-MAH-8821',
    badge: 'Fresh Harvest',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
    description: 'Plump, firm, ruby-red premium hybrid tomatoes grown under poly-house conditions. Superior shelf life, uniform grading with zero blemishes.',
    shelfLifeDays: 9,
    moisturePercentage: 94.1,
    brixSweetnessScore: 5.8,
    temperatureRequired: '10°C - 12°C',
    farmerStory: {
      experienceYears: 16,
      farmSizeAcres: 8,
      soilType: 'Deep Black Cotton Soil',
      waterSource: 'Solar Micro-Sprinklers',
      verifiedDate: 'Sep 2024',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      quote: 'Before AgriBridge, mandi commission agents dictated rates. Today I dispatch 3 tons daily with transparent digital escrow payments.'
    },
    priceBreakdown: {
      farmerShare: 20,
      agriBridgeFee: 2,
      coldChainLogistics: 4,
      qualityTestingPackaging: 2,
      totalConsumerPrice: 28,
      traditionalPrice: 42
    },
    demandTrend: [
      { month: 'Apr', marketDemand: 340, priceForecast: 24 },
      { month: 'May', marketDemand: 420, priceForecast: 28 },
      { month: 'Jun', marketDemand: 510, priceForecast: 32 },
      { month: 'Jul', marketDemand: 480, priceForecast: 30 },
      { month: 'Aug', marketDemand: 390, priceForecast: 26 }
    ],
    bulkTiers: [
      { minKg: 50, discountPercent: 0, pricePerKg: 28 },
      { minKg: 250, discountPercent: 7, pricePerKg: 26 },
      { minKg: 1000, discountPercent: 14, pricePerKg: 24 }
    ],
    logisticsRoute: {
      origin: 'Dindori Farm Cluster',
      collectionCenter: 'Pimpalgaon CC #2',
      hub: 'Bhiwandi Agro Distribution Center',
      estimatedHours: 3.5,
      tempControl: 'Pre-cooled 11°C'
    }
  },
  {
    id: 'prod-onion-3',
    name: 'Lasalgaon Pink Crispy Onions (Grade A)',
    category: 'Vegetables',
    farmerName: 'Balasaheb Kadam',
    fpoName: 'Sahyadri Onion & Veg Growers Union',
    location: 'Lasalgaon',
    state: 'Maharashtra',
    pricePerKg: 34,
    marketPricePerKg: 52,
    availableQuantityTons: 14.0,
    minOrderKg: 50,
    harvestDate: '3 days ago (Cured & Grated)',
    qualityRating: 4.8,
    isOrganic: false,
    badge: 'A-Grade',
    image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=800&q=80',
    description: 'Renowned Lasalgaon medium-large pink bulbs, carefully sun-cured for low moisture content and extended room-temperature shelf life.',
    shelfLifeDays: 45,
    moisturePercentage: 11.8,
    temperatureRequired: 'Ambient / Ventilated',
    farmerStory: {
      experienceYears: 25,
      farmSizeAcres: 18,
      soilType: 'Alluvial Loamy Clay',
      waterSource: 'Godavari Canal Network',
      verifiedDate: 'Jul 2024',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      quote: 'Real-time AI demand signals help our 420-member FPO time market releases precisely when metro demand surges.'
    },
    priceBreakdown: {
      farmerShare: 25,
      agriBridgeFee: 2.5,
      coldChainLogistics: 4.5,
      qualityTestingPackaging: 2.0,
      totalConsumerPrice: 34,
      traditionalPrice: 52
    },
    demandTrend: [
      { month: 'Apr', marketDemand: 600, priceForecast: 30 },
      { month: 'May', marketDemand: 720, priceForecast: 34 },
      { month: 'Jun', marketDemand: 850, priceForecast: 38 },
      { month: 'Jul', marketDemand: 790, priceForecast: 36 },
      { month: 'Aug', marketDemand: 690, priceForecast: 33 }
    ],
    bulkTiers: [
      { minKg: 100, discountPercent: 0, pricePerKg: 34 },
      { minKg: 500, discountPercent: 6, pricePerKg: 32 },
      { minKg: 2000, discountPercent: 12, pricePerKg: 30 }
    ],
    logisticsRoute: {
      origin: 'Lasalgaon Mandi Yard Gate',
      collectionCenter: 'Niphad Sorting Terminal',
      hub: 'Pune Chakan Distribution Complex',
      estimatedHours: 4.0,
      tempControl: 'Dry Ventilated'
    }
  },
  {
    id: 'prod-potato-4',
    name: 'Indore Chipsona & Jyoti Potatoes',
    category: 'Vegetables',
    farmerName: 'Mahesh Patidar',
    fpoName: 'Malwa Organic Farmer Producer Org',
    location: 'Indore',
    state: 'Madhya Pradesh',
    pricePerKg: 22,
    marketPricePerKg: 34,
    availableQuantityTons: 19.5,
    minOrderKg: 50,
    harvestDate: '5 days ago',
    qualityRating: 4.7,
    isOrganic: true,
    organicCertNumber: 'MP-AGRI-CERT-1109',
    badge: 'Organic',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80',
    description: 'High dry-matter, low sugar content potatoes ideal for commercial kitchens, snacks, and home culinary use. Machine-sorted 50mm+ uniform grading.',
    shelfLifeDays: 35,
    moisturePercentage: 78.5,
    temperatureRequired: '8°C - 10°C',
    farmerStory: {
      experienceYears: 19,
      farmSizeAcres: 24,
      soilType: 'Rich Malwa Black Soil',
      waterSource: 'Narmada Lift Irrigation',
      verifiedDate: 'Oct 2024',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
      quote: 'We supply 12 QSR restaurant chains directly through AgriBridge without dealing with delayed APMC payment cycles.'
    },
    priceBreakdown: {
      farmerShare: 16,
      agriBridgeFee: 1.5,
      coldChainLogistics: 3.0,
      qualityTestingPackaging: 1.5,
      totalConsumerPrice: 22,
      traditionalPrice: 34
    },
    demandTrend: [
      { month: 'Apr', marketDemand: 890, priceForecast: 20 },
      { month: 'May', marketDemand: 820, priceForecast: 22 },
      { month: 'Jun', marketDemand: 760, priceForecast: 24 },
      { month: 'Jul', marketDemand: 740, priceForecast: 23 },
      { month: 'Aug', marketDemand: 710, priceForecast: 21 }
    ],
    bulkTiers: [
      { minKg: 100, discountPercent: 0, pricePerKg: 22 },
      { minKg: 500, discountPercent: 5, pricePerKg: 20.9 },
      { minKg: 2000, discountPercent: 10, pricePerKg: 19.8 }
    ],
    logisticsRoute: {
      origin: 'Sanwer Agri Cluster',
      collectionCenter: 'Indore Cold Storage Hub #1',
      hub: 'Thane Central Warehouse',
      estimatedHours: 11.0,
      tempControl: '9°C Controlled Atmosphere'
    }
  },
  {
    id: 'prod-banana-5',
    name: 'Jalgaon Grand Naine Robusta Bananas',
    category: 'Fruits',
    farmerName: 'Pravin Chaudhari',
    fpoName: 'Khandesh Banana Exporters Fed',
    location: 'Raver, Jalgaon',
    state: 'Maharashtra',
    pricePerKg: 32,
    marketPricePerKg: 48,
    availableQuantityTons: 11.2,
    minOrderKg: 30,
    harvestDate: 'Yesterday, 7:00 AM',
    qualityRating: 4.9,
    isOrganic: true,
    badge: 'GI Tagged',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80',
    description: 'Export-spec G9 Cavendish bananas harvested at mature green stage with ethical ethylene ripening protocol. Thick peel, excellent shelf life and sweet creamy flavor.',
    shelfLifeDays: 8,
    moisturePercentage: 74.0,
    brixSweetnessScore: 19.8,
    temperatureRequired: '13.5°C',
    farmerStory: {
      experienceYears: 14,
      farmSizeAcres: 12,
      soilType: 'Tapi Basin Loam',
      waterSource: 'Micro Drip Fertigation',
      verifiedDate: 'Aug 2024',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
      quote: 'Our cold-chain trucks are tracked live from farm gate to supermarket shelf, eliminating 18% fruit transit bruising.'
    },
    priceBreakdown: {
      farmerShare: 22,
      agriBridgeFee: 2.5,
      coldChainLogistics: 5.0,
      qualityTestingPackaging: 2.5,
      totalConsumerPrice: 32,
      traditionalPrice: 48
    },
    demandTrend: [
      { month: 'Apr', marketDemand: 520, priceForecast: 30 },
      { month: 'May', marketDemand: 590, priceForecast: 32 },
      { month: 'Jun', marketDemand: 640, priceForecast: 34 },
      { month: 'Jul', marketDemand: 610, priceForecast: 32 },
      { month: 'Aug', marketDemand: 570, priceForecast: 31 }
    ],
    bulkTiers: [
      { minKg: 50, discountPercent: 0, pricePerKg: 32 },
      { minKg: 200, discountPercent: 6, pricePerKg: 30 },
      { minKg: 1000, discountPercent: 12, pricePerKg: 28 }
    ],
    logisticsRoute: {
      origin: 'Raver Packing Station',
      collectionCenter: 'Jalgaon Banana Hub',
      hub: 'Navi Mumbai APMC Direct Bay',
      estimatedHours: 7.0,
      tempControl: 'Controlled 13.5°C'
    }
  },
  {
    id: 'prod-wheat-6',
    name: 'Sehore Certified Sharbati Golden Wheat',
    category: 'Grains',
    farmerName: 'Vikram Singh Tomar',
    fpoName: 'Narmada Valley Grain Growers Collective',
    location: 'Sehore',
    state: 'Madhya Pradesh',
    pricePerKg: 46,
    marketPricePerKg: 68,
    availableQuantityTons: 28.0,
    minOrderKg: 100,
    harvestDate: 'Rabi Season Cured',
    qualityRating: 5.0,
    isOrganic: true,
    organicCertNumber: 'APEDA/MP/WHT-901',
    badge: 'GI Tagged',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80',
    description: 'The "Golden Grain of India" grown in black rain-fed soil. Naturally sweet aroma, high protein (13.5%), heavy grain density making ultra-soft rotis.',
    shelfLifeDays: 365,
    moisturePercentage: 9.8,
    temperatureRequired: 'Dry Storage < 25°C',
    farmerStory: {
      experienceYears: 30,
      farmSizeAcres: 35,
      soilType: 'Heavy Rainfed Clay',
      waterSource: 'Seasonal Monsoon & Borewell',
      verifiedDate: 'May 2024',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
      quote: 'We package single-origin Sharbati grain right at our village silo. Buyers verify batch test certificates right on the platform.'
    },
    priceBreakdown: {
      farmerShare: 35,
      agriBridgeFee: 3,
      coldChainLogistics: 5,
      qualityTestingPackaging: 3,
      totalConsumerPrice: 46,
      traditionalPrice: 68
    },
    demandTrend: [
      { month: 'Apr', marketDemand: 1200, priceForecast: 44 },
      { month: 'May', marketDemand: 1400, priceForecast: 46 },
      { month: 'Jun', marketDemand: 1350, priceForecast: 47 },
      { month: 'Jul', marketDemand: 1280, priceForecast: 48 },
      { month: 'Aug', marketDemand: 1210, priceForecast: 46 }
    ],
    bulkTiers: [
      { minKg: 100, discountPercent: 0, pricePerKg: 46 },
      { minKg: 500, discountPercent: 7, pricePerKg: 42.8 },
      { minKg: 2000, discountPercent: 14, pricePerKg: 39.5 }
    ],
    logisticsRoute: {
      origin: 'Sehore Silo Complex',
      collectionCenter: 'Bhopal Agro Dry Hub',
      hub: 'Delhi NCR Central Depot',
      estimatedHours: 14.0,
      tempControl: 'Airtight Moisture Sealed'
    }
  },
  {
    id: 'prod-rice-7',
    name: 'Karnal Aged Traditional Basmati Rice (1121)',
    category: 'Grains',
    farmerName: 'Gurpreet Singh Dhillon',
    fpoName: 'Karnal Paddy & Organic Exporters Society',
    location: 'Karnal',
    state: 'Haryana',
    pricePerKg: 110,
    marketPricePerKg: 165,
    availableQuantityTons: 16.5,
    minOrderKg: 50,
    harvestDate: '2-Year Aged Batch',
    qualityRating: 4.9,
    isOrganic: true,
    organicCertNumber: 'NPOP/HR-BAS-4410',
    badge: 'GI Tagged',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
    description: 'Extra long 8.4mm slender grains aged naturally for 24 months. Exceptional cooking elongation up to 22mm, distinct regal aroma and zero stickiness.',
    shelfLifeDays: 730,
    moisturePercentage: 10.5,
    temperatureRequired: 'Dry Storage',
    farmerStory: {
      experienceYears: 28,
      farmSizeAcres: 22,
      soilType: 'Indo-Gangetic Clay Loam',
      waterSource: 'Yamuna Canal & Direct Seeding',
      verifiedDate: 'Jun 2024',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
      quote: 'Restaurants order direct 500kg consignments every month. We bypass 4 layers of commission brokers and millers.'
    },
    priceBreakdown: {
      farmerShare: 82,
      agriBridgeFee: 8,
      coldChainLogistics: 12,
      qualityTestingPackaging: 8,
      totalConsumerPrice: 110,
      traditionalPrice: 165
    },
    demandTrend: [
      { month: 'Apr', marketDemand: 480, priceForecast: 108 },
      { month: 'May', marketDemand: 520, priceForecast: 110 },
      { month: 'Jun', marketDemand: 560, priceForecast: 112 },
      { month: 'Jul', marketDemand: 540, priceForecast: 110 },
      { month: 'Aug', marketDemand: 590, priceForecast: 115 }
    ],
    bulkTiers: [
      { minKg: 50, discountPercent: 0, pricePerKg: 110 },
      { minKg: 200, discountPercent: 6, pricePerKg: 103 },
      { minKg: 1000, discountPercent: 12, pricePerKg: 96.8 }
    ],
    logisticsRoute: {
      origin: 'Karnal Grain Terminal',
      collectionCenter: 'Panipat Logistics Park',
      hub: 'Gurugram Metro Gateway',
      estimatedHours: 3.0,
      tempControl: 'Moisture Free Jute Bags'
    }
  },
  {
    id: 'prod-greens-8',
    name: 'Sahyadri Hydroponic Organic Salad Greens',
    category: 'Organic',
    farmerName: 'Meera Deshpande',
    fpoName: 'Sahyadri High-Tech Precision Agro',
    location: 'Mahabaleshwar & Pune',
    state: 'Maharashtra',
    pricePerKg: 140,
    marketPricePerKg: 210,
    availableQuantityTons: 1.8,
    minOrderKg: 5,
    harvestDate: 'Today, 4:00 AM',
    qualityRating: 5.0,
    isOrganic: true,
    organicCertNumber: 'ECOCERT-IN-9092',
    badge: 'Hydroponic',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    description: 'Crisp Butterhead Lettuce, Baby Spinach, Wild Rocket & Tuscan Kale grown in pesticide-free nutrient water recirculating vertical farms.',
    shelfLifeDays: 7,
    moisturePercentage: 96.2,
    temperatureRequired: '4°C - 6°C',
    farmerStory: {
      experienceYears: 9,
      farmSizeAcres: 4,
      soilType: 'Soil-less Hydroponic Medium',
      waterSource: 'RO Mineralized Closed Loop',
      verifiedDate: 'Nov 2024',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      quote: 'Harvested at 4 AM and delivered to fine-dining kitchens by 11 AM using AgriBridge refrigerated micro-fulfillment vans.'
    },
    priceBreakdown: {
      farmerShare: 98,
      agriBridgeFee: 12,
      coldChainLogistics: 18,
      qualityTestingPackaging: 12,
      totalConsumerPrice: 140,
      traditionalPrice: 210
    },
    demandTrend: [
      { month: 'Apr', marketDemand: 80, priceForecast: 135 },
      { month: 'May', marketDemand: 95, priceForecast: 140 },
      { month: 'Jun', marketDemand: 110, priceForecast: 145 },
      { month: 'Jul', marketDemand: 105, priceForecast: 140 },
      { month: 'Aug', marketDemand: 120, priceForecast: 150 }
    ],
    bulkTiers: [
      { minKg: 5, discountPercent: 0, pricePerKg: 140 },
      { minKg: 25, discountPercent: 10, pricePerKg: 126 },
      { minKg: 100, discountPercent: 18, pricePerKg: 114.8 }
    ],
    logisticsRoute: {
      origin: 'Wai Polyhouse Facility',
      collectionCenter: 'Pune Rapid Pre-Cool Center',
      hub: 'BKC Mumbai Micro Fulfilment Bay',
      estimatedHours: 3.2,
      tempControl: 'Strict 4°C Reefer'
    }
  },
  {
    id: 'prod-pomegranate-9',
    name: 'Solapur Bhagwa Ruby Pomegranates',
    category: 'Fruits',
    farmerName: 'Anil Jadhav',
    fpoName: 'Solapur Anar Utpadak Sangh',
    location: 'Sangola, Solapur',
    state: 'Maharashtra',
    pricePerKg: 135,
    marketPricePerKg: 195,
    availableQuantityTons: 4.8,
    minOrderKg: 20,
    harvestDate: '2 days ago',
    qualityRating: 4.8,
    isOrganic: true,
    badge: 'GI Tagged',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
    description: 'Deep crimson arils with soft seeds and intense sweet-tart antioxidant juice. Clean skin, zero pest marks, export grade 300g+ per fruit.',
    shelfLifeDays: 20,
    moisturePercentage: 81.0,
    brixSweetnessScore: 16.5,
    temperatureRequired: '6°C - 8°C',
    farmerStory: {
      experienceYears: 18,
      farmSizeAcres: 15,
      soilType: 'Well-drained Black Gravel',
      waterSource: 'Drip with Mulching',
      verifiedDate: 'Aug 2024',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      quote: 'Buyers can track every lot back to our orchard block with zero pesticide residues.'
    },
    priceBreakdown: {
      farmerShare: 98,
      agriBridgeFee: 9,
      coldChainLogistics: 16,
      qualityTestingPackaging: 12,
      totalConsumerPrice: 135,
      traditionalPrice: 195
    },
    demandTrend: [
      { month: 'Apr', marketDemand: 160, priceForecast: 130 },
      { month: 'May', marketDemand: 210, priceForecast: 135 },
      { month: 'Jun', marketDemand: 250, priceForecast: 140 },
      { month: 'Jul', marketDemand: 230, priceForecast: 138 },
      { month: 'Aug', marketDemand: 200, priceForecast: 135 }
    ],
    bulkTiers: [
      { minKg: 20, discountPercent: 0, pricePerKg: 135 },
      { minKg: 100, discountPercent: 8, pricePerKg: 124 },
      { minKg: 500, discountPercent: 15, pricePerKg: 114 }
    ],
    logisticsRoute: {
      origin: 'Sangola Yard',
      collectionCenter: 'Solapur Agro Terminal',
      hub: 'Bengaluru Hebbal Cold Matrix',
      estimatedHours: 8.0,
      tempControl: '7°C Active Chilled'
    }
  },
  {
    id: 'prod-chilli-10',
    name: 'Guntur Sannam Red Hot Dry Chillies (S4)',
    category: 'Exotic',
    farmerName: 'Venkat Rao',
    fpoName: 'Andhra Spice Growers Cooperative',
    location: 'Guntur',
    state: 'Andhra Pradesh',
    pricePerKg: 210,
    marketPricePerKg: 290,
    availableQuantityTons: 9.0,
    minOrderKg: 25,
    harvestDate: 'Sun-dried 4 days',
    qualityRating: 4.9,
    isOrganic: true,
    badge: 'GI Tagged',
    image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=800&q=80',
    description: 'World-famous Guntur Sannam S4 variety known for brilliant natural red color (ASTA 120+) and sharp pungent heat (SHU 35,000 - 40,000).',
    shelfLifeDays: 180,
    moisturePercentage: 10.0,
    temperatureRequired: 'Cool & Dry',
    farmerStory: {
      experienceYears: 24,
      farmSizeAcres: 16,
      soilType: 'Red Loam & Clay',
      waterSource: 'Krishna River Basin',
      verifiedDate: 'Sep 2024',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      quote: 'Direct food processing and masala brand tie-ups provide guaranteed off-take contracts at stable floor prices.'
    },
    priceBreakdown: {
      farmerShare: 160,
      agriBridgeFee: 14,
      coldChainLogistics: 20,
      qualityTestingPackaging: 16,
      totalConsumerPrice: 210,
      traditionalPrice: 290
    },
    demandTrend: [
      { month: 'Apr', marketDemand: 300, priceForecast: 205 },
      { month: 'May', marketDemand: 340, priceForecast: 210 },
      { month: 'Jun', marketDemand: 380, priceForecast: 215 },
      { month: 'Jul', marketDemand: 360, priceForecast: 212 },
      { month: 'Aug', marketDemand: 410, priceForecast: 220 }
    ],
    bulkTiers: [
      { minKg: 25, discountPercent: 0, pricePerKg: 210 },
      { minKg: 100, discountPercent: 6, pricePerKg: 197 },
      { minKg: 500, discountPercent: 12, pricePerKg: 184 }
    ],
    logisticsRoute: {
      origin: 'Guntur Yard',
      collectionCenter: 'Vijayawada Express Center',
      hub: 'Hyderabad Uppal Hub',
      estimatedHours: 5.5,
      tempControl: 'Moisture Sealed'
    }
  }
];

export const mockDemandData = [
  { month: 'Jan', actual: 420, forecast: 410, confidence: 95 },
  { month: 'Feb', actual: 460, forecast: 450, confidence: 96 },
  { month: 'Mar', actual: 520, forecast: 510, confidence: 94 },
  { month: 'Apr', actual: 590, forecast: 600, confidence: 97 },
  { month: 'May', actual: 680, forecast: 670, confidence: 95 },
  { month: 'Jun', actual: 750, forecast: 760, confidence: 93 },
  { month: 'Jul', actual: null, forecast: 840, confidence: 94 },
  { month: 'Aug', actual: null, forecast: 910, confidence: 95 }
];

export const mockCropForecasts: Record<string, { month: string; actual: number | null; forecast: number }[]> = {
  Tomatoes: [
    { month: 'Jan', actual: 320, forecast: 310 },
    { month: 'Feb', actual: 350, forecast: 340 },
    { month: 'Mar', actual: 410, forecast: 400 },
    { month: 'Apr', actual: 480, forecast: 490 },
    { month: 'May', actual: 560, forecast: 550 },
    { month: 'Jun', actual: 640, forecast: 650 },
    { month: 'Jul', actual: null, forecast: 760 },
    { month: 'Aug', actual: null, forecast: 820 }
  ],
  Onions: [
    { month: 'Jan', actual: 500, forecast: 490 },
    { month: 'Feb', actual: 530, forecast: 520 },
    { month: 'Mar', actual: 580, forecast: 570 },
    { month: 'Apr', actual: 630, forecast: 640 },
    { month: 'May', actual: 710, forecast: 700 },
    { month: 'Jun', actual: 780, forecast: 790 },
    { month: 'Jul', actual: null, forecast: 880 },
    { month: 'Aug', actual: null, forecast: 940 }
  ],
  Potatoes: [
    { month: 'Jan', actual: 600, forecast: 590 },
    { month: 'Feb', actual: 620, forecast: 610 },
    { month: 'Mar', actual: 640, forecast: 630 },
    { month: 'Apr', actual: 650, forecast: 660 },
    { month: 'May', actual: 640, forecast: 630 },
    { month: 'Jun', actual: 610, forecast: 600 },
    { month: 'Jul', actual: null, forecast: 560 },
    { month: 'Aug', actual: null, forecast: 530 }
  ],
  Mangoes: [
    { month: 'Jan', actual: 80, forecast: 80 },
    { month: 'Feb', actual: 120, forecast: 110 },
    { month: 'Mar', actual: 280, forecast: 270 },
    { month: 'Apr', actual: 590, forecast: 610 },
    { month: 'May', actual: 950, forecast: 940 },
    { month: 'Jun', actual: 720, forecast: 730 },
    { month: 'Jul', actual: null, forecast: 340 },
    { month: 'Aug', actual: null, forecast: 110 }
  ]
};

export const mockPredictions: DemandPrediction[] = [
  {
    crop: 'Hybrid Tomatoes',
    trend: 'up',
    changePercent: 18.4,
    projectedVolumeTons: 1250,
    confidenceScore: 96.2,
    recommendedAction: 'Increase polyhouse transplanting by 15% for June-July delivery window.',
    topBuyingHub: 'Mumbai MMR & Pune Tier-1 QSR Hubs',
    priceOutlook: 'Bullish (+₹6 to ₹8/kg over baseline)'
  },
  {
    crop: 'Lasalgaon Onions',
    trend: 'up',
    changePercent: 12.7,
    projectedVolumeTons: 2100,
    confidenceScore: 94.8,
    recommendedAction: 'Stagger warehouse releases across Weeks 24-28 to maximize realization.',
    topBuyingHub: 'Delhi NCR Wholesale & Bengaluru Supermarkets',
    priceOutlook: 'Steady Bullish (+₹4/kg anticipated)'
  },
  {
    crop: 'Jyoti Potatoes',
    trend: 'down',
    changePercent: 8.2,
    projectedVolumeTons: 1800,
    confidenceScore: 92.5,
    recommendedAction: 'Lock forward supply contracts with processing chip makers immediately.',
    topBuyingHub: 'Indore Processing Clusters & Gujarat Ports',
    priceOutlook: 'Mild Softening (-₹2/kg due to UP harvest influx)'
  }
];

export const mockShipments: Shipment[] = [
  {
    id: 'ship-1',
    code: 'AG4821',
    origin: 'Ratnagiri Orchards',
    destination: 'Mumbai Vashi Hub',
    productName: 'Alphonso Mango (Grade A)',
    quantityTons: 4.2,
    farmerFpo: 'Konkan Krishi Vikas FPO',
    buyerName: 'Nature Fresh Supermarkets',
    distanceKm: 312,
    eta: '4h 20m',
    status: 'In Transit',
    temperatureC: 13.8,
    humidityPercent: 86,
    aiOptimizationScore: 98,
    fuelSavedLiters: 18.4,
    carbonReducedKg: 49.2,
    currentLocation: 'Near Kolad, NH-66'
  },
  {
    id: 'ship-2',
    code: 'AG4822',
    origin: 'Nashik Dindori CC',
    destination: 'Bhiwandi Agro Park',
    productName: 'Vine Tomatoes & Chillies',
    quantityTons: 6.8,
    farmerFpo: 'Godavari Valley FPO',
    buyerName: 'Urban Kitchens & QSR Ltd',
    distanceKm: 148,
    eta: '1h 45m',
    status: 'In Transit',
    temperatureC: 10.5,
    humidityPercent: 91,
    aiOptimizationScore: 96,
    fuelSavedLiters: 9.8,
    carbonReducedKg: 26.1,
    currentLocation: 'Kasara Ghat Sector'
  },
  {
    id: 'ship-3',
    code: 'AG4823',
    origin: 'Mahabaleshwar Hydroponic',
    destination: 'BKC Mumbai Micro Hub',
    productName: 'Hydroponic Salad Greens',
    quantityTons: 1.2,
    farmerFpo: 'Sahyadri High-Tech Agro',
    buyerName: 'The Oberoi & Taj Fine Dining',
    distanceKm: 245,
    eta: 'Delivered (07:15 AM)',
    status: 'Delivered',
    temperatureC: 4.6,
    humidityPercent: 94,
    aiOptimizationScore: 99,
    fuelSavedLiters: 14.2,
    carbonReducedKg: 38.0,
    currentLocation: 'Delivered at Vashi Cold Bay'
  },
  {
    id: 'ship-4',
    code: 'AG4824',
    origin: 'Sehore Silo Complex',
    destination: 'Delhi NCR Hub',
    productName: 'Sharbati Golden Wheat',
    quantityTons: 18.0,
    farmerFpo: 'Narmada Valley Collective',
    buyerName: 'Aashirvaad & Organic Tattva',
    distanceKm: 780,
    eta: 'Scheduled 6:00 PM',
    status: 'Scheduled',
    temperatureC: 22.0,
    humidityPercent: 48,
    aiOptimizationScore: 94,
    fuelSavedLiters: 42.0,
    carbonReducedKg: 112.5,
    currentLocation: 'Loading Bay #4'
  },
  {
    id: 'ship-5',
    code: 'AG4825',
    origin: 'Lasalgaon Mandi Yard',
    destination: 'Pune Chakan Hub',
    productName: 'Pink Graded Onions',
    quantityTons: 12.0,
    farmerFpo: 'Sahyadri Onion Union',
    buyerName: 'Reliance Retail Wholesale',
    distanceKm: 215,
    eta: 'Delayed by 25m (Traffic)',
    status: 'Delayed',
    temperatureC: 24.5,
    humidityPercent: 55,
    aiOptimizationScore: 89,
    fuelSavedLiters: 11.2,
    carbonReducedKg: 30.0,
    currentLocation: 'Alephata Bypass'
  }
];

export const mockTestimonials: Testimonial[] = [
  {
    id: 't-1',
    name: 'Ramesh Patil',
    role: 'Farmer',
    organization: 'Chairman, Sahyadri Agri Producer Co.',
    location: 'Nashik, Maharashtra',
    avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=200&q=80',
    quote: 'Earlier I had to depend entirely on local intermediaries and distress-sell my tomatoes. With AgriBridge AI demand forecasts, we know exactly where buyer demand is peaking and sell directly for 27% higher returns.',
    metricBadge: '+₹4.2L Additional Annual Income',
    rating: 5
  },
  {
    id: 't-2',
    name: 'Chef Ananya Sen',
    role: 'Restaurant Owner',
    organization: 'Culinary Director, The Green Table & Co.',
    location: 'Bandra, Mumbai',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    quote: 'We get predictable farm-to-kitchen supply, transparent pricing, and zero chemical pesticide residues. Our guests taste the difference in farm-fresh produce picked less than 18 hours prior.',
    metricBadge: '18% Lower Procurement Cost',
    rating: 5
  },
  {
    id: 't-3',
    name: 'Priya & Vikram Sharma',
    role: 'Consumer',
    organization: 'Community Buying Lead, Indiranagar',
    location: 'Bangalore, Karnataka',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    quote: 'Fresh produce at prices that actually make sense! Knowing the exact farmer who grew our Alphonso mangoes and having full traceability brings complete peace of mind to our whole neighborhood collective.',
    metricBadge: '100% Traceable Single-Origin',
    rating: 5
  }
];

export const mockAIChatKnowledge: Record<string, { response: string; snippet?: any }> = {
  'what should i plant next month': {
    response: 'Based on our climate model for Maharashtra & Central India and projected September-October mandi supply curves, our AI recommends planting **Vine-Ripened Hybrid Tomatoes** or **Short-cycle French Beans**.',
    snippet: {
      title: 'AI Crop Recommendation Engine',
      type: 'crop',
      metrics: [
        { label: 'Projected Demand', value: '+18.4% YoY' },
        { label: 'Expected Realization', value: '₹34 - ₹38/kg' },
        { label: 'Risk Factor', value: 'Low (Polyhouse)' },
        { label: 'Water Index', value: '420 mm (Drip)' }
      ],
      recommendation: 'Target dispatch window: 60-70 days. Book forward purchase interest on AgriBridge to lock base pricing.'
    }
  },
  'which market has the highest tomato demand': {
    response: 'Real-time telemetry and commercial buyer requisition orders show the highest tomato demand in **Mumbai MMR & Pune QSR clusters** (currently running a 220-ton weekly procurement shortfall).',
    snippet: {
      title: 'Regional Demand Index — Tomatoes',
      type: 'demand',
      metrics: [
        { label: 'Mumbai MMR', value: '98/100 (Urgent)' },
        { label: 'Pune Metros', value: '91/100 (High)' },
        { label: 'Current Direct Gate Price', value: '₹28 - ₹32/kg' },
        { label: 'APMC Mandi Rate', value: '₹22 - ₹24/kg' }
      ],
      recommendation: 'Direct dispatch via AgriBridge Pimpalgaon CC to Bhiwandi saves 3.5 hrs transit and ₹4/kg cold shrinkage.'
    }
  },
  'how can i reduce delivery cost': {
    response: 'AgriBridge uses **AI Load Pooling and Multi-Drop Route Optimization** to consolidate nearby farm harvests into shared refrigerated EV and multi-temp trucks.',
    snippet: {
      title: 'Smart Logistics Optimization',
      type: 'route',
      metrics: [
        { label: 'Mileage Reduction', value: '23% Shorter' },
        { label: 'Fuel Saved', value: '18% Avg' },
        { label: 'Per-Kg Freight Cost', value: '₹3.20 (vs ₹5.80)' },
        { label: 'On-time Guarantee', value: '94.6%' }
      ],
      recommendation: 'Schedule your crop harvest 24 hours in advance to automatically match existing cold-chain milk-run routes.'
    }
  },
  'where should i sell my produce': {
    response: 'Selling directly on **AgriBridge Direct Marketplace** eliminates APMC arthiya commissions (typically 6-8%), unload levies, and delayed 30-day payment cycles.',
    snippet: {
      title: 'Channel Realization Comparison',
      type: 'price',
      metrics: [
        { label: 'AgriBridge Net', value: '82% of Retail' },
        { label: 'Traditional Mandi', value: '38-45% of Retail' },
        { label: 'Payment Settlement', value: 'Instant Escrow' },
        { label: 'Buyer Verification', value: '100% KYC Passed' }
      ],
      recommendation: 'List your current available harvest on AgriBridge to instantly notify 180+ verified commercial buyers in your radius.'
    }
  }
};
