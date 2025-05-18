import { useEffect } from 'react';

const GoogleAd = () => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window as any).adsbygoogle = (window as any).adsbygoogle || [];
      // @ts-ignore
      (window as any).adsbygoogle.push({});
    } catch (e) {
      // ignore
    }
  }, []);

  return (
    <ins className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
      data-ad-slot="1234567890"
      data-ad-format="auto"
      data-full-width-responsive="true"></ins>
  );
};

export default GoogleAd; 