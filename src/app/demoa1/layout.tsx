import { getSiteConfig } from '@/lib/site-config';
import LayoutWrapper from '@/layouts/LayoutWrapper';

interface Demoa1LayoutProps {
  children: React.ReactNode;
}

export default async function Demoa1Layout({ children }: Demoa1LayoutProps) {
  const siteId = 'demoa1';
  const siteConfig = getSiteConfig(siteId);

  return (
    <LayoutWrapper
      siteId={siteId}
      layoutType={siteConfig?.layoutType || "03"}
      owner="demoa1" // Owner sử dụng theme
      tempName="demoa1" // Template name
      controller="index"
      action="index"
      arrFunction={{ SUPPORT_MOBILE: true }}
      arrSupportedLanguages={['en', 'vi']}
      arrMenuCates={[]}
      CHANGE_LANG_URL="/en"
      currentUrl={`/demoa1`}
      title="Demoa1 - Job Portal"
      description="Find management and executive level jobs at Demoa1"
      keywords="jobs, careers, employment, demoa1"
    >
      {children}
    </LayoutWrapper>
  );
}
