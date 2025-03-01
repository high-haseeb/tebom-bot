import { useTrafficQueryStore } from '@/stores/trafficStore';
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import DownloadPDF from './DownloadPDF';
import { LoaderIcon } from 'lucide-react';

const OfferList = () => {
    const { responses, loading, loadingStarted } = useTrafficQueryStore();

    const [timeLeft, setTimeLeft] = useState(5 * 60);
    useEffect(() => {
        if (timeLeft <= 0) return;

        const interval = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timeLeft]);

    useEffect(() => {
        setTimeLeft(4 * 60);
    }, [loadingStarted]);

    if (!loading) {
        if (!loadingStarted) return null;

        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        return (
            <Card className="flex w-full flex-col gap-4">
                <CardHeader>
                    <CardTitle className="flex items-center justify-center gap-4">
                        <LoaderIcon className="animate-spin" />
                        {minutes}:{seconds.toString().padStart(2, "0")}
                    </CardTitle>
                </CardHeader>
            </Card>
        );
    }

    return (
        <Card className="flex w-full flex-col gap-4">
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    Mevcut teklifler
                    <DownloadPDF />
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                {responses &&
                    responses.map((response, index) =>
                        response.Price === 0 ? null : (
                            <div
                                key={index}
                                className="w-full flex items-center justify-between rounded-xl border bg-white px-3 py-2 text-black lg:w-[10rem]"
                            >
                                <div className="flex flex-col gap-2">
                                    <img
                                        src={`https://portal.acente365.com/CompanyLogos/120x35/${response.Logo}`}
                                        width={120}
                                        height={35}
                                        alt={response.InsuranceCompanyName}
                                    />
                                    <div className="font-semibold">{response.InsuranceCompanyName}</div>
                                </div>
                                <div>
                                    {response.Price} {response.Currency}
                                </div>
                            </div>
                        )
                    )}
            </CardContent>
        </Card>
    );
}

export default OfferList
