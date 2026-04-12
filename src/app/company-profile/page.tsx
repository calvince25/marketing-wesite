"use client";

import Link from 'next/link';

export default function CompanyProfilePage() {
  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh', padding: '40px 0' }}>
      
      {/* Web Controls (Hidden on Print) */}
      <div className="container" style={{ textAlign: 'center', marginBottom: '20px' }}>
        <style dangerouslySetInnerHTML={{ __html: `
          @media print {
            .no-print { display: none !important; }
            .print-break { page-break-before: always; }
            body { background: #fff !important; }
            .document-sheet { box-shadow: none !important; padding: 0 !important; }
          }
        `}} />
        <h1 className="no-print" style={{ fontSize: '2rem', marginBottom: '10px' }}>GrowthLab Corporate Profile</h1>
        <p className="no-print" style={{ color: '#555', marginBottom: '20px' }}>Below is the interactive web version of our corporate profile.</p>
        <button 
          className="btn btn-primary no-print" 
          onClick={() => typeof window !== 'undefined' && window.print()}
          style={{ padding: '12px 25px', background: '#0056b3', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Download PDF Document (Print)
        </button>
      </div>

      {/* The Printable "Sheet" */}
      <div className="container document-sheet" style={{ background: '#fff', padding: '60px 80px', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', maxWidth: '900px' }}>
        
        {/* Cover Page */}
        <div style={{ textAlign: 'center', padding: '100px 0', borderBottom: '2px solid #000', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '4rem', fontWeight: '900', letterSpacing: '-2px', marginBottom: '20px' }}>GROWTHLAB</h1>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '300', color: '#666', letterSpacing: '2px' }}>CORPORATE PROFILE 2026</h2>
          <p style={{ marginTop: '50px', fontSize: '1.1rem', color: '#888' }}>Precision. Performance. Profit.</p>
        </div>

        {/* Section: About Us */}
        <div style={{ marginBottom: '60px' }}>
          <h3 style={{ fontSize: '2rem', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '20px' }}>01. Executive Summary</h3>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#444' }}>
            GrowthLab Limited is a premium digital agency headquartered in Westlands, Nairobi. We bridge the gap between technical exclusivity and aggressive digital marketing. For ambitious businesses across Kenya and East Africa, we provide not just aesthetic value, but measured return on investment (ROI). We distance ourselves from "vanity metric" agencies by explicitly targeting backend performance and top-line revenue growth.
          </p>
        </div>

        {/* Section: Why Us */}
        <div className="print-break" style={{ marginBottom: '60px' }}>
          <h3 style={{ fontSize: '2rem', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '20px' }}>02. The GrowthLab Differentiator</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
            <div>
              <strong style={{ display: 'block', fontSize: '1.2rem', marginBottom: '10px' }}>Technical Superiority</strong>
              <p style={{ color: '#555', lineHeight: '1.6' }}>We do not rely on bloated CMS templates. We architect high-performance engines using Next.js, React, and server-less databases (Supabase), achieving 99+ Lighthouse performance scores that dominate search engines.</p>
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '1.2rem', marginBottom: '10px' }}>Data-Driven Accountability</strong>
              <p style={{ color: '#555', lineHeight: '1.6' }}>We map our digital efforts strictly to customer acquisition costs (CAC) and lifetime value (LTV). If a marketing campaign or automated sequence does not trigger growth, we pivot.</p>
            </div>
          </div>
        </div>

        {/* Section: Core Services */}
        <div style={{ marginBottom: '60px' }}>
          <h3 style={{ fontSize: '2rem', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '20px' }}>03. Core Capabilities</h3>
          <ul style={{ listStyle: 'none', padding: '0' }}>
            <li style={{ padding: '15px 0', borderBottom: '1px solid #f5f5f5' }}><strong>Enterprise Web Development:</strong> Next.js custom applications, high-conversion E-commerce, headless CMS integration.</li>
            <li style={{ padding: '15px 0', borderBottom: '1px solid #f5f5f5' }}><strong>Search Engine Dominance (SEO):</strong> High-intent local targeting, programmatic SEO generation, technical compliance audits.</li>
            <li style={{ padding: '15px 0', borderBottom: '1px solid #f5f5f5' }}><strong>Systems & Automation:</strong> M-Pesa Daraja APIs, CRM pipeline automation, custom AI chat infrastructure.</li>
            <li style={{ padding: '15px 0' }}><strong>Strategic Digital Marketing:</strong> Paid PPC logic, high-end social media community orchestration, Google Ads execution.</li>
          </ul>
        </div>

        {/* Section: Case Studies Summary */}
        <div className="print-break" style={{ marginBottom: '60px' }}>
          <h3 style={{ fontSize: '2rem', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '20px' }}>04. Proven Success</h3>
          <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '20px', borderLeft: '4px solid #000' }}>
            <h4 style={{ fontSize: '1.3rem', marginBottom: '5px' }}>Mell Fashion — E-commerce Restructuring</h4>
            <p style={{ color: '#555', marginBottom: '10px' }}><strong>Metric:</strong> 45% Conversion Leap</p>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>Upgraded a fragmented, slow site to a customized Next.js application with built-in instant M-Pesa automated checkouts.</p>
          </div>
          <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #0056b3' }}>
            <h4 style={{ fontSize: '1.3rem', marginBottom: '5px' }}>Local CBD Restaurant — POS Integration</h4>
            <p style={{ color: '#555', marginBottom: '10px' }}><strong>Metric:</strong> 180% Increase in Online Orders</p>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>Engineered a bridge between their digital menu and a cloud POS, coupled with targeted local SEO, slashing manual coordination.</p>
          </div>
        </div>

        {/* Contact info back cover */}
        <div className="print-break" style={{ textAlign: 'center', padding: '80px 0 20px', borderTop: '2px solid #000' }}>
          <h3 style={{ fontSize: '2rem', marginBottom: '20px' }}>Partner With Us</h3>
          <p style={{ fontSize: '1.2rem', marginBottom: '10px' }}>GrowthLab Limited</p>
          <p style={{ color: '#555', marginBottom: '20px' }}>Westlands, Nairobi, Kenya</p>
          <div style={{ display: 'inline-block', padding: '10px 20px', background: '#e0e0e0', fontWeight: 'bold' }}>
            https://www.growthlab.co.ke
          </div>
        </div>

      </div>
    </div>
  );
}
