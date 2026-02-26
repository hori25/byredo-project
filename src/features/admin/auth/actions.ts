'use server'

import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'

function normalizeRedirectTo(value: FormDataEntryValue | null) {
  if (typeof value !== 'string') {
    return '/admin'
  }

  if (!value.startsWith('/admin')) {
    return '/admin'
  }

  return value
}

export async function signInAdminWithPasswordAction(formData: FormData) {
  const email = formData.get('email')
  const password = formData.get('password')
  const redirectTo = normalizeRedirectTo(formData.get('redirectTo'))

  if (typeof email !== 'string' || typeof password !== 'string') {
    redirect('/admin/login?error=invalid_credentials')
  }

  const supabase = await createSupabaseServerClient()

  const { data: signInData, error: signInError } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    })

  if (signInError || !signInData.user) {
    redirect('/admin/login?error=invalid_credentials')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', signInData.user.id)
    .maybeSingle()

  if (!profile) {
    await supabase.auth.signOut()
    redirect('/admin/login?error=profile_missing')
  }

  if (profile.role !== 'admin') {
    await supabase.auth.signOut()
    redirect('/admin/login?error=admin_only')
  }

  redirect(redirectTo)
}

export async function signOutAdminAction() {
  const supabase = await createSupabaseServerClient()
  await supabase.auth.signOut()
  redirect('/admin/login')
}
