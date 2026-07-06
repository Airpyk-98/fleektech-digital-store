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
  brand?: string;
  createdAt?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  createdAt?: string;
}

let inMemoryUsers: User[] = [
  {
    id: 'usr-admin',
    name: 'Jacklyn Nwachukwu',
    email: 'admin@fleektech.com',
    password: 'NwachukwuJacklyn',
    role: 'admin',
    createdAt: new Date().toISOString()
  },
  {
    id: 'usr-user',
    name: 'Ebiringai I.',
    email: 'ebiringai@gmail.com',
    password: 'Airpyk98',
    role: 'user',
    createdAt: new Date().toISOString()
  }
];

// Default Seed Products exactly matching the Stitch UI Guide
const defaultProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Sony WH-1000XM5 Noise Canceling Headphones',
    tagline: 'Industry-leading noise cancellation with two processors and 8 microphones',
    price: 285000,
    originalPrice: 380000,
    category: 'Audio',
    brand: 'Sony',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCK4FR-O2OyJR59hJxYoH4XlELeZQU1nyU9UjWYGHNDQ66qYb-_ktZW6Db2kKlVIHgzWENHXLBBSxukLaGBYPnS5r54R-3W95PgVcI0MaqDwKB2iGuQya3ezJ28AxW_3iGZqRCZwAMov5oi_wF3tXL595OVYcaOFYlk_n4RpbUvDA5yb-KAcIIq46q2q5C5DyKs8m2iqmi-Z6dENSruRw0qyP7pknRSjCrAIXJL3r-pNk3VcQuHdG25',
    badge: '-25%',
    rating: 4.9,
    reviewsCount: 124,
    stock: 45,
    isListed: true,
    description: 'A professional studio product shot of Sony WH-1000XM5 wireless noise-canceling headphones in silver. The lighting is soft and high-key, emphasizing the smooth matte finish and elegant design.',
    specs: {
      Driver: '30mm Carbon Fiber',
      Battery: '30 Hours with ANC On',
      Connectivity: 'Bluetooth 5.2, USB-C',
      Weight: '250 grams'
    },
    features: ['Auto NC Optimizer', 'Precise Voice Pickup Technology', 'Multipoint Connection']
  },
  {
    id: 'prod-2',
    name: 'Samsung Galaxy S24 Ultra 5G - 512GB',
    tagline: 'Titanium exterior and a 6.8-inch flat display with Galaxy AI',
    price: 1450000,
    originalPrice: 1610000,
    category: 'Phones',
    brand: 'Samsung',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTWTTZC09PNsz0NRbyu-ZmNn7pRcCTsWo89H-QJohxuF8MNP2AgcvPW5PGb4MX6QcFLg3az7LuxGJwfzXGF8d-8wPpZtr-XP0YBMmi_rCewo3n_cjFHuJz0o2NoQNDh3ZuQLlADcAVMhVSPQaf1BIjeIj8oZsJc0alDddfphJxs1-hRX8Gc8wK3kBeBaepLOCinGJz59Tp5w1AzJ-nPYbuhU7HopJGWv9eVd7JssQADbOOMTadZKt2',
    badge: '-10%',
    rating: 4.8,
    reviewsCount: 89,
    stock: 60,
    isListed: true,
    description: 'A crisp, high-detail product photo of a Samsung Galaxy S24 Ultra in Titanium Violet. Positioned to show the sleek frame and camera array.',
    specs: {
      Display: '6.8" Dynamic AMOLED 2X, 120Hz',
      Processor: 'Snapdragon 8 Gen 3',
      Storage: '512GB NVMe',
      Camera: '200MP Main + 50MP Periscope'
    },
    features: ['Built-in S Pen', 'Galaxy AI Translate', 'Titanium Armor Frame', 'IP68 Water Resistance']
  },
  {
    id: 'prod-3',
    name: 'Dell XPS 15 9530 Intel Core i9 - 32GB RAM',
    tagline: 'Breathtaking visual experience with OLED display and RTX 4070',
    price: 2100000,
    originalPrice: 2470000,
    category: 'Laptops',
    brand: 'Dell',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLWCF3er5FLNwHpw4bZMLsbXaMgE2ylPRQ4SvHjDdnbcOcxZyYurTT7Gf9sSQ8poGz-lekoMJLZ7Ii8ZAouoUM_sFYiLpzrsLy95_wiAEz2D7jmCvgVTc55pPlqdtD-bRLa6UmnHfdxfNILJO6lJB5iJWgm_GQG4G0ljGvavNiAqQ8p6ib7Xg2MzPzDVSPvfzER7vmU9C-ZUc2sRmBlyysLDLgqniHlL9wjnYoPCimOMKQgsUOH2Dy',
    badge: '-15%',
    rating: 4.9,
    reviewsCount: 56,
    stock: 20,
    isListed: true,
    description: 'A premium product photograph of a Dell XPS 15 laptop in Platinum Silver. Features a vibrant high-resolution display on its near-borderless screen.',
    specs: {
      Display: '15.6" 3.5K OLED Touch 400 nits',
      Processor: '13th Gen Intel Core i9-13900H',
      RAM: '32GB DDR5 4800MHz',
      Storage: '1TB PCIe 4.0 SSD'
    },
    features: ['CNC Machined Aluminum', 'Carbon Fiber Palm Rest', 'Quad Speaker Design']
  },
  {
    id: 'prod-4',
    name: 'Nintendo Switch OLED Model with White Joy-Con',
    tagline: 'Vibrant 7-inch OLED screen with wide adjustable stand',
    price: 420000,
    originalPrice: 525000,
    category: 'Gaming',
    brand: 'Nintendo',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjLCqYOuTP9adyW0eOPYRL_uDpDM-WrIQ9tGNsrqt5b1nnc3t3NrEBVdEY_LtqgzAN-Xa3lpFLAzBx4VQLDjglyMF2VGrAy_LDe_Zole6kxUsX8tYWcJ9-aOJwM6upHewTk41u45yBnFZ1c3jmQPcXvUUkicymU1FnX52m9Cp1AVZH4hOUcpfPAbuSzBm7TIDNw4JnZ3IGERkEgTtPl2DAqEjKTXmU_Jpp1nJTBuBULVhAq7kQvw9E',
    badge: '-20%',
    rating: 4.8,
    reviewsCount: 310,
    stock: 150,
    isListed: true,
    description: 'An action-oriented product shot of a Nintendo Switch OLED Model with White Joy-Cons. Console shown in handheld mode with a bright game scene.',
    specs: {
      Display: '7.0" OLED Multi-Touch Screen',
      Storage: '64GB Internal Storage',
      Audio: 'Enhanced Onboard Audio',
      Connectivity: 'Wired LAN Port in Dock'
    },
    features: ['Wide Adjustable Stand', '3 Play Modes (TV, Tabletop, Handheld)', 'HD Rumble']
  },
  {
    id: 'prod-5',
    name: 'iPhone 15 Pro Max 256GB - Blue Titanium',
    tagline: 'Forged in titanium with the groundbreaking A17 Pro chip',
    price: 1850000,
    originalPrice: 2000000,
    category: 'Phones',
    brand: 'Apple',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfo0RsMY4Qyl7Z_XfajpCADEUMuBoZ0s92AkP-4HBud6HwQZIccQTakDQ7UDgtxukJ2VFy_fr16SZOyhJwRWrVV-IK5synazBG4_u6m0tuukc8lwil1kanjSQaFXdirfEku7VGKUT4znxrdmdrlCpHhNKh-bx2IhzZ1KlDEFqnRHc4hQ58SxsraX2c5aHkE73G7NF3EkZCukpCtUM1LKSv-eACdrTGYJ_yrzzcuN5yuFKbAv2GMPUJ',
    badge: 'Best Seller',
    rating: 4.9,
    reviewsCount: 48,
    stock: 80,
    isListed: true,
    description: 'A sleek, high-end iPhone 15 Pro Max in Titanium Blue showcased against a clean white background with soft cinematic lighting.',
    specs: {
      Display: '6.7" Super Retina XDR OLED, 120Hz ProMotion',
      Processor: 'Apple A17 Pro (3nm)',
      Storage: '256GB NVMe',
      Camera: '48MP Main + 12MP Ultra Wide + 12MP 5x Telephoto'
    },
    features: ['Aerospace Titanium Design', 'Customizable Action Button', 'USB-C 3.0 Speeds', 'Emergency SOS via Satellite']
  },
  {
    id: 'prod-6',
    name: 'Galaxy S24 Ultra 512GB - Titanium Black',
    tagline: 'The ultimate Galaxy AI experience with Quad Tele System',
    price: 1620000,
    originalPrice: 1750000,
    category: 'Phones',
    brand: 'Samsung',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChHUGHFYffIxGL8DDwshyLgP4jHTrM4jPW-JBmFuA7PpObE6DOfErQOJRmLW2gY-75BFo3RcbK54BzAHVSpLUFqRbHgi7PPS5Sq1PHUJ-0-o_8qVJxGr1pYqQxtwPsd93ZB4pj9bD96TvQDajU_3YdGlc4X40oL6ADMRMwu4EMcwsYV6qPJziiek_GMGFG1u55-Zt-EUnpe2ZEUjJyKujjMkcp3Ccvt6AvFH3nufv4b7hu0xrVu-Bs',
    badge: '',
    rating: 4.8,
    reviewsCount: 32,
    stock: 40,
    isListed: true,
    description: 'A Samsung Galaxy S24 Ultra in Phantom Black positioned elegantly on a white reflective surface under bright studio lights.',
    specs: {
      Display: '6.8" Flat Dynamic AMOLED 2X',
      Processor: 'Snapdragon 8 Gen 3 for Galaxy',
      Battery: '5000mAh with 45W Fast Charging'
    },
    features: ['ProVisual Engine', 'S Pen Included', 'Corning Gorilla Armor']
  },
  {
    id: 'prod-7',
    name: 'Pixel 8 Pro 12GB RAM 128GB - Porcelain',
    tagline: 'Google AI built-in with Pro camera controls and thermometer',
    price: 1150000,
    originalPrice: 1300000,
    category: 'Phones',
    brand: 'Google',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD56rIBWNcTHklO6wKVEutrdKva0jPui4W6Zt0ZMzZuNDRfrbNUxSBbW5IeVV0Jo6v-IkSFuh3MxIKn5zc8ANCuF9FJucZmzi9j8jKaiv3d_IXEBWaFx-ErubouCxF_FIOKCBI9nW9gkzLiXBaoIaydsOiRmbZ56lpMZBZqnePIc0GAKvKBg8MWD0ERr0zcB9Bp5eCC1Vu1QouXXRMjfFRrtRwIC0MpfiBzveIBfdC1vby9CiZ_BTB5',
    badge: 'Best Seller',
    rating: 4.7,
    reviewsCount: 15,
    stock: 55,
    isListed: true,
    description: 'A Google Pixel 8 Pro in Porcelain color shown at a 45-degree angle in a minimalist setting with soft matte glass back.',
    specs: {
      Display: '6.7" Super Actua OLED (1344x2992), 1-120Hz',
      Processor: 'Google Tensor G3 + Titan M2',
      RAM: '12GB LPDDR5X'
    },
    features: ['Magic Editor & Audio Magic Eraser', 'Temperature Sensor', '7 Years of OS & Security Updates']
  },
  {
    id: 'prod-8',
    name: 'Xiaomi 14 Ultra 5G 16GB/512GB - White',
    tagline: 'Leica Summilux optical lens with variable aperture',
    price: 1380000,
    originalPrice: 1500000,
    category: 'Phones',
    brand: 'Xiaomi',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAH31Wj3WvzRI_afEoqUMGonEbIaveFgdBDivN89zSz68DuEoppQ_lhoQRuK2KAKrtavIFZIjgCiuqvOsTqGxcCI42y3kwmreAgd6xNy4IanjEReG9rozmuSSgSftw5sjDD1aQ7O_wYmIbv1nDhhzcIavR4ZKkravyClmKwjG-PGtmHohd06QliQzCcag8WDMEgtJmvrwex4g-94JqbGPGwdGGCFL5a5LLjOz-Xk4sQYEj8dsjy5A0K',
    badge: '',
    rating: 4.8,
    reviewsCount: 24,
    stock: 30,
    isListed: true,
    description: 'A Xiaomi 14 Ultra displayed against a clean layout. The circular Leica camera module is the focal point.',
    specs: {
      Camera: 'Leica 50MP Quad Camera Array',
      Display: '6.73" WQHD+ AMOLED 120Hz (3000 nits)',
      Charging: '90W HyperCharge + 80W Wireless'
    },
    features: ['Leica Summilux Optical Lens', 'Snapdragon 8 Gen 3 Mobile Platform', 'Xiaomi Shield Glass']
  }
];

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
        connectionTimeoutMillis: 2500,
        query_timeout: 2500
      });
    } catch (err) {
      console.error("Failed to create PostgreSQL pool, falling back to in-memory:", err);
      useInMemory = true;
      return null;
    }
  }
  return pool;
}

