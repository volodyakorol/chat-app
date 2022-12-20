import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

import { TSocketEmitTypes, TSocketOnTypes } from '@/shared/types';

const socket: Socket<TSocketOnTypes, TSocketEmitTypes> = io(process.env.NEXT_PUBLIC_BACKEND_URL ?? '', {
  withCredentials: true,
});

export function useSocket<K extends keyof TSocketOnTypes, F = TSocketOnTypes[K]>(eventName?: K, cb?: F) {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (eventName) socket.on(eventName, cb as any);

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      socket.off(eventName, cb as any);
    };
  }, [eventName, cb]);

  return socket;
}
