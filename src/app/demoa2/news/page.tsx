import { getSiteConfig } from '@/lib/site-config';
import Header from '@/app/demoa2/common/_header';
import Footer from '@/app/demoa2/common/_footer';
import { demoa2FooterData, demoa2HeaderData } from '@/lib/sample-data';

export default async function Demoa2NewsPage() {
  const siteId = 'demoa2';
  const siteConfig = getSiteConfig(siteId);

  return (
    <div className="min-h-screen">
      <Header 
        siteId={siteId}
        arrRwInfo={demoa2HeaderData.arrRwInfo}
        arrEmployer={{
          ...demoa2HeaderData.arrEmployer,
          RW_LOGO: 'logo.png'
        }}
        controller="news"
        action="index"
        arrMenuCates={demoa2HeaderData.arrMenuCates}
        listFeatureCareer={demoa2HeaderData.listFeatureCareer}
        currentUrl="/demoa2/news"
        CHANGE_LANG_URL="/demoa2/news?lang=vi"
        language={siteConfig?.language || 'en'}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="row">
          <div className="col-md-8">
            <h1 className="text-3xl font-bold mb-6">Latest News</h1>
            <p className="text-gray-600 mb-8">Stay updated with the latest industry news, career tips, and technology updates.</p>
            
            {/* News Categories */}
            <div className="news-categories mb-6">
              <h2 className="text-2xl font-semibold mb-4">News Categories</h2>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Technology News</h5>
                      <p className="card-text">Latest updates in technology and innovation.</p>
                      <a href="/demoa2/news/technology" className="btn btn-primary">Read More</a>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Career Tips</h5>
                      <p className="card-text">Professional development and career advice.</p>
                      <a href="/demoa2/news/career-tips" className="btn btn-primary">Read More</a>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Industry Updates</h5>
                      <p className="card-text">Industry trends and market insights.</p>
                      <a href="/demoa2/news/industry-updates" className="btn btn-primary">Read More</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sample News Articles */}
            <div className="news-articles">
              <h2 className="text-2xl font-semibold mb-4">Recent Articles</h2>
              <div className="list-group">
                <div className="list-group-item">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">The Future of Remote Work in 2024</h5>
                    <small>3 days ago</small>
                  </div>
                  <p className="mb-1">Exploring how remote work is evolving and what it means for job seekers and employers.</p>
                  <small>Technology News</small>
                </div>
                <div className="list-group-item">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">5 Essential Skills for Tech Professionals</h5>
                    <small>1 week ago</small>
                  </div>
                  <p className="mb-1">Key skills that every technology professional should develop to stay competitive.</p>
                  <small>Career Tips</small>
                </div>
                <div className="list-group-item">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">AI and Machine Learning Job Market Trends</h5>
                    <small>2 weeks ago</small>
                  </div>
                  <p className="mb-1">How artificial intelligence is reshaping the job market and creating new opportunities.</p>
                  <small>Industry Updates</small>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="sidebar">
              <div className="card mb-4">
                <div className="card-header">
                  <h5>Newsletter</h5>
                </div>
                <div className="card-body">
                  <p>Subscribe to our newsletter for the latest updates.</p>
                  <div className="input-group">
                    <input type="email" className="form-control" placeholder="Enter your email" />
                    <button className="btn btn-outline-secondary" type="button">Subscribe</button>
                  </div>
                </div>
              </div>
              
              <div className="card">
                <div className="card-header">
                  <h5>Popular Tags</h5>
                </div>
                <div className="card-body">
                  <span className="badge bg-primary me-1 mb-1">Technology</span>
                  <span className="badge bg-secondary me-1 mb-1">Career</span>
                  <span className="badge bg-success me-1 mb-1">Remote Work</span>
                  <span className="badge bg-info me-1 mb-1">AI</span>
                  <span className="badge bg-warning me-1 mb-1">Job Market</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer 
        siteId={siteId} 
        arrFooterMenuCates={demoa2FooterData}
        language={siteConfig?.language || 'en'}
      />
    </div>
  );
}
