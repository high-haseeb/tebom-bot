import { useTrafficQueryStore } from '@/stores/trafficStore';
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import DownloadPDF from './DownloadPDF';
import { LoaderIcon } from 'lucide-react';

const OfferList = () => {
    const { responses, loading, loadingStarted } = useTrafficQueryStore();

    if (!loading) {
        if (!loadingStarted) return null;

        return (
            <Card className="flex w-full flex-col gap-4">
                <CardHeader>
                    <CardTitle className="flex items-center justify-center">
                        <LoaderIcon className="animate-spin" />
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
