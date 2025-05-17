
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useUser } from '@/contexts/UserContext';

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  creditsPerMonth: number;
  features: string[];
  highlighted?: boolean;
}

const plans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    creditsPerMonth: 3,
    features: [
      'Separação básica de faixas',
      '3 créditos por mês',
      'Projetos armazenados por 7 dias',
    ],
  },
  {
    id: 'basic',
    name: 'Basic',
    price: 9.99,
    creditsPerMonth: 10,
    features: [
      'Separação de alta qualidade',
      '10 créditos por mês',
      'Projetos armazenados por 30 dias',
      'Download em formato WAV',
    ],
    highlighted: true,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 19.99,
    creditsPerMonth: 30,
    features: [
      'Separação de qualidade premium',
      '30 créditos por mês',
      'Armazenamento ilimitado de projetos',
      'Download em múltiplos formatos',
      'Prioridade no processamento',
    ],
  },
];

const PlanSelector: React.FC = () => {
  const { user } = useUser();
  const currentPlanId = user?.plan.name.toLowerCase();

  return (
    <div className="py-8">
      <h2 className="text-2xl md:text-3xl text-center font-bold mb-8">Escolha seu plano</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`relative overflow-hidden ${
              plan.highlighted 
                ? 'border-2 border-demixer-accent' 
                : 'border border-gray-700'
            } bg-demixer-darker`}
          >
            {plan.highlighted && (
              <div className="absolute top-0 left-0 right-0 bg-demixer-accent py-1 text-center text-xs font-semibold">
                MAIS POPULAR
              </div>
            )}
            <CardHeader className={plan.highlighted ? 'pt-8' : ''}>
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <div className="mt-4">
                <span className="text-3xl font-bold">R${plan.price.toFixed(2)}</span>
                <span className="text-gray-400 ml-2">/mês</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <span className="text-xl font-bold text-demixer-accent">{plan.creditsPerMonth}</span>
                <span className="text-gray-300 ml-2">créditos por mês</span>
              </div>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-5 w-5 text-demixer-accent mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className={`w-full ${
                  plan.id === currentPlanId 
                    ? 'bg-gray-700 hover:bg-gray-700 cursor-default' 
                    : 'bg-demixer-accent hover:bg-demixer-accent-hover'
                }`}
                disabled={plan.id === currentPlanId}
              >
                {plan.id === currentPlanId ? 'Plano Atual' : 'Selecionar Plano'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PlanSelector;
