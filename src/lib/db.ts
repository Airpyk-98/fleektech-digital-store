import { Pool } from 'pg';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  badge?: string;
  rating: number;
  reviewsCount: number;
  stock: number;
  isListed: boolean;
  description: string;
  specs: Record<string, string>;
  features?: string[];
  createdAt?: string;
}

// Default Seed Products
const defaultProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'FleekTech Titan Pro Phone',
    tagline: 'Next-Gen AI & Titanium Build',
    price: 1199,
    originalPrice: 1399,
    category: 'Phones',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
    badge: 'NEW',
    rating: 4.9,
    reviewsCount: 328,
    stock: 45,
    isListed: true,
    description: 'Experience the pinnacle of mobile innovation with aerospace-grade titanium casing, our customized Neural Quantum Processor, and an ultra-precise triple-lens camera array.',
    specs: {
      Display: '6.8" Super Retina OLED, 120Hz',
      Processor: 'Neural Quantum 9 Octa-Core',
      RAM: '16GB LPDDR5X',
      Storage: '512GB NVMe',
      Battery: '5500mAh with 80W Fast Charge',
      Camera: '200MP Main + 50MP Ultra-Wide + 48MP Telephoto'
    },
    features: ['Aerospace Titanium Armor', 'Satellite Emergency Communication', 'Sub-0 Cooling Chamber', 'IP68 Water & Dust Resistance']
  },
  {
    id: 'prod-2',
    name: 'FleekTech Pulse ANC Headphones',
    tagline: 'Studio-Grade Acoustic Immersion',
    price: 299,
    originalPrice: 349,
    category: 'Audio',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    badge: 'BESTSELLER',
    rating: 4.8,
    reviewsCount: 512,
    stock: 120,
    isListed: true,
    description: 'Engineered for audiophiles, Pulse ANC combines custom 40mm beryllium drivers with hybrid active noise cancellation that eliminates 98% of ambient sound.',
    specs: {
      Driver: '40mm Beryllium Dynamic Drivers',
      Battery: '60 Hours (ANC On) / 80 Hours (ANC Off)',
      Connectivity: 'Bluetooth 5.4, USB-C Lossless Audio',
      Weight: '245 grams',
      Microphone: '6-Mic Beamforming Array with AI Noise Reduction'
    },
    features: ['Spatial Audio with Dynamic Head Tracking', 'Custom EQ via FleekTech App', 'Ultra-Plush Memory Foam Earcups', 'Foldable Compact Design']
  },
  {
    id: 'prod-3',
    name: 'FleekTech CyberBook 16 Pro',
    tagline: 'Unleash Unrivaled Creative Power',
    price: 1899,
    originalPrice: 2099,
    category: 'Laptops',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    badge: 'HOT',
    rating: 4.9,
    reviewsCount: 184,
    stock: 25,
    isListed: true,
    description: 'The ultimate portable workstation designed for 3D renderers, developers, and AI engineers. Features a stunning Mini-LED display and all-day battery life.',
    specs: {
      Display: '16.0" 3.2K Mini-LED 165Hz (1200 nits)',
      Processor: 'FleekTech M3 Max 16-Core CPU',
      GPU: '40-Core Neural Graphics Engine',
      RAM: '32GB Unified Memory',
      Storage: '1TB PCIe 4.0 SSD',
      Ports: '3x Thunderbolt 4, HDMI 2.1, SDXC, MagCharge'
    },
    features: ['Vapor Chamber Dual-Fan Cooling', 'Studio-Quality 6-Speaker System', '1080p IR Webcam with FaceID', 'Full Aluminum Unibody']
  },
  {
    id: 'prod-4',
    name: 'FleekTech Watch Ultra X',
    tagline: 'Rugged Endurance & Health Tracking',
    price: 399,
    originalPrice: 449,
    category: 'Wearables',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    badge: 'SALE',
    rating: 4.7,
    reviewsCount: 409,
    stock: 85,
    isListed: true,
    description: 'Built for extreme environments and daily fitness optimization. Monitors ECG, blood oxygen, body temperature, and sleep architecture with clinical accuracy.',
    specs: {
      Case: '49mm Grade-5 Titanium with Sapphire Crystal',
      Display: 'Always-On Retina AMOLED (3000 nits peak)',
      Battery: 'Up to 72 Hours Normal Use / 14 days Low Power',
      Sensors: 'ECG, SpO2, Skin Temp, Dual-Frequency GPS, Barometer',
      WaterResistance: '100m Water Resistant (Dive Certified to 40m)'
    },
    features: ['Dual-Frequency Precision GPS', 'AI Workout Form Coach', 'Emergency Siren & Crash Detection', 'Cellular LTE Integrated']
  },
  {
    id: 'prod-5',
    name: 'FleekTech MagPod Wireless Earbuds',
    tagline: 'Crystal Clear Audio & Instant Pairing',
    price: 149,
    originalPrice: 179,
    category: 'Audio',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    badge: '',
    rating: 4.6,
    reviewsCount: 265,
    stock: 200,
    isListed: true,
    description: 'Compact wireless earbuds featuring adaptive transparency mode, punchy bass response, and MagSafe compatible wireless charging case.',
    specs: {
      Driver: '11mm Custom Neodymium Drivers',
      Battery: '8 Hours (Earbuds) + 32 Hours with Case',
      Charging: 'MagSafe Wireless + USB-C Fast Charge (10m for 2h audio)',
      Protection: 'IPX4 Sweat & Weather Resistant'
    },
    features: ['Adaptive Transparency Mode', 'Touch Sensor Controls', 'Find My MagPod Integration', 'Ultra-Low Gaming Latency']
  },
  {
    id: 'prod-6',
    name: 'FleekTech PowerHub 100W GaN Charger',
    tagline: 'Ultra-Compact Quad-Port Powerhouse',
    price: 79,
    originalPrice: 99,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80',
    badge: '',
    rating: 4.8,
    reviewsCount: 620,
    stock: 350,
    isListed: true,
    description: 'Power your laptop, phone, tablet, and watch simultaneously with advanced Gallium Nitride (GaN) technology that stays cool under heavy load.',
    specs: {
      Output: '100W Max Total Output',
      Ports: '3x USB-C (Power Delivery 3.0) + 1x USB-A (QuickCharge 4.0)',
      Technology: 'GaN III Smart Power Distribution',
      Safety: 'Over-voltage, over-current, and thermal protection'
    },
    features: ['Pocket-Sized Foldable Prongs', 'Smart Device Recognition', 'Cool-Touch Thermal Shield', 'Worldwide Universal Voltage (100-240V)']
  },
  {
    id: 'prod-7',
    name: 'FleekTech ProTab 12.4 OLED',
    tagline: 'Your Portable Studio & Entertainment Hub',
    price: 799,
    originalPrice: 899,
    category: 'Phones',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80',
    badge: 'NEW',
    rating: 4.8,
    reviewsCount: 142,
    stock: 60,
    isListed: true,
    description: 'An expansive 12.4-inch OLED tablet designed for sketching, multitasking, and immersive media consumption. Includes the magnetic FleekPen stylus.',
    specs: {
      Display: '12.4" Dynamic AMOLED 2X, 120Hz',
      Processor: 'Neural Quantum 8X Tab Edition',
      Storage: '256GB Expandable via microSD',
      Audio: 'Quad Speakers tuned by AKG with Dolby Atmos',
      Stylus: 'FleekPen included (4096 pressure levels, 2ms latency)'
    },
    features: ['Desktop Mode Desktop Experience', 'Magnetic Stylus Dock', 'Ultra-Thin 5.5mm Profile', 'Multi-Window Split Screen']
  },
  {
    id: 'prod-8',
    name: 'FleekTech VR Horizon Headset',
    tagline: 'Step Into the Next Spatial Frontier',
    price: 499,
    originalPrice: 599,
    category: 'Wearables',
    image: 'https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?auto=format&fit=crop&w=800&q=80',
    badge: 'SALE',
    rating: 4.7,
    reviewsCount: 98,
    stock: 40,
    isListed: true,
    description: 'Standalone virtual and mixed reality headset with 4K per-eye resolution, full color passthrough, and ergonomic counter-balanced headband.',
    specs: {
      Resolution: '4K+ Infinite Display (2064x2208 per eye)',
      RefreshRate: '90Hz / 120Hz Experimental',
      Tracking: 'Inside-Out 6DoF Optical & Hand Tracking',
      Weight: '515 grams balanced distribution'
    },
    features: ['Full Color High-Res Passthrough', 'No External PC Required', '3D Spatial Audio Speakers', 'Widest 110° Field of View']
  }
];

