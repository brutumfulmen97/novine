declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PAYLOAD_SECRET: string
      DATABASE_URI: string
      NEXT_PUBLIC_SERVER_URL: string
      VERCEL_PROJECT_PRODUCTION_URL: string
      PAYLOAD_SECRET: string
      NEXT_PUBLIC_SERVER_URL: string
      CRON_SECRET: string
      PREVIEW_SECRET: string
      PROJECT_NAME: string
      PROJECT_BASE_URL: string
      POSTGRES_DB: string
      POSTGRES_USER: string
      POSTGRES_PASSWORD: string
      POSTGRES_HOST: string
      POSTGRES_PORT: string
      DATABASE_URI: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
