import Link from "next/link";

export default function Home() {
  return (
    <>
      <header className="top">
        <Link className="brand" href="/">KITAABIA<span>Read. Learn. Grow.</span></Link>
        <nav>
          <Link href="/books">Books</Link>
          <Link href="/library">My Library</Link>
          <Link href="/login">Sign in</Link>
        </nav>
      </header>
      <main>
        <section className="hero">
          <p className="eyebrow">YOUR DIGITAL LIBRARY</p>
          <h1>Discover books that <em>change lives.</em></h1>
          <p>Explore books that help you learn, think, create and grow — in one modern digital library.</p>
          <Link className="btn gold" href="/books">Explore Books →</Link>
        </section>
        <section className="wrap">
          <p className="eyebrow">NEXT GENERATION LIBRARY</p>
          <h2>Built for readers</h2>
          <div className="grid">
            <div className="card"><h3>Discover</h3><p className="muted">Search and filter books by topic and author.</p></div>
            <div className="card"><h3>Read</h3><p className="muted">Open a clean, mobile-first reading experience.</p></div>
            <div className="card"><h3>Save</h3><p className="muted">Keep favorites and continue where you stopped.</p></div>
            <div className="card"><h3>Grow</h3><p className="muted">Build a personal library around your interests.</p></div>
          </div>
        </section>
      </main>
    </>
  );
}
