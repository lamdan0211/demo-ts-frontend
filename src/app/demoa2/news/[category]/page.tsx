'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Header from '../../common/_header';
import Footer from '../../common/_footer';
import { demoa2HeaderData, demoa2FooterData } from '@/lib/sample-data';

interface NewsCategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export default function NewsCategoryPage({ params }: NewsCategoryPageProps) {
  const { category } = React.use(params);

  // Map category slugs to display names
  const categoryMap: Record<string, { name: string; description: string }> = {
    'technology': {
      name: 'Technology News',
      description: 'Latest technology trends, innovations, and industry updates'
    },
    'career-tips': {
      name: 'Career Tips',
      description: 'Professional development advice and career guidance'
    },
    'industry-updates': {
      name: 'Industry Updates',
      description: 'News and updates from various industries'
    }
  };

  const categoryInfo = categoryMap[category] || {
    name: 'News',
    description: 'Latest news and updates'
  };

  // Sample articles for each category
  const getSampleArticles = (cat: string) => {
    const baseArticles = [
      {
        id: 1,
        title: `Top 5 ${categoryInfo.name} Trends in 2024`,
        excerpt: `Discover the latest trends and developments in ${categoryInfo.name.toLowerCase()}.`,
        date: '2024-01-15',
        author: 'Admin',
        image: '/themes/hoasen/images/sample-news-1.jpg',
        category: categoryInfo.name
      },
      {
        id: 2,
        title: `How to Stay Updated with ${categoryInfo.name}`,
        excerpt: `Learn effective strategies to keep up with the latest ${categoryInfo.name.toLowerCase()}.`,
        date: '2024-01-10',
        author: 'Editor',
        image: '/themes/hoasen/images/sample-news-2.jpg',
        category: categoryInfo.name
      },
      {
        id: 3,
        title: `Expert Insights on ${categoryInfo.name}`,
        excerpt: `Professional insights and analysis from industry experts.`,
        date: '2024-01-05',
        author: 'Expert',
        image: '/themes/hoasen/images/sample-news-3.jpg',
        category: categoryInfo.name
      }
    ];

    return baseArticles;
  };

  const articles = getSampleArticles(category);

  return (
    <div className="min-h-screen">
      <Header
        siteId="demoa2"
        arrRwInfo={demoa2HeaderData.arrRwInfo}
        arrEmployer={{
          ...demoa2HeaderData.arrEmployer,
          RW_LOGO: 'logo.png'
        }}
        controller="news"
        action="category"
        arrMenuCates={demoa2HeaderData.arrMenuCates}
        listFeatureCareer={demoa2HeaderData.listFeatureCareer}
        currentUrl={`/demoa2/news/${category}`}
        CHANGE_LANG_URL={`/demoa2/news/${category}?lang=vi`}
        language="en"
      />
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            {/* Breadcrumb */}
            <nav aria-label="breadcrumb" className="mb-4">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/demoa2">Home</a></li>
                <li className="breadcrumb-item"><a href="/demoa2/news">News</a></li>
                <li className="breadcrumb-item active" aria-current="page">{categoryInfo.name}</li>
              </ol>
            </nav>

            {/* Page Header */}
            <div className="page-header mb-4">
              <h1 className="h2 text-primary">{categoryInfo.name}</h1>
              <p className="text-muted">{categoryInfo.description}</p>
            </div>

            {/* Articles List */}
            <div className="row">
              {articles.map((article) => (
                <div key={article.id} className="col-md-6 mb-4">
                  <div className="card h-100 shadow-sm">
                    <div className="card-img-top" style={{ height: '200px', background: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span className="text-muted">Image Placeholder</span>
                    </div>
                    <div className="card-body d-flex flex-column">
                      <div className="mb-2">
                        <span className="badge bg-primary">{article.category}</span>
                      </div>
                      <h5 className="card-title">
                        <a href={`/demoa2/news/${category}/${article.id}`} className="text-decoration-none">
                          {article.title}
                        </a>
                      </h5>
                      <p className="card-text text-muted flex-grow-1">{article.excerpt}</p>
                      <div className="d-flex justify-content-between align-items-center mt-auto">
                        <small className="text-muted">
                          By {article.author} • {new Date(article.date).toLocaleDateString()}
                        </small>
                        <a href={`/demoa2/news/${category}/${article.id}`} className="btn btn-outline-primary btn-sm">
                          Read More
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <nav aria-label="News pagination" className="mt-4">
              <ul className="pagination justify-content-center">
                <li className="page-item disabled">
                  <span className="page-link">Previous</span>
                </li>
                <li className="page-item active">
                  <span className="page-link">1</span>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">2</a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">3</a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">Next</a>
                </li>
              </ul>
            </nav>
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
        arrFooterMenuCates={demoa2FooterData}
        language="en"
      />
    </div>
  );
}