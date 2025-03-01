"use client";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {  LoaderIcon } from "lucide-react";

import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "./ui/form";
import { useState } from "react";
import { useTrafficInfoStore } from "./CarInformation";
import { useTrafficQueryStore } from "@/stores/trafficStore";
import { GetServerBaseAddress, startOfferProcess } from "@/api/getInfo";
import { toast } from "sonner";

type FormValues = {
    licensePlateNumber: string;
    licenseSerialNumber: string;
    trIdOrTaxNumber: string;
};

const FormSchema = z.object({
    licensePlateNumber: z.string(),
    licenseSerialNumber: z.string(),
    trIdOrTaxNumber: z.string()
        .length(11, "ID number must be exactly 11 digits")
        .regex(/^\d+$/, "ID number must contain only numbers"),
});

export default function EntryForm() {
    const t = useTranslations("form");
    const form = useForm<z.infer<typeof FormSchema>>({
        mode: "onBlur",
        resolver: zodResolver(FormSchema),
        defaultValues: {
            licensePlateNumber: "",
            licenseSerialNumber: "",
            trIdOrTaxNumber: "",
        },
    });

    const { setData } = useTrafficInfoStore();
    const { setResponses, setLoading, setLoadingStarted } = useTrafficQueryStore();
    const [loading, setLoadingLocal] = useState(false);

    const onSubmit = async (formData: z.infer<typeof FormSchema>) => {
        toast("Fetching Offers");
        setLoadingStarted(true);

        const requestData = {
            Calisilanfirma: "6cc33e04-badc-4a24-adab-75802596cce0",
            Calisilansube: "a82d67ae-596d-40e8-8077-0accd3dbcd88",
            Calisilanuser: "9119293f-6357-48e3-bb69-088df2837221",
            IsYK: false,

            NationalNumber: formData.trIdOrTaxNumber,
            LicensePlateNumber: formData.licensePlateNumber,
            LicensePermitNumber: formData.licenseSerialNumber,
            Phone: "5365099840",
            IsDisabled: false,

            EMail: "haseebkhalidoriginal@gmail.com",
            HaveLicensePermitNumber: true,
            IsSorgu: false,
            ProfessionCode: 18,
            MasterBranch: 1,
            MortgageeType: "Y",
            MortgageeBankCode: "",
            MortgageeBankBranchCode: "",
            MortgageeFinancerCode: ""
        };

        async function fetchOffersWithRetry(guid: string, retries = 5, delay = 10000) {
            for (let i = 0; i < retries; i++) {
                console.log("try", i);
                const response = await fetch(`${GetServerBaseAddress()}/get/offers`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ guid }),
                });

                const body = await response.json();
                console.log(body);

                if (body.status === false && body.message.includes("Teklif çalışma süresi henüz bitmemiştir")) {
                    console.log(`Waiting ${delay / 1000} seconds before retrying...`);
                    await new Promise((resolve) => setTimeout(resolve, delay));
                } else {
                    setResponses(body.data);
                    return;
                }
            }

            console.error("Max retries reached, request failed.");
        }

        try {
            const response = await fetch(`${GetServerBaseAddress()}/get/vehicleInfo`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });

            const result = await response.json();
            if (!response.ok) {
                toast(result.message);
                return;
            }
            setData(result.data);
            await startOfferProcess(result.data);

            await fetchOffersWithRetry(result.data.HeaderGuid, 10);
            setLoading(true);
        } finally {
            setLoadingLocal(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <LicensePlateInput form={form} />
                <LicenseSerialNumberInput form={form} />
                <IdNumberInput form={form} />
                <Button type="submit" disabled={loading}>
                    {
                        loading ?
                            <LoaderIcon className="animate-spin" />
                            :
                            t("submit")
                    }
                </Button>
            </form>
        </Form>
    );

}


const LicensePlateInput = ({ form }: { form: UseFormReturn<FormValues> }) => {
    const t = useTranslations("form");

    return (
        <FormField
            control={form.control}
            name="licensePlateNumber"
            render={({ field }) => {
                return (
                    <FormItem>
                        <FormLabel>{t("license_number.label")}</FormLabel>
                        <FormControl>
                            <div className="flex gap-2 items-center justify-center">
                                <Input placeholder="12 ABC345" {...field} />
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )
            }} />
    )
}

const IdNumberInput = ({ form }: { form: UseFormReturn<FormValues> }) => {
    const t = useTranslations("form");

    return (
        <FormField
            control={form.control}
            name="trIdOrTaxNumber"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{t("id_number")}</FormLabel>
                    <FormControl>
                        <Input placeholder={t("id_number")} {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} />
    )
}

const LicenseSerialNumberInput = ({ form }: { form: UseFormReturn<FormValues> }) => {
    const t = useTranslations("form");

    return (
        <FormField
            control={form.control}
            name="licenseSerialNumber"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{t("serial_number.label")}</FormLabel>
                    <FormControl>
                        <Input placeholder={t("serial_number.placeholder")} {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} />
    )
}

// const BrithdayInput = ({ form }: { form: UseFormReturn<FormValues> }) => {
//     return (
//         <FormField
//             control={form.control}
//             name="dob"
//             render={({ field }) => (
//                 <FormItem className="flex flex-col">
//                     <FormLabel>Date of birth</FormLabel>
//                     <Popover>
//                         <PopoverTrigger asChild>
//                             <FormControl>
//                                 <Button
//                                     variant={"outline"}
//                                     className={cn(
//                                         "w-full pl-3 text-left font-normal",
//                                         !field.value && "text-muted-foreground"
//                                     )}
//                                 >
//                                     {field.value ? (
//                                         formatDate(field.value, "PPP")
//                                     ) : (
//                                         <span>Pick a date</span>
//                                     )}
//                                     <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                                 </Button>
//                             </FormControl>
//                         </PopoverTrigger>
//                         <PopoverContent className="w-auto p-0">
//                             <Calendar
//                                 mode="single"
//                                 selected={field.value}
//                                 onSelect={field.onChange}
//                             />
//                         </PopoverContent>
//                     </Popover>
//                     <FormMessage />
//                 </FormItem>
//             )} />
//     )
// }
