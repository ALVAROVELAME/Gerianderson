// src/data/portfolioData.ts

export interface ResponsiveImage {
  src: string;
  srcset: string;
  sizes: string;
  alt: string;
}

export interface PortfolioData {
  heroImage: { src: string; alt: string };
  socialImages: ResponsiveImage[];
  menuImages: ResponsiveImage[];
  printedImages: ResponsiveImage[];
}

export const PORTFOLIO_DATA: PortfolioData = {
  heroImage: {
    src: "/images/principal.webp", // Alterado para a sua imagem local
    alt: "Design de destaque"
  },
  socialImages: [
    { 
      src: "/images/post1.webp", 
      srcset: "/images/post1.webp 400w, /images/post1.webp 800w", 
      sizes: "(max-width: 600px) 400px, 800px", 
      alt: "Post social media 1" 
    },
    { 
      src: "/images/post2.webp", 
      srcset: "/images/post2.webp 400w, /images/post2.webp 800w", 
      sizes: "(max-width: 600px) 400px, 800px", 
      alt: "Post social media 2" 
    },
    { 
      src: "/images/post3.webp", 
      srcset: "/images/post3.webp 400w, /images/post3.webp 800w", 
      sizes: "(max-width: 600px) 400px, 800px", 
      alt: "Post social media 3" 
    },
    { 
      src: "/images/post4.webp", 
      srcset: "/images/post4.webp 400w, /images/post4.webp 800w", 
      sizes: "(max-width: 600px) 400px, 800px", 
      alt: "Post social media 4" 
    }
  ],
  menuImages: [
    { 
      src: "/images/1.webp", 
      srcset: "/images/1.webp 400w, /images/1.webp 800w", 
      sizes: "(max-width: 600px) 400px, 800px", 
      alt: "Slide de menu 1" 
    },
    { 
      src: "/images/2.webp", 
      srcset: "/images/2.webp 400w, /images/2.webp 800w", 
      sizes: "(max-width: 600px) 400px, 800px", 
      alt: "Slide de menu 2" 
    },
    { 
      src: "/images/3.webp", 
      srcset: "/images/3.webp 400w, /images/3.webp 800w", 
      sizes: "(max-width: 600px) 400px, 800px", 
      alt: "Slide de menu 3" 
    },
    { 
      src: "/images/4.webp", 
      srcset: "/images/4.webp 400w, /images/4.webp 800w", 
      sizes: "(max-width: 600px) 400px, 800px", 
      alt: "Slide de menu 4" 
    }
  ],
  printedImages: [
    { 
      src: "/images/panfleto1.webp", 
      srcset: "/images/panfleto1.webp 400w, /images/panfleto1.webp 800w", 
      sizes: "(max-width: 600px) 400px, 800px", 
      alt: "Material impresso 1" 
    },
    { 
      src: "/images/panfleto2.webp", 
      srcset: "/images/panfleto2.webp 400w, /images/panfleto2.webp 800w", 
      sizes: "(max-width: 600px) 400px, 800px", 
      alt: "Material impresso 2" 
    },
    { 
      src: "/images/panfleto3.webp", 
      srcset: "/images/panfleto3.webp 400w, /images/panfleto3.webp 800w", 
      sizes: "(max-width: 600px) 400px, 800px", 
      alt: "Material impresso 3" 
    }
  ]
};