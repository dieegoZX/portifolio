
'use client';

import { ReactNode } from 'react';
import { Sidebar, SidebarProvider, SidebarTrigger, SidebarInset, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { LayoutDashboard, Newspaper, Image, MessageSquare, Settings, User, LogOut } from 'lucide-react';
import Link from 'next/link';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

function AdminLayoutContent({ children }: { children: ReactNode }) {
    const { user, signOut, loading } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await signOut();
        router.push('/login');
    };
    
    if(loading) {
      return (
        <div className="flex h-screen items-center justify-center">
            <p>Carregando...</p>
        </div>
      )
    }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <div className="flex h-full flex-col">
            <div className="flex h-14 items-center px-4">
              <Link href="/admin">
                <h1 className="text-xl font-semibold">Admin</h1>
              </Link>
            </div>
            <SidebarMenu className="flex-1">
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Dashboard">
                  <Link href="/admin">
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Sobre">
                  <Link href="/admin/sobre">
                    <User />
                    <span>Sobre</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Projetos">
                  <Link href="/admin/projetos">
                    <Newspaper />
                    <span>Projetos</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Landing Pages">
                  <Link href="/admin/landing-pages">
                    <Image />
                    <span>Landing Pages</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Depoimentos">
                  <Link href="/admin/depoimentos">
                    <MessageSquare />
                    <span>Depoimentos</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            <div className="mt-auto">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Configurações">
                    <Link href="#">
                      <Settings />
                      <span>Configurações</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                  <SidebarMenuButton onClick={handleLogout} tooltip="Sair">
                      <LogOut />
                      <span>Sair</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </div>
          </div>
        </Sidebar>
        <SidebarInset className="flex-1">
           <header className="flex h-14 items-center justify-between border-b px-4">
              <div className="md:hidden">
                <SidebarTrigger />
              </div>
              <h2 className="text-lg font-semibold">Dashboard</h2>
            </header>
          <main className="p-4 bg-background text-foreground">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}


export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <AuthProvider>
            <AdminLayoutContent>{children}</AdminLayoutContent>
        </AuthProvider>
    )
}
