import { ReactNode } from 'react';
import { Sidebar, SidebarProvider, SidebarTrigger, SidebarInset, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { LayoutDashboard, Newspaper, Image, MessageSquare, Settings } from 'lucide-react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
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
                <SidebarMenuButton asChild tooltip="Projetos">
                  <Link href="#">
                    <Newspaper />
                    <span>Projetos</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Landing Pages">
                  <Link href="#">
                    <Image />
                    <span>Landing Pages</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Depoimentos">
                  <Link href="#">
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
          <main className="p-4">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
