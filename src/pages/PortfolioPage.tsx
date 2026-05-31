import { useState, useEffect } from 'react';
import { Lightbox } from '../components/Lightbox';
import { Navbar } from '../components/Navbar';
import { FloatingWhatsapp } from '../components/FloatingWhatsapp';
import { GlobalEffects } from '../components/GlobalEffects';
import { ResponsiveImageComponent } from '../components/ResponsiveImageComponent';
import { MenuSection } from '../components/MenuSection';
import { fetchPortfolioData, type PortfolioData, type ResponsiveImage } from '../data/portfolioData';

export default function PortfolioPage() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [lightboxState, setLightboxState] = useState<{ images: string[]; index: number } | null>(null);

  useEffect(() => {
    async function load() {
      const result = await fetchPortfolioData();
      setData(result);
    }
    load();
  }, []);

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
        {/* HEADER HERO */}
        <header className="max-w-6xl mx-auto px-4 md:px-8 pt-48 pb-24 grid lg:grid-cols-2 gap-16 items-center w-full">
          <div>
            <span className="inline-block px-3 py-1 bg-orange-200 text-orange-900 text-[10px] font-bold rounded-full mb-6 uppercase tracking-[0.2em]">Disponível para novos projetos</span>
            <h1 className="text-6xl md:text-7xl font-black leading-[0.9] mb-8 tracking-tighter text-slate-900">
              Design que <br /><span className="text-orange-600">vende</span> e <br />conecta.
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed max-w-md mb-10">
              Não seja apenas mais um no feed. Transforme a identidade do seu negócio com artes profissionais e estratégicas feitas para capturar a atenção e reverter em faturamento.
            </p>
            <a href={whatsappLink} className="bg-slate-900 text-white px-10 py-4 rounded-full font-bold text-sm hover:bg-orange-600 transition-all shadow-xl inline-block animate-soft-float btn-shine-container">Iniciar Projeto</a>
          </div>
          
          <div className="relative">
            <div 
              className="bg-slate-200 aspect-video rounded-[2rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-all duration-500 cursor-zoom-in"
              onClick={() => openLightbox([data.heroImage.src], 0)} 
              role="button" 
              tabIndex={0} 
              onKeyDown={(e) => e.key === 'Enter' && openLightbox([data.heroImage.src], 0)}
            >
              <img src={data.heroImage.src} srcSet={data.heroImage.srcset} sizes={data.heroImage.sizes} alt={data.heroImage.alt} width={1200} height={675} className="w-full h-full object-cover" fetchPriority="high" />
            </div>
          </div>
        </header>

        {/* SEÇÃO SOCIAL MEDIA */}
        <section className="py-24 border-t border-slate-100 w-full">
          <div className="max-w-6xl mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-16 items-center w-full">
            <div className="order-2 lg:order-1 grid grid-cols-2 gap-6">
              {data.socialImages.map((img: ResponsiveImage, i: number) => (
                <ResponsiveImageComponent 
                  key={i} 
                  data={img} 
                  images={data.socialImages} 
                  index={i} 
                  openLightbox={openLightbox} 
                  className="w-full h-full object-cover rounded-2xl"
                />
              ))}
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-orange-600 font-bold text-xs uppercase tracking-wider mb-2 block">Social Media</span>
              <h2 className="text-4xl font-black mb-6 tracking-tight text-slate-900">
                Artes Estratégicas para <br/><span className="text-orange-600 italic">Destacar sua Marca</span>
              </h2>
              <p className="text-slate-500 mb-6 leading-relaxed">
                Postagens amadoras afastam clientes qualificados. Eu crio criativos e designs com alto apelo visual e hierarquia de informação clara, posicionando sua marca como autoridade máxima no seu nicho.
              </p>
              <p className="text-slate-500 mb-8 leading-relaxed font-medium">
                ✓ Padrão estético premium <br />
                ✓ Foco total em conversão e engajamento <br />
                ✓ Identidade visual consistente e marcante
              </p>
            </div>
          </div>
        </section>

        {/* SEÇÃO CARDÁPIOS (Componentizado) */}
        {/* Nota: Atualize também o título estático dentro do componente MenuSection se achar necessário */}
        <MenuSection menuImages={data.menuImages} openLightbox={openLightbox} />

        {/* SEÇÃO IMPRESSOS */}
        <section className="py-24 border-t border-slate-100 w-full">
          <div className="max-w-6xl mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-20 items-center w-full">
            <div className="grid grid-cols-2 gap-6 items-end">
              {data.printedImages.map((img: ResponsiveImage, i: number) => (
                <ResponsiveImageComponent 
                  key={i} 
                  data={img} 
                  images={data.printedImages} 
                  index={i} 
                  openLightbox={openLightbox} 
                  className="w-full h-full object-cover rounded-2xl"
                />
              ))}
            </div>
            <div>
              <span className="text-orange-600 font-bold text-xs uppercase tracking-wider mb-2 block">Materiais Impressos</span>
              <h2 className="text-4xl font-black mb-6 tracking-tight text-slate-900">
                A Força do <br/><span className="text-orange-600">Design Físico</span>
              </h2>
              <p className="text-slate-500 mb-6 leading-relaxed">
                Panfletos, cartões de visita, banners e embalagens que causam impacto imediato no mundo real. Desenvolvo artes com fidelidade milimétrica de cores e fechamento de arquivo perfeito, prontas para a gráfica.
              </p>
              <p className="text-slate-500 mb-8 leading-relaxed font-medium">
                ✓ Arquivos enviados em alta resolução (CMYK) <br />
                ✓ Layouts otimizados para leitura rápida <br />
                ✓ Acabamento profissional que transmite confiança
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-24 bg-white text-center border-t border-slate-100 px-4 md:px-8 w-full">
        <h3 className="text-4xl font-black mb-4 text-slate-900 tracking-tighter">Pronto para dominar o seu mercado?</h3>
        <p className="text-slate-500 max-w-md mx-auto mb-8 leading-relaxed">
          As vagas para novos projetos mensais são limitadas para garantir foco total na sua marca. Clique abaixo e garanta o seu design exclusivo.
        </p>
        <a href={whatsappLink} className="inline-flex items-center gap-3 bg-[#25D366] text-white px-10 py-4 rounded-full font-bold text-sm shadow-xl hover:bg-[#20ba59] transition-all animate-soft-float btn-shine-container">
          Falar Conosco no WhatsApp
        </a>
        <p className="mt-20 text-[9px] text-slate-500 uppercase tracking-[0.3em] font-bold">© 2026 quantyx.artes —
Gerianderson Dsgn <br /> Salinas da Margarida, BA</p>
      </footer>
    </div>
  );
}