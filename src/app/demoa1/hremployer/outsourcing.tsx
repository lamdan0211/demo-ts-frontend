'use client';

import { OutsourcingProps } from '@/lib/types';

export default function OutsourcingPage({ siteId, language = 'vi' }: OutsourcingProps) {
  return (
    <>
      <div className="banner_hr">
        <div className="bodyContainer">
          <div className="text_banner">
            <h2>Outsourcing</h2>
            <h4>Cost effective, Confidential, Accuracy, Speed, Legal Compliance, Focused Management</h4>
            <p>Whether your organisation are looking to outsource your payroll or for temporary staff, we are your solution</p>
          </div>
        </div>
      </div>
      
      <div id="main-content">
        <div id="col709">            
          <div className="content_fck">
            <p style={{ paddingBottom: '10px' }}>
              HRVietnam will work in partnership with your organization's human resource and administration department to provide a variety of flexible and creative outsourcing options tailored to your specific needs.
            </p>
            
            <p style={{ paddingBottom: '10px', paddingLeft: '135px' }}>
              <img src="/hrvietnam/images/payroll.png" alt="Payroll Management" />
            </p>
            
            <p style={{ paddingBottom: '10px', fontWeight: 'bold', fontSize: '14px' }}>
              Payroll Management
            </p>
            <p>• Managing employment records and labour contracts</p>
            <p>• Reporting and registration to relevant authorities</p>
            <p>• Processing payments to employees and authorities</p>
            <p>• Handling social/health/un-employment insurance claims</p>
            <p>• Finalizing annual personal income tax returns</p>
            <p>• Consulting and updating on labour laws</p>
            <p style={{ paddingBottom: '10px' }}>
              • Providing other payroll and HR related support
            </p>
            
            <p style={{ paddingBottom: '10px', fontWeight: 'bold', fontSize: '14px' }}>
              Temporary staffing
            </p>
            <p style={{ paddingBottom: '10px' }}>
              • Recruit temporary staff (short term and long term)
            </p>
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
                <p className="email">outsource@mail.careerbuilder.vn</p>
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
