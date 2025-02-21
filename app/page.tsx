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

const Page = () => {
    const t = useTranslations("form_tabs");
    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center bg-background text-foreground">
            <div className="fixed right-4 top-4 flex gap-2">
                <LanguageSwitcher />
                <ThemeToggle />
            </div>
            <ChatBox />
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
            </Tabs>
        </div>
    )
}

export default Page;
