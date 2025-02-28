"use client";
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { DownloadIcon, LoaderIcon } from 'lucide-react'
import { toast } from 'sonner'
import { useTrafficInfoStore } from './CarInformation';

const DownloadPDF = () => {
    const [loading, setLoading] = useState(false);
    const { data } = useTrafficInfoStore();

    function downloadPDF(response: any) {
        if (!response.Success || !response.file || !response.file.FileContents) {
            console.error("Invalid response data");
            return;
        }

        const byteCharacters = atob(response.file.FileContents);
        const byteNumbers = new Uint8Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const pdfBlob = new Blob([byteNumbers], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(pdfBlob);
        link.download = response.file.FileDownloadName || "download.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const handleClick = async () => {
        setLoading(true);
        try {
            if (!data?.HeaderGuid) {
                toast("Please Fill in the form firsst");
                return;
            }

            console.log(data.HeaderGuid.toString());
            const response = await fetch("http://188.132.135.5:4040/get/PDF", {
                method: "POST",
                body: JSON.stringify({
                    type: "1",
                    selectedItem: "",
                    headerGuid: data.HeaderGuid.toString(),
                    queryType: "trafik",
                    groupType: "",
                })
            });
            if (!response.ok) {
                const result = await response.json();
                toast(result.message);
                return;
            }
            console.log(response)
            const responseJson = await response.json();
            downloadPDF(responseJson);
        } finally {
            setLoading(false);
        }
    }
    return !data ? null : (
        <Button size={'icon'} onClick={handleClick}>
            {
                loading ?
                    <LoaderIcon className='animate-spin' />
                    :
                    <DownloadIcon />
            }
        </Button>
    )
}

export default DownloadPDF
