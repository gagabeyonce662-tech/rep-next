export interface ShopifyImage {
  url: string;
  altText?: string;
  width?: number;
  height?: number;
}

export interface Money {
  amount: string;
  currencyCode: string;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  descriptionHtml: string;
  priceRange: {
    minVariantPrice: Money;
  };
  featuredImage?: ShopifyImage;
  images: {
    nodes: ShopifyImage[];
  };
}

export interface ShopifyProductsResponse {
  products: {
    nodes: ShopifyProduct[];
  };
}

export interface ShopifyProductResponse {
  product: ShopifyProduct;
}
