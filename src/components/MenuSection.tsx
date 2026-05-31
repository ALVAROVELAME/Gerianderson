import { useState, useEffect } from 'react';
import { type ResponsiveImage } from '../data/portfolioData';
import { ResponsiveImageComponent } from './ResponsiveImageComponent';

interface MenuSectionProps {
  menuImages: ResponsiveImage[];
  openLightbox: (imgs: string[], idx: number) => void;
}

export function MenuSection({ menuImages, openLightbox }: MenuSectionProps) {
  const [currentMenuSlide, setCurrentMenuSlide] = useState(0);

  useEffect(() => {
    if (menuImages.length === 0) return;
    const timer = setInterval(() => {
      setCurrentMenuSlide((prev) => (prev >= menuImages.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [menuImages]);

  return (
    <section className="py-24 bg-slate-900 text-white overflow-hidden w-full">
      <div className="max-w-6xl mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-16 items-center w-full">
        {/* TEXTO PERSUASIVO DE VENDA */}
        <div>
          <span className="text-orange-500 font-bold text-xs uppercase tracking-wider mb-2 block">Cardápios Gastronômicos</span>
          <h2 className="text-4xl font-black mb-6 tracking-tight text-white">
            Design que Desperta <br/><span className="text-orange-500">o Desejo de Compra</span>
          </h2>
          <p className="text-slate-400 mb-6 leading-relaxed">
            O seu cardápio é a ferramenta mais importante do seu estabelecimento. Um menu mal estruturado faz você perder dinheiro. Eu desenvolvo layouts estratégicos que organizam seus produtos de forma atraente, destacando os itens mais lucrativos e induzindo o cliente a consumir mais.
          </p>
          <p className="text-slate-400 mb-10 leading-relaxed font-medium">
            ✓ Engenharia de menu para aumentar o ticket médio <br />
            ✓ Design otimizado para leitura rápida no celular ou impresso <br />
            ✓ Fotos valorizadas com aplicação correta de cores e fontes
          </p>
        </div>
        
        {/* CONTAINER DA IMAGEM / SLIDE */}
        <div className="relative group">
          {/* Tag Discreta: "Clique para ampliar" */}
          <div className="absolute top-4 right-4 z-30 bg-black/60 backdrop-blur-md text-white/80 text-[11px] font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5 pointer-events-none transition-all duration-300 group-hover:bg-orange-600 group-hover:text-white border border-white/10 hidden sm:flex">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
            </svg>
            Clique para ampliar
          </div>

          <div className="aspect-[4/3] bg-white/5 rounded-3xl overflow-hidden border border-white/10 relative shadow-2xl">
            {menuImages.map((img: ResponsiveImage, i: number) => (
              <div key={i} className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${i === currentMenuSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                <ResponsiveImageComponent 
                  data={img} 
                  images={menuImages} 
                  index={i} 
                  openLightbox={openLightbox} 
                  customAspect="w-full h-full"
                  className="w-full h-full object-contain p-4" 
                />
              </div>
            ))}
            
            {/* Botões de Navegação */}
            <button aria-label="Anterior" className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-all opacity-0 group-hover:opacity-100" onClick={(e) => { e.stopPropagation(); setCurrentMenuSlide(prev => (prev === 0 ? menuImages.length - 1 : prev - 1)); }}><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg></button>
            <button aria-label="Próximo" className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-all opacity-0 group-hover:opacity-100" onClick={(e) => { e.stopPropagation(); setCurrentMenuSlide(prev => (prev >= menuImages.length - 1 ? 0 : prev + 1)); }}><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></button>
          </div>
        </div>
      </div>
    </section>
  );
}