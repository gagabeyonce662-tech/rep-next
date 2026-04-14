import Image from 'next/image';
import Link from 'next/link';
import { ShopifyProduct } from '@/types/shopify';

export default function ProductCard({ product }: { product: ShopifyProduct }) {
  const { title, handle, priceRange, featuredImage } = product;
  const price = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: priceRange.minVariantPrice.currencyCode,
  }).format(parseFloat(priceRange.minVariantPrice.amount));

  return (
    <Link
      href={`/product/${handle}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800"
    >
      <div className="aspect-[4/5] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        {featuredImage ? (
          <Image
            src={featuredImage.url}
            alt={featuredImage.altText || title}
            width={featuredImage.width || 800}
            height={featuredImage.height || 1000}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-zinc-400">
            No Image
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      <div className="flex flex-col p-6 space-y-2">
        <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
          {title}
        </h3>
        <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
          {price}
        </p>
        
        <div className="pt-2">
          <span className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 w-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-300">
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
}
