export function Footer() {
  return (
    <footer className="container-shell py-10">
      <div className="grid gap-10 border-t border-cream-300 py-10 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <p className="font-serif text-3xl font-bold text-brown-800">
            renno<span className="text-terracotta-500">.</span>
          </p>
          <p className="mt-4 text-sm text-brown-400">Kill the guesswork.</p>
        </div>
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-brown-500">Product</p>
          <div className="mt-4 space-y-3 text-brown-400">
            <a href="#how-it-works">How it works</a>
            <a href="/app">Pricing</a>
            <a href="/app/onboarding/pro">For pros</a>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-brown-500">Company</p>
          <div className="mt-4 space-y-3 text-brown-400">
            <a href="/app">About</a>
            <a href="/app">Blog</a>
            <a href="/app">Careers</a>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-brown-500">Legal</p>
          <div className="mt-4 space-y-3 text-brown-400">
            <a href="/app">Terms</a>
            <a href="/app">Privacy</a>
            <a href="/app">Contact</a>
            <a href="https://twitter.com">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
