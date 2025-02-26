"use client";
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { DownloadIcon, LoaderIcon } from 'lucide-react'
import { toast } from 'sonner'
import { useTrafficQueryStore } from '@/stores/trafficStore';
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
            const response = await fetch("http://localhost:4040/getPDF", {
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
                const body = await response.text();
                toast(body);
                return;
            }
            const responseJson = await response.json();
            downloadPDF(responseJson);
        } catch (e: any) {
            console.log(e);
            toast("Error while ading the PDF");
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
