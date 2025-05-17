
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define os tipos para nosso sistema
export interface Project {
  id: string;
  name: string;
  date: Date;
  originalFile: string;
  tracks: {
    id: string;
    name: string;
    audioUrl: string;
    type: 'vocals' | 'drums' | 'bass' | 'other';
  }[];
}

export interface UserPlan {
  name: 'Free' | 'Basic' | 'Pro' | 'Enterprise';
  creditsTotal: number;
  creditsRemaining: number;
  features: string[];
  priceMonthly?: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  projects: Project[];
  plan: UserPlan;
}

// Estado inicial do usuário (simulado)
const mockUser: UserProfile = {
  id: '1',
  name: 'Demo User',
  email: 'demo@demixer.app',
  avatar: 'https://i.pravatar.cc/150?img=32',
  projects: [
    {
      id: '1',
      name: 'Sample Project',
      date: new Date(),
      originalFile: 'sample.mp3',
      tracks: [
        {
          id: '1',
          name: 'Vocals',
          audioUrl: 'https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg',
          type: 'vocals',
        },
        {
          id: '2',
          name: 'Drums',
          audioUrl: 'https://actions.google.com/sounds/v1/alarms/medium_bell_ringing_near.ogg',
          type: 'drums',
        },
      ],
    },
  ],
  plan: {
    name: 'Free',
    creditsTotal: 3,
    creditsRemaining: 2,
    features: ['Separação básica de faixas', 'Até 3 projetos por mês'],
  },
};

// Definindo o tipo do contexto
interface UserContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  saveProject: (project: Project) => void;
  useCredit: () => boolean;
}

// Criando o contexto
const UserContext = createContext<UserContextType | undefined>(undefined);

// Hook para acessar o contexto
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser deve ser usado dentro de um UserProvider');
  }
  return context;
};

// Provedor do contexto
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Simular o estado autenticado em desenvolvimento
  useEffect(() => {
    // Em produção, isso seria substituído por uma verificação real
    // de autenticação com Supabase, Firebase, etc.
    const savedUser = localStorage.getItem('demixer_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Login simulado
  const login = async (email: string, password: string) => {
    // Simulando um delay para parecer uma API real
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    // Em produção, isso seria uma chamada real à API de autenticação
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('demixer_user', JSON.stringify(mockUser));
  };

  // Logout
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('demixer_user');
  };

  // Salvar projeto
  const saveProject = (project: Project) => {
    if (user) {
      const updatedUser = { 
        ...user,
        projects: [project, ...user.projects]
      };
      setUser(updatedUser);
      localStorage.setItem('demixer_user', JSON.stringify(updatedUser));
    }
  };

  // Usar um crédito 
  const useCredit = () => {
    if (user && user.plan.creditsRemaining > 0) {
      const updatedUser = {
        ...user,
        plan: {
          ...user.plan,
          creditsRemaining: user.plan.creditsRemaining - 1
        }
      };
      setUser(updatedUser);
      localStorage.setItem('demixer_user', JSON.stringify(updatedUser));
      return true;
    }
    return false;
  };

  return (
    <UserContext.Provider value={{
      user,
      isAuthenticated,
      login,
      logout,
      saveProject,
      useCredit
    }}>
      {children}
    </UserContext.Provider>
  );
};
