// A classe agora é apenas uma geradora de dados estruturados
export class ResponsiveImage {
  // 1. Declare todas as propriedades explicitamente aqui
  public src: string;
  public srcset: string;
  public sizes: string;
  public name: string;
  public width: number;
  public height: number;
  public alt: string;

  // 2. Remova o 'public' dos parâmetros do construtor
  constructor(
    name: string,
    width: number,
    height: number,
    alt: string,
    sizes: string = "(max-width: 600px) 400px, (max-width: 900px) 800px, 1200px"
  ) {
    // 3. Faça a atribuição manual das propriedades do construtor
    this.name = name;
    this.width = width;
    this.height = height;
    this.alt = alt;

    const isExternal = name.startsWith('http');

    if (isExternal) {
      this.src = name;
      this.srcset = `${name} 1x`;
      this.sizes = "100vw";
    } else {
      // Toda a regra de caminhos e tamanhos fica isolada aqui dentro
      this.src = `/images/${name}.webp`;
      this.srcset = `/images/${name}-400w.webp 400w, /images/${name}-800w.webp 800w`;
      this.sizes = sizes;
    }
  }
}

export interface PortfolioData {
  heroImage: ResponsiveImage;
  extraImage: ResponsiveImage;
  socialImages: ResponsiveImage[];
  menuImages: ResponsiveImage[];
  printedImages: ResponsiveImage[];
}

export const fetchPortfolioData = async (): Promise<PortfolioData> => {
  return {
    heroImage: new ResponsiveImage("principal", 1200, 675, "Design de destaque", "100vw"),
    extraImage: new ResponsiveImage("extra", 800, 400, "Imagem extra do projeto"),
    
    socialImages: [
      new ResponsiveImage("post1", 400, 800, "Post social 1"),
      new ResponsiveImage("post2", 400, 800, "Post social 2"),
      new ResponsiveImage("post3", 400, 800, "Post social 3"),
      new ResponsiveImage("post4", 400, 800, "Post social 4")
    ],
    
    menuImages: [
      new ResponsiveImage("1", 400, 800, "Menu 1"),
      new ResponsiveImage("2", 400, 800, "Menu 2"),
      new ResponsiveImage("3", 400, 800, "Menu 3"),
      new ResponsiveImage("4", 400, 800, "Menu 4")
    ],
    
    printedImages: [
      new ResponsiveImage("panfleto1", 400, 800, "Panfleto 1"),
      new ResponsiveImage("panfleto2", 400, 800, "Panfleto 2"),
      new ResponsiveImage("panfleto3", 400, 800, "Panfleto 3"),
    ]
  };
};