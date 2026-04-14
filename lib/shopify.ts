const domain = process.env.PUBLIC_STORE_DOMAIN;
const privateAccessToken = process.env.PRIVATE_STOREFRONT_API_TOKEN;

export async function shopifyFetch<T>({
  query,
  variables = {},
}: {
  query: string;
  variables?: any;
}): Promise<{ status: number; body: T } | never> {
  try {
    const result = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': privateAccessToken!,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    return {
      status: result.status,
      body: await result.json(),
    };
  } catch (e) {
    throw {
      error: e,
      query,
    };
  }
}

export const GQL_PRODUCTS = `
  query getProducts($first: Int!) {
    products(first: $first) {
      nodes {
        id
        title
        handle
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        featuredImage {
          url
          altText
          width
          height
        }
      }
    }
  }
`;

export const GQL_PRODUCT_BY_HANDLE = `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      descriptionHtml
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      featuredImage {
        url
        altText
        width
        height
      }
      images(first: 5) {
        nodes {
          url
          altText
          width
          height
        }
      }
    }
  }
`;
