
import React from 'react';
import DemixerHeader from '@/components/DemixerHeader';
import PlanSelector from '@/components/PlanSelector';
import { useUser } from '@/contexts/UserContext';

const Plans = () => {
  const { isAuthenticated } = useUser();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-demixer-darker to-demixer-dark text-white">
      <DemixerHeader />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 neon-gradient">
            Planos e Preços
          </h1>
          <p className="text-gray-400">
            Escolha o plano ideal para suas necessidades de produção musical. 
            Quanto mais créditos, mais músicas você pode processar e separar.
          </p>
          {!isAuthenticated && (
            <p className="mt-4 text-demixer-accent">
              <a href="/login" className="underline hover:text-white">
                Faça login
              </a> para gerenciar sua assinatura.
            </p>
          )}
        </div>
        
        <PlanSelector />
        
        <div className="mt-16 max-w-3xl mx-auto">
          <h3 className="text-xl font-bold mb-4 text-center">Perguntas Frequentes</h3>
          
          <div className="space-y-4">
            <div className="p-4 bg-demixer-darker rounded-lg">
              <h4 className="font-medium text-demixer-accent mb-2">O que são créditos?</h4>
              <p className="text-gray-300 text-sm">
                Cada crédito permite processar uma música para separar suas faixas. 
                Uma vez processada, você pode acessar as faixas separadas a qualquer momento sem usar créditos adicionais.
              </p>
            </div>
            
            <div className="p-4 bg-demixer-darker rounded-lg">
              <h4 className="font-medium text-demixer-accent mb-2">Posso cancelar a qualquer momento?</h4>
              <p className="text-gray-300 text-sm">
                Sim, você pode cancelar sua assinatura a qualquer momento. Os créditos restantes permanecerão válidos até o fim do período faturado.
              </p>
            </div>
            
            <div className="p-4 bg-demixer-darker rounded-lg">
              <h4 className="font-medium text-demixer-accent mb-2">Os créditos acumulam?</h4>
              <p className="text-gray-300 text-sm">
                Créditos não utilizados acumulam até o limite de 3 vezes o seu crédito mensal. Por exemplo, no plano Basic 
                você pode acumular até 30 créditos.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-demixer-darker py-4 text-center text-gray-500 text-sm">
        <p>Demixer &copy; {new Date().getFullYear()} - Estúdio de Demolição Sonora</p>
      </footer>
    </div>
  );
};

export default Plans;
