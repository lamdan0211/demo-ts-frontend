import { getSiteConfig } from '@/lib/site-config';
import LayoutWrapper from '@/layouts/LayoutWrapper';

interface Demoa2LayoutProps {
  children: React.ReactNode;
}

export default async function Demoa2Layout({ children }: Demoa2LayoutProps) {
  const siteId = 'demoa2';
  const siteConfig = getSiteConfig(siteId);

  return (
    <LayoutWrapper
      siteId={siteId}
      layoutType={siteConfig?.layoutType || "default"}
      owner="demoa2" // Owner sử dụng theme
      tempName="demoa2" // Template name (sử dụng theme demoa2)
      controller="index"
      action="index"
      arrFunction={{ SUPPORT_MOBILE: true }}
      arrSupportedLanguages={['en', 'vi']}
      arrMenuCates={[]}
      CHANGE_LANG_URL="/en"
      currentUrl={`/demoa2`}
      title="Demoa2 - Job Portal"
      description="Find management and executive level jobs at Demoa2"
      keywords="jobs, careers, employment, demoa2"
    >
      {children}
    </LayoutWrapper>
  );
}
