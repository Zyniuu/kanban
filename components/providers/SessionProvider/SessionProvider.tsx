'use client'

import React, { createContext, useContext, useEffect, useState } from "react";


interface Session {
    id: string;
    username: string;
    email: string;
    locale: string;
    imageUrl: string;
};

interface UpdateSession {
    username?: string;
    email?: string;
    locale?: string;
    imageUrl?: string;
}

interface SessionContextType {
    session: Session | null;
    updateSession: (newSessionData: UpdateSession) => Promise<void>;
};

interface SessionProviderProps {
    children: React.ReactNode;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
    const [session, setSession] = useState<Session | null>(null);

    const loadSession = async () => {
        try {
            const res = await fetch('/api/users/me', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            if (res.ok){
                const resData = await res.json();
                setSession(resData.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const updateSession = async (newSessionData: UpdateSession) => {
        try {
            const res = await fetch(`/api/users/update/${session?.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...newSessionData }),
            });
            
            if (res.ok) {
                loadSession();
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadSession();
    }, []);

    return (
        <SessionContext.Provider value={{ session, updateSession }}>
            {children}
        </SessionContext.Provider>
    );
}

export const useSession = (): SessionContextType => {
    const context = useContext(SessionContext);
    if (context === undefined) throw new Error('useSession must be used within a SessionProvider');
    return context;
}