import 'dotenv/config'

const requireEnv = (key:string) : string => {
    const val = process.env[key]
    if(!val) throw new Error(`No env var found for ${key}`)

    return val
}

const envConfig = {
    PORT:requireEnv('PORT'),
    DATABASE_URL:requireEnv('DATABASE_URL'),
    REDIS_URL:requireEnv('REDIS_URL'),
    BASE_URL:requireEnv('BASE_URL'),
    NODE_ENV:requireEnv('NODE_ENV')
}

export default envConfig;