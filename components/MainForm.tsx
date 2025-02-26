import React from 'react'
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
import EntryForm from "@/components/EntryFrom";
import { useTranslations } from 'next-intl';
import { useTrafficInfoStore } from './CarInformation';

const MainForm = () => {
    const t = useTranslations("form_tabs");
    const { data } = useTrafficInfoStore();

    return data ? null : (
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
    )
}
export default MainForm;
