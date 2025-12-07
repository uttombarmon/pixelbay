// lib/product-form-config.ts

export type GadgetType =
  | "smartphone"
  | "laptop"
  | "tablet"
  | "smartwatch"
  | "headphones"
  | "camera"
  | "gaming_console"
  | "drone"
  | "vr_headset"
  | "portable_speaker"
  | "charger"
  | "monitor"
  | "keyboard"
  | "mouse"
  | "router"
  | "hard_drive"
  | "gpu"
  | "cpu"
  | "motherboard"
  | "ram"
  | "ssd"
  | "power_supply"
  | "case"
  | "cooling"
  | "accessory"
  | "other";

export type SpecFieldGroup = {
  label: string;
  fields: string[];
};

export type GadgetConfig = {
  product: string[];
  variant: string[];
  specs: SpecFieldGroup[];
};

// Common fields shared across all gadgets
const commonProductFields = [
  "title",
  "slug",
  "brand",
  "model",
  "status",
  "visibility",
  "shortDescription",
  "description",
  "condition",
  "warrantyType",
  "warrantyMonths",
  "warrantyDescription",
];

const commonVariantFields = [
  "sku",
  "variantName",
  "color",
  "storageVariant",
  "ramVariant",
  "regionVariant",
  "price",
  "currency",
  "stock",
];

