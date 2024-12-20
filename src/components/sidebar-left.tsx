"use client"

import * as React from "react"
import {
  Home,
  Inbox,
  MessageCircleQuestion,
  Search,
  Settings2,
  Sparkles,
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

// This is sample data.
const data = {
  
  navMain: [
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
    {
      title: "Ask AI",
      url: "#",
      icon: Sparkles,
    },
    {
      title: "Home",
      url: "#",
      icon: Home,
      isActive: true,
    },
    {
      title: "Inbox",
      url: "#",
      icon: Inbox,
      badge: "10",
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
  favorites: [
    {
      name: "Doc 1",
      url: "#",
      emoji : ""
      
    },
    {
      name: "Doc 2",
      url: "#",
      emoji : ""

    },
    {
      name: "Doc 3",
      url: "#",
      emoji : ""

    },
    {
      name: "Doc 4",
      url: "#",
      emoji : ""

    },
    {
      name: "Doc 4",
      url: "#",
      emoji : ""

    },
    
  ],
  // workspaces: [
  //   {
  //     name: "Personal Life Management",
  //     emoji: "🏠",
  //     pages: [
  //       {
  //         name: "Daily Journal & Reflection",
  //         url: "#",
  //         emoji: "📔",
  //       },
  //       {
  //         name: "Health & Wellness Tracker",
  //         url: "#",
  //         emoji: "🍏",
  //       },
  //       {
  //         name: "Personal Growth & Learning Goals",
  //         url: "#",
  //         emoji: "🌟",
  //       },
  //     ],
  //   },
  //   {
  //     name: "Professional Development",
  //     emoji: "💼",
  //     pages: [
  //       {
  //         name: "Career Objectives & Milestones",
  //         url: "#",
  //         emoji: "🎯",
  //       },
  //       {
  //         name: "Skill Acquisition & Training Log",
  //         url: "#",
  //         emoji: "🧠",
  //       },
  //       {
  //         name: "Networking Contacts & Events",
  //         url: "#",
  //         emoji: "🤝",
  //       },
  //     ],
  //   },
  //   {
  //     name: "Creative Projects",
  //     emoji: "🎨",
  //     pages: [
  //       {
  //         name: "Writing Ideas & Story Outlines",
  //         url: "#",
  //         emoji: "✍️",
  //       },
  //       {
  //         name: "Art & Design Portfolio",
  //         url: "#",
  //         emoji: "🖼️",
  //       },
  //       {
  //         name: "Music Composition & Practice Log",
  //         url: "#",
  //         emoji: "🎵",
  //       },
  //     ],
  //   },
  //   {
  //     name: "Home Management",
  //     emoji: "🏡",
  //     pages: [
  //       {
  //         name: "Household Budget & Expense Tracking",
  //         url: "#",
  //         emoji: "💰",
  //       },
  //       {
  //         name: "Home Maintenance Schedule & Tasks",
  //         url: "#",
  //         emoji: "🔧",
  //       },
  //       {
  //         name: "Family Calendar & Event Planning",
  //         url: "#",
  //         emoji: "📅",
  //       },
  //     ],
  //   },
  //   {
  //     name: "Travel & Adventure",
  //     emoji: "🧳",
  //     pages: [
  //       {
  //         name: "Trip Planning & Itineraries",
  //         url: "#",
  //         emoji: "🗺️",
  //       },
  //       {
  //         name: "Travel Bucket List & Inspiration",
  //         url: "#",
  //         emoji: "🌎",
  //       },
  //       {
  //         name: "Travel Journal & Photo Gallery",
  //         url: "#",
  //         emoji: "📸",
  //       },
  //     ],
  //   },
  // ],
  
}

export function SidebarLeft({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>

        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        <NavFavorites favorites={data.favorites} onSelect={async ()=>{}} />
        {/* <NavWorkspaces workspaces={data.workspaces} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
