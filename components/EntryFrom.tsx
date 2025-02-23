"use client";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { CalendarIcon, SearchCheckIcon } from "lucide-react";
import { formatDate } from "date-fns";
import InputMask from "react-input-mask-next";

import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import {
    Form,
    FormControl,
    // FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "./ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover";
import { isPlateValid } from "@/api/getInfo";
import { useState } from "react";
import { useTrafficInfoStore } from "./CarInformation";
import { useTrafficQueryStore } from "@/stores/trafficStore";


type FormValues = {
    licensePlateNumber: string;
    licenseSerialNumber: string;
    trIdOrTaxNumber: string;
    dob: Date;
    isDisabilityCar: boolean;
    phoneNumber: string;
};

const FormSchema = z.object({
    licensePlateNumber: z.string(),
    licenseSerialNumber: z.string(),
    trIdOrTaxNumber: z.string(),
    dob: z.date({ required_error: "Date of birth is required" }),
    isDisabilityCar: z.boolean(),
    phoneNumber: z.string(),
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
            dob: new Date(),
            isDisabilityCar: false,
            phoneNumber: "",
        },
    });

    const { setData, data } = useTrafficInfoStore();
    const { setResponses } = useTrafficQueryStore();
    const onSubmit = async (formData: z.infer<typeof FormSchema>) => {
        const requestData = {
            Calisilanfirma: "6cc33e04-badc-4a24-adab-75802596cce0",
            Calisilansube: "a82d67ae-596d-40e8-8077-0accd3dbcd88",
            Calisilanuser: "9119293f-6357-48e3-bb69-088df2837221",
            IsYK: false,

            // User Inputs
            NationalNumber: formData.trIdOrTaxNumber,
            LicensePlateNumber: formData.licensePlateNumber,
            LicensePermitNumber: formData.licenseSerialNumber,
            Phone: "505 365 09 98",
            IsDisabled: formData.isDisabilityCar,

            EMail: "abcd123@gmail.com",
            HaveLicensePermitNumber: true,
            IsSorgu: false,
            ProfessionCode: 18,
            MasterBranch: 1,
            MortgageeType: "Y",
            MortgageeBankCode: "",
            MortgageeBankBranchCode: "",
            MortgageeFinancerCode: ""
        };

        const response = await fetch("http://localhost:6969/getTrafficInfo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
        });

        const result = await response.json();
        const guid = result.data.HeaderGuid;
        setData(result.data);
        {
            const response = await fetch("http://localhost:6969/getOffers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ guid: guid })
            });
            const body = await response.json();
            console.log(body);
            setResponses(body.data);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <LicensePlateInput form={form} />
                <LicenseSerialNumberInput form={form} />
                <IdNumberInput form={form} />
                {/* <BrithdayInput form={form} /> */}
                {/* <DisabilityInput form={form} /> */}
                {/* <PhoneNumberInput form={form} /> */}
                <Button type="submit">{t("submit")}</Button>
            </form>
        </Form>
    );

}

const DisabilityInput = ({ form }: { form: UseFormReturn<FormValues> }) => {
    const t = useTranslations("form");

    return (
        <FormField
            control={form.control}
            name="isDisabilityCar"
            render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg">
                    <div className="space-y-0.5">
                        <FormLabel className="text-base">
                            {t("disability_car")}
                        </FormLabel>
                    </div>
                    <FormControl>
                        <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                    </FormControl>
                </FormItem>
            )}
        />
    )
}

const formatPhoneNumber = (value: string) => {
    // Remove all non-numeric characters
    const numbers = value.replace(/\D/g, "");

    // Ensure it starts with "5" (Turkish mobile numbers)
    if (!numbers.startsWith("5")) return "";

    // Apply formatting
    return numbers
        .replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, "+90 $1 $2 $3 $4")
        .slice(0, 16); // Keep max length
};

const PhoneNumberInput = ({ form }: { form: UseFormReturn<FormValues> }) => {

    return (
        <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                        <Input
                            placeholder="+90 5XX XXX XX XX"
                            value={field.value}
                            onChange={(e) => field.onChange(formatPhoneNumber(e.target.value))}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

const LicensePlateInput = ({ form }: { form: UseFormReturn<FormValues> }) => {
    const t = useTranslations("form");
    const [isValid, setIsValid] = useState(true);

    return (
        <FormField
            control={form.control}
            name="licensePlateNumber"
            render={({ field }) => {

                const handlePlateIsValid = async () => {
                    const response = await isPlateValid(field.value);
                    setIsValid(response.data);
                }

                return (
                    <FormItem>
                        <FormLabel>{t("license_number.label")}</FormLabel>
                        <FormControl>
                            <div className="flex gap-2 items-center justify-center">
                                <Input placeholder="12 ABC345" {...field} />
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button size={'sm'} onClick={handlePlateIsValid}><SearchCheckIcon /></Button>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        {
                                            isValid ? "The plate is valid" : "The plate is invalid"
                                        }
                                    </PopoverContent>
                                </Popover>
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

const BrithdayInput = ({ form }: { form: UseFormReturn<FormValues> }) => {
    return (
        <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
                <FormItem className="flex flex-col">
                    <FormLabel>Date of birth</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                    )}
                                >
                                    {field.value ? (
                                        formatDate(field.value, "PPP")
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                            />
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                </FormItem>
            )} />
    )
}
