'use client';

import { BoxSocialFanpageProps, SocialNetwork } from '@/lib/types';

export default function BoxSocialFanpage({ 
  arrListSoNetwork = [] 
}: BoxSocialFanpageProps) {
  // Filter social networks for fanpage (IDs 8 and 9)
  const fanpageNetworks = arrListSoNetwork.filter((network: SocialNetwork) => 
    (network.SO_NETWORK_ID === 8 || network.SO_NETWORK_ID === 9) &&
    network.SO_NETWORK_OWNER_STATUS === 1 &&
    network.SO_NETWORK_LINK
  );

  if (fanpageNetworks.length === 0) {
    return null;
  }

  return (
    <>
      {fanpageNetworks.map((network: SocialNetwork) => (
        <div key={network.SO_NETWORK_ID} className="BoxHolder">
          <div 
            dangerouslySetInnerHTML={{ 
              __html: network.SO_NETWORK_LINK 
            }} 
          />
        </div>
      ))}
    </>
  );
}
