"use client";
import ThemeToggle from "@/components/ThemeChanger";
import TrafficInfoDisplay from "@/components/CarInformation";
import MainForm from "@/components/MainForm";
import { NavigationBar } from "@/components/NavBar";
import SideMenu from "@/components/SideMenu";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sooner";
import OfferList from "@/components/OfferList";

const Page = () => {
    return (
        <div className="w-screen bg-background text-foreground sm:overflow-auto overflow-x-hidden lg:overflow-hidden">
            <div className="isolate flex h-full w-full items-center justify-start">
                <div className="pointer-events-auto fixed right-4 top-4 z-[90] flex gap-2">
                    {/* <LanguageSwitcher /> */}
                    <ThemeToggle />
                </div>
                <SidebarProvider className="flex h-full w-full items-center justify-start gap-10">
                    <SideMenu />
                    <SidebarInset>
                        <header className="z-50 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                            <NavigationBar />
                        </header>
                        <div className="flex h-auto flex-col items-center justify-center gap-4 p-4 pt-10 lg:flex-row">
                            <MainForm />
                            <TrafficInfoDisplay />
                            <OfferList />
                        </div>
                    </SidebarInset>
                </SidebarProvider>
            </div>
            <Toaster />
        </div>
    )
}

export default Page;
