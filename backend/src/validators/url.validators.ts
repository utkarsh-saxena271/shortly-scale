import z from "zod";

export const shortenUrlValidator = z.object({
    originalUrl: z.url("Must be a valid url")
})