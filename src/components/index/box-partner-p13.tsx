'use client';

import React from 'react';

interface BoxPartnerP13Props {
  k: number;
  language?: 'vi' | 'en';
}

export default function BoxPartnerP13({
  k,
  language = 'vi'
}: BoxPartnerP13Props) {
  return (
    <div className={`section-page ${k % 2 === 1 ? 'bg-odd' : ''}`}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2>Our Partners</h2>
            <p>Trusted by leading companies</p>
            <div className="partner-logos">
              {/* Partner logos will be displayed here */}
              <p>Partner logos will be loaded here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
