import { getSiteConfig } from '@/lib/site-config';
import Header from '@/app/hoasen/common/_header';
import Footer from '@/app/hoasen/common/_footer';
import JobsIndex from './index';
import { hoasenHeaderData, hoasenFooterData } from '@/lib/sample-data';

export default async function HoasenJobsPage() {
  const siteId = 'hoasen';
  const siteConfig = getSiteConfig(siteId);

  return (
    <div className="min-h-screen">
      <Header
        siteId={siteId}
        arrRwInfo={hoasenHeaderData.arrRwInfo}
        arrEmployer={hoasenHeaderData.arrEmployer}
        controller="jobs"
        action="index"
        arrMenuCates={hoasenHeaderData.arrMenuCates}
        listFeatureCareer={hoasenHeaderData.listFeatureCareer}
        currentUrl="/hoasen/jobs"
        CHANGE_LANG_URL="/hoasen?lang=en"
      />

      <JobsIndex
        siteId={siteId}
        language={siteConfig?.language || 'vi'}
        arrJobs={[]}
        arrParam={{
          q: '',
          loc: '',
          dep: 0
        }}
        arrLstBenefit={[]}
        linkParams="/hoasen/jobs"
        is_mobile={false}
      />

      <Footer
        siteId={siteId}
        arrFooterMenuCates={hoasenFooterData}
        language={siteConfig?.language || 'vi'}
      />
    </div>
  );
}
