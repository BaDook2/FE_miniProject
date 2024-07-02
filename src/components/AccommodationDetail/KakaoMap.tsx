import { IAccommodation } from '@/app/(main)/[id]/page';
import { useEffect, useState } from 'react';
import Loading from '../common/Loading';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

function Kakaomap({ data }: { data: IAccommodation }) {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    const kakaoMapScript = document.createElement('script');
    kakaoMapScript.async = true;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=1dbf251aae505aa5f3bff1ea4dd72df9&autoload=false`;

    kakaoMapScript.onload = () => {
      setIsScriptLoaded(true);
    };

    document.head.appendChild(kakaoMapScript);
  }, []);

  useEffect(() => {
    if (isScriptLoaded) {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const location = new window.kakao.maps.LatLng(
          data.latitude,
          data.longitude,
        );
        const options = {
          center: location,
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);
        const marker = new window.kakao.maps.Marker({
          position: location,
        });
        marker.setMap(map);
      });
    }
  }, [isScriptLoaded, data.latitude, data.longitude]);

  return (
    <div>
      {isScriptLoaded ? (
        <div id="map" className="w-full h-[400px] rounded-xl" />
      ) : (
        <Loading width="[400px]" height="[400px]" />
      )}
    </div>
  );
}

export default Kakaomap;
