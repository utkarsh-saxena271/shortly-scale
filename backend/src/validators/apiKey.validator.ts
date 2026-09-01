import z from "zod";

export const generateApiKeySchema = z.object({
    tier:z.enum(['FREE' , 'PRO']).default('FREE')
})