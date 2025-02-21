"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import Agreement from "./Agreement";

const FormSchema = z.object({
    licenseNumber: z.string() .min(1, "Lisans numarası zorunludur.") .regex(/^(0[1-9]|[1-7][0-9]|8[0-1])\s\d{2,4}\s?[A-Z]{0,3}$/, "Geçerli bir Türk plakası girin."),
    serialNumber: z.string() .min(1, "Seri numarası zorunludur.") .regex(/^[A-Z]{2,3}\d{6}$/, "Geçerli bir seri numarası girin (örn: AB123456 veya ABC123456)."),
    idNumber: z.string().length(11, "Kimlik numarası 11 haneli olmalıdır.").regex(/^\d{11}$/, "Geçerli bir kimlik numarası girin."),
    profession: z.string().min(1, "Meslek seçmek zorunludur."),
    insuranceType: z.string().min(1, "Sigorta türü seçmek zorunludur."),
    pawnBroker: z.boolean().optional(),
    disabilityCar: z.boolean().optional(),
});

export default function EntryForm() {
    const t = useTranslations("form");

    const {
        register,
        handleSubmit,
        // control,
        setValue,
        formState: { errors },
    } = useForm<z.infer<typeof FormSchema>>({
        mode: "onBlur",
        resolver: zodResolver(FormSchema),
        defaultValues: {
            licenseNumber: "",
            serialNumber: "",
            idNumber: "",
            profession: "",
            insuranceType: "tss",
            pawnBroker: false,
            disabilityCar: false,
        },
    });

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        console.log(data);
    };

    return (
        <Card className="max-w-md mx-auto p-4 shadow-md">
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Label>{t("license_number.label")}</Label>
                        <Input {...register("licenseNumber")} placeholder={"34 ABC456"} />
                        {errors.licenseNumber && <p className="text-red-500 text-sm">{errors.licenseNumber.message}</p>}
                    </div>

                    <div>
                        <Label>{t("serial_number.label")}</Label>
                        <Input {...register("serialNumber")} placeholder={t("serial_number.placeholder")} />
                        {errors.serialNumber && <p className="text-red-500 text-sm">{errors.serialNumber.message}</p>}
                    </div>

                    <div>
                        <Label>{t("id_number")}</Label>
                        <Input {...register("idNumber")} />
                        {errors.idNumber && <p className="text-red-500 text-sm">{errors.idNumber.message}</p>}
                    </div>

                    <div>
                        <Label>{t("profession.label")}</Label>
                        <Select onValueChange={(value) => setValue("profession", value)}>
                            <SelectTrigger>
                                <SelectValue placeholder={t("profession.placeholder")} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="engineer">{t("profession.options.engineer")}</SelectItem>
                                    <SelectItem value="doctor">{t("profession.options.doctor")}</SelectItem>
                                    <SelectItem value="teacher">{t("profession.options.teacher")}</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {errors.profession && <p className="text-red-500 text-sm">{errors.profession.message}</p>}
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            {...register("pawnBroker")}
                            onCheckedChange={(checked) => setValue("pawnBroker", checked as boolean)}
                        />
                        <Label>{t("pawn_broker")}</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            {...register("disabilityCar")}
                            onCheckedChange={(checked) => setValue("disabilityCar", checked as boolean)}
                        />
                        <Label>{t("disability_car")}</Label>
                    </div>

                    <div>
                        <Label>{t("insurance.label")}</Label>
                        <Select onValueChange={(value) => setValue("insuranceType", value)}>
                            <SelectTrigger>
                                <SelectValue placeholder={t("insurance.placeholder")} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="tss">{t("insurance.options.tss")}</SelectItem>
                                    <SelectItem value="imm">{t("insurance.options.imm")}</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {errors.insuranceType && <p className="text-red-500 text-sm">{errors.insuranceType.message}</p>}
                    </div>

                    <Agreement />
                    <Button type="submit">{t("submit")}</Button>
                </form>
            </CardContent>
        </Card>
    );
}
