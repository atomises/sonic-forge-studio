
import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const DemixerHeader: React.FC = () => {
  const { user, isAuthenticated, logout } = useUser();

  return (
    <header className="w-full py-4 bg-demixer-darker/90 backdrop-blur sticky top-0 z-10 border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-center flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-bold neon-gradient">
              DEMIXER
            </h1>
            <span className="hidden md:block text-gray-400 text-sm">
              Estúdio de Demolição Sonora
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            <Link 
              to="/" 
              className="px-3 py-2 text-sm rounded hover:bg-demixer-dark transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/plans" 
              className="px-3 py-2 text-sm rounded hover:bg-demixer-dark transition-colors"
            >
              Planos
            </Link>
            
            {isAuthenticated && user ? (
              <div className="flex items-center ml-4">
                <div className="mr-3 text-right hidden md:block">
                  <div className="text-sm font-medium">{user.name}</div>
                  <div className="text-xs text-gray-400">
                    {user.plan.creditsRemaining} créditos
                  </div>
                </div>
                <Link to="/dashboard">
                  <Avatar className="cursor-pointer border border-gray-700">
                    {user.avatar ? (
                      <AvatarImage src={user.avatar} alt={user.name} />
                    ) : (
                      <AvatarFallback className="bg-demixer-accent text-white">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-2 ml-2">
                <Link to="/login">
                  <Button variant="outline" size="sm" className="border-gray-700">
                    Login
                  </Button>
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="border-gray-700">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-demixer-darker border-gray-800 text-white">
                <SheetHeader>
                  <SheetTitle className="text-white">Menu</SheetTitle>
                </SheetHeader>
                <div className="mt-6 flex flex-col space-y-3">
                  {isAuthenticated && user && (
                    <div className="flex items-center p-2 bg-demixer-dark rounded-md mb-4">
                      <Avatar className="h-10 w-10 mr-3 border border-gray-700">
                        {user.avatar ? (
                          <AvatarImage src={user.avatar} alt={user.name} />
                        ) : (
                          <AvatarFallback className="bg-demixer-accent text-white">
                            {user.name.charAt(0)}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-400">
                          {user.plan.creditsRemaining} créditos
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <Link 
                    to="/" 
                    className="px-3 py-2 hover:bg-demixer-dark rounded transition-colors"
                  >
                    Home
                  </Link>
                  
                  <Link 
                    to="/plans" 
                    className="px-3 py-2 hover:bg-demixer-dark rounded transition-colors"
                  >
                    Planos
                  </Link>
                  
                  {isAuthenticated && user ? (
                    <>
                      <Link 
                        to="/dashboard" 
                        className="px-3 py-2 hover:bg-demixer-dark rounded transition-colors"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={logout}
                        className="px-3 py-2 hover:bg-demixer-dark rounded transition-colors text-left text-gray-300"
                      >
                        Sair
                      </button>
                    </>
                  ) : (
                    <Link 
                      to="/login" 
                      className="px-3 py-2 bg-demixer-accent hover:bg-demixer-accent-hover rounded transition-colors text-center"
                    >
                      Login
                    </Link>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DemixerHeader;
