import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { create } from "zustand";
import { LoaderIcon } from "lucide-react";

interface SpecInformation {
    "PreviousAgencyCode": string,
    "PreviousPolicyNumber": string,
    "PreviousIsCancel": boolean,
    "DamageCount": string,
    "DamagelessLevel": string,
    "UsingType": string,
    "VehicleType": string,
    "VehicleTypeName": string;
}

export interface TrafficInfo {
    HeaderGuid: string;
    BirthDate: string;
    BrandCode: string;
    BrandName: string;
    LicensePlateNumber: string;
    ModelName: string;
    ModelCode: string;
    ModelYear: string;
    FuelTypeName: string;
    FuelType: string;
    ColorName: string;
    ColorCode: string;
    CustomerName: string;
    CustomerSurname: string;
    NationalNumber: string;
    TrafficRegistrationDate: string;
    PolicyStartDate: string;
    PolicyEndDate: string;
    CascoSpecInformation: SpecInformation;
}

interface TrafficInfoStore {
    data: TrafficInfo | null;
    setData: (data: TrafficInfo) => void;
}

export const useTrafficInfoStore = create<TrafficInfoStore>((set) => ({
    data: null,
    setData: (data) => set({ data }),
}));

const TrafficInfoDisplay: React.FC = () => {
    const data = useTrafficInfoStore((state) => state.data);

    if (!data) return null;
    {/* <div><LoaderIcon className="animate-spin" /></div> */ }

    return (
        <div className="flex flex-col w-full gap-2">
            <Card className="">
                <CardHeader>
                    <CardTitle>Araç Bilgileri</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-start">
                        <img src={`https://portal.acente365.com/Images/CarBrand/${data.BrandCode}.png`} width={100} />
                        <div className="flex flex-col">
                            <div className="font-semibold text-lg">{data.BrandName}</div>
                            <div className="font-semibold text-base">{data.ModelName}</div>
                            <div className="font-semibold text-sm text-secondary-foreground">{data.LicensePlateNumber} {data.ModelYear}</div>
                            <div className="font-light">{data.ColorName} {data.FuelTypeName}</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Araç Sahibi Bilgileri</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    <div className="font-semibold text-xl leading-tight lowercase first-letter:uppercase">{data.CustomerName} {data.CustomerSurname}
                        <div className="font-normal text-sm">{data.NationalNumber}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <DateCard title="Doğum Yılı" date={data.BirthDate} />
                        <DateCard title="Trafiğe Çıkış" date={data.TrafficRegistrationDate} />
                        <DateCard title="Poliçe Başlangıç" date={data.PolicyStartDate} />
                        <DateCard title="poliçe bitiş" date={data.PolicyEndDate} />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

const DateCard = ({ title, date }: { title: string; date: string }) => {
    return (
        <div className="flex flex-col p-2 border rounded-lg">
            <div className="leading-tight font-semibold">{
                new Date(date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                })
            }
            </div>
            <div className="text-sm">{title}</div>
        </div>
    )
}

export default TrafficInfoDisplay;
