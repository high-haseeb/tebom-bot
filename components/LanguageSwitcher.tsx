"use client";

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


export const getUserLocale = (): "en" | "tr" => {
    const match = document.cookie.match(/(^| )locale=([^;]+)/);
    return (match ? match[2] : "en") as "en" | "tr";
};

const LanguageSwitcher = () => {
    const [locale, setLocale] = useState<"en" | "tr">("en");
    const router = useRouter();

    useEffect(() => {
        setLocale(getUserLocale());
    }, []);

    const changeLanguage = (value: "en" | "tr") => {
        document.cookie = `locale=${locale}; path=/; max-age=31536000`;
        setLocale(value);
        router.refresh();
    };

    return (
        <Select value={locale} onValueChange={changeLanguage}>
            <SelectTrigger className="w-32 fixed top-4 right-4">
                <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="tr">Türkçe</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default LanguageSwitcher;
