import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main className="page-shell">
      <section className="hero-card">
        <p className="eyebrow">Printable kit builder</p>
        <h1>JunkJournalKit</h1>
        <p className="subtitle">
          Build original paper goods, layered tags, and printable journal elements with a clean kit workflow.
        </p>

        <div className="actions">
          <Link to="/store"><button>Browse Kits</button></Link>
          <Link to="/cart"><button className="secondary">View Cart</button></Link>
        </div>

        <div className="feature-grid">
          <div>
            <strong>Templates</strong>
            <span>Vintage, floral, neutral, and grunge-inspired page layouts</span>
          </div>
          <div>
            <strong>Export</strong>
            <span>Print-ready PDF sheets for journaling, tags, and mini ephemera</span>
          </div>
          <div>
            <strong>Originality</strong>
            <span>Built with original naming and content to avoid trademark conflicts</span>
          </div>
        </div>
      </section>
    </main>
  );
}
