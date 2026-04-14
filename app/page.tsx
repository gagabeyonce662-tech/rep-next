import ProductGrid from "@/components/ProductGrid";
import { shopifyFetch, GQL_PRODUCTS } from "@/lib/shopify";
import { ShopifyProductsResponse } from "@/types/shopify";

export default async function Home() {
  const response = await shopifyFetch<ShopifyProductsResponse>({
    query: GQL_PRODUCTS,
    variables: { first: 20 },
  });

  const products = response.body.data?.products?.nodes || [];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans">
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-black/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tighter text-black dark:text-white uppercase">
            Reps Store
          </h1>
          <nav className="flex gap-6">
            <a href="#" className="text-sm font-medium hover:text-blue-600 transition-colors">Products</a>
            <a href="#" className="text-sm font-medium hover:text-blue-600 transition-colors">Collections</a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-12">
          <h2 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl mb-4">
            New Arrivals
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl">
            Explore our latest collection of premium products, curated just for you. Quality and style meet in every piece.
          </p>
        </section>

        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-xl text-zinc-500 mb-4">No products found.</p>
            <p className="text-zinc-400">Make sure your Storefront API token and domain are correct.</p>
          </div>
        )}
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-12 bg-white dark:bg-black">
        <div className="container mx-auto px-4 text-center text-zinc-500 text-sm">
          &copy; {new Date().getFullYear()} Reps Store. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
