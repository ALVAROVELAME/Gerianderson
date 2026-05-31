interface NavbarProps {
  phone?: string;
}

export function Navbar({ phone = "557598825022" }: NavbarProps) {
  const whatsappLink = `https://wa.me/${phone}`;

  return (
    <nav className="fixed top-0 w-full bg-[#FDFCFB]/80 backdrop-blur-md z-50 border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-8 py-6 flex justify-between items-center">
        <div className="text-xl font-black tracking-tighter text-slate-900 uppercase">
          Quantyx.Artes
        </div>
        <div className="text-xs font-bold uppercase tracking-widest">
          <a 
            href={whatsappLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-slate-900 border-b-2 border-orange-500 hover:text-orange-500 transition-colors"
          >
            Orçamento
          </a>
        </div>
      </div>
    </nav>
  );
}