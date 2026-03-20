import Link from "next/link";

export function Footer() {
  return (
    <footer className="container-shell py-16">
      <div className="rounded-[36px] border border-cream-300 bg-white/80 p-8 shadow-sm sm:p-10">
        <div className="grid gap-10 border-b border-cream-300 pb-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <p className="font-serif text-3xl font-bold text-brown-800">
            renno<span className="text-terracotta-500">.</span>
          </p>
          <p className="mt-4 max-w-sm text-sm leading-7 text-brown-400">
            A calmer way to source trusted tradespeople, compare quotes, and keep renovations moving.
          </p>
        </div>
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-brown-500">Product</p>
          <div className="mt-4 space-y-3 text-brown-400">
            <Link href="/how-it-works">How it works</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/for-pros">For pros</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-brown-500">Company</p>
          <div className="mt-4 space-y-3 text-brown-400">
            <Link href="/about">About</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/careers">Careers</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-brown-500">Legal</p>
          <div className="mt-4 space-y-3 text-brown-400">
            <Link href="/terms">Terms</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/contact">Contact</Link>
            <a href="https://twitter.com" target="_blank">Twitter</a>
          </div>
        </div>
      </div>
        <div className="flex flex-col gap-4 pt-6 text-sm text-brown-400 sm:flex-row sm:items-center sm:justify-between">
          <p>Kill the guesswork.</p>
          <div className="flex gap-5">
            <Link href="/app/signup">Get started</Link>
            <Link href="/app/login">Log in</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
