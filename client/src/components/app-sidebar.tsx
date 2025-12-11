import { Link, useLocation } from "wouter";
import { Atom, BookOpen, Home, Info, FlaskConical } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ThemeToggle } from "./theme-toggle";

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/algorithms", label: "Algorithms", icon: FlaskConical },
  { path: "/tutorials", label: "Tutorials", icon: BookOpen },
  { path: "/about", label: "About", icon: Info },
];

export function AppSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="border-b px-4 py-4">
        <Link href="/" className="flex items-center gap-2" data-testid="link-sidebar-home-logo">
          <div className="relative">
            <Atom className="h-8 w-8 text-primary" />
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-md animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-lg leading-tight tracking-tight" data-testid="text-sidebar-title">
              Quantum Zoo
            </span>
            <span className="text-xs text-muted-foreground leading-none" data-testid="text-sidebar-subtitle">
              ACM UOT
            </span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map(({ path, label, icon: Icon }) => (
                <SidebarMenuItem key={path}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location === path}
                    data-testid={`link-sidebar-${label.toLowerCase()}`}
                  >
                    <Link href={path}>
                      <Icon className="h-4 w-4" />
                      <span>{label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Quick Links</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild data-testid="link-sidebar-bell-states">
                  <Link href="/algorithm/bell-states">
                    <span className="text-sm">Bell States</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild data-testid="link-sidebar-grovers">
                  <Link href="/algorithm/grovers-search">
                    <span className="text-sm">Grover's Search</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild data-testid="link-sidebar-teleportation">
                  <Link href="/algorithm/quantum-teleportation">
                    <span className="text-sm">Teleportation</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs text-muted-foreground">Theme</span>
          <ThemeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
