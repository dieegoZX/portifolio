
'use client';

import { ReactNode, useEffect, useState } from 'react';
import { Sidebar, SidebarProvider, SidebarTrigger, SidebarInset, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { LayoutDashboard, Newspaper, Image, MessageSquare, Settings, User, LogOut } from 'lucide-react';
import Link from 'next/link';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

function AdminLayoutContent({ children }: { children: ReactNode }) {
    const { user, signOut, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [headerTitle, setHeaderTitle] = useState('Dashboard');

    useEffect(() => {
        // Redirect to login if not authenticated and not already loading
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);
    
     useEffect(() => {
        const pathParts = pathname.split('/').filter(Boolean);
        if (pathParts.length > 1) {
            const title = pathParts[1].charAt(0).toUpperCase() + pathParts[1].slice(1);
            setHeaderTitle(title);
        } else {
            setHeaderTitle('Dashboard');
        }
    }, [pathname]);


    const handleLogout = async () => {
        await signOut();
        router.push('/login');
    };
    
    // Display a loading state while checking for authentication
    if(loading) {
      return (
        <div className="flex h-screen items-center justify-center">
             <div className="flex min-h-screen w-full">
                <div className="hidden md:block border-r border-border p-2">
                    <div className="flex flex-col gap-4">
                        <Skeleton className="h-10 w-48" />
                        <div className="p-2 flex flex-col gap-2">
                            <Skeleton className="h-8 w-full" />
                            <Skeleton className="h-8 w-full" />
                            <Skeleton className="h-8 w-full" />
                            <Skeleton className="h-8 w-full" />
                        </div>
                    </div>
                </div>
                <div className="flex-1 p-4">
                     <Skeleton className="h-14 w-full mb-4" />
                     <Skeleton className="h-64 w-full" />
                </div>
            </div>
        </div>
      )
    }

    // After loading, if there's no user, we render nothing (or a minimal layout)
    // because the useEffect above will handle the redirect.
    if(!user) {
        return null;
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
                <SidebarMenuButton asChild tooltip="Dashboard" isActive={pathname === '/admin'}>
                  <Link href="/admin">
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Sobre" isActive={pathname === '/admin/sobre'}>
                  <Link href="/admin/sobre">
                    <User />
                    <span>Sobre</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Projetos" isActive={pathname === '/admin/projetos'}>
                  <Link href="/admin/projetos">
                    <Newspaper />
                    <span>Projetos</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Landing Pages" isActive={pathname === '/admin/landing-pages'}>
                  <Link href="/admin/landing-pages">
                    <Image />
                    <span>Landing Pages</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Depoimentos" isActive={pathname === '/admin/depoimentos'}>
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
                  <SidebarMenuButton asChild tooltip="Configurações" disabled>
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
              <h2 className="text-lg font-semibold">{headerTitle}</h2>
               <div className="flex items-center gap-2">
                 <span className="text-sm text-muted-foreground hidden md:inline">{user.email}</span>
                 <Button variant="outline" size="sm" onClick={handleLogout}>Sair</Button>
               </div>
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
