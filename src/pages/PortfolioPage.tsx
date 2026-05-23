import { useState, useEffect, useRef } from 'react';
import { Lightbox } from '../components/Lightbox';
import { Navbar } from '../components/Navbar';
import { FloatingWhatsapp } from '../components/FloatingWhatsapp';
import { GlobalEffects } from '../components/GlobalEffects';
import { fetchPortfolioData, type PortfolioData, type ResponsiveImage } from '../data/portfolioData';

function ResponsiveImageComponent({ data, images, index, openLightbox }: { data: ResponsiveImage, images: ResponsiveImage[], index: number, openLightbox: (imgs: string[], idx: number) => void }) {
  const [isLandscape, setIsLandscape] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setIsLandscape(imgRef.current.naturalWidth > imgRef.current.naturalHeight);
      setIsLoaded(true);
    }
  }, []);

  return (
    <div 
      className={`bg-white rounded-2xl shadow-md overflow-hidden border border-slate-100 cursor-zoom-in transition-all duration-500
        ${!isLoaded ? 'opacity-0' : 'opacity-100'}
        ${isLandscape ? 'col-span-2 aspect-[21/9]' : 'aspect-[2/3.5]'}`}
      onClick={() => openLightbox(images.map(img => img.src), index)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && openLightbox(images.map(img => img.src), index)}
    >
      <img 
        ref={imgRef}
        src={data.src}
        srcSet={data.srcset}
        sizes={data.sizes}
        alt={data.alt}
        width={data.width}
        height={data.height}
        onLoad={() => {
          if (imgRef.current) {
            setIsLandscape(imgRef.current.naturalWidth > imgRef.current.naturalHeight);
            setIsLoaded(true);
          }
        }}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
}

