
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import DemixerHeader from '@/components/DemixerHeader';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';

const Dashboard = () => {
  const { user, isAuthenticated, logout } = useUser();

  // Redirecionar se não autenticado
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-demixer-darker to-demixer-dark text-white">
      <DemixerHeader />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between mb-8 gap-6">
          {/* Profile Card */}
          <Card className="w-full md:w-1/3 bg-demixer-darker border-gray-700">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-demixer-accent flex items-center justify-center overflow-hidden">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xl font-bold">{user.name.charAt(0)}</span>
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <p className="text-gray-400">{user.email}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="outline"
                className="w-full border-gray-700 text-gray-300 hover:bg-gray-800"
                onClick={() => logout()}
              >
                Sair
              </Button>
            </CardContent>
          </Card>

          {/* Credits & Plan Card */}
          <Card className="w-full md:w-2/3 bg-demixer-darker border-gray-700">
            <CardHeader>
              <CardTitle>Seu Plano: {user.plan.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Credits indicator */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Créditos disponíveis</span>
                  <span>{user.plan.creditsRemaining}/{user.plan.creditsTotal}</span>
                </div>
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-demixer-accent" 
                    style={{ width: `${(user.plan.creditsRemaining / user.plan.creditsTotal) * 100}%` }}
                  />
                </div>
              </div>
              
              {/* Plan features */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-400">Recursos incluídos:</h4>
                <ul className="list-disc pl-5 text-sm space-y-1 text-gray-300">
                  {user.plan.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-demixer-accent hover:bg-demixer-accent-hover">
                Atualizar Plano
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Projects Section */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Seus Projetos</h2>
            <Button className="bg-demixer-accent hover:bg-demixer-accent-hover" onClick={() => window.location.href="/"}>
              Novo Projeto
            </Button>
          </div>

          {user.projects.length > 0 ? (
            <Card className="bg-demixer-darker border-gray-700">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Faixas</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {user.projects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell className="font-medium">{project.name}</TableCell>
                      <TableCell>{formatDate(project.date)}</TableCell>
                      <TableCell>{project.tracks.length}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-700 text-gray-300 hover:bg-gray-800"
                          >
                            Visualizar
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          ) : (
            <Card className="bg-demixer-darker border-gray-700 p-8 text-center">
              <p className="text-gray-400 mb-4">Você ainda não tem projetos</p>
              <Button className="bg-demixer-accent hover:bg-demixer-accent-hover" onClick={() => window.location.href="/"}>
                Criar Primeiro Projeto
              </Button>
            </Card>
          )}
        </section>
      </main>
      
      <footer className="bg-demixer-darker py-4 text-center text-gray-500 text-sm mt-auto">
        <p>Demixer &copy; {new Date().getFullYear()} - Estúdio de Demolição Sonora</p>
      </footer>
    </div>
  );
};

export default Dashboard;
