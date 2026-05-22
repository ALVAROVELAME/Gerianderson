import { useState, useEffect } from 'react';
import { Lightbox } from '../components/Lightbox';
import { Navbar } from '../components/Navbar';
import { FloatingWhatsapp } from '../components/FloatingWhatsapp';
import { GlobalEffects } from '../components/GlobalEffects';

interface PortfolioPageProps {
  heroImage: string;
  socialImages: string[];
  menuImages: string[];
  printedImages: string[];
}

export function PortfolioPage({ heroImage, socialImages, menuImages, printedImages }: PortfolioPageProps) {
  const whatsappLink = "https://wa.me/557598825022";
  
  const [lightboxState, setLightboxState] = useState<{ images: string[]; index: number } | null>(null);
  const [currentMenuSlide, setCurrentMenuSlide] = useState(0);

  useEffect(() => {
    setCurrentMenuSlide(0);
    if (menuImages.length === 0) return;
    const timer = setInterval(() => {
      setCurrentMenuSlide((prev) => (prev >= menuImages.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [menuImages]);

  const openLightbox = (images: string[], index: number) => setLightboxState({ images, index });

  const nextLightbox = () => {
    if (!lightboxState) return;
    setLightboxState({
      ...lightboxState,
      index: lightboxState.index === lightboxState.images.length - 1 ? 0 : lightboxState.index + 1
    });
  };

  const prevLightbox = () => {
    if (!lightboxState) return;
    setLightboxState({
      ...lightboxState,
      index: lightboxState.index === 0 ? lightboxState.images.length - 1 : lightboxState.index - 1
    });
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-slate-900 selection:bg-orange-100 font-sans scroll-smooth">
      <GlobalEffects />
      
      {lightboxState && (
        <Lightbox 
          index={lightboxState.index} 
          images={lightboxState.images} 
          onClose={() => setLightboxState(null)} 
          onNext={nextLightbox} 
          onPrev={prevLightbox}
          // A função abaixo permite que os dots (pontos) alterem o estado do índice
          setIndex={(newIndex: number) => setLightboxState({ ...lightboxState, index: newIndex })}
        />
      )}
      
      <FloatingWhatsapp />
      <Navbar />

      <main>
        {/* Hero Section */}
        <header className="max-w-6xl mx-auto px-8 pt-48 pb-24 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block px-3 py-1 bg-orange-200 text-orange-900 text-[10px] font-bold rounded-full mb-6 uppercase tracking-[0.2em]">
              Disponível para novos projetos
            </span>
            <h1 className="text-7xl font-black leading-[0.9] mb-8 tracking-tighter text-slate-900">Design que <br /><span className="text-orange-600">comunica</span>.</h1>
            <p className="text-lg text-slate-500 leading-relaxed max-w-sm mb-10">Transformando ideias em artes de alto impacto.</p>
            <a href={whatsappLink} className="bg-slate-900 text-white px-10 py-4 rounded-full font-bold text-sm hover:bg-orange-600 transition-all shadow-xl inline-block animate-soft-float btn-shine-container">Iniciar Projeto</a>
          </div>
          
          <div 
            className="relative cursor-zoom-in" 
            onClick={() => openLightbox([heroImage], 0)}
            role="button"
            aria-label="Ampliar imagem de destaque"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && openLightbox([heroImage], 0)}
          >
            <div className="bg-slate-200 aspect-video rounded-[2rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-all duration-500">
              <img src={heroImage} alt="Design de destaque" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* Social Media */}
        <section className="py-24 border-t border-slate-100">
          <div className="max-w-6xl mx-auto px-8 grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 grid grid-cols-2 gap-6">
              {socialImages.map((img, i) => (
                <div 
                  key={i} 
                  className="aspect-[2/3] bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 p-2 cursor-zoom-in hover:shadow-2xl transition-all" 
                  onClick={() => openLightbox(socialImages, i)}
                  role="button"
                  aria-label={`Ampliar arte de social media ${i + 1}`}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && openLightbox(socialImages, i)}
                >
                  <img src={img} alt={`Post social media ${i + 1}`} className="w-full h-full object-cover rounded-2xl" />
                </div>
              ))}
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-black mb-6 tracking-tight">Social Media <br/><span className="text-orange-600 italic">Estratégico</span></h2>
              <p className="text-slate-500 mb-8 leading-relaxed">Artes verticais de alto impacto que dominam o feed e geram autoridade.</p>
            </div>
          </div>
        </section>

        {/* Cardápios */}
        <section className="py-24 bg-slate-900 text-white overflow-hidden">
          <div className="max-w-6xl mx-auto px-8 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-black mb-6 tracking-tight text-white">Cardápios <br/><span className="text-orange-500">Digitais ou impressos</span></h2>
              <p className="text-slate-400 mb-10 leading-relaxed">Menus interativos focados na experiência do cliente.</p>
            </div>
            
            <div className="relative group cursor-zoom-in">
              <div 
                className="aspect-[4/3] bg-white/5 rounded-3xl overflow-hidden border border-white/10 relative shadow-2xl"
                onClick={() => openLightbox(menuImages, currentMenuSlide)}
                role="button"
                aria-label="Ampliar cardápio"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && openLightbox(menuImages, currentMenuSlide)}
              >
                {menuImages.map((img, i) => (
                  <img key={i} src={img} alt={`Slide de menu ${i + 1}`} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === currentMenuSlide ? 'opacity-100' : 'opacity-0'}`} />
                ))}
              </div>
              <button onClick={(e) => { e.stopPropagation(); setCurrentMenuSlide(prev => prev === 0 ? menuImages.length - 1 : prev - 1); }} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/40 text-white rounded-full transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm hover:text-orange-500 z-10" aria-label="Anterior">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
              </button>
              <button onClick={(e) => { e.stopPropagation(); setCurrentMenuSlide(prev => prev === menuImages.length - 1 ? 0 : prev + 1); }} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/40 text-white rounded-full transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm hover:text-orange-500 z-10" aria-label="Próximo">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        </section>

        {/* Impressos */}
        <section className="py-24 border-t border-slate-100">
          <div className="max-w-6xl mx-auto px-8 grid lg:grid-cols-2 gap-20 items-center">
            <div className="grid grid-cols-2 gap-6 items-end">
              {printedImages.map((img, i) => (
                <div 
                  key={i} 
                  className={`bg-white rounded-2xl shadow-md overflow-hidden border border-slate-100 cursor-zoom-in ${i === 2 ? 'col-span-2 aspect-[21/9]' : 'aspect-[2/3.5]'}`}
                  onClick={() => openLightbox(printedImages, i)}
                  role="button"
                  aria-label={`Ampliar impresso ${i + 1}`}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && openLightbox(printedImages, i)}
                >
                  <img src={img} alt={`Material impresso ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div>
              <h2 className="text-4xl font-black mb-6 tracking-tight text-slate-900">Materiais <br/><span className="text-orange-600">Impressos</span></h2>
              <p className="text-slate-500 mb-8 leading-relaxed">Design de alta resolução pronto para produção física.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-24 bg-white text-center border-t border-slate-100">
        <h3 className="text-3xl font-black mb-8 text-slate-900 tracking-tighter">Vamos tirar sua ideia do papel?</h3>
        <a href={whatsappLink} className="inline-flex items-center gap-3 bg-[#25D366] text-white px-10 py-4 rounded-full font-bold text-sm shadow-xl animate-soft-float btn-shine-container">Chamar no WhatsApp</a>
        <p className="mt-20 text-[9px] text-slate-500 uppercase tracking-[0.3em] font-bold">
            © 2026 Gerianderson Dsgn — Salinas da Margarida, BA
        </p>
      </footer>
    </div>
  );
}