let initPromise: Promise<void> | null = null;

export async function initDb(): Promise<void> {
  if (isDbInitialized || useInMemory) return;
  if (initPromise) return initPromise;

  initPromise = (async () => {
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
          price NUMERIC(15, 2) NOT NULL,
          original_price NUMERIC(15, 2),
          category VARCHAR(100) NOT NULL,
          brand VARCHAR(100),
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

      await client.query(`
        CREATE TABLE IF NOT EXISTS users (
          id VARCHAR(50) PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          email VARCHAR(150) UNIQUE NOT NULL,
          password VARCHAR(200) NOT NULL,
          role VARCHAR(20) DEFAULT 'user',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

        console.log("Seeding default admin & user into Neon PostgreSQL...");
        await client.query(`
          INSERT INTO users (id, name, email, password, role)
          VALUES ('usr-admin', 'Jacklyn Nwachukwu', 'admin@fleektech.com', 'NwachukwuJacklyn', 'admin')
          ON CONFLICT (email) DO UPDATE SET password = EXCLUDED.password, role = EXCLUDED.role, name = EXCLUDED.name;
        `);
        await client.query(`
          INSERT INTO users (id, name, email, password, role)
          VALUES ('usr-user', 'Ebiringai I.', 'ebiringai@gmail.com', 'Airpyk98', 'user')
          ON CONFLICT (email) DO UPDATE SET password = EXCLUDED.password, role = EXCLUDED.role, name = EXCLUDED.name;
        `);

      const res = await client.query('SELECT COUNT(*) as count FROM products;');
      const count = parseInt(res.rows[0]?.count || '0', 10);

      if (count === 0) {
        console.log("Seeding Stitch FleekTech products into Neon PostgreSQL...");
        for (const prod of defaultProducts) {
          await client.query(`
            INSERT INTO products (id, name, tagline, price, original_price, category, brand, image, badge, rating, reviews_count, stock, is_listed, description, specs, features)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
            ON CONFLICT (id) DO UPDATE SET 
              name = EXCLUDED.name,
              price = EXCLUDED.price,
              image = EXCLUDED.image,
              brand = EXCLUDED.brand;
          `, [
            prod.id,
            prod.name,
            prod.tagline,
            prod.price,
            prod.originalPrice || null,
            prod.category,
            prod.brand || 'FleekTech',
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
  })();
  return initPromise;
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
    brand: row.brand || 'FleekTech',
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
      INSERT INTO products (id, name, tagline, price, original_price, category, brand, image, badge, rating, reviews_count, stock, is_listed, description, specs, features)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16);
    `, [
      newProd.id,
      newProd.name,
      newProd.tagline,
      newProd.price,
      newProd.originalPrice || null,
      newProd.category,
      newProd.brand || 'FleekTech',
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
      SET name = $1, tagline = $2, price = $3, original_price = $4, category = $5, brand = $6, image = $7, badge = $8, rating = $9, reviews_count = $10, stock = $11, is_listed = $12, description = $13, specs = $14, features = $15
      WHERE id = $16;
    `, [
      updated.name,
      updated.tagline,
      updated.price,
      updated.originalPrice || null,
      updated.category,
      updated.brand || 'FleekTech',
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

export async function getUserByEmail(email: string): Promise<User | null> {
  const cleanEmail = email.trim();
  await initDb();
  if (useInMemory) {
    return inMemoryUsers.find(u => u.email.toLowerCase() === cleanEmail.toLowerCase()) || null;
  }
  try {
    const p = getPool();
    if (!p) throw new Error("No pool");
    const res = await p.query("SELECT * FROM users WHERE LOWER(email) = LOWER($1);", [cleanEmail]);
    if (res.rows.length === 0) return null;
    const row = res.rows[0];
    return {
      id: row.id,
      name: row.name,
      email: row.email,
      password: row.password,
      role: row.role as 'user' | 'admin',
      createdAt: row.created_at ? new Date(row.created_at).toISOString() : undefined
    };
  } catch (err) {
    console.error("Error fetching user by email, checking in-memory:", err);
    return inMemoryUsers.find(u => u.email.toLowerCase() === cleanEmail.toLowerCase()) || null;
  }
}

export async function createUser(data: { name: string; email: string; password: string; role?: 'user' | 'admin' }): Promise<User> {
  await initDb();
  const id = `usr-${Date.now()}`;
  const newUser: User = {
    id,
    name: data.name,
    email: data.email,
    password: data.password,
    role: data.role || 'user',
    createdAt: new Date().toISOString()
  };

  if (useInMemory) {
    inMemoryUsers.push(newUser);
    return newUser;
  }

  try {
    const p = getPool();
    if (!p) throw new Error("No pool");
    await p.query(`
      INSERT INTO users (id, name, email, password, role)
      VALUES ($1, $2, $3, $4, $5);
    `, [newUser.id, newUser.name, newUser.email, newUser.password, newUser.role]);
    return newUser;
  } catch (err) {
    console.error("Error creating user in DB, adding to in-memory:", err);
    inMemoryUsers.push(newUser);
    return newUser;
  }
}

export async function updateUserPassword(id: string, newPass: string): Promise<boolean> {
  await initDb();
  if (useInMemory) {
    const idx = inMemoryUsers.findIndex(u => u.id === id);
    if (idx !== -1) {
      inMemoryUsers[idx].password = newPass;
      return true;
    }
    return false;
  }

  try {
    const p = getPool();
    if (!p) throw new Error("No pool");
    const res = await p.query("UPDATE users SET password = $1 WHERE id = $2;", [newPass, id]);
    return (res.rowCount || 0) > 0;
  } catch (err) {
    console.error("Error updating password in DB, updating in-memory:", err);
    const idx = inMemoryUsers.findIndex(u => u.id === id);
    if (idx !== -1) {
      inMemoryUsers[idx].password = newPass;
      return true;
    }
    return false;
  }
}