export const gadgetFieldConfig: Record<GadgetType, GadgetConfig> = {
  // CONSUMER DEVICES
  smartphone: {
    product: commonProductFields,
    variant: commonVariantFields,
    specs: [
      { label: "Performance", fields: ["processor", "processorCores", "ram", "storage", "gpu", "fps"] },
      { label: "Display", fields: ["displaySize", "displayTech", "displayResolution", "refreshRate", "brightness", "screenCoating"] },
      { label: "Camera", fields: ["rearCameraMP", "rearCameraAperture", "frontCameraMP", "frontCameraAperture", "videoCapability", "opticalZoom"] },
      { label: "Battery & Charging", fields: ["batteryCapacity", "batteryLife", "fastCharging", "wirelessCharging"] },
      { label: "Connectivity", fields: ["bluetooth", "wifi", "nfc", "usb", "cellular", "sim"] },
      { label: "Audio", fields: ["speakerCount", "audioCodec", "microphone"] },
      { label: "Physical & Durability", fields: ["weight", "dimensions", "material", "ipRating", "dropProtection"] },
      { label: "OS & Support", fields: ["operatingSystem", "maxOSUpdate", "softwareSupport"] },
    ],
  },

  laptop: {
    product: commonProductFields,
    variant: [...commonVariantFields, "regionVariant"],
    specs: [
      { label: "Processor", fields: ["processor", "processorCores", "processorThreads", "processorSpeed", "processorArch"] },
      { label: "Memory & Storage", fields: ["ram", "ramType", "ramSpeed", "storage", "storageType", "storageInterface", "storageExpansion"] },
      { label: "Graphics", fields: ["gpu", "gpuMemory", "gpuMemoryType"] },
      { label: "Display", fields: ["displaySize", "displayTech", "displayResolution", "refreshRate", "colorDepth", "brightness", "screenCoating"] },
      { label: "Battery & Power", fields: ["batteryCapacity", "batteryLife", "fastCharging", "thermalDesignPower"] },
      { label: "Audio", fields: ["speakerCount", "speakerWatts", "audioCodec", "microphone"] },
      { label: "Connectivity", fields: ["bluetooth", "wifi", "nfc", "usb", "ports", "cellular"] },
      { label: "Physical", fields: ["weight", "dimensions", "material"] },
      { label: "OS & Support", fields: ["operatingSystem", "maxOSUpdate", "softwareSupport"] },
    ],
  },

  tablet: {
    product: commonProductFields,
    variant: commonVariantFields,
    specs: [
      { label: "Performance", fields: ["processor", "processorCores", "ram", "storage", "gpu"] },
      { label: "Display", fields: ["displaySize", "displayTech", "displayResolution", "refreshRate", "brightness", "colorDepth"] },
      { label: "Camera", fields: ["rearCameraMP", "frontCameraMP", "videoCapability"] },
      { label: "Battery & Charging", fields: ["batteryCapacity", "batteryLife", "fastCharging", "wirelessCharging"] },
      { label: "Connectivity", fields: ["bluetooth", "wifi", "nfc", "usb", "cellular"] },
      { label: "Audio", fields: ["speakerCount", "speakerWatts"] },
      { label: "Physical & Durability", fields: ["weight", "dimensions", "material", "ipRating"] },
    ],
  },

  smartwatch: {
    product: commonProductFields,
    variant: [...commonVariantFields, "regionVariant"],
    specs: [
      { label: "Display", fields: ["displaySize", "displayTech", "displayResolution", "brightness", "screenCoating"] },
      { label: "Processor & Memory", fields: ["processor", "ram", "storage"] },
      { label: "Battery", fields: ["batteryCapacity", "batteryLife", "fastCharging", "wirelessCharging"] },
      { label: "Connectivity", fields: ["bluetooth", "wifi", "nfc", "usb", "cellular", "sim"] },
      { label: "Sensors & Features", fields: ["specialFeatures"] },
      { label: "Physical & Durability", fields: ["weight", "dimensions", "material", "ipRating", "mrlRating"] },
      { label: "OS & Support", fields: ["operatingSystem", "maxOSUpdate", "softwareSupport"] },
    ],
  },

  headphones: {
    product: commonProductFields,
    variant: commonVariantFields,
    specs: [
      { label: "Audio", fields: ["speakerCount", "speakerWatts", "audioCodec", "microphone"] },
      { label: "Connectivity", fields: ["bluetooth", "wifi", "usb", "nfc"] },
      { label: "Battery", fields: ["batteryCapacity", "batteryLife", "fastCharging", "wirelessCharging"] },
      { label: "Physical", fields: ["weight", "dimensions", "material"] },
      { label: "Durability", fields: ["ipRating", "dropProtection"] },
      { label: "Special Features", fields: ["specialFeatures"] },
    ],
  },

  camera: {
    product: commonProductFields,
    variant: commonVariantFields,
    specs: [
      { label: "Sensor & Processor", fields: ["processor", "storage", "storageType", "storageExpansion"] },
      { label: "Camera", fields: ["rearCameraMP", "rearCameraAperture", "videoCapability", "opticalZoom"] },
      { label: "Display", fields: ["displaySize", "displayTech", "displayResolution"] },
      { label: "Battery & Power", fields: ["batteryCapacity", "batteryLife", "fastCharging"] },
      { label: "Connectivity", fields: ["bluetooth", "wifi", "usb", "ports"] },
      { label: "Physical", fields: ["weight", "dimensions", "material"] },
      { label: "Special Features", fields: ["specialFeatures", "certifications"] },
    ],
  },

  gaming_console: {
    product: commonProductFields,
    variant: commonVariantFields,
    specs: [
      { label: "Performance", fields: ["processor", "processorCores", "ram", "storage", "gpu", "gpuMemory", "fps"] },
      { label: "Display Support", fields: ["displayResolution", "refreshRate"] },
      { label: "Connectivity", fields: ["bluetooth", "wifi", "usb", "ports", "nfc"] },
      { label: "Physical", fields: ["weight", "dimensions", "material"] },
      { label: "Storage", fields: ["storage", "storageExpansion"] },
      { label: "Features", fields: ["specialFeatures"] },
    ],
  },

  drone: {
    product: commonProductFields,
    variant: commonVariantFields,
    specs: [
      { label: "Processor & Memory", fields: ["processor", "ram", "storage", "storageExpansion"] },
      { label: "Camera", fields: ["rearCameraMP", "rearCameraAperture", "videoCapability", "opticalZoom"] },
      { label: "Battery & Flight", fields: ["batteryCapacity", "batteryLife"] },
      { label: "Connectivity", fields: ["bluetooth", "wifi", "usb"] },
      { label: "Physical & Durability", fields: ["weight", "dimensions", "material", "ipRating"] },
      { label: "Flight Features", fields: ["specialFeatures"] },
    ],
  },

  vr_headset: {
    product: commonProductFields,
    variant: commonVariantFields,
    specs: [
      { label: "Display", fields: ["displaySize", "displayTech", "displayResolution", "refreshRate"] },
      { label: "Processor & Memory", fields: ["processor", "processorCores", "ram", "storage"] },
      { label: "Connectivity", fields: ["bluetooth", "wifi", "usb"] },
      { label: "Battery", fields: ["batteryCapacity", "batteryLife"] },
      { label: "Audio", fields: ["speakerCount", "audioCodec", "microphone"] },
      { label: "Physical", fields: ["weight", "dimensions", "material"] },
      { label: "Features", fields: ["specialFeatures"] },
    ],
  },

  portable_speaker: {
    product: commonProductFields,
    variant: commonVariantFields,
    specs: [
      { label: "Audio", fields: ["speakerCount", "speakerWatts", "audioCodec"] },
      { label: "Connectivity", fields: ["bluetooth", "wifi", "usb", "nfc"] },
      { label: "Battery", fields: ["batteryCapacity", "batteryLife", "fastCharging"] },
      { label: "Physical & Durability", fields: ["weight", "dimensions", "material", "ipRating"] },
      { label: "Features", fields: ["specialFeatures"] },
    ],
  },

  // ACCESSORIES
  charger: {
    product: commonProductFields,
    variant: commonVariantFields,
    specs: [
      { label: "Power Output", fields: ["fastCharging", "ports", "specialFeatures"] },
      { label: "Compatibility", fields: ["specialFeatures"] },
      { label: "Physical", fields: ["weight", "dimensions", "material"] },
    ],
  },

  monitor: {
    product: commonProductFields,
    variant: commonVariantFields,
    specs: [
      { label: "Display", fields: ["displaySize", "displayTech", "displayResolution", "refreshRate", "colorDepth", "brightness", "screenCoating"] },
      { label: "Connectivity", fields: ["usb", "ports"] },
      { label: "Physical", fields: ["weight", "dimensions", "material"] },
      { label: "Features", fields: ["specialFeatures"] },
    ],
  },

  keyboard: {
    product: commonProductFields,
    variant: commonVariantFields,
    specs: [
      { label: "Connectivity", fields: ["bluetooth", "wifi", "usb"] },
      { label: "Battery", fields: ["batteryCapacity", "batteryLife"] },
      { label: "Physical", fields: ["weight", "dimensions", "material"] },
      { label: "Features", fields: ["specialFeatures"] },
    ],
  },

  mouse: {
    product: commonProductFields,
    variant: commonVariantFields,
    specs: [
      { label: "Connectivity", fields: ["bluetooth", "wifi", "usb"] },
      { label: "Battery", fields: ["batteryCapacity", "batteryLife"] },
      { label: "Physical", fields: ["weight", "dimensions", "material"] },
      { label: "Features", fields: ["specialFeatures"] },
    ],
  },

  router: {
    product: commonProductFields,
    variant: commonVariantFields,
    specs: [
      { label: "Connectivity", fields: ["wifi", "bluetooth", "ports", "usb"] },
      { label: "Network Features", fields: ["specialFeatures"] },
      { label: "Physical", fields: ["weight", "dimensions", "material"] },
    ],
  },

  // PC COMPONENTS
  hard_drive: {
    product: commonProductFields,
    variant: commonVariantFields,
    specs: [
      { label: "Storage", fields: ["storage", "storageType", "storageInterface"] },
      { label: "Performance", fields: ["specialFeatures"] },
      { label: "Physical", fields: ["weight", "dimensions", "material"] },
    ],
  },

  gpu: {
    product: commonProductFields,
    variant: commonVariantFields,
    specs: [
      { label: "Graphics", fields: ["gpu", "gpuMemory", "gpuMemoryType"] },
      { label: "Performance", fields: ["fps", "thermalDesignPower", "maxTemperature"] },
      { label: "Connectivity", fields: ["ports", "usb"] },
      { label: "Power", fields: ["thermalDesignPower"] },
    ],
  },

  cpu: {
    product: commonProductFields,
    variant: commonVariantFields,
    specs: [
      { label: "Processor", fields: ["processor", "processorCores", "processorThreads", "processorSpeed", "processorArch"] },
      { label: "Performance", fields: ["antutuScore", "geekbenchScore", "thermalDesignPower", "maxTemperature"] },
      { label: "Socket & Support", fields: ["specialFeatures"] },
    ],
  },

  motherboard: {
    product: commonProductFields,
    variant: commonVariantFields,
    specs: [
      { label: "Connections", fields: ["ports", "usb", "wifi", "bluetooth"] },
      { label: "Features", fields: ["specialFeatures"] },
      { label: "Physical", fields: ["weight", "dimensions", "material"] },
    ],
  },

  ram: {
    product: commonProductFields,
    variant: commonVariantFields,
    specs: [
      { label: "Memory", fields: ["ram", "ramType", "ramSpeed"] },
      { label: "Specifications", fields: ["specialFeatures"] },
    ],
  },

  ssd: {
    product: commonProductFields,
    variant: commonVariantFields,
    specs: [
      { label: "Storage", fields: ["storage", "storageType", "storageInterface"] },
      { label: "Performance", fields: ["specialFeatures"] },
    ],
  },

  power_supply: {
    product: commonProductFields,
    variant: commonVariantFields,
    specs: [
      { label: "Power", fields: ["thermalDesignPower", "specialFeatures"] },
      { label: "Connectors", fields: ["ports"] },
      { label: "Physical", fields: ["weight", "dimensions", "material"] },
    ],
  },

  case: {
    product: commonProductFields,
    variant: commonVariantFields,
    specs: [
      { label: "Compatibility", fields: ["specialFeatures"] },
      { label: "Physical", fields: ["weight", "dimensions", "material"] },
      { label: "Features", fields: ["specialFeatures"] },
    ],
  },

  cooling: {
    product: commonProductFields,
    variant: commonVariantFields,
    specs: [
      { label: "Cooling", fields: ["maxTemperature", "specialFeatures"] },
      { label: "Compatibility", fields: ["specialFeatures"] },
      { label: "Physical", fields: ["weight", "dimensions", "material"] },
    ],
  },

  accessory: {
    product: commonProductFields,
    variant: commonVariantFields,
    specs: [
      { label: "Compatibility", fields: ["specialFeatures"] },
      { label: "Connectivity", fields: ["usb", "ports", "bluetooth"] },
      { label: "Physical", fields: ["weight", "dimensions", "material"] },
    ],
  },

  other: {
    product: commonProductFields,
    variant: commonVariantFields,
    specs: [
      { label: "General Specs", fields: ["specialFeatures"] },
      { label: "Physical", fields: ["weight", "dimensions", "material"] },
    ],
  },
};

