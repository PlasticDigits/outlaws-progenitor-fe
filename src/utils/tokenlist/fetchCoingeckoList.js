import { getAddress, isAddress } from "@ethersproject/address";
import axios from "axios";
import { LINK_COINGECKO_TOKENS } from "../../constants/links";

const getCoingeckoTokens = async (listName) => {
  const { data } = await axios.get(LINK_COINGECKO_TOKENS);
  return data.tokens;
};

const fetchCoingeckoList = async () => {
  try {
    const tokens = await getCoingeckoTokens();

    const sanitizedTokens = tokens
      .filter((token) => {
        return isAddress(token.address);
      })
      .map((token) => {
        return {
          name: token.name,
          symbol: token.symbol,
          address: getAddress(token.address),
          decimals: token.decimals,
          logoURI: token.logoURI?.replace('/thumb/', '/small/'),
        };
      });

    return sanitizedTokens;
  } catch (error) {
    console.error(`Error when fetching Coingecko list, error: ${error.message}`, error);
  }
};

export default fetchCoingeckoList;