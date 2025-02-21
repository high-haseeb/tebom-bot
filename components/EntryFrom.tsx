"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "./ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";

import { cn } from "@/lib/utils";
import { CalendarIcon, SearchCheckIcon } from "lucide-react";
import { formatDate } from "date-fns";


export default function EntryForm() {
    const t = useTranslations("form");

    const FormSchema = z.object({
        licensePlateNumber: z.string().regex(/^[A-Z]{2,3}\d{6}$/, t("errors.invalid_license")),

        licenseSerialNumber: z.string().min(0, t("errors.invalid_serial")),

        dob: z.date(),
        trIdOrTaxNumber: z.string()
            .length(11, t("errors.invalid_id")),

        profession: z.string().min(1, "Profession is required."),

        isPawnBrokers: z.boolean(),
        isDisabilityCar: z.boolean(),
        crossBiddingOptions: z.boolean().optional(),
        carInsurance: z.boolean().optional(),
        tss: z.boolean().optional(),
        imm: z.boolean().optional(),
    });

    const form = useForm<z.infer<typeof FormSchema>>({
        mode: "onBlur",
        resolver: zodResolver(FormSchema),
        defaultValues: {
            licensePlateNumber: "",
            licenseSerialNumber: "",
            trIdOrTaxNumber: "",
            dob: new Date(),
            isPawnBrokers: true,
            isDisabilityCar: false,
        },
    });

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        console.log(data);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <LicensePlateInput />
                <LicenseSerialNumberInput />
                <IdNumberInput />
                <BrithdayInput />
                <DisabilityInput />
                <Button type="submit">{ t("submit") }</Button>
            </form>
        </Form>
    );

}

const DisabilityInput = () => {
    const t = useTranslations("form");
    const form = useForm();
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

const LicensePlateInput = () => {
    const form = useForm();
    const t = useTranslations("form");
    return (
        <FormField
            control={form.control}
            name="licensePlateNumber"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{t("license_number.label")}</FormLabel>
                    <FormControl>
                        <div className="flex gap-2 items-center justify-center">
                            <Input placeholder="12 ABC345" {...field} />
                            <Button size={'sm'} onClick={(e) => e.preventDefault()}><SearchCheckIcon /></Button>
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} />
    )
}

const IdNumberInput = () => {
    const t = useTranslations("form");
    const form = useForm();
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

const LicenseSerialNumberInput = () => {
    const t = useTranslations("form");
    const form = useForm();
    return (
        <FormField
            control={form.control}
            name="licenseSerialNumber"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{t("serial_number.label")}</FormLabel>
                    <FormControl>
                        <Input placeholder={t("serial_number.placeholder")} {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} />
    )
}

const BrithdayInput = () => {
    const form = useForm();
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
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                </FormItem>
            )} />
    )
}
