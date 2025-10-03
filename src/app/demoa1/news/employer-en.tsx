'use client';

import { EmployerPageProps } from '@/lib/types';

export default function EmployerEn({ 
  siteId 
}: EmployerPageProps) {
  return (
    <>
      <div className="banner_employer">
        <div className="welcome_em">
          <h3>Welcome to HR Vietnam's Talent Solution</h3>
          <p>
            Providing clients with highly skilled Executive and Management-level talent nationwide.
            HR Vietnam connects you with savvy, experienced professionals seeking the management-level positions you need to fill. Easily choose your next hire from a selection of candidates, seeking positions matching their advanced experience.
            HR Vietnam personalizes your recruitment process and acts as an extension of your own HR team.
          </p>
        </div>
        <div className="contact_em">
          <p>With HR Vietnam we guarantee our recruits in writing. Why not contact our recruitment consultants today?</p>
          <p><strong>Tel</strong> : &nbsp;&nbsp; (08) 8 38220 6060</p>
          <p><strong>Fax</strong> :&nbsp;&nbsp; (08) 8 3824 1866</p>
          <p><strong>Email</strong> : info@hrvietnam.com</p>
        </div>
      </div>

      <div id="main-content"> 
        <div className="step_em">
          <h4>Experience</h4>
          <p>Work with our recruitment consultants who are true industry experts with years of expertise</p>
        </div>
        <div className="row_next"></div>
        <div className="step_em">
          <h4>Talent</h4>
          <p>The broadest network of talent locally and globally across all industries with personal connections to top candidates</p>
        </div>
        <div className="row_next"></div>
        <div className="step_em" style={{ marginRight: '-9px' }}>
          <h4>Screening</h4>
          <p>Professional screening and interviewing using tailored approaches based on your specific needs</p>
        </div>
      </div>
    </>
  );
}
