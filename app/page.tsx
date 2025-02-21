"use client";
import EntryFrom from "@/components/EntryFrom";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Page = () => {
    return (
        <div className="flex flex-col h-screen w-screen items-center justify-center">
            <LanguageSwitcher />
            <div className="text-3xl font-semibold">Form</div>
            <EntryFrom />
        </div>
    )
}

export default Page;
