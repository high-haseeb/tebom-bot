import { useTrafficQueryStore } from '@/stores/trafficStore';
import React from 'react'

const OfferList = () => {
    const { responses } = useTrafficQueryStore();
    return (
        <div className="flex flex-col gap-4">
            {
                responses &&
                responses.map((response, index) => {
                    return response.Price == 0 ?
                        (
                            null
                        )
                        : (
                            <div className="px-3 py-2 bg-white text-black border w-[10rem]" key={index}>
                                <img src={`https://portal.acente365.com/CompanyLogos/120x35/${response.Logo}`} width={120} height={35} />
                                <div className="font-semibold">{response.InsuranceCompanyName}</div>
                                <div>{response.Price} {response.Currency}</div>
                            </div>
                        )
                })
            }
        </div>
    )
}

export default OfferList