// Field label mapping for UI display
export const fieldLabels: Record<string, string> = {
  // Product
  title: "Product Title",
  slug: "URL Slug",
  brand: "Brand",
  model: "Model Number",
  status: "Status",
  visibility: "Visibility",
  shortDescription: "Short Description",
  description: "Full Description",
  condition: "Condition",
  warrantyType: "Warranty Type",
  warrantyMonths: "Warranty (Months)",
  warrantyDescription: "Warranty Details",

  // Variant
  sku: "SKU",
  variantName: "Variant Name",
  color: "Color",
  storageVariant: "Storage",
  ramVariant: "RAM",
  regionVariant: "Region",
  price: "Price",
  currency: "Currency",
  stock: "Stock Quantity",

  // Performance
  processor: "Processor",
  processorCores: "CPU Cores",
  processorThreads: "CPU Threads",
  processorSpeed: "CPU Speed (GHz)",
  processorArch: "Processor Architecture",
  antutuScore: "AnTuTu Score",
  geekbenchScore: "Geekbench Score",
  fps: "FPS (Gaming)",
  thermalDesignPower: "TDP (Watts)",
  maxTemperature: "Max Temperature (°C)",

  // Memory & Storage
  ram: "RAM (GB)",
  ramType: "RAM Type",
  ramSpeed: "RAM Speed (MHz)",
  storage: "Storage (GB)",
  storageType: "Storage Type",
  storageInterface: "Storage Interface",
  storageExpansion: "Expandable Storage",

  // Graphics
  gpu: "GPU Model",
  gpuMemory: "GPU Memory (GB)",
  gpuMemoryType: "GPU Memory Type",

  // Display
  displaySize: "Screen Size (inches)",
  displayTech: "Display Technology",
  displayResolution: "Resolution",
  refreshRate: "Refresh Rate (Hz)",
  colorDepth: "Color Depth",
  brightness: "Brightness (nits)",
  screenCoating: "Screen Protection",

  // Battery
  batteryCapacity: "Battery (mAh)",
  batteryType: "Battery Type",
  batteryLife: "Battery Life",
  fastCharging: "Fast Charging (W)",
  wirelessCharging: "Wireless Charging",

  // Camera
  rearCameraMP: "Rear Camera (MP)",
  rearCameraAperture: "Rear Aperture (f/)",
  frontCameraMP: "Front Camera (MP)",
  frontCameraAperture: "Front Aperture (f/)",
  videoCapability: "Video Recording",
  opticalZoom: "Optical Zoom",

  // Audio
  speakerCount: "Speaker Count",
  speakerWatts: "Speaker Power (W)",
  audioCodec: "Audio Codec",
  microphone: "Microphone",

  // Connectivity
  bluetooth: "Bluetooth",
  wifi: "WiFi",
  nfc: "NFC",
  usb: "USB Type",
  ports: "Ports",
  cellular: "Cellular",
  sim: "SIM Type",

  // Physical
  weight: "Weight (grams)",
  dimensions: "Dimensions (mm)",
  material: "Material",
  ipRating: "IP Rating",
  mrlRating: "MIL Rating",
  dropProtection: "Drop Protection",

  // OS & Support
  operatingSystem: "Operating System",
  maxOSUpdate: "Latest OS Support",
  softwareSupport: "Software Support (years)",

  // Flexible
  specialFeatures: "Special Features",
  certifications: "Certifications",
  additionalSpecs: "Additional Specs",
};
