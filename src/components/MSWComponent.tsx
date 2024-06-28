'use client';

import { useEffect, useRef, useState } from 'react';
// import server from '@/mocks/server';

function MswComponent({ children }: { children: React.ReactNode }) {
  const [isMocking, setIsMocking] = useState(false);
  const isWorkerStarted = useRef(false);
  useEffect(() => {
    async function enableApiMocking() {
      if (process.env.NODE_ENV === 'production') {
        setIsMocking(true);
      } else if (
        process.env.NODE_ENV === 'development' &&
        !isWorkerStarted.current
      ) {
        (async () => {
          const { worker } = await import('@/mocks/browser');
          await worker.start();
          setIsMocking(true);
        })();
      }
    }
    enableApiMocking();
  }, []);
  if (!isMocking) {
    return null;
  }

  return children;
}

export default MswComponent;
