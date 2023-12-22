"use client"
import React, { createContext, FC, ReactNode, useState } from 'react';
import { Session } from '@/models/session';
import { useRouter } from 'next/navigation'

export type SessionContextValue = {
  data?: Session;
  clearSession: () => void;
  updateSession: (session: Session) => void;
};

export const SessionContext = createContext<SessionContextValue>({
  clearSession: () => { },
  updateSession: () => { },
});

export type Props = {
  children: ReactNode;
};

export const SessionProvider: FC<Props> = ({ children }) => {
  const [session, setSession] = useState<Session>({ isAuthenticated: false });
  const router = useRouter()

  const clearSession = () => {
    setSession({ isAuthenticated: false })
    router.push('/sign-in')
    localStorage.removeItem('accessToken')
  }

  const updateSession = (session: Session) => {
    setSession(session);
    router.push('/')
  }
  
  return (
    <SessionContext.Provider value={{
      data: session,
      clearSession,
      updateSession
    }}>
      {children}
    </SessionContext.Provider>
  );
};

