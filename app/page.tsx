"use client";
import ChatBox from "@/components/ChatBox";
import EntryForm from "@/components/EntryFrom";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Agreement from "@/components/Agreement";
import ThemeToggle from "@/components/ThemeChanger";
import { useTranslations } from "next-intl";
import { useTrafficQueryStore } from "@/stores/trafficStore";
import TrafficInfoDisplay from "@/components/CarInformation";

const Page = () => {
    const t = useTranslations("form_tabs");
    const { responses } = useTrafficQueryStore();
    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center bg-background text-foreground">
            <div className="fixed right-4 top-4 flex gap-2">
                <LanguageSwitcher />
                <ThemeToggle />
            </div>
            <ChatBox />
            <div className="flex gap-10 items-center justify-center">
                <Tabs defaultValue="old" className="w-[400px]">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="old">{t("old_plate")}</TabsTrigger>
                        <TabsTrigger value="new">{t("new_plate")}</TabsTrigger>
                    </TabsList>
                    <TabsContent value="old">
                        <Card>
                            <CardHeader>
                                <CardTitle>{t("old_title")}</CardTitle>
                                <CardDescription>
                                    Get a quick offer for insurance of your car.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <EntryForm />
                            </CardContent>
                            <CardFooter>
                                <Agreement />
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="new">
                        <Card>
                            <CardHeader>
                                <CardTitle>{t("new_title")}</CardTitle>
                                <CardDescription>Get a quick offer for insurance of your car.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <EntryForm />
                            </CardContent>
                            <CardFooter>
                                <Agreement />
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
                <TrafficInfoDisplay />
                <div className="flex flex-col gap-4">
                    {
                        responses &&
                        responses.map((response, index) => {
                            return response.Price == 0 ?
                                (
                                    null
                                )
                                : (
                                    <div className="px-3 py-2 bg-white text-black border w-[10rem]" key={index}>
                                        <img src={`https://portal.acente365.com/CompanyLogos/120x35/${response.Logo}`} width={120} height={35} />
                                        <div className="font-semibold">{response.InsuranceCompanyName}</div>
                                        <div>{response.Price} {response.Currency}</div>
                                    </div>
                                )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Page;
