import { create } from "zustand";

type TrafficQueryResponse = {
    AdditionalPremiumDiscount: boolean;
    AvailableCampaigns: any[];
    BranchId: number;
    CalisilanBranchGuid: string;
    CalisilanBranchId: number;
    CalisilanFirmGuid: string;
    CalisilanFirmId: number;
    CalisilanUserGuid: string;
    CalisilanUserId: number;
    Currency: string;
    DetailGuid: string;
    Detay: any | null;
    DetayTaksitSayisi: string;
    ErrorMessage: string;
    ExpertiseGuid: string | null;
    FirmId: number;
    FirstYearDetailId: number;
    GroupType: string;
    HeaderGuid: string;
    Installments: any[];
    InsuranceCompanyName: string;
    IsAskedCenterWaiting: boolean;
    IsAuthorization: boolean;
    IsFavorite: boolean;
    IsHaveAskQuestionPermission: boolean;
    IsRepliedCenterWaiting: boolean;
    IsRevisedOffer: boolean;
    IsSecondYear: boolean;
    IsSendcenterEkopre: boolean;
    IsSendcenterManuel: boolean;
    IsSendcenterManuelFiyatli: boolean;
    IsSendcenterTekrarsor: boolean;
    Logo: string;
    OfferCode: string;
    OfferComission: number;
    PackageClassName: string;
    PackageGuid: string;
    PolicyStart: string;
    Price: number;
    QueryType: string;
    QueryTypeId: number;
    QueryTypeName: string;
    ScreenShot: string;
    ShowAttributeList: any[];
    ShowBuyButton: boolean;
    ShowPrice: boolean;
    StatusCode: any | null;
    Success: boolean;
    UserId: number;
};

type TrafficQueryStore = {
    responses: TrafficQueryResponse[];
    setResponses: (newResponses: TrafficQueryResponse[]) => void;
    addResponse: (response: TrafficQueryResponse) => void;
    clearResponses: () => void;
};

export const useTrafficQueryStore = create<TrafficQueryStore>((set) => ({
    responses: [],
    setResponses: (newResponses) => set({ responses: newResponses }),
    addResponse: (response) =>
        set((state) => ({ responses: [...state.responses, response] })),
    clearResponses: () => set({ responses: [] }),
}));