// In-Memory Fallback Database
let inMemoryProducts: Product[] = [...defaultProducts];
let isDbInitialized = false;
let useInMemory = false;

let pool: Pool | null = null;

function getPool(): Pool | null {
  if (useInMemory) return null;
  if (!pool && process.env.DATABASE_URL) {
    try {
      pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
        connectionTimeoutMillis: 5000,
        query_timeout: 5000
      });
    } catch (err) {
      console.error("Failed to create PostgreSQL pool, falling back to in-memory:", err);
      useInMemory = true;
      return null;
    }
  }
  return pool;
}

export async function initDb(): Promise<void> {
  if (isDbInitialized || useInMemory) return;
  const p = getPool();
  if (!p) {
    useInMemory = true;
    isDbInitialized = true;
    return;
  }

  try {
    const client = await p.connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS products (
          id VARCHAR(255) PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          tagline VARCHAR(255),
          price NUMERIC(10, 2) NOT NULL,
          original_price NUMERIC(10, 2),
          category VARCHAR(100) NOT NULL,
          image TEXT,
          badge VARCHAR(50),
          rating NUMERIC(3, 1),
          reviews_count INTEGER,
          stock INTEGER,
          is_listed BOOLEAN DEFAULT true,
          description TEXT,
          specs TEXT,
          features TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

      const res = await client.query('SELECT COUNT(*) as count FROM products;');
      const count = parseInt(res.rows[0]?.count || '0', 10);

      if (count === 0) {
        console.log("Seeding default FleekTech products into Neon PostgreSQL...");
        for (const prod of defaultProducts) {
          await client.query(`
            INSERT INTO products (id, name, tagline, price, original_price, category, image, badge, rating, reviews_count, stock, is_listed, description, specs, features)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
            ON CONFLICT (id) DO NOTHING;
          `, [
            prod.id,
            prod.name,
            prod.tagline,
            prod.price,
            prod.originalPrice || null,
            prod.category,
            prod.image,
            prod.badge || '',
            prod.rating,
            prod.reviewsCount,
            prod.stock,
            prod.isListed,
            prod.description,
            JSON.stringify(prod.specs || {}),
            JSON.stringify(prod.features || [])
          ]);
        }
      }
      isDbInitialized = true;
    } finally {
      client.release();
    }
  } catch (err) {
    console.error("Neon PostgreSQL connection/query failed. Seamlessly switching to In-Memory Store:", err);
    useInMemory = true;
    isDbInitialized = true;
  }
}

