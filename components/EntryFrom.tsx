"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { useTranslations } from "next-intl";
import Agreement from "./Agreement";
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
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, SearchCheckIcon } from "lucide-react";
import { formatDate } from "date-fns";


export default function EntryForm() {
    const t = useTranslations("form");

    const FormSchema = z.object({
        licensePlateNumber: z.string()
            .min(1, "Seri numarası zorunludur.")
            .regex(/^[A-Z]{2,3}\d{6}$/, t("errors.invalid_license")),

        licenseSerialNumber: z.string()
            .min(1, "Seri numarası zorunludur.")
            .regex(/^[A-Z]{2,3}\d{6}$/, "Geçerli bir seri numarası girin (örn: AB123456 veya ABC123456)."),

        dob: z.date(),
        trIdOrTaxNumber: z.string()
            .min(1, "TR ID Number / Tax Number is required."),

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
            dob: new Date(),
            trIdOrTaxNumber: "",
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
                <BrithdayInput />
                <Button type="submit">submit</Button>
                <Agreement />
            </form>
        </Form>
    );

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
                            <Button size={'sm'}><SearchCheckIcon /></Button>
                        </div>
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
                        <Input placeholder={t("serial_number.placeholder")} type="number" {...field} />
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
                        <PopoverContent className="w-auto p-0" align="center">
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
