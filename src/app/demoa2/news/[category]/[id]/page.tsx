'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Header from '../../../common/_header';
import Footer from '../../../common/_footer';
import { demoa2HeaderData, demoa2FooterData } from '@/lib/sample-data';

interface NewsDetailPageProps {
  params: {
    category: string;
    id: string;
  };
}

export default function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { category, id } = params;

  // Map category slugs to display names
  const categoryMap: Record<string, string> = {
    'technology': 'Technology News',
    'career-tips': 'Career Tips',
    'industry-updates': 'Industry Updates'
  };

  const categoryName = categoryMap[category] || 'News';

  // Sample article data
  const getArticleData = (cat: string, articleId: string) => {
    const articles: Record<string, Record<string, any>> = {
      'technology': {
        '1': {
          title: 'Top 5 Technology News Trends in 2024',
          content: `
            <p>Technology continues to evolve at a rapid pace, and 2024 is shaping up to be one of the most exciting years yet. Here are the top 5 technology trends that are reshaping our world:</p>
            
            <h3>1. Artificial Intelligence and Machine Learning</h3>
            <p>AI and ML are becoming more sophisticated and accessible. From chatbots to autonomous vehicles, these technologies are transforming industries across the board. Companies are investing heavily in AI research and development, leading to breakthrough applications in healthcare, finance, and manufacturing.</p>
            
            <h3>2. Quantum Computing</h3>
            <p>Quantum computing is moving from theoretical to practical applications. Major tech companies are racing to build quantum computers that can solve complex problems exponentially faster than classical computers. This technology promises to revolutionize cryptography, drug discovery, and optimization problems.</p>
            
            <h3>3. 5G and Edge Computing</h3>
            <p>The rollout of 5G networks is enabling new possibilities for mobile computing and IoT devices. Edge computing brings processing power closer to where data is generated, reducing latency and improving performance for real-time applications.</p>
            
            <h3>4. Blockchain and Web3</h3>
            <p>Beyond cryptocurrencies, blockchain technology is finding applications in supply chain management, digital identity, and decentralized finance. Web3 promises a more decentralized internet where users have greater control over their data and digital assets.</p>
            
            <h3>5. Sustainable Technology</h3>
            <p>As environmental concerns grow, technology companies are focusing on sustainable solutions. From renewable energy to carbon-neutral data centers, the tech industry is leading the way in creating a more sustainable future.</p>
            
            <p>These trends are not just shaping the technology landscape but are also creating new opportunities for businesses and individuals alike. Staying informed about these developments is crucial for anyone looking to thrive in the digital age.</p>
          `,
          author: 'Tech Expert',
          date: '2024-01-15',
          readTime: '5 min read',
          tags: ['Technology', 'AI', 'Innovation', 'Future']
        }
      },
      'career-tips': {
        '1': {
          title: 'Top 5 Career Tips for Professional Success in 2024',
          content: `
            <p>In today's competitive job market, having the right career strategies can make all the difference. Here are five essential career tips to help you succeed professionally:</p>
            
            <h3>1. Continuous Learning and Skill Development</h3>
            <p>The job market is constantly evolving, and so should your skills. Invest in continuous learning through online courses, certifications, and workshops. Stay updated with industry trends and emerging technologies relevant to your field.</p>
            
            <h3>2. Build a Strong Professional Network</h3>
            <p>Networking is crucial for career advancement. Attend industry events, join professional associations, and maintain relationships with colleagues and mentors. A strong network can open doors to new opportunities and provide valuable career advice.</p>
            
            <h3>3. Develop Soft Skills</h3>
            <p>While technical skills are important, soft skills like communication, leadership, and emotional intelligence are equally valuable. These skills help you work effectively with others and advance into leadership positions.</p>
            
            <h3>4. Set Clear Career Goals</h3>
            <p>Define your short-term and long-term career objectives. Having clear goals helps you make informed decisions about job opportunities, skill development, and career moves. Regularly review and adjust your goals as your career progresses.</p>
            
            <h3>5. Embrace Change and Adaptability</h3>
            <p>The workplace is constantly changing, and adaptability is key to success. Be open to new challenges, different roles, and changing work environments. Flexibility and resilience will help you navigate career transitions successfully.</p>
            
            <p>Remember, career success is a journey, not a destination. By implementing these tips and staying committed to your professional growth, you can build a rewarding and successful career.</p>
          `,
          author: 'Career Coach',
          date: '2024-01-10',
          readTime: '4 min read',
          tags: ['Career', 'Professional Development', 'Success', 'Tips']
        }
      },
      'industry-updates': {
        '1': {
          title: 'Latest Industry Updates: Key Developments Across Sectors',
          content: `
            <p>Stay informed about the latest developments across various industries. Here's a comprehensive overview of recent updates and trends:</p>
            
            <h3>Technology Sector</h3>
            <p>The technology sector continues to lead innovation with significant investments in AI, cloud computing, and cybersecurity. Major tech companies are expanding their global presence and investing in sustainable technology solutions.</p>
            
            <h3>Healthcare and Life Sciences</h3>
            <p>Healthcare is experiencing rapid transformation with telemedicine, personalized medicine, and digital health solutions. The industry is focusing on improving patient outcomes while reducing costs through technology integration.</p>
            
            <h3>Financial Services</h3>
            <p>Fintech innovations are reshaping banking and financial services. Digital payments, blockchain applications, and robo-advisors are becoming mainstream, while traditional institutions adapt to the digital transformation.</p>
            
            <h3>Manufacturing and Supply Chain</h3>
            <p>Manufacturing is embracing Industry 4.0 with smart factories, IoT integration, and automation. Supply chain resilience has become a priority, leading to increased investment in local manufacturing and diversified supplier networks.</p>
            
            <h3>Energy and Sustainability</h3>
            <p>The energy sector is undergoing a major transition toward renewable sources. Companies are investing in clean energy technologies and implementing sustainability initiatives to meet environmental goals.</p>
            
            <h3>Retail and E-commerce</h3>
            <p>Retail continues to evolve with omnichannel strategies, personalized shopping experiences, and sustainable practices. E-commerce growth is driving innovation in logistics and customer service.</p>
            
            <p>These industry updates highlight the dynamic nature of today's business environment. Staying informed about these developments is essential for professionals across all sectors.</p>
          `,
          author: 'Industry Analyst',
          date: '2024-01-05',
          readTime: '6 min read',
          tags: ['Industry', 'Updates', 'Business', 'Trends']
        }
      }
    };

    return articles[cat]?.[articleId] || {
      title: 'Article Not Found',
      content: '<p>This article could not be found.</p>',
      author: 'Unknown',
      date: new Date().toISOString().split('T')[0],
      readTime: '1 min read',
      tags: []
    };
  };

  const article = getArticleData(category, id);

  return (
    <>
      <Header 
        siteId="demoa2"
        language="en"
        arrMenuCates={demoa2HeaderData.arrMenuCates}
        TN="/demoa2"
        LANGUAGE="en"
      />
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            {/* Breadcrumb */}
            <nav aria-label="breadcrumb" className="mb-4">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/demoa2">Home</a></li>
                <li className="breadcrumb-item"><a href="/demoa2/news">News</a></li>
                <li className="breadcrumb-item"><a href={`/demoa2/news/${category}`}>{categoryName}</a></li>
                <li className="breadcrumb-item active" aria-current="page">{article.title}</li>
              </ol>
            </nav>

            {/* Article Header */}
            <article className="mb-5">
              <header className="mb-4">
                <div className="mb-2">
                  <span className="badge bg-primary">{categoryName}</span>
                </div>
                <h1 className="h2 mb-3">{article.title}</h1>
                <div className="d-flex flex-wrap align-items-center text-muted mb-3">
                  <span className="me-3">
                    <i className="fas fa-user me-1"></i>
                    By {article.author}
                  </span>
                  <span className="me-3">
                    <i className="fas fa-calendar me-1"></i>
                    {new Date(article.date).toLocaleDateString()}
                  </span>
                  <span>
                    <i className="fas fa-clock me-1"></i>
                    {article.readTime}
                  </span>
                </div>
              </header>

              {/* Article Image */}
              <div className="mb-4">
                <div className="bg-light rounded" style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="text-muted fs-4">Featured Image</span>
                </div>
              </div>

              {/* Article Content */}
              <div className="article-content" dangerouslySetInnerHTML={{ __html: article.content }} />

              {/* Article Tags */}
              <div className="mt-4 pt-4 border-top">
                <h6 className="mb-2">Tags:</h6>
                <div className="d-flex flex-wrap gap-1">
                  {article.tags.map((tag: string, index: number) => (
                    <span key={index} className="badge bg-light text-dark">{tag}</span>
                  ))}
                </div>
              </div>

              {/* Social Share */}
              <div className="mt-4 pt-4 border-top">
                <h6 className="mb-3">Share this article:</h6>
                <div className="d-flex gap-2">
                  <button className="btn btn-outline-primary btn-sm">
                    <i className="fab fa-facebook-f me-1"></i> Facebook
                  </button>
                  <button className="btn btn-outline-info btn-sm">
                    <i className="fab fa-twitter me-1"></i> Twitter
                  </button>
                  <button className="btn btn-outline-success btn-sm">
                    <i className="fab fa-linkedin-in me-1"></i> LinkedIn
                  </button>
                  <button className="btn btn-outline-secondary btn-sm">
                    <i className="fas fa-link me-1"></i> Copy Link
                  </button>
                </div>
              </div>
            </article>

            {/* Related Articles */}
            <div className="mt-5">
              <h4 className="mb-4">Related Articles</h4>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className="card">
                    <div className="card-body">
                      <h6 className="card-title">
                        <a href={`/demoa2/news/${category}/2`} className="text-decoration-none">
                          More {categoryName} Content
                        </a>
                      </h6>
                      <p className="card-text text-muted small">Discover more insights and updates in this category.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="card">
                    <div className="card-body">
                      <h6 className="card-title">
                        <a href={`/demoa2/news/${category}/3`} className="text-decoration-none">
                          Latest {categoryName} Trends
                        </a>
                      </h6>
                      <p className="card-text text-muted small">Stay updated with the latest trends and developments.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-md-3">
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0">News Categories</h5>
              </div>
              <div className="card-body">
                <ul className="list-unstyled mb-0">
                  <li className="mb-2">
                    <a href="/demoa2/news/technology" className={`text-decoration-none ${category === 'technology' ? 'fw-bold text-primary' : ''}`}>
                      Technology News
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="/demoa2/news/career-tips" className={`text-decoration-none ${category === 'career-tips' ? 'fw-bold text-primary' : ''}`}>
                      Career Tips
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="/demoa2/news/industry-updates" className={`text-decoration-none ${category === 'industry-updates' ? 'fw-bold text-primary' : ''}`}>
                      Industry Updates
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0">Newsletter</h5>
              </div>
              <div className="card-body">
                <p className="card-text">Subscribe to get the latest news updates.</p>
                <div className="input-group">
                  <input type="email" className="form-control" placeholder="Enter your email" />
                  <button className="btn btn-primary" type="button">Subscribe</button>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Popular Tags</h5>
              </div>
              <div className="card-body">
                <div className="d-flex flex-wrap gap-1">
                  <span className="badge bg-light text-dark">Technology</span>
                  <span className="badge bg-light text-dark">Career</span>
                  <span className="badge bg-light text-dark">Industry</span>
                  <span className="badge bg-light text-dark">Updates</span>
                  <span className="badge bg-light text-dark">Tips</span>
                  <span className="badge bg-light text-dark">News</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer 
        siteId="demoa2"
        language="en"
        arrFooterMenuCates={demoa2FooterData.arrMenuCates}
        TN="/demoa2"
        LANGUAGE="en"
      />
    </>
  );
}