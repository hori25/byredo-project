function requireEnv(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`)
  }

  return value
}

export const env = {
  // Use direct references so Next.js can inline NEXT_PUBLIC vars in client bundles.
  supabaseUrl: () =>
    requireEnv(process.env.NEXT_PUBLIC_SUPABASE_URL, 'NEXT_PUBLIC_SUPABASE_URL'),
  supabaseAnonKey: () =>
    requireEnv(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, 'NEXT_PUBLIC_SUPABASE_ANON_KEY'),
  supabaseServiceRoleKey: () =>
    requireEnv(process.env.SUPABASE_SERVICE_ROLE_KEY, 'SUPABASE_SERVICE_ROLE_KEY'),
  adminEmails: () =>
    (process.env.ADMIN_EMAILS ?? '')
      .split(',')
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean),
  // TossPayments — client key is inlined by Next.js for browser bundles
  tossClientKey: () =>
    requireEnv(process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY, 'NEXT_PUBLIC_TOSS_CLIENT_KEY'),
  // Secret key must only be used in server-side code (Server Actions / API Routes)
  tossSecretKey: () =>
    requireEnv(process.env.TOSS_SECRET_KEY, 'TOSS_SECRET_KEY'),
}
