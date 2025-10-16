import { getSiteConfig } from '@/lib/site-config';
import Header from '@/app/demoa2/common/_header';
import Footer from '@/app/demoa2/common/_footer';
import JobsPage from './index';
import { demoa2FooterData, demoa2HeaderData } from '@/lib/sample-data';

export default async function Demoa2JobsPage() {
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
        controller="jobs"
        action="index"
        arrMenuCates={demoa2HeaderData.arrMenuCates}
        listFeatureCareer={demoa2HeaderData.listFeatureCareer}
        currentUrl="/demoa2/jobs"
        CHANGE_LANG_URL="/demoa2/jobs?lang=vi"
        language={siteConfig?.language || 'en'}
      />

      <JobsPage 
        siteId="demoa2" 
        arrRwInfo={demoa2HeaderData.arrRwInfo}
        arrEmployer={demoa2HeaderData.arrEmployer}
        arrMenuCates={demoa2HeaderData.arrMenuCates}
        language="en"
      />

      <Footer
        siteId={siteId}
        arrFooterMenuCates={demoa2FooterData}
        language={siteConfig?.language || 'en'}
      />
    </div>
  );
}
