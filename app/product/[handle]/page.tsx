import Image from 'next/image';
import { shopifyFetch, GQL_PRODUCT_BY_HANDLE } from '@/lib/shopify';
import { ShopifyProductResponse } from '@/types/shopify';
import { notFound } from 'next/navigation';

export default async function ProductPage({
  params,
}: {
  params: { handle: string };
}) {
  const { handle } = await params;

  const response = await shopifyFetch<ShopifyProductResponse>({
    query: GQL_PRODUCT_BY_HANDLE,
    variables: { handle },
  });

  const product = response.body.data?.product;

  if (!product) {
    notFound();
  }

  const price = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: product.priceRange.minVariantPrice.currencyCode,
  }).format(parseFloat(product.priceRange.minVariantPrice.amount));

  return (
    <div className="min-h-screen bg-white dark:bg-black font-sans">
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-black/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <a href="/" className="text-sm font-medium hover:text-blue-600 transition-colors flex items-center gap-2">
            ← Back to Store
          </a>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              {product.featuredImage && (
                <Image
                  src={product.featuredImage.url}
                  alt={product.featuredImage.altText || product.title}
                  width={product.featuredImage.width || 800}
                  height={product.featuredImage.height || 800}
                  className="h-full w-full object-cover"
                  priority
                />
              )}
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {product.images.nodes.slice(1, 5).map((image, index) => (
                <div key={index} className="aspect-square overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                  <Image
                    src={image.url}
                    alt={image.altText || product.title}
                    width={200}
                    height={200}
                    className="h-full w-full object-cover transition-transform hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
                {product.title}
              </h1>
              <p className="text-3xl font-semibold text-blue-600 dark:text-blue-400">
                {price}
              </p>
            </div>

            <div 
              className="prose prose-zinc dark:prose-invert max-w-none text-lg leading-relaxed text-zinc-600 dark:text-zinc-400"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />

            <div className="flex flex-col space-y-4 pt-8">
              <button className="h-16 w-full rounded-full bg-zinc-900 text-white font-bold text-lg transition-all hover:bg-zinc-800 active:scale-[0.98] dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">
                Add to Cart
              </button>
              <button className="h-16 w-full rounded-full border-2 border-zinc-200 text-zinc-900 font-bold text-lg transition-all hover:bg-zinc-50 active:scale-[0.98] dark:border-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-900/50">
                Buy it Now
              </button>
            </div>

            <div className="border-t border-zinc-100 dark:border-zinc-800 pt-8 mt-8 space-y-4">
              <div className="flex items-center gap-4 text-sm text-zinc-500">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50 dark:bg-green-900/20 text-green-600">✓</span>
                Free shipping on orders over $100
              </div>
              <div className="flex items-center gap-4 text-sm text-zinc-500">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600">↺</span>
                30-day return policy
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-12 bg-white dark:bg-black mt-24">
        <div className="container mx-auto px-4 text-center text-zinc-500 text-sm">
          &copy; {new Date().getFullYear()} Reps Store. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
