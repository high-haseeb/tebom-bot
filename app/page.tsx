"use client";
import ThemeToggle from "@/components/ThemeChanger";
import TrafficInfoDisplay from "@/components/CarInformation";
import MainForm from "@/components/MainForm";
import { NavigationBar } from "@/components/NavBar";
import SideMenu from "@/components/SideMenu";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sooner";
import OfferList from "@/components/OfferList";
import { GithubIcon } from "lucide-react";
import Link from "next/link";

const Page = () => {
    return (
        <div className="w-screen min-h-screen bg-background text-foreground sm:overflow-auto overflow-x-hidden lg:overflow-hidden flex flex-col items-center justify-start gap-10 px-4 py-4">

            <div className="flex w-full pointer-events-auto gap-2 items-center justify-center">
                <div className="mr-auto flex-grow text-2xl font-bold leading-none">Tebom<br/>.net</div>
                <ThemeToggle />
            </div>

            <div className="flex flex-col h-max items-center justify-center gap-4 lg:flex-row">
                <MainForm />
                <TrafficInfoDisplay />
                <OfferList />
            </div>

            <Toaster />

            <div className="mt-auto w-full flex items-center justify-between">
                <div className="text-xs text-gray-600">Copyright (c) 2025 high-house. All Rights Reserved.</div>
                <Link href="https://github.com/high-haseeb/tebom-bot">
                    <GithubIcon fill="white" size={15} />
                </Link>
            </div>

        </div>
    )
}

export default Page;
