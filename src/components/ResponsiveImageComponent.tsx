import { useState, useEffect, useRef } from 'react';
import { type ResponsiveImage } from '../data/portfolioData';

interface ResponsiveImageProps {
  data: ResponsiveImage;
  images: ResponsiveImage[];
  index: number;
  openLightbox: (imgs: string[], idx: number) => void;
  className?: string;     // Permite customizar a estilização da tag <img> de fora
  customAspect?: string;  // Permite anular o aspecto automático quando necessário (ex: nos Cardápios)
}

export function ResponsiveImageComponent({ 
  data, 
  images, 
  index, 
  openLightbox,
  className = "w-full h-full object-cover transition-all duration-700", // Seu padrão original + animação
  customAspect
}: ResponsiveImageProps) {
  const [isLandscape, setIsLandscape] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState('');
  const [currentSrcSet, setCurrentSrcSet] = useState('');
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // 1. Detectar a qualidade da rede do usuário (Network Information API)
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    const isSlowConnection = connection ? (connection.saveData || ['slow-2g', '2g', '3g'].includes(connection.effectiveType)) : false;

    if (isSlowConnection) {
      // Se a internet for lenta, força o navegador a baixar a versão de 400w primeiro (leve)
      setCurrentSrc(`/images/${data.name}-400w.webp`);
      setCurrentSrcSet(`/images/${data.name}-400w.webp 400w`);
      
      // Cria uma imagem na memória para baixar a versão pesada em segundo plano
      const highResImage = new Image();
      highResImage.src = data.src;
      highResImage.srcset = data.srcset;
      highResImage.onload = () => {
        // Quando a pesada terminar de baixar, faz a troca suave
        setCurrentSrc(data.src);
        setCurrentSrcSet(data.srcset);
      };
    } else {
      // Se a internet for boa (4G rápido, 5G, Wi-Fi), carrega o padrão direto
      setCurrentSrc(data.src);
      setCurrentSrcSet(data.srcset);
    }
  }, [data]);

  // Lógica para detectar se é paisagem
  const handleImageLoad = (img: HTMLImageElement) => {
    setIsLandscape(img.naturalWidth > img.naturalHeight);
    setIsLoaded(true);
  };

  useEffect(() => {
    if (imgRef.current?.complete && currentSrc) {
      handleImageLoad(imgRef.current);
    }
  }, [currentSrc]);

  // Se um aspecto customizado for passado via props, nós o usamos. 
  // Caso contrário, mantém a sua regra original baseada na orientação da imagem.
  const aspectClass = customAspect ? customAspect : (isLandscape ? 'col-span-2 aspect-[21/9]' : 'aspect-[2/3.5]');

  return (
    <div 
      className={`bg-white rounded-2xl shadow-md overflow-hidden border border-slate-100 cursor-zoom-in transition-all duration-500 relative group
        ${!isLoaded ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
        ${aspectClass}`}
      onClick={() => openLightbox(images.map(img => img.src), index)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && openLightbox(images.map(img => img.src), index)}
    >
      {/* Aviso FIXO sobreposto: Visível direto no celular e no PC sem depender de hover */}
      <div className="absolute bottom-3 right-3 z-20 bg-black/70 backdrop-blur-md text-white/95 text-[9px] sm:text-[10px] font-semibold px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-full flex items-center gap-1 sm:gap-1.5 pointer-events-none border border-white/10 tracking-wide transition-colors duration-300 group-hover:bg-orange-600">
        <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-orange-400 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
        </svg>
        Clique e veja
      </div>

      {currentSrc && (
        <img 
          ref={imgRef}
          src={currentSrc}
          srcSet={currentSrcSet}
          sizes={data.sizes}
          alt={data.alt}
          width={data.width}
          height={data.height}
          onLoad={(e) => handleImageLoad(e.currentTarget)}
          className={`${className} ${!isLoaded ? 'blur-md' : 'blur-0'} group-hover:scale-103 duration-500`}
          loading="lazy"
        />
      )}
    </div>
  );
}