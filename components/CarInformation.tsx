import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { create } from "zustand";

interface TrafficInfo {
    HeaderGuid: string;
    BirthDate: string;
    BrandCode: string;
    BrandName: string;
    LicensePlateNumber: string;
    ModelName: string;
    ModelYear: number;
    FuelTypeName: string;
    ColorName: string;
    CustomerName: string;
    CustomerSurname: string;
    NationalNumber: string;
    TrafficRegistrationDate: string;
    PolicyStartDate: string;
    PolicyEndDate: string;
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

    if (!data) return <p>Loading...</p>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            <Card>
                <CardHeader>
                    <CardTitle>Vehicle Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <p><strong>Brand:</strong> {data.BrandName} ({data.BrandCode})</p>
                    <p><strong>Model:</strong> {data.ModelName} ({data.ModelYear})</p>
                    <p><strong>License Plate:</strong> {data.LicensePlateNumber}</p>
                    <p><strong>Fuel Type:</strong> {data.FuelTypeName}</p>
                    <p><strong>Color:</strong> {data.ColorName}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Owner Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <p><strong>Name:</strong> {data.CustomerName} {data.CustomerSurname}</p>
                    <p><strong>National ID:</strong> {data.NationalNumber}</p>
                    <p><strong>Birth Date:</strong> {new Date(data.BirthDate).toLocaleDateString()}</p>
                    <p><strong>Traffic Registration:</strong> {new Date(data.TrafficRegistrationDate).toLocaleDateString()}</p>
                    <p><strong>Policy Start:</strong> {new Date(data.PolicyStartDate).toLocaleDateString()}</p>
                    <p><strong>Policy End:</strong> {new Date(data.PolicyEndDate).toLocaleDateString()}</p>
                </CardContent>
            </Card>
        </div>
    );
};

export default TrafficInfoDisplay;
