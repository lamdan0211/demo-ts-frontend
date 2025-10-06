import { getSiteConfig } from '@/lib/site-config';
import Header from '@/app/hoasen/common/_header';
import Footer from '@/app/hoasen/common/_footer';
import ContactPage from './index';
import { hoasenHeaderData, hoasenFooterData } from '@/lib/sample-data';

export default async function HoasenContactPage() {
  const siteId = 'hoasen';
  const siteConfig = getSiteConfig(siteId);

  return (
    <div className="min-h-screen">
      <Header
        siteId={siteId}
        arrRwInfo={hoasenHeaderData.arrRwInfo}
        arrEmployer={hoasenHeaderData.arrEmployer}
        controller="contact"
        action="index"
        arrMenuCates={hoasenHeaderData.arrMenuCates}
        listFeatureCareer={hoasenHeaderData.listFeatureCareer}
        currentUrl="/hoasen/contact"
        CHANGE_LANG_URL="/hoasen?lang=en"
      />

      <ContactPage
        siteId={siteId}
        language={siteConfig?.language || 'vi'}
      />

      <Footer
        siteId={siteId}
        arrFooterMenuCates={hoasenFooterData}
        language={siteConfig?.language || 'vi'}
      />
    </div>
  );
}
