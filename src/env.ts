import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.url({
    error: 'NEXT_PUBLIC_SITE_URL must be an absolute URL, for example https://example.com',
  }),
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
})

export type Env = z.infer<typeof envSchema>

function formatIssues(error: z.ZodError<Env>): string {
  return error.issues
    .map((issue) => `  ${issue.path.join('.')}: ${issue.message}`)
    .join('\n')
}

function parseEnv(): Env {
  const parsed = envSchema.safeParse({
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NODE_ENV: process.env.NODE_ENV,
  })

  if (!parsed.success) {
    throw new Error(
      `Invalid environment variables:\n${formatIssues(parsed.error)}\n\nCopy .env.example to .env.local and fill in the missing values.`,
    )
  }

  return parsed.data
}

export const env = parseEnv()
