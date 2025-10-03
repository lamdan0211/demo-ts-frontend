/**
 * Global configuration for the application
 * Manages owner-specific settings and static path aliases
 */

export interface OwnerConfig {
  name: string;
  staticPath: string;
  imagesPath: string;
  cssPath: string;
  jsPath: string;
  domain?: string;
  language?: string;
}

// No default owner - will be determined from URL routing

// Owner configurations mapping
const OWNER_CONFIGS: Record<string, OwnerConfig> = {
  'demoa1': {
    name: 'demoa1',
    staticPath: '/themes/demoa1',
    imagesPath: '/themes/demoa1/images',
    cssPath: '/themes/demoa1/css',
    jsPath: '/themes/demoa1/js',
    domain: 'localhost:3001',
    language: 'vi'
  },
  'demoa2': {
    name: 'demoa2',
    staticPath: '/themes/demoa1',
    imagesPath: '/themes/demoa1/images',
    cssPath: '/themes/demoa1/css',
    jsPath: '/themes/demoa1/js',
    domain: 'localhost:3001',
    language: 'en'
  },
  'hoasen': {
    name: 'hoasen',
    staticPath: '/themes/hoasen',
    imagesPath: '/themes/hoasen/images',
    cssPath: '/themes/hoasen/css',
    jsPath: '/themes/hoasen/js',
    domain: 'localhost:3001',
    language: 'vi'
  }
};

// Layout configuration based on Setup.php logic
export interface LayoutConfig {
  tempName?: string;
  layoutType?: string;
  layoutName: 'default' | 'layout03' | 'layout04' | 'layoutpremium';
}

// Owner layout configurations
const OWNER_LAYOUT_CONFIGS: Record<string, LayoutConfig> = {
  'demoa1': {
    tempName: 'demoa1',
    layoutType: '3',
    layoutName: 'layout03'
  },
  'demoa2': {
    tempName: 'demoa1',
    layoutType: '4',
    layoutName: 'layout04'
  },
  'hoasen': {
    tempName: 'hoasen',
    layoutType: 'premium',
    layoutName: 'layoutpremium'
  }
};

// Layout 3 owners list (from Setup.php)
const LAYOUT_3_OWNERS = [
  'jmango', 'amway', 'tnt', 'mtalent', 'beiersdorf', 'jgc', 'toyotathanhxuan', 
  'pierrefabre', 'aesmongduong', 'shb', 'pnj', 'wanek', 'pvcombank', 'diamondmedia', 
  'abbank', 'fecon', 'techcombank', 'demo1', 'demo2', 'baoviet', 'oceanbank', 
  'eximbank', 'acb', 'idp', 'lienvietpostbank', 'flc', 'sacombank', 'vndirect', 
  'hotram', 'daidongtien'
];

// Global owner variable - will be set by URL routing
let currentOwner: string = process.env.NEXT_PUBLIC_OWNER || '';

/**
 * Set the current owner
 * @param owner - The owner name
 */
export function setOwner(owner: string): void {
  currentOwner = owner;
  // Store in localStorage for client-side persistence
  if (typeof window !== 'undefined') {
    localStorage.setItem('app_owner', owner);
  }
}

/**
 * Get the current owner
 * @returns The current owner name
 */
export function getOwner(): string {
  // Check localStorage first (client-side)
  if (typeof window !== 'undefined') {
    const storedOwner = localStorage.getItem('app_owner');
    if (storedOwner) {
      currentOwner = storedOwner;
    }
  }
  return currentOwner;
}

/**
 * Get the current owner configuration
 * @returns The current owner configuration
 */
export function getOwnerConfig(): OwnerConfig {
  const owner = getOwner();
  console.log('🔍 getOwnerConfig - Current owner:', owner);
  if (!owner || !OWNER_CONFIGS[owner]) {
    // Fallback to demoa1 if no owner is set (for backward compatibility)
    console.log('🔍 getOwnerConfig - Using fallback demoa1');
    return OWNER_CONFIGS['demoa1'];
  }
  return OWNER_CONFIGS[owner];
}

