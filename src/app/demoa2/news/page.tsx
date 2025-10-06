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
        <h1 className="text-3xl font-bold mb-6">News</h1>
        <p className="text-gray-600">News page content will be here.</p>
      </div>
      
      <Footer 
        siteId={siteId} 
        arrFooterMenuCates={demoa2FooterData}
        language={siteConfig?.language || 'en'}
      />
    </div>
  );
}
