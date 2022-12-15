import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

import { TSocketEmitTypes, TSocketOnTypes } from '@/shared/types';

const socket: Socket<TSocketOnTypes, TSocketEmitTypes> = io(process.env.NEXT_PUBLIC_BACKEND_URL ?? '', {
  withCredentials: true,
});

// https://codesandbox.io/s/piffv?file=/src/pages/api/socketio.ts:164-173
export default function useSocket<K extends keyof TSocketOnTypes, F = TSocketOnTypes[K]>(eventName?: K, cb?: F) {
  useEffect(() => {
    if (eventName) socket.on(eventName, cb as any);

    return () => {
      socket.off(eventName, cb as any);
    };
  }, [eventName, cb]);

  return socket;
}
