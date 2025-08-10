
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import useNavigation from '@/hooks/use-navigation';

const navItems = [
  { href: '/sobre', label: 'Sobre' },
  { href: '#portfolio', label: 'Projetos' },
  { href: '#landing-pages', label: 'Landing Pages' },
  { href: '#traffic', label: 'Tráfego Pago' },
  { href: '#testimonials', label: 'Depoimentos' },
  { href: '#contact', label: 'Contato' },
];

export function AppHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeId = useNavigation(navItems.map(item => item.href.startsWith('#') ? item.href : item.href));
  
  const handleLinkClick = (href: string) => {
    setIsMenuOpen(false);
    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Code className="h-6 w-6 text-primary" />
            <span className="font-bold">Diego Ruan</span>
          </Link>
          <nav className="hidden md:flex">
             <ul className="flex items-center gap-6 text-sm">
                {navItems.map((item) => (
                    <li key={item.href}>
                         <Link 
                            href={item.href} 
                            className={`px-3 py-2 rounded-md transition-colors ${activeId === item.href ? 'bg-primary text-primary-foreground' : 'text-foreground/70 hover:text-foreground hover:bg-white/10'}`}
                            onClick={(e) => {
                                if (item.href.startsWith('#')) {
                                    e.preventDefault();
                                    handleLinkClick(item.href);
                                }
                            }}
                          >
                            {item.label}
                        </Link>
                    </li>
                ))}
             </ul>
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="px-2 md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col p-6">
                <Link href="/" className="mb-8 flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
                  <Code className="h-6 w-6 text-primary" />
                  <span className="font-bold">Diego Ruan</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-lg font-medium text-foreground transition-colors hover:text-primary"
                      onClick={(e) => {
                        if (item.href.startsWith('#')) {
                           e.preventDefault();
                        }
                        handleLinkClick(item.href);
                      }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
