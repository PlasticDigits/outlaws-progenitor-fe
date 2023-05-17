import { ADDRESS_WBNB } from "../constants/addresses";
import { LINK_CZCASH } from "../constants/links";

export const czCashBuyLink = (inAddress, outAddress) => {
  if (inAddress == ADDRESS_WBNB) inAddress = "BNB";
  if (outAddress == ADDRESS_WBNB) outAddress = "BNB";
  if (inAddress == outAddress) {
    return `${LINK_CZCASH}/#/swap?outputCurrency=${outAddress}`;
  } else {
    return `${LINK_CZCASH}/#/swap?inputCurrency=${inAddress}&outputCurrency=${outAddress}`;

  }
}

export const czCashAddLink = (token0, token1) => {
  if (token0 == ADDRESS_WBNB) token0 = "BNB";
  if (token1 == ADDRESS_WBNB) token1 = "BNB";
  return `${LINK_CZCASH}/#/pool?token0=${token0}&token1=${token1}`
}