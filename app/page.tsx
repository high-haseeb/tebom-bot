"use client";
import ChatBox from "@/components/ChatBox";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeChanger";
import TrafficInfoDisplay from "@/components/CarInformation";
import MainForm from "@/components/MainForm";
import { NavigationBar } from "@/components/NavBar";
import SideMenu from "@/components/SideMenu";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sooner";
import ChatBot from "@/components/ChatBot";
import OfferList from "@/components/OfferList";
import DownloadPDF from "@/components/DownloadPDF";

const Page = () => {
    return (
        <div className="h-screen w-screen overflow-hidden bg-background text-foreground">
            <div className="flex h-full w-full items-center justify-start">
                <div className="fixed right-4 top-4 z-50 flex gap-2">
                    <LanguageSwitcher />
                    <ThemeToggle />
                </div>
                <SidebarProvider className="flex h-full w-full items-center justify-start gap-10">
                    <SideMenu />
                    <SidebarInset>
                        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 z-50">
                            <NavigationBar />
                        </header>
                        <div className="flex flex-1 items-center gap-4 p-4 pt-0">
                            <MainForm />
                            <ChatBot />
                            <TrafficInfoDisplay />
                            <OfferList />
                            <DownloadPDF />
                        </div>
                    </SidebarInset>
                </SidebarProvider>
            </div>
            <ChatBox />
            <Toaster />
        </div>
    )
}

export default Page;
