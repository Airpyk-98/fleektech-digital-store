import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#f0edec] border-t border-[#c6c5d5] py-12 px-4 md:px-12 md:pl-24 text-[#464653] pb-24 md:pb-12 transition-all">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="space-y-4 md:col-span-1">
          <img 
            src="https://lh3.googleusercontent.com/aida/AP1WRLt9dUXw7EhLF1fIQDLhUefxkgX9lrFfWFPY7dhJCWcdw1cjVwp0ROgHvpATBq8iPnNM45lC0YgDHddTVNYNOMtgmSMzJQXahDx6s0hDuRJibH0oQ_39FWpv4USdqaaRd8jyKXmc1XG2pMSjQh2YjWFgyIORCf6z_4YgtMjNms85jfDWAonG9YquOuLiOULrYWiU4mQA9NY3p_h4ZyZ4ZbIN3h9WFz206e7ksRwxJA3RcJ828781k5BM0f8" 
            alt="FLEEKTECH" 
            className="h-7 w-auto object-contain" 
          />
          <p className="text-sm leading-relaxed text-[#464653]">
            Tech-forward electronics designed for modern performance. Powered by AI processors, aerospace titanium, and studio audio fidelity.
          </p>
        </div>

        <div>
          <h4 className="font-headline font-bold text-[#00003c] text-sm mb-4 uppercase tracking-wider">Catalog</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-[#00003c] transition-colors">Phones & Accessories</Link></li>
            <li><Link href="/" className="hover:text-[#00003c] transition-colors">MacBooks & Laptops</Link></li>
            <li><Link href="/" className="hover:text-[#00003c] transition-colors">Studio Audio & ANC</Link></li>
            <li><Link href="/" className="hover:text-[#00003c] transition-colors">OLED Gaming Consoles</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-headline font-bold text-[#00003c] text-sm mb-4 uppercase tracking-wider">Customer Care</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-[#00003c] transition-colors">Order Status & Tracking</a></li>
            <li><a href="#" className="hover:text-[#00003c] transition-colors">Warranty & Titanium Care</a></li>
            <li><a href="#" className="hover:text-[#00003c] transition-colors">Returns & Exchanges</a></li>
            <li><a href="#" className="hover:text-[#00003c] transition-colors">Contact Support</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-headline font-bold text-[#00003c] text-sm mb-4 uppercase tracking-wider">About Us</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-[#00003c] transition-colors">Our Story & Brand</a></li>
            <li><a href="#" className="hover:text-[#00003c] transition-colors">Investor Relations</a></li>
            <li><a href="#" className="hover:text-[#00003c] transition-colors">Careers at FleekTech</a></li>
            <li><a href="#" className="hover:text-[#00003c] transition-colors">Corporate Responsibility</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-[#c6c5d5]/60 flex flex-col md:flex-row justify-between items-center text-xs text-[#767684] gap-4">
        <p>&copy; {new Date().getFullYear()} FLEEKTECH DIGITAL STORE. All rights reserved. Built with Stitch UI Guide.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Service</a>
          <a href="#" className="hover:underline">Security</a>
        </div>
      </div>
    </footer>
  );
}