/**
 * Get static path for current owner
 * @param path - The relative path
 * @returns The full static path
 */
export function getStaticPath(path: string = ''): string {
  const config = getOwnerConfig();
  return `${config.staticPath}${path}`;
}

/**
 * Get images path for current owner or specified owner
 * @param ownerOrPath - The owner name or relative path
 * @param path - The relative path (if first param is owner)
 * @returns The full images path
 */
export function getImagesPath(ownerOrPath: string = '', path: string = ''): string {
  // If first parameter is a known owner, use it
  if (OWNER_CONFIGS[ownerOrPath]) {
    const result = `${OWNER_CONFIGS[ownerOrPath].imagesPath}${path}`;
    console.log('🔍 getImagesPath - Owner:', ownerOrPath, 'Path:', path, 'Result:', result);
    return result;
  }
  
  // Otherwise treat first parameter as path
  const config = getOwnerConfig();
  return `${config.imagesPath}${ownerOrPath}`;
}

/**
 * Get CSS path for current owner
 * @param path - The relative path
 * @returns The full CSS path
 */
export function getCssPath(path: string = ''): string {
  const config = getOwnerConfig();
  return `${config.cssPath}${path}`;
}

/**
 * Get JS path for current owner
 * @param path - The relative path
 * @returns The full JS path
 */
export function getJsPath(path: string = ''): string {
  const config = getOwnerConfig();
  return `${config.jsPath}${path}`;
}

/**
 * Get owner-specific URL
 * @param path - The relative path
 * @returns The full URL with owner prefix
 */
export function getOwnerUrl(path: string = ''): string {
  const config = getOwnerConfig();
  const baseUrl = process.env.NEXT_PUBLIC_DOMAIN || 'localhost:3000';
  return `https://${baseUrl}/${config.name}${path}`;
}

/**
 * Determine layout type based on owner configuration (following Setup.php logic)
 * @param owner - The owner name
 * @param tempName - Template name (optional)
 * @param layoutType - Layout type (optional)
 * @returns The layout name to use
 */
export function getLayoutType(
  owner: string, 
  tempName?: string, 
  layoutType?: string
): 'default' | 'layout03' | 'layout04' | 'layoutpremium' {
  console.log('🔍 getLayoutType - Owner:', owner, 'TempName:', tempName, 'LayoutType:', layoutType);
  
  
  // Priority 2: Check owner-specific config first
  const ownerConfig = OWNER_LAYOUT_CONFIGS[owner];
  if (ownerConfig) {
    console.log('🔍 Using owner-specific config:', ownerConfig.layoutName);
    return ownerConfig.layoutName;
  }
  
  // Priority 3: Layout04 - if TEMP_NAME in layout_3 array OR RW_LAYOUT_TYPE == 3
  if (layoutType === '3' || LAYOUT_3_OWNERS.includes(owner) || LAYOUT_3_OWNERS.includes(tempName || '')) {
    console.log('🔍 Using Layout04 (layoutType=3 or in layout_3 array)');
    return 'layout04';
  }
  
  // Default fallback
  console.log('🔍 Using default layout');
  return 'default';
}

/**
 * Initialize owner from environment or URL
 * This should be called on app startup
 */
export function initializeOwner(): void {
  // Check if owner is set in environment
  const envOwner = process.env.NEXT_PUBLIC_OWNER;
  if (envOwner) {
    setOwner(envOwner);
    return;
  }

  // Check URL path for owner (client-side only)
  if (typeof window !== 'undefined') {
    const pathname = window.location.pathname;
    const ownerMatch = pathname.match(/^\/([^\/]+)/);
    if (ownerMatch && OWNER_CONFIGS[ownerMatch[1]]) {
      setOwner(ownerMatch[1]);
    }
  }
}

// Export the current owner as a global variable
export const OWNER = currentOwner;

// Export all owner configurations
export { OWNER_CONFIGS };
