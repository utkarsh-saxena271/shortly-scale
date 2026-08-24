const ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

export const encodeUrl = (num: bigint): string => {
    if (num === 0n) return ALPHABET[0]!;
    let result = ''
    let n = num
    while (n > 0n) {
        result = ALPHABET[Number(n % 62n)]! + result
        n /= 62n;
    }
    return result
}

export const decodeUrl = (code: string): bigint => {
    let result = 0n;
    for (const char of code) {
        const index = ALPHABET.indexOf(char);
        if (index === -1) throw new Error(`Invalid character in code: ${char}`);
        result = result * 62n + BigInt(index);
    }
    return result;
}