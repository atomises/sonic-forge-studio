
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import DemixerHeader from '@/components/DemixerHeader';

const Login = () => {
  const { login, isAuthenticated } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      await login(email, password);
      // Login bem sucedido é gerenciado pelo contexto
    } catch (err) {
      setError('Falha no login. Verifique suas credenciais.');
    } finally {
      setIsLoading(false);
    }
  };

  // Redirecionar se já autenticado
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-demixer-darker to-demixer-dark text-white">
      <DemixerHeader />
      
      <main className="flex-grow container mx-auto px-4 pb-16 flex justify-center items-center">
        <Card className="w-full max-w-md bg-demixer-darker border-demixer-accent">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Entrar</CardTitle>
            <CardDescription className="text-center text-gray-400">
              Faça login para acessar seus projetos e créditos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded bg-red-900/20 border border-red-800 text-red-300 text-sm">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                  className="bg-demixer-dark border-gray-700"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">Senha</label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="bg-demixer-dark border-gray-700"
                />
              </div>
              <Button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-demixer-accent hover:bg-demixer-accent-hover"
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-gray-400">
              <span>Não tem conta ainda? </span>
              <a href="#" className="text-demixer-accent hover:underline">
                Criar conta
              </a>
            </div>
            <div className="text-xs text-center text-gray-500">
              Dica: Use qualquer email e senha para entrar nesta demonstração
            </div>
          </CardFooter>
        </Card>
      </main>
      
      <footer className="bg-demixer-darker py-4 text-center text-gray-500 text-sm">
        <p>Demixer &copy; {new Date().getFullYear()} - Estúdio de Demolição Sonora</p>
      </footer>
    </div>
  );
};

export default Login;
