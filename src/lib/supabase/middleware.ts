import { createServerClient } from '@supabase/ssr'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { env } from '@/lib/env'

function copyCookies(from: NextResponse, to: NextResponse) {
  for (const cookie of from.cookies.getAll()) {
    to.cookies.set(cookie)
  }
}

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request,
  })

  const supabase = createServerClient(env.supabaseUrl(), env.supabaseAnonKey(), {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        for (const { name, value } of cookiesToSet) {
          request.cookies.set(name, value)
        }

        response = NextResponse.next({
          request,
        })

        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options)
        }
      },
    },
  })

  const pathname = request.nextUrl.pathname
  const isAdminPath = pathname.startsWith('/admin')
  const isAdminLogin = pathname === '/admin/login'

  if (!isAdminPath) {
    return response
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user && !isAdminLogin) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/admin/login'
    loginUrl.searchParams.set('redirectTo', pathname)

    const redirectResponse = NextResponse.redirect(loginUrl)
    copyCookies(response, redirectResponse)
    return redirectResponse
  }

  if (!user) {
    return response
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .maybeSingle()

  const isAdmin = profile?.role === 'admin'

  if (isAdminLogin && isAdmin) {
    const adminUrl = request.nextUrl.clone()
    adminUrl.pathname = '/admin'
    adminUrl.searchParams.delete('redirectTo')

    const redirectResponse = NextResponse.redirect(adminUrl)
    copyCookies(response, redirectResponse)
    return redirectResponse
  }

  if (!isAdmin && !isAdminLogin) {
    await supabase.auth.signOut()

    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/admin/login'
    loginUrl.searchParams.set('error', 'admin_only')

    const redirectResponse = NextResponse.redirect(loginUrl)
    copyCookies(response, redirectResponse)
    return redirectResponse
  }

  return response
}
