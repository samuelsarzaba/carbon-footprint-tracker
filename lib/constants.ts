// Emission factors (kg CO2e)
export const EMISSION_FACTORS = {
  TRANSPORT: {
    CAR: 0.4, // per mile
    BUS: 0.1, // per mile
    BIKE: 0, // per mile
    WALK: 0, // per mile
  },
  DIET: {
    MEAT_HEAVY: 7.2, // per day
    MIXED: 5.2, // per day
    VEGETARIAN: 3.8, // per day
    VEGAN: 2.9, // per day
  },
  ENERGY: {
    ELECTRICITY: 0.92, // per kWh
  },
};

export const BADGES = [
  {
    id: 'green-commuter',
    name: 'Green Commuter',
    description: 'Used eco-friendly transport 10 times',
    icon: '🚲',
  },
  {
    id: 'plant-power',
    name: 'Plant Power',
    description: 'Maintained a plant-based diet for a week',
    icon: '🌱',
  },
  {
    id: 'energy-saver',
    name: 'Energy Saver',
    description: 'Reduced energy consumption by 20%',
    icon: '⚡',
  },
  {
    id: 'eco-warrior',
    name: 'Eco Warrior',
    description: 'Achieved all sustainability goals for a month',
    icon: '🌍',
  },
];