function mapRowToProduct(row: any): Product {
  let specsObj = {};
  let featuresArr: string[] = [];
  try {
    specsObj = typeof row.specs === 'string' ? JSON.parse(row.specs) : row.specs || {};
  } catch (e) { specsObj = {}; }
  try {
    featuresArr = typeof row.features === 'string' ? JSON.parse(row.features) : row.features || [];
  } catch (e) { featuresArr = []; }

  return {
    id: row.id,
    name: row.name,
    tagline: row.tagline || '',
    price: parseFloat(row.price),
    originalPrice: row.original_price ? parseFloat(row.original_price) : undefined,
    category: row.category,
    image: row.image || '',
    badge: row.badge || '',
    rating: parseFloat(row.rating || '4.8'),
    reviewsCount: parseInt(row.reviews_count || '100', 10),
    stock: parseInt(row.stock || '50', 10),
    isListed: row.is_listed !== false && row.is_listed !== 'false',
    description: row.description || '',
    specs: specsObj,
    features: featuresArr,
    createdAt: row.created_at ? new Date(row.created_at).toISOString() : undefined
  };
}

export async function getAllProducts(includeDelisted = false): Promise<Product[]> {
  await initDb();
  if (useInMemory) {
    return inMemoryProducts.filter(p => includeDelisted || p.isListed);
  }

  try {
    const p = getPool();
    if (!p) throw new Error("No pool");
    const query = includeDelisted 
      ? 'SELECT * FROM products ORDER BY created_at DESC;'
      : 'SELECT * FROM products WHERE is_listed = true ORDER BY created_at DESC;';
    const res = await p.query(query);
    return res.rows.map(mapRowToProduct);
  } catch (err) {
    console.error("Error fetching products from DB, using in-memory:", err);
    return inMemoryProducts.filter(p => includeDelisted || p.isListed);
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  await initDb();
  if (useInMemory) {
    return inMemoryProducts.find(p => p.id === id) || null;
  }

  try {
    const p = getPool();
    if (!p) throw new Error("No pool");
    const res = await p.query('SELECT * FROM products WHERE id = $1;', [id]);
    if (res.rows.length === 0) return null;
    return mapRowToProduct(res.rows[0]);
  } catch (err) {
    console.error(`Error fetching product ${id} from DB, using in-memory:`, err);
    return inMemoryProducts.find(p => p.id === id) || null;
  }
}

export async function createProduct(data: Omit<Product, 'id'> & { id?: string }): Promise<Product> {
  await initDb();
  const id = data.id || `prod-${Date.now()}`;
  const newProd: Product = {
    ...data,
    id,
    rating: data.rating || 5.0,
    reviewsCount: data.reviewsCount || 1,
    stock: data.stock || 50,
    isListed: data.isListed !== false
  };

  if (useInMemory) {
    inMemoryProducts.unshift(newProd);
    return newProd;
  }

  try {
    const p = getPool();
    if (!p) throw new Error("No pool");
    await p.query(`
      INSERT INTO products (id, name, tagline, price, original_price, category, image, badge, rating, reviews_count, stock, is_listed, description, specs, features)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15);
    `, [
      newProd.id,
      newProd.name,
      newProd.tagline,
      newProd.price,
      newProd.originalPrice || null,
      newProd.category,
      newProd.image,
      newProd.badge || '',
      newProd.rating,
      newProd.reviewsCount,
      newProd.stock,
      newProd.isListed,
      newProd.description,
      JSON.stringify(newProd.specs || {}),
      JSON.stringify(newProd.features || [])
    ]);
    return newProd;
  } catch (err) {
    console.error("Error inserting product into DB, adding to in-memory:", err);
    inMemoryProducts.unshift(newProd);
    return newProd;
  }
}

export async function updateProduct(id: string, data: Partial<Product>): Promise<Product | null> {
  await initDb();
  const existing = await getProductById(id);
  if (!existing) return null;

  const updated: Product = { ...existing, ...data };

  if (useInMemory) {
    const idx = inMemoryProducts.findIndex(p => p.id === id);
    if (idx !== -1) inMemoryProducts[idx] = updated;
    return updated;
  }

  try {
    const p = getPool();
    if (!p) throw new Error("No pool");
    await p.query(`
      UPDATE products
      SET name = $1, tagline = $2, price = $3, original_price = $4, category = $5, image = $6, badge = $7, rating = $8, reviews_count = $9, stock = $10, is_listed = $11, description = $12, specs = $13, features = $14
      WHERE id = $15;
    `, [
      updated.name,
      updated.tagline,
      updated.price,
      updated.originalPrice || null,
      updated.category,
      updated.image,
      updated.badge || '',
      updated.rating,
      updated.reviewsCount,
      updated.stock,
      updated.isListed,
      updated.description,
      JSON.stringify(updated.specs || {}),
      JSON.stringify(updated.features || []),
      id
    ]);
    return updated;
  } catch (err) {
    console.error(`Error updating product ${id} in DB, updating in-memory:`, err);
    const idx = inMemoryProducts.findIndex(p => p.id === id);
    if (idx !== -1) inMemoryProducts[idx] = updated;
    return updated;
  }
}

export async function deleteProduct(id: string): Promise<boolean> {
  await initDb();
  if (useInMemory) {
    const idx = inMemoryProducts.findIndex(p => p.id === id);
    if (idx === -1) return false;
    inMemoryProducts.splice(idx, 1);
    return true;
  }

  try {
    const p = getPool();
    if (!p) throw new Error("No pool");
    const res = await p.query('DELETE FROM products WHERE id = $1;', [id]);
    return (res.rowCount || 0) > 0;
  } catch (err) {
    console.error(`Error deleting product ${id} from DB, deleting in-memory:`, err);
    const idx = inMemoryProducts.findIndex(p => p.id === id);
    if (idx === -1) return false;
    inMemoryProducts.splice(idx, 1);
    return true;
  }
}
