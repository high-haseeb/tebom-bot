import React from 'react'
import {
    AudioWaveform,
    BookOpen,
    Bot,
    Building2,
    Command,
    Cross,
    Files,
    Frame,
    GalleryVerticalEnd,
    HandCoins,
    Headset,
    Map,
    PieChart,
    Settings2,
    SquareTerminal,
    TrafficCone,
} from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader
} from './ui/sidebar';
import { TeamSwitcher } from './TeamSwitcher';
import { NavUser } from './NavUser';
import { NavMain } from './NavMain';
import { NavProjects } from './NavProjects';

const SideMenu = () => {
    const data = {
        user: {
            name: "tebomAdmin",
            email: "admin@tebom.net",
            avatar: "user.png",
        },
        teams: [
            {
                name: "Tebom Inc.",
                logo: GalleryVerticalEnd,
                plan: "Enterprise",
            },
            {
                name: "Acme Corp.",
                logo: AudioWaveform,
                plan: "Startup",
            },
            {
                name: "Evil Corp.",
                logo: Command,
                plan: "Free",
            },
        ],
        navMain: [
            {
                title: "Operation Center",
                url: "#",
                icon: Building2,
                isActive: true,
                items: [
                    {
                        title: "Policy Search",
                        url: "#",
                    },
                    {
                        title: "Center Waiting",
                        url: "#",
                    },
                    {
                        title: "Manual Offers",
                        url: "#",
                    },
                ],
            },
            {
                title: "Old reports",
                url: "#",
                icon: Files,
                items: [
                    {
                        title: "Payment History",
                        url: "#",
                    },
                ],
            },
            {
                title: "Call Center",
                url: "#",
                icon: Headset,
                items: [
                    {
                        title: "Customers",
                        url: "#",
                    },
                    {
                        title: "Agent Dashboard",
                        url: "#",
                    },
                ],
            },
            {
                title: "Settings",
                url: "#",
                icon: Settings2,
                items: [
                    {
                        title: "General",
                        url: "#",
                    },
                    {
                        title: "Team",
                        url: "#",
                    },
                    {
                        title: "Billing",
                        url: "#",
                    },
                    {
                        title: "Limits",
                        url: "#",
                    },
                ],
            },
        ],
        projects: [
            {
                name: "Traffic Offer",
                url: "#",
                icon: TrafficCone,
            },
            {
                name: "Health Offer",
                url: "#",
                icon: Cross,
            },
            {
                name: "Travel Offer",
                url: "#",
                icon: Map,
            },
        ],
    };

    return (
        <Sidebar>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavProjects projects={data.projects} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    )
}

export default SideMenu;
