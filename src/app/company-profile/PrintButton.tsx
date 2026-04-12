"use client";

export default function PrintButton() {
  return (
    <button 
      className="btn btn-primary no-print" 
      onClick={() => typeof window !== 'undefined' && window.print()}
      style={{ padding: '12px 25px', background: '#0056b3', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
    >
      Download PDF Document (Print)
    </button>
  );
}
