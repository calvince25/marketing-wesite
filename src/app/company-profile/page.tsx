"use client";

import Link from 'next/link';
import Image from 'next/image';

export default function CompanyProfilePage() {
  return (
    <div style={{ background: '#f0f2f5', minHeight: '100vh', padding: '40px 0' }}>
      
      {/* Web Controls (Hidden on Print) */}
      <div className="container" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <style dangerouslySetInnerHTML={{ __html: `
          @media print {
            .no-print { display: none !important; }
            .print-break { page-break-before: always; }
            body { background: #fff !important; margin: 0; padding: 0; }
            .document-sheet { box-shadow: none !important; border: none !important; padding: 0 !important; width: 100% !important; max-width: none !important; }
            .navy-bg { background-color: #0a192f !important; -webkit-print-color-adjust: exact; }
            .orange-text { color: #ff6b00 !important; -webkit-print-color-adjust: exact; }
            .white-text { color: #ffffff !important; -webkit-print-color-adjust: exact; }
          }
        `}} />
        <h1 className="no-print" style={{ fontSize: '2.5rem', marginBottom: '10px', fontWeight: '800', color: '#0a192f' }}>GrowthLab Corporate Profile 2026</h1>
        <p className="no-print" style={{ color: '#555', marginBottom: '30px', fontSize: '1.1rem' }}>Professional interactive profile for stakeholders and enterprise prospects.</p>
        <div className="no-print" style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <button 
            className="btn btn-primary" 
            onClick={() => typeof window !== 'undefined' && window.print()}
            style={{ padding: '15px 35px', borderRadius: '4px', fontSize: '1rem' }}
          >
            Generate PDF Document
          </button>
          <Link href="/" className="btn btn-outline" style={{ padding: '15px 35px', borderRadius: '4px', fontSize: '1rem' }}>Back to Website</Link>
        </div>
      </div>

      {/* The Printable "Sheet" */}
      <div className="container document-sheet" style={{ background: '#fff', border: '1px solid #ddd', borderRadius: '4px', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', maxWidth: '1000px', margin: '0 auto', overflow: 'hidden' }}>
        
        {/* Cover Page */}
        <div className="navy-bg" style={{ background: '#0a192f', color: '#fff', padding: '150px 80px', textAlign: 'left', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '60px', left: '80px', fontSize: '1.2rem', fontWeight: 'bold', letterSpacing: '4px' }}>GROWTHLAB LIMITED</div>
          <h1 style={{ fontSize: '6rem', fontWeight: '900', color: '#fff', letterSpacing: '-4px', margin: '40px 0', lineHeight: '1' }}>
            ENGINEERING <br />
            <span className="orange-text" style={{ color: '#ff6b00' }}>PRECISION.</span>
          </h1>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '300', opacity: 0.8, letterSpacing: '2px', marginBottom: '80px' }}>ESTABLISHED 2024 | NAIROBI, KENYA</h2>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '40px', maxWidth: '500px' }}>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.6', opacity: 0.9 }}>
              A high-authority corporate brief detailing our technical infrastructure, strategic methodology, and ROI-driven service architecture for the modern enterprise.
            </p>
          </div>
        </div>

        {/* Section 01: Executive Identity */}
        <div style={{ padding: '80px' }}>
          <div style={{ color: '#ff6b00', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '10px' }}>01. EXECUTIVE IDENTITY</div>
          <h3 style={{ fontSize: '2.5rem', marginBottom: '30px', color: '#0a192f', borderBottom: '4px solid #0a192f', paddingBottom: '15px', display: 'inline-block' }}>Mission Over Vanity.</h3>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.9', color: '#333', marginBottom: '30px' }}>
            GrowthLab Limited is not a traditional creative agency. We are a technical performance lab headquartered in Westlands, Nairobi. Our identity is forged at the intersection of high-end software engineering and aggressive search dominance. For the ambitious Kenyan business, we represent the end of "hope-based marketing" and the beginning of measured top-line growth.
          </p>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.9', color: '#333' }}>
            In an era where digital noise is at an all-time high, we provide clarity through code. We believe that every pixel on a website and every keyword in a search strategy must serve a single purpose: profit. We distance ourselves from "vanity metrics"—likes, followers, and impressions mean nothing if they do not reconcile with your balance sheet. Our mission is to engineer the technical systems that make market leadership inevitable for our clients.
          </p>
        </div>

        {/* Section 02: Core Pillars */}
        <div className="print-break" style={{ padding: '80px', background: '#fcfcfc' }}>
          <div style={{ color: '#ff6b00', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '10px' }}>02. STRATEGIC PILLARS</div>
          <h3 style={{ fontSize: '2.5rem', marginBottom: '50px', color: '#0a192f' }}>The GrowthLab Framework.</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
            <div>
              <h4 style={{ fontSize: '1.4rem', color: '#ff6b00', marginBottom: '15px' }}>Technical Superiority</h4>
              <p style={{ color: '#444', lineHeight: '1.7' }}>
                We rejected the industry standard of "bloated CMS templates." We build exclusively on high-performance frameworks like Next.js and React. This ensures 99+ Lighthouse scores, instant mobile loading, and a technical foundation that Google's algorithm favors by default.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: '1.4rem', color: '#ff6b00', marginBottom: '15px' }}>Data-Driven Accountability</h4>
              <p style={{ color: '#444', lineHeight: '1.7' }}>
                Every campaign we run is mapped to hard backend metrics. We track Customer Acquisition Cost (CAC) and Lifetime Value (LTV) with clinical precision. If a strategy doesn't yield a 3x-10x return, we don't scale it.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: '1.4rem', color: '#ff6b00', marginBottom: '15px' }}>Algorithmic Authority</h4>
              <p style={{ color: '#444', lineHeight: '1.7' }}>
                We don't just "do SEO." We build "Topic Authority." Through deep content siloing, semantic search optimization, and aggressive internal linking, we ensure our clients own the "Knowledge Graph" for their industry in Nairobi and beyond.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: '1.4rem', color: '#ff6b00', marginBottom: '15px' }}>AI-First Systems</h4>
              <p style={{ color: '#444', lineHeight: '1.7' }}>
                We integrate autonomous AI agents into our clients' sales funnels and customer support layers. From M-Pesa automated reconciliation to custom LLM-based customer service, we use AI to slash operational friction and increase conversion velocity.
              </p>
            </div>
          </div>
        </div>

        {/* Section 03: Service Architecture */}
        <div className="print-break" style={{ padding: '80px' }}>
          <div style={{ color: '#ff6b00', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '10px' }}>03. SERVICE ARCHITECTURE</div>
          <h3 style={{ fontSize: '2.5rem', marginBottom: '50px', color: '#0a192f' }}>High-Impact Deliverables.</h3>
          
          <div style={{ marginBottom: '40px' }}>
            <h4 style={{ fontSize: '1.6rem', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '20px' }}>Web & Product Engineering</h4>
            <p style={{ color: '#555', marginBottom: '20px' }}>Precision-built storefronts and portals. We specialize in custom-coded Next.js applications that are secure, lightning-fast, and highly scalable.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', fontSize: '0.9rem' }}>
              <div style={{ padding: '15px', background: '#f5f5f5', borderLeft: '3px solid #ff6b00' }}>Custom E-commerce</div>
              <div style={{ padding: '15px', background: '#f5f5f5', borderLeft: '3px solid #ff6b00' }}>Admin Dashboards</div>
              <div style={{ padding: '15px', background: '#f5f5f5', borderLeft: '3px solid #ff6b00' }}>API Integrations</div>
            </div>
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h4 style={{ fontSize: '1.6rem', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '20px' }}>Search Dominance & Marketing</h4>
            <p style={{ color: '#555', marginBottom: '20px' }}>Owning the search results for intent-heavy keywords. We focus on local Nairobi search and national-level commercial intent.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', fontSize: '0.9rem' }}>
              <div style={{ padding: '15px', background: '#f5f5f5', borderLeft: '3px solid #ff6b00' }}>Technical SEO</div>
              <div style={{ padding: '15px', background: '#f5f5f5', borderLeft: '3px solid #ff6b00' }}>Content Strategy</div>
              <div style={{ padding: '15px', background: '#f5f5f5', borderLeft: '3px solid #ff6b00' }}>PPC Logic</div>
            </div>
          </div>
        </div>

        {/* Section 04: Case Metrics */}
        <div className="print-break" style={{ padding: '80px', background: '#0a192f', color: '#fff' }}>
          <div className="orange-text" style={{ color: '#ff6b00', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '10px' }}>04. IMPACT METRICS</div>
          <h3 style={{ fontSize: '2.5rem', marginBottom: '50px', color: '#fff' }}>Evidence of Precision.</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
            <div style={{ padding: '40px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
              <div className="orange-text" style={{ fontSize: '3rem', fontWeight: '900', color: '#ff6b00', marginBottom: '10px' }}>+180%</div>
              <h4 style={{ fontSize: '1.4rem', marginBottom: '10px' }}>Nairobi CBD Restaurant</h4>
              <p style={{ opacity: 0.8 }}>Increase in online orders within 90 days following POS system integration and local SEO optimization.</p>
            </div>
            <div style={{ padding: '40px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
              <div className="orange-text" style={{ fontSize: '3rem', fontWeight: '900', color: '#ff6b00', marginBottom: '10px' }}>45%</div>
              <h4 style={{ fontSize: '1.4rem', marginBottom: '10px' }}>Mell Fashion Boutique</h4>
              <p style={{ opacity: 0.8 }}>Conversion rate leap after upgrading from a generic CMS to a custom, mobile-optimized checkout engine.</p>
            </div>
          </div>
        </div>

        {/* Section 05: Contact / Back Cover */}
        <div className="print-break" style={{ padding: '120px 80px', textAlign: 'center' }}>
          <div style={{ borderTop: '2px solid #0a192f', display: 'inline-block', width: '100px', marginBottom: '40px' }}></div>
          <h3 style={{ fontSize: '3rem', color: '#0a192f', marginBottom: '20px' }}>Partner with Precision.</h3>
          <p style={{ fontSize: '1.5rem', color: '#666', marginBottom: '60px' }}>Let's build your future, bit by bit.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>
            <div>
              <h5 style={{ fontWeight: 'bold', marginBottom: '10px' }}>GROWTHLAB LIMITED</h5>
              <p style={{ color: '#888' }}>Westlands, Nairobi, Kenya</p>
              <p style={{ color: '#888' }}>info@growthlab.co.ke</p>
            </div>
            <div>
              <h5 style={{ fontWeight: 'bold', marginBottom: '10px' }}>ONLINE</h5>
              <p style={{ color: '#888' }}>https://www.growthlab.co.ke</p>
              <p style={{ color: '#888' }}>@growthlablimited</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
