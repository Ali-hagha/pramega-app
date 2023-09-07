export interface Product {
  id: number;
  attributes: {
    productId: string;
    name: string;
    category: string;
    price: number;
    rating: number;
    ratingCount: number;
    width: number;
    depth: number;
    height: number;
    description: string;
    productTag: string;
    primaryImage: { data: StrapiImage };
    secondaryImage: { data: StrapiImage };
    imageGallery: { data: StrapiImage[] };
  };
}

export interface HeroImages {
  id: number;
  attributes: {
    images: { data: StrapiImage[] };
  };
}

export interface FavoriteProductsType {
  attributes: {
    products: {
      data: Product[];
    };
  };
}

export interface StrapiImage {
  attributes: {
    url: string;
    formats: {
      thumbnail: {
        url: string;
      };
      large: {
        url: string;
      };
      medium: {
        url: string;
      };
      small: {
        url: string;
      };
    };
  };
}

export interface MetaData {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}
