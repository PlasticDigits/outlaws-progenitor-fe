import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import OutlawsNftAbi from '../abi/OutlawsNft.json';
import { ADDRESS_OUTLAWS_NFT } from '../constants/addresses';
import { getIpfsJson, getIpfsUrl } from '../utils/getIpfsJson';

export default function useOutlawMetadata(nftId) {

    const {
        data: ipfsCidData,
        isError: ipfsCidIsError,
        isLoading: ipfsCidIsLoading,
    } = useContractRead({
        address: ADDRESS_OUTLAWS_NFT,
        abi: OutlawsNftAbi,
        functionName: 'jsonIpfsHash',
        args: [nftId],
    });

    const [metadata, setMetadata] = useState();

    useEffect(() => {
        if (!ipfsCidData) return;
        (async () => {
            const res = await getIpfsJson(getIpfsUrl('ipfs://' + ipfsCidData));
            setMetadata(res);
        })();
    }, [ipfsCidData]);

    return { metadata }
}