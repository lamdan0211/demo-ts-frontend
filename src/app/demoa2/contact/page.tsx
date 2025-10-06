import { getSiteConfig } from '@/lib/site-config';
import Header from '@/app/demoa2/common/_header';
import Footer from '@/app/demoa2/common/_footer';
import ContactPage from './index';
import { demoa2FooterData, demoa2HeaderData } from '@/lib/sample-data';

export default async function Demoa2ContactPage() {
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
        controller="contact"
        action="index"
        arrMenuCates={demoa2HeaderData.arrMenuCates}
        listFeatureCareer={demoa2HeaderData.listFeatureCareer}
        currentUrl="/demoa2/contact"
        CHANGE_LANG_URL="/demoa2/contact?lang=vi"
        language={siteConfig?.language || 'en'}
      />

      <ContactPage
        siteId={siteId}
        language={siteConfig?.language || 'en'}
        detailOwner={{
          EMP_DESC: 'Demo A2 Company - Leading job portal',
          EMP_ADDRESS: '123 Business Street, District 1, Ho Chi Minh City',
          EMP_TEL: '+84 28 9876 5432',
          EMP_FAX: '+84 28 9876 5433',
          EMP_EMAIL: 'contact@demoa2.com'
        }}
        strCaptcha="XYZ789"
      />

      <Footer
        siteId={siteId}
        arrFooterMenuCates={demoa2FooterData}
        language={siteConfig?.language || 'en'}
      />
    </div>
  );
}
