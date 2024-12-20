"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import {
  Home,
  MessageCircleQuestion,
  Settings2,
  Sparkles,
  Moon,
  Sun,
  Loader2
} from "lucide-react"

import { NavFavorites } from "@/components/nav-favorites"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useTheme } from "@/contexts/ThemeContext" 

import { useUser } from "@clerk/clerk-react"
import axios from "axios"
import { toast } from "@/hooks/use-toast"

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  onProjectSelect?: (projectName: string) => void;
}

export function AppSidebar({ onProjectSelect, ...props }: AppSidebarProps) {
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [favorites, setFavorites] = useState<{ name: string }[]>([]);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const { user } = useUser();

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user?.primaryEmailAddress?.emailAddress) {
        try {
          const response = await axios.get(
            `https://docquery.onrender.com/api/v1/data/process/${user.primaryEmailAddress.emailAddress}/`
          );
          if (response.status === 200) {
            const docs = response.data.results;
            if (Array.isArray(docs)) {
              const mappedFavorites = docs.map((doc: any) => ({
                name: doc, 
              }));
              setFavorites(mappedFavorites);
            }
          }
        } catch (err) {
          console.error("Error fetching favorites:", err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchFavorites();
  }, [user]);

  const data = {
    navMain: [
      {
        title: "Ask AI",
        url: "",
        icon: Sparkles,
      },
      {
        title: "Home",
        url: "/",
        icon: Home,
        isActive: true,
      },
    ],
    navSecondary: [
      {
        title: "Settings",
        url: "#",
        icon: Settings2,
      },
      {
        title: "Help",
        url: "#",
        icon: MessageCircleQuestion,
      },
    ],
  };

  function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
      <button
        onClick={toggleTheme}
        className="flex items-center space-x-2 p-2 hover:bg-accent rounded w-full"
      >
        {theme === "light" ? <Moon className="mr-2" /> : <Sun className="mr-2" />}
      </button>
    );
  }

  const handleFavoriteSelect = async (projectName: string) => {
    setSelectedProject(projectName);
    onProjectSelect?.(projectName);
    
    if (user?.primaryEmailAddress?.emailAddress) {
      setIsProcessing(true);
      try {
        const response = await axios.post(`https://docquery.onrender.com/api/v1/nlp/index/push/${user.primaryEmailAddress.emailAddress}/${projectName}`, {
          do_reset: true
        });

        if (response.status === 200) {
          console.log("Successfully sent project data:", response.data);
          toast({
            description: 'Successfully sent project data',
          });
        } else {
          console.error("Error in sending project data");
          toast({
            description: 'Error in sending project data',
          });
        }
      } catch (err) {
        console.error("Error selecting favorite project:", err);
        toast({
          description: 'Error selecting favorite project',
        });
      } finally {
        setIsProcessing(false);
      }
    }
  };

  return (
    <>
      <Sidebar className="border-r-0 relative" {...props}>
        {isProcessing && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Processing file...</p>
            </div>
          </div>
        )}
        <SidebarHeader>
          <NavMain items={data.navMain} />
        </SidebarHeader>
        <SidebarContent>
          {loading ? (
            <div className="p-4 text-sm text-muted-foreground">Loading favorites...</div>
          ) : (
            <NavFavorites 
              favorites={favorites} 
              onSelect={handleFavoriteSelect} 
            />
          )}
          <NavSecondary items={data.navSecondary} className="mt-auto" />
          <ThemeToggle />
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
    </>
  );
}