export default function PortfolioPage() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [lightboxState, setLightboxState] = useState<{ images: string[]; index: number } | null>(null);
  const [currentMenuSlide, setCurrentMenuSlide] = useState(0);

  useEffect(() => {
    async function load() {
      const result = await fetchPortfolioData();
      setData(result);
    }
    load();
  }, []);

  useEffect(() => {
    if (!data || data.menuImages.length === 0) return;
    const timer = setInterval(() => {
      setCurrentMenuSlide((prev) => (prev >= data.menuImages.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [data]);

  const openLightbox = (images: string[], index: number) => setLightboxState({ images, index });
  const whatsappLink = "https://wa.me/557598825022";

  if (!data) return null;

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-slate-900 selection:bg-orange-100 font-sans scroll-smooth overflow-x-hidden w-full">
      <GlobalEffects />
      
      {lightboxState && (
        <Lightbox 
          index={lightboxState.index} 
          images={lightboxState.images} 
          onClose={() => setLightboxState(null)} 
          onNext={() => setLightboxState(prev => prev ? {...prev, index: (prev.index + 1) % prev.images.length} : null)} 
          onPrev={() => setLightboxState(prev => prev ? {...prev, index: (prev.index - 1 + prev.images.length) % prev.images.length} : null)}
          setIndex={(newIndex: number) => setLightboxState(prev => prev ? { ...prev, index: newIndex } : null)}
        />
      )}
      
      <FloatingWhatsapp />
      <Navbar />

      <main>
        <header className="max-w-6xl mx-auto px-4 md:px-8 pt-48 pb-24 grid lg:grid-cols-2 gap-16 items-center w-full">
          <div>
            <span className="inline-block px-3 py-1 bg-orange-200 text-orange-900 text-[10px] font-bold rounded-full mb-6 uppercase tracking-[0.2em]">Disponível para novos projetos</span>
            <h1 className="text-7xl font-black leading-[0.9] mb-8 tracking-tighter text-slate-900">Design que <br /><span className="text-orange-600">comunica</span>.</h1>
            <p className="text-lg text-slate-500 leading-relaxed max-w-sm mb-10">Transformando ideias em artes de alto impacto.</p>
            <a href={whatsappLink} className="bg-slate-900 text-white px-10 py-4 rounded-full font-bold text-sm hover:bg-orange-600 transition-all shadow-xl inline-block animate-soft-float btn-shine-container">Iniciar Projeto</a>
          </div>
          <div className="relative cursor-zoom-in" onClick={() => openLightbox([data.heroImage.src], 0)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && openLightbox([data.heroImage.src], 0)}>
            <div className="bg-slate-200 aspect-video rounded-[2rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-all duration-500">
              <img src={data.heroImage.src} alt={data.heroImage.alt} width={1200} height={675} className="w-full h-full object-cover" fetchPriority="high" />
            </div>
          </div>
        </header>

        <section className="py-24 border-t border-slate-100 w-full">
          <div className="max-w-6xl mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-16 items-center w-full">
            <div className="order-2 lg:order-1 grid grid-cols-2 gap-6">
              {data.socialImages.map((img: ResponsiveImage, i: number) => (
                <div key={i} className="aspect-[2/3] bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 p-2 cursor-zoom-in hover:shadow-2xl transition-all" onClick={() => openLightbox(data.socialImages.map(s => s.src), i)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && openLightbox(data.socialImages.map(s => s.src), i)}>
                  <img src={img.src} srcSet={img.srcset} sizes={img.sizes} alt={img.alt} width={img.width} height={img.height} className="w-full h-full object-cover rounded-2xl" loading="lazy" />
                </div>
              ))}
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-black mb-6 tracking-tight">Social Media <br/><span className="text-orange-600 italic">Estratégico</span></h2>
              <p className="text-slate-500 mb-8 leading-relaxed">Artes verticais de alto impacto que dominam o feed e geram autoridade.</p>
            </div>
          </div>
        </section>

        <section className="py-24 bg-slate-900 text-white overflow-hidden w-full">
          <div className="max-w-6xl mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-16 items-center w-full">
            <div>
              <h2 className="text-4xl font-black mb-6 tracking-tight text-white">Cardápios <br/><span className="text-orange-500">Digitais ou impressos</span></h2>
              <p className="text-slate-400 mb-10 leading-relaxed">Menus interativos focados na experiência do cliente.</p>
            </div>
            <div className="relative group cursor-zoom-in" onClick={() => openLightbox(data.menuImages.map(m => m.src), currentMenuSlide)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && openLightbox(data.menuImages.map(m => m.src), currentMenuSlide)}>
              <div className="aspect-[4/3] bg-white/5 rounded-3xl overflow-hidden border border-white/10 relative shadow-2xl">
                {data.menuImages.map((img: ResponsiveImage, i: number) => (
                  <img key={i} src={img.src} srcSet={img.srcset} sizes={img.sizes} alt={img.alt} width={img.width} height={img.height} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === currentMenuSlide ? 'opacity-100' : 'opacity-0'}`} loading="lazy" />
                ))}
                <button aria-label="Anterior" className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-all opacity-0 group-hover:opacity-100" onClick={(e) => { e.stopPropagation(); setCurrentMenuSlide(prev => (prev === 0 ? data.menuImages.length - 1 : prev - 1)); }}><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg></button>
                <button aria-label="Próximo" className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-all opacity-0 group-hover:opacity-100" onClick={(e) => { e.stopPropagation(); setCurrentMenuSlide(prev => (prev >= data.menuImages.length - 1 ? 0 : prev + 1)); }}><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 border-t border-slate-100 w-full">
          <div className="max-w-6xl mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-20 items-center w-full">
            <div className="grid grid-cols-2 gap-6 items-end">
              {data.printedImages.map((img: ResponsiveImage, i: number) => <ResponsiveImageComponent key={i} data={img} images={data.printedImages} index={i} openLightbox={openLightbox} />)}
            </div>
            <div>
              <h2 className="text-4xl font-black mb-6 tracking-tight text-slate-900">Materiais <br/><span className="text-orange-600">Impressos</span></h2>
              <p className="text-slate-500 mb-8 leading-relaxed">Design de alta resolução pronto para produção física.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-24 bg-white text-center border-t border-slate-100 px-4 md:px-8 w-full">
        <h3 className="text-3xl font-black mb-8 text-slate-900 tracking-tighter">Vamos tirar sua ideia do papel?</h3>
        <a href={whatsappLink} className="inline-flex items-center gap-3 bg-[#25D366] text-white px-10 py-4 rounded-full font-bold text-sm shadow-xl animate-soft-float btn-shine-container">Chamar no WhatsApp</a>
        <p className="mt-20 text-[9px] text-slate-500 uppercase tracking-[0.3em] font-bold">© 2026 Gerianderson Dsgn — Salinas da Margarida, BA</p>
      </footer>
    </div>
  );
}