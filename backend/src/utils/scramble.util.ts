const BITS = 32;         
const HALF = BITS / 2;    
const MASK = (1 << HALF) - 1;  
const ROUNDS = 4;

function feistelRound(right: number, roundKey: number): number {
    return (right * 2654435761 + roundKey) & MASK;
}

export function scramble(num: bigint): bigint {
    let n = Number(num);
    let left = (n >>> HALF) & MASK;
    let right = n & MASK;

    for (let round = 0; round < ROUNDS; round++) {
        const newLeft = right;
        const newRight = left ^ feistelRound(right, round);
        left = newLeft;
        right = newRight;
    }

    return BigInt(((left << HALF) | right) >>> 0);
}

export function unscramble(num: bigint): bigint {
    let n = Number(num);
    let left = (n >>> HALF) & MASK;
    let right = n & MASK;

    for (let round = ROUNDS - 1; round >= 0; round--) {
        const newRight = left;
        const newLeft = right ^ feistelRound(left, round);
        left = newLeft;
        right = newRight;
    }

    return BigInt(((left << HALF) | right) >>> 0);
}