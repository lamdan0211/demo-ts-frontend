'use client';

import { ExecutiveProps } from '@/lib/types';

export default function ExecutivePage({ siteId, language = 'vi' }: ExecutiveProps) {
  return (
    <>
      <div className="banner_hr executive">
        <div className="bodyContainer">
          <div className="text_banner">
            <h2>Executive Search and Selection</h2>
            <h4>More talent for opportunities <br />More opportunities for talent</h4>
            <p>Whether you are an organisation looking for great talent, or a talent looking for great opportunities, we are your solution</p>
          </div>
        </div>
      </div>
      
      <div id="main-content" className="">
        <div id="col709">            
          <div className="content_fck">
            <p style={{ paddingBottom: '10px' }}>
              <b>Vision</b>
            </p>
            <p style={{ paddingBottom: '20px' }}>
              To be the leading provider of executive recruitment and human resource outsourcing solutions for the Vietnam market
            </p>
            
            <p style={{ paddingBottom: '10px' }}>
              <b>Mission</b>
            </p>
            <p>To achieve our vision, we:</p>
            <p>• Identify the best talent to fit the requirements of our clients</p>
            <p>• Present managerial and executive-level professionals with positions that provide growth and development for them and our clients</p>
            <p style={{ paddingBottom: '20px' }}>
              • Provide our clients with quality, accurate, timely and cost-effective payroll and associated human resource related solutions that are tailored specifically to meet their organizational needs
            </p>
            
            <p style={{ paddingBottom: '10px' }}>
              <b>Values</b>
            </p>
            <p>HRVietnam and all of our employees take exceptional pride in living and displaying:</p>
            <p>• Reliability</p>
            <p>• Excellence</p>
            <p>• Accountability</p>
            <p>• Customer focus</p>
            <p>• Honesty</p>
            <p>With this philosophy ingrained in HRVietnam, we will extend the REACH of our services to partner with your organization</p>
            <br />
          </div>       
        </div>
        
        <div id="col250">
          <div className="BoxHolder ContactHR">
            <div className="bgcolor_theme headerBox">Contact</div>
            <div className="align_center containerBox">
              <p className="mar_bottom10">
                <a href="#">
                  <img src="/hrvietnam/images/logo2.png" alt="HRVietnam Logo" />
                </a>
              </p>
              <p style={{ color: '#5f6166' }}>
                Pasteur Tower, 139 Pasteur St., D.3, HCMC, Vietnam
              </p>
              <div className="info">
                <p className="hotline">(84-8) 3822 6060 (Ext:123)</p>
                <p className="email">hrvietnam@mail.careerbuilder.vn</p>
              </div>
            </div>
          </div>            
          
          {/* Salary Widget - This would typically be loaded from an external script */}
          <div id="salary-widget" className="salary-widget-container">
            {/* Placeholder for salary widget */}
            <div className="widget-placeholder">
              <p>Salary Widget</p>
              <p>This would be loaded from external script</p>
            </div>
          </div>
        </div>  
      </div>
    </>
  );
}
