export const isPlateValid = async (plateNumber: string) => {
    const url = "http://localhost:6969";
    const response = await fetch(url, {
        "body": JSON.stringify({
            plateNumber: plateNumber,
        }),
        "method": "POST",
    });

    const body = await response.json();
    console.log(body);
    return body;
}

type TrafficInformation = {
    IsYK: boolean,
    NationalNumber: string,
    LicensePlateNumber: string,
    LicensePermitNumber: string,
    Phone: string,
    EMail: string,
    HaveLicensePermitNumber: boolean,
    IsSorgu: boolean,
    IsDisabled: boolean,
    ProfessionCode: number,
    MasterBranch: number,
    MortgageeType: string
    Calisilanfirma: string,
    Calisilansube: string,
    Calisilanuser: string,
}

export const getTrafficInformation = async () => {
    const url = "http://localhost:6969/getTrafficInfo";
    const requestData = {
        Calisilanfirma: "6cc33e04-badc-4a24-adab-75802596cce0",
        Calisilansube: "a82d67ae-596d-40e8-8077-0accd3dbcd88",
        Calisilanuser: "9119293f-6357-48e3-bb69-088df2837221",
        IsYK: false,

        /// these are to be taken as input
        NationalNumber: "13527085382",
        LicensePlateNumber: "81 AES 534",
        LicensePermitNumber: "HM 766679",
        Phone: "505 365 09 98",
        IsDisabled: false,
        /// 

        EMail: "abcd123@gmail.com",
        HaveLicensePermitNumber: true,
        IsSorgu: false,
        ProfessionCode: 18,
        MasterBranch: 1,
        MortgageeType: "Y",
        MortgageeBankCode: "",
        MortgageeBankBranchCode: "",
        MortgageeFinancerCode: ""
    };

    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(requestData),
    });

    const result = await response.json();
    console.log("Response from server:", result);
    return result;
};

export async function getListOffers() {
    const response = await fetch("http://localhost:6969/getOffers");
    const body = await response.json();
    return body.data;
}
