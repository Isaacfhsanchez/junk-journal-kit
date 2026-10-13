const samplePages = [
  {
    size: { widthInches: 8.5, heightInches: 11 },
    elements: [
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80',
        xInches: 0.55,
        yInches: 0.55,
        widthInches: 3.1,
        heightInches: 4.6
      },
      {
        type: 'text',
        text: 'Junk Journal Kit',
        xInches: 4.25,
        yInches: 1.1,
        fontSize: 24,
        color: '#1f2937'
      },
      {
        type: 'text',
        text: 'vintage layers\nbotanical tags\npaper ephemera',
        xInches: 4.25,
        yInches: 2.0,
        fontSize: 18,
        color: '#374151'
      },
      {
        type: 'text',
        text: 'Original design, made for print-ready journaling inspiration.',
        xInches: 0.75,
        yInches: 8.4,
        fontSize: 16,
        color: '#4b5563'
      }
    ]
  }
];

export default function App() {
  const handleGenerate = async () => {
    const response = await fetch('/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pages: samplePages })
    });

    if (!response.ok) {
      const error = await response.json();
      alert(error.error || 'Failed to generate PDF');
      return;
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'junk-journal-kit.pdf';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="page-shell">
      <section className="hero-card">
        <p className="eyebrow">Printable kit builder</p>
        <h1>JunkJournalKit</h1>
        <p className="subtitle">
          Build original paper goods, layered tags, and printable journal elements with a clean kit workflow.
        </p>

        <div className="actions">
          <button onClick={handleGenerate}>Generate PDF</button>
          <button className="secondary">Preview Kit</button>
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
