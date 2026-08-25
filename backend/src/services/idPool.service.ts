import client from "../config/redis.config.js";

let currentId = 0n;
let maxId = 0n;
let refillPromise: Promise<void> | null = null;

const BATCH_SIZE = 1000n;

const refill = async(): Promise<void> => {
    const newMax = await client.incrBy('idpool:counter', Number(BATCH_SIZE));
    maxId = BigInt(newMax);
    currentId = maxId - BATCH_SIZE;
}

export const getNextId = async (): Promise<bigint> => {
    if (currentId >= maxId) {
        if (!refillPromise) {
            refillPromise = refill().finally(() => { refillPromise = null; });
        }
        await refillPromise;
    }
    return currentId++;
}