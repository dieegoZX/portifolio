"use client";

import { Github, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export function AppFooter() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © {isClient ? new Date().getFullYear() : ''} Diego Ruan. Todos os direitos reservados.
        </p>
        <div className="flex items-center gap-4">
          <Link href="#" target="_blank" rel="noreferrer" aria-label="Github">
            <Github className="h-6 w-6 text-muted-foreground transition-colors hover:text-primary" />
          </Link>
          <Link href="#" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Linkedin className="h-6 w-6 text-muted-foreground transition-colors hover:text-primary" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
