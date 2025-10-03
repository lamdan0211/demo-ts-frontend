'use client';

import { SourceScreenProps } from '@/lib/types';

// Translation function (equivalent to PHP |t filter)
function t(key: string, language: 'vi' | 'en' = 'vi'): string {
  const translations: Record<string, Record<string, string>> = {
    '_hr_download_link_': {
      vi: '/downloads/source-screen-sales-kit.pdf',
      en: '/downloads/source-screen-sales-kit.pdf'
    }
  };
  
  return translations[key]?.[language] || key;
}

export default function SourceScreenPage({ siteId, language = 'vi' }: SourceScreenProps) {
  return (
    <>
      <div className="banner_hr Source_Screen">
        <div className="bodyContainer">
          <div className="text_banner">
            <h2>Source & Screen</h2>
            <h4>We find - You hire</h4>
            <h4>Source: Tapping the right resources</h4>
            <h4>Screen: The ideal candidate</h4>
          </div>
        </div>
      </div>
      
      <div id="main-content">
        <div id="col709">            
          <div className="content_fck">
            <p style={{ fontWeight: 'bold', paddingBottom: '10px' }}>
              We find - You hire
            </p>
            <p style={{ paddingBottom: '10px', textAlign: 'justify' }}>
              We will find the right candidates worldwide for your organization, utilizing the best sourcing techniques, resources and recruiting solutions available. CareerBuilder's Source and Screen gives your team time back for important tasks by enlisting CareerBuilder to do the preliminary work of the hiring process allowing you to focus on the essentials: interviewing the right candidates.
            </p>
            
            <p style={{ fontWeight: 'bold', paddingBottom: '10px' }}>
              Source: Tapping the right resources
            </p>
            <p style={{ paddingBottom: '10px', textAlign: 'justify' }}>
              Often the challenge is to address the right people at the right time and right place with the right message. CareerBuilder takes care of the tedious process of finding targeted platforms and develops creative messages to ensure the optimal applicants express interest. We tap into a variety of niche job boards, social media as well as traditional online advertising and our network worldwide. A periodical reporting summary will keep you in the know about your search.
            </p>
            
            <p style={{ fontWeight: 'bold', paddingBottom: '10px' }}>
              Screen: The ideal candidate
            </p>
            <p style={{ paddingBottom: '10px', textAlign: 'justify' }}>
              A long list of applicants is good, but a short-list of suitable candidates is better. CareerBuilder takes care of the time-consuming screening of applications and pre qualifies all applicants via telephone interviews. We then pass along the 'best-fit' candidates for your team to interview.
            </p>
            
            <p style={{ fontWeight: 'bold', paddingBottom: '10px' }}>
              Benefits
            </p>
            <p style={{ paddingBottom: '5px', textAlign: 'justify' }}>
              • Industry expertise: detailed needs assessment for each vacancy.
            </p>
            <p style={{ paddingBottom: '5px', textAlign: 'justify' }}>
              • Bespoke recruiting strategy: sourcing experts to target candidates on proper media.
            </p>
            <p style={{ paddingBottom: '5px', textAlign: 'justify' }}>
              • Faster time-to-hire: outsource the time consuming parts of the recruitment process.
            </p>
            <p style={{ paddingBottom: '5px', textAlign: 'justify' }}>
              • Detailed reporting: get the real scoop on what candidates are saying about your vacancy.
            </p>
            <p style={{ paddingBottom: '5px', textAlign: 'justify' }}>
              • Ease of use: let CareerBuilder do the heavy lifting and provide you pre-selected candidates.
            </p>
            
            <div style={{ padding: '7px 0 20px 0', borderTop: '2px solid #666', marginTop: '15px' }}>
              <p style={{ float: 'left', paddingBottom: '20px', fontWeight: 'bold', color: 'rgb(128, 128, 128)', fontSize: '11px', textTransform: 'uppercase', textAlign: 'justify' }}>
                <span style={{ fontFamily: 'verdana,geneva,sans-serif' }}>TESTIMONIAL</span>
              </p>
              <p style={{ float: 'right', textAlign: 'justify' }}>
                <span style={{ fontFamily: 'verdana,geneva,sans-serif' }}>
                  <img src="http://images.careerbuilder.vn/content/Product/quote.png" alt="Quote" />
                </span>
              </p>
              <p style={{ clear: 'both', fontSize: '13px', fontStyle: 'italic', color: 'rgb(153, 153, 153)', paddingBottom: '20px', textAlign: 'justify' }}>
                <span style={{ fontFamily: 'verdana,geneva,sans-serif' }}>
                  "To find a suitable talents is never an easy quest, especially without the help of online services. Thank you, CareerBuilder.vn, for building the bridge that connect us with true talents"
                </span>
              </p>
              <p style={{ fontSize: '13px', fontStyle: 'italic', color: 'rgb(153, 153, 153)', textAlign: 'justify' }}>
                <span style={{ fontFamily: 'verdana,geneva,sans-serif' }}>
                  – Nguyen Vu Hai Long – Corporate HRBP Manager & HR Project, Tan Hiep Phat Group
                </span>
              </p>
            </div>
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
          
          <div className="BoxHolder" style={{ borderTop: '2px solid #666', paddingTop: '10px' }}>
            <p>
              <strong>
                <a target="_blank" href={t('_hr_download_link_', language)}>
                  Download Sales Kit Source & Screen
                </a>
              </strong>
            </p>
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
