import React from 'react';
import Link from 'next/link';
import { ShieldAlert, Zap, Globe, Lock, Cpu, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800/80 text-zinc-400 text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-extrabold text-lg text-black">
                FT
              </div>
              <span className="font-extrabold text-xl tracking-tighter text-white">
                FLEEK<span className="text-cyan-400">TECH</span>
              </span>
            </Link>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Pioneering the future of personal electronics with titanium durability, neural AI processors, and studio-grade audio fidelity.
            </p>
            <div className="flex items-center gap-3 pt-2 text-zinc-400">
              <span className="flex items-center gap-1 text-xs bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-full text-cyan-400 font-semibold">
                <Globe size={13} /> Worldwide Shipping
              </span>
              <span className="flex items-center gap-1 text-xs bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-full text-green-400 font-semibold">
                <Lock size={13} /> SSL Secured
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Categories</h4>
            <ul className="space-y-2 text-xs text-zinc-500">
              <li><Link href="/?cat=Phones" className="hover:text-cyan-400 transition-colors">Titanium Smartphones</Link></li>
              <li><Link href="/?cat=Audio" className="hover:text-cyan-400 transition-colors">ANC Audio & Headphones</Link></li>
              <li><Link href="/?cat=Laptops" className="hover:text-cyan-400 transition-colors">CyberBook Workstations</Link></li>
              <li><Link href="/?cat=Wearables" className="hover:text-cyan-400 transition-colors">Rugged Smartwatches</Link></li>
              <li><Link href="/?cat=Accessories" className="hover:text-cyan-400 transition-colors">GaN Fast Chargers</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Support & Legal</h4>
            <ul className="space-y-2 text-xs text-zinc-500">
              <li className="hover:text-white cursor-pointer transition-colors">Order Status & Tracking</li>
              <li className="hover:text-white cursor-pointer transition-colors">2-Year Hardware Warranty</li>
              <li className="hover:text-white cursor-pointer transition-colors">Returns & Exchange Policy</li>
              <li className="hover:text-white cursor-pointer transition-colors">Privacy & Data Security</li>
              <li>
                <Link href="/admin" className="text-cyan-400 font-bold flex items-center gap-1 mt-1 hover:underline">
                  <ShieldAlert size={14} /> Admin Portal Access
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Join The Vanguard</h4>
            <p className="text-xs text-zinc-500">
              Subscribe to get exclusive access to product drops, secret flash sales, and firmware updates.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email..."
                className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500 flex-1"
              />
              <button className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs rounded-xl transition-all">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-600 gap-4">
          <p>© {new Date().getFullYear()} FleekTech Digital Store. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Powered by</span>
            <span className="text-zinc-400 font-bold">Neon PostgreSQL</span>
            <span>&</span>
            <span className="text-cyan-400 font-bold">Next.js App Router</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
