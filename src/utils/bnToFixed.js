import { formatUnits } from "ethers/lib/utils.js";

export function bnToFixed(bn, tokenDecimals, fixedDecimals) {
    if (!bn) return (0).toFixed(fixedDecimals);
    let x = Number(formatUnits(bn, tokenDecimals));
    let exp = 10 ** fixedDecimals;
    return (Math.floor(x * exp) / exp).toFixed(fixedDecimals)
}

export function bnToCompact(bn, tokenDecimals, significantDigits) {
    if (!bn) return (0).toFixed(significantDigits);
    let x = Number(formatUnits(bn, tokenDecimals));
    if (x < 1) {
        //Truncate extra digits when x is fractional
        let exp = 10 ** (significantDigits - 1);
        return (Math.floor(x * exp) / exp).toFixed(significantDigits - 1)
    } else {
        //Otherwise, use NumberFormat and display in compact format
        return Intl.NumberFormat('en-US', {
            notation: "compact",
            minimumSignificantDigits: significantDigits,
            maximumSignificantDigits: significantDigits,
            roundingMode: "trunc"
        }).format(x);

    }
}