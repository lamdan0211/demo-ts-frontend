import { getSiteConfig } from '@/lib/site-config';
import LayoutWrapper from '@/layouts/LayoutWrapper';

interface HoasenLayoutProps {
  children: React.ReactNode;
}

export default async function HoasenLayout({ children }: HoasenLayoutProps) {
  const siteId = 'hoasen';
  const siteConfig = getSiteConfig(siteId);

  return (
    <LayoutWrapper
      siteId={siteId}
      layoutType={siteConfig?.layoutType || "premium"}
      owner="hoasen" // Owner sử dụng theme
      tempName="hoasen" // Template name (sử dụng theme hoasen)
      controller="index"
      action="index"
      arrFunction={{ SUPPORT_MOBILE: true }}
      arrSupportedLanguages={['en', 'vi']}
      arrMenuCates={[]}
      CHANGE_LANG_URL="/en"
      currentUrl={`/hoasen`}
      title="Hoasen - Job Portal"
      description="Find management and executive level jobs at Hoasen"
      keywords="jobs, careers, employment, hoasen"
    >
      {children}
    </LayoutWrapper>
  );
}
