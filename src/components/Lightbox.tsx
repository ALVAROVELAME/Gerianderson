import { useEffect, useRef } from 'react';

/**
 * Componente Lightbox
 * - Swipe e Teclado funcionam sempre.
 * - Setas visíveis apenas em desktop (md:flex).
 * - Pontos (dots) e contador visíveis sempre.
 */
export function Lightbox({ index, images, onClose, onNext, onPrev, setIndex }: any) {
  const touchStartX = useRef(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNext, onPrev, onClose]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) onNext();
      else onPrev();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Botão Fechar */}
      <button
        type="button" 
        className="absolute top-6 right-6 text-white/50 hover:text-white z-[210] transition-colors" 
        onClick={onClose}
        aria-label="Fechar visualização"
        title="Fechar"
      >
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>

      {/* Seta Anterior (Desktop apenas) */}
      <button
        type="button" 
        onClick={(e) => { e.stopPropagation(); onPrev(); }} 
        className="absolute left-8 p-4 text-white hover:text-orange-500 bg-white/5 rounded-full z-[210] transition-all hidden md:flex"
        aria-label="Imagem anterior"
        title="Anterior"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>

      {/* Área Central: Imagem + Dots + Contador */}
      <div className="relative w-full h-full flex flex-col items-center justify-center pointer-events-none">
        <img 
          src={images[index]} 
          alt={`Visualização da imagem ${index + 1} de ${images.length}`} 
          className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300 pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        />
        
        {/* Container inferior com Dots e Contador */}
        <div className="mt-8 flex flex-col items-center gap-4 pointer-events-auto">
          {/* Dots Clicáveis */}
          <div className="flex gap-2">
            {images.map((_: any, i: number) => (
              <button
                type="button"
                key={i}
                onClick={(e) => { e.stopPropagation(); setIndex(i); }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === index ? 'bg-orange-500 scale-110' : 'bg-white/30 hover:bg-white/60'
                }`}
                aria-label={`Ir para imagem ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
                title={`Imagem ${i + 1}`}
              />
            ))}
          </div>

          {/* Contador Numérico */}
          <p className="text-white/60 text-xs font-bold tracking-widest uppercase" aria-live="polite">
            {index + 1} / {images.length}
          </p>
        </div>
      </div>

      {/* Seta Próximo (Desktop apenas) */}
      <button 
        type="button"
        onClick={(e) => { e.stopPropagation(); onNext(); }} 
        className="absolute right-8 p-4 text-white hover:text-orange-500 bg-white/5 rounded-full z-[210] transition-all hidden md:flex"
        aria-label="Próxima imagem"
        title="Próxima"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  );
}