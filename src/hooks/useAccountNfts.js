import { utils } from 'ethers';
import { useEffect, useState } from "react";
import { readContracts, useAccount, useContractRead } from "wagmi";
import IERC721Enumerable from "../abi/IERC721Enumerable.json";
import { ADDRESS_ZERO } from '../constants/addresses';
const { formatEther, parseEther, Interface } = utils;

export default function useAccountNfts(nftAddress) {
    const { address, isConnecting, isDisconnected } = useAccount();

    const [accountNftIdArray, setAccountNftIdArray] = useState([]);

    const {
        data: nftCountData,
        isError: nftCountIsError,
        isLoading: nftCountIsLoading,
    } = useContractRead({
        abi: IERC721Enumerable,
        address: nftAddress,
        functionName: 'balanceOf',
        args: [address ?? ADDRESS_ZERO],
        watch: true,
    });

    const nftCount =
        !nftCountIsLoading && !nftCountIsError
            ? Number(nftCountData.toString())
            : 0;

    useEffect(() => {
        if (!address) return;
        if (!nftCount) return;
        if (nftCount == 0) return;
        (async () => {
            console.log(nftCount)
            const data = await readContracts({
                contracts: [...new Array(nftCount)].map((val, i) => ({
                    abi: IERC721Enumerable,
                    address: nftAddress,
                    functionName: 'tokenOfOwnerByIndex',
                    args: [address ?? ADDRESS_ZERO, i]
                }))
            })
            setAccountNftIdArray(data)
        })();
    }, [address, nftCount?.toString(), nftAddress]);

    return { accountNftIdArray, accountNftCount: Number(nftCount?.toString()) }
}