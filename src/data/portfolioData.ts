export interface ResponsiveImage {
  src: string;
  srcset: string;
  sizes: string;
  alt: string;
  width: number;  // Agora obrigatórios
  height: number;
}

class ImageItem implements ResponsiveImage {
  src: string;
  srcset: string;
  sizes: string;
  alt: string;
  width: number;
  height: number;

  constructor(
    pathOrName: string, 
    alt: string, 
    width: number, 
    height: number,
    sizes: string = "(max-width: 600px) 400px, (max-width: 900px) 800px, 1200px"
  ) {
    this.width = width;
    this.height = height;
    const isExternal = pathOrName.startsWith('http');

    if (isExternal) {
      this.src = pathOrName;
      this.srcset = `${pathOrName} 1x`;
      this.sizes = "100vw";
    } else {
      this.src = `/images/${pathOrName}.webp`;
      this.srcset = `/images/${pathOrName}-400w.webp 400w, /images/${pathOrName}-800w.webp 800w`;
      this.sizes = sizes;
    }
    
    this.alt = alt;
  }
}

// ... (PortfolioData mantém igual)

export const fetchPortfolioData = async (): Promise<PortfolioData> => {
  return {
    // Agora você passa manualmente: new ImageItem(nome, alt, width, height, [sizes])
    heroImage: new ImageItem("principal", "Design de destaque", 1200, 675, "100vw"),
    extraImage: new ImageItem("extra", "Imagem extra do projeto", 800, 600),
    
    socialImages: [
      new ImageItem("post1", "Post social 1", 400, 600),
      new ImageItem("post2", "Post social 2", 400, 600),
      new ImageItem("post3", "Post social 3", 400, 600),
      new ImageItem("post4", "Post social 4", 400, 600)
    ],
    
    menuImages: [
      new ImageItem("1", "Menu 1", 800, 600),
      new ImageItem("2", "Menu 2", 800, 600),
      new ImageItem("3", "Menu 3", 800, 600),
      new ImageItem("4", "Menu 4", 800, 600)
    ],
    
    printedImages: [
      new ImageItem("panfleto1", "Panfleto 1", 800, 1000),
      new ImageItem("panfleto2", "Panfleto 2", 800, 1000),
      new ImageItem("panfleto3", "Panfleto 3", 800, 1000),
    ]
  };
};