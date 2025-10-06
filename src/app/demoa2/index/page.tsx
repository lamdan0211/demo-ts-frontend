import { getSiteConfig } from '@/lib/site-config';
import Header from '@/app/demoa2/common/_header';
import Footer from '@/app/demoa2/common/_footer';
import Demoa2Index from './index';
import { demoa2FooterData, demoa2HeaderData, demoa2IndexData } from '@/lib/sample-data';

export default async function Demoa2IndexPage() {
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
        controller="index"
        action="index"
        arrMenuCates={demoa2HeaderData.arrMenuCates}
        listFeatureCareer={demoa2HeaderData.listFeatureCareer}
        currentUrl="/demoa2"
        CHANGE_LANG_URL="/demoa2?lang=vi"
        language={siteConfig?.language || 'en'}
      />

      <Demoa2Index
        siteId={siteId}
        arrRwInfo={demoa2IndexData.arrRwInfo}
        arrIndexNews={demoa2IndexData.arrIndexNews}
        arrIndustries={demoa2IndexData.arrIndustries}
        arrLocations={demoa2IndexData.arrLocations}
        language={siteConfig?.language || 'en'}
      />

      <Footer
        siteId={siteId}
        arrFooterMenuCates={demoa2FooterData}
        language={siteConfig?.language || 'en'}
      />
    </div>
  );
}
