import { getSiteConfig } from '@/lib/site-config';
import Header from '@/app/hoasen/common/_header';
import Footer from '@/app/hoasen/common/_footer';
import IndexPage from './index';
import { demoa1HeaderData, demoa1FooterData, demoa1IndexData } from '@/lib/sample-data';

export default async function HoasenIndexPage() {
  const siteId = 'hoasen';
  const siteConfig = getSiteConfig(siteId);

  return (
    <div className="min-h-screen">
      <Header 
        siteId={siteId}
        arrRwInfo={demoa1HeaderData.arrRwInfo}
        arrEmployer={demoa1HeaderData.arrEmployer}
        controller="index"
        action="index"
        arrMenuCates={demoa1HeaderData.arrMenuCates}
        listFeatureCareer={demoa1HeaderData.listFeatureCareer}
        currentUrl="/hoasen"
        changeLangUrl="/hoasen?lang=en"
      />
      
      <IndexPage
        siteId={siteId}
        arrRwInfo={demoa1IndexData.arrRwInfo}
        arrIndustries={demoa1IndexData.arrIndustries}
        arrLocations={demoa1IndexData.arrLocations}
        language={siteConfig?.language || 'vi'}
      />
      
      <Footer 
        siteId={siteId} 
        footerMenuCates={demoa1FooterData}
        language={siteConfig?.language || 'vi'}
      />
    </div>
  );
}
