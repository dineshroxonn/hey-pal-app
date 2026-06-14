import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ExternalLink } from 'lucide-react';

const SOURCES = [
  { name: 'MyNeta (ADR)', url: 'https://myneta.info', desc: 'Election affidavits — assets, liabilities, criminal cases of candidates.' },
  { name: 'Association for Democratic Reforms (ADR)', url: 'https://adrindia.org', desc: 'Analysis of MP/MLA performance, party finances, electoral bonds.' },
  { name: 'Election Commission of India', url: 'https://eci.gov.in', desc: 'Official election results, candidate affidavits, expenditure reports.' },
  { name: 'PRS Legislative Research', url: 'https://prsindia.org', desc: 'Parliamentary attendance, questions asked, bill voting records.' },
  { name: 'CAG of India', url: 'https://cag.gov.in', desc: 'Comptroller and Auditor General — audits of government schemes.' },
  { name: 'Supreme Court of India', url: 'https://main.sci.gov.in', desc: 'Judgments and ongoing cases against public officials.' },
  { name: 'RTI Online', url: 'https://rtionline.gov.in', desc: 'Right to Information requests and disclosed government data.' },
  { name: 'OpenBudgetsIndia', url: 'https://openbudgetsindia.org', desc: 'Public budgets, fiscal data, scheme allocations.' },
];

export default function SourcesPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl md:text-6xl circus-title text-yellow-400 mb-3">
            Sources & Methodology
          </h1>
          <p className="text-yellow-200/80 italic mb-10">
            Satire works only when the underlying facts are real. Here's where every number on this site eventually comes from.
          </p>

          <section className="mb-12">
            <h2 className="text-2xl circus-title text-yellow-400 mb-4">Data sources</h2>
            <div className="space-y-3">
              {SOURCES.map(s => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-black/40 border border-yellow-400/30 rounded-lg p-4 hover:border-yellow-400 transition-colors group"
                >
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <div className="font-bold text-yellow-300 group-hover:text-yellow-400">{s.name}</div>
                      <p className="text-yellow-200/70 text-sm mt-1">{s.desc}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-yellow-400/50 flex-shrink-0 mt-1" />
                  </div>
                </a>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl circus-title text-yellow-400 mb-4">"Drama Score" — how it's built</h2>
            <p className="text-yellow-200/80 leading-relaxed">
              A satirical composite (0-100) of: pending corruption cases against state ministers/MLAs (40%),
              total declared scam value over the last 10 years (30%), CAG observations (15%), and RTI denial rate (15%).
              Higher = more dramatic show. It is a comparative storytelling tool, not a legal verdict.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl circus-title text-yellow-400 mb-4">Current state of data</h2>
            <p className="text-yellow-200/80 leading-relaxed">
              The launch dataset uses curated, illustrative figures based on the sources above to demonstrate the platform.
              We are wiring in live scrapers for MyNeta and ADR next. Crowdsourced reports on the <a href="/report" className="underline text-yellow-400">/report</a> map are real and live from the moment users submit them.
            </p>
          </section>

          <section className="bg-red-950/40 border-l-4 border-yellow-400 p-5 rounded">
            <h3 className="text-xl circus-title text-yellow-400 mb-2">See an error?</h3>
            <p className="text-yellow-200/80 text-sm">
              We'd rather be accurate than viral. Email corrections with a public source link — we'll update the next day or take it down.
              Until our correction inbox is live, please submit corrections via the <a href="/report" className="underline">Report map</a>
              {' '}with category "Other" and the prefix <code className="bg-black/40 px-1 rounded">CORRECTION:</code>.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
