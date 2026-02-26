'use server'

import { revalidatePath } from 'next/cache'
import { createSupabaseAdminClient } from '@/lib/supabase/server'

export type GrantAdminActionState = {
  status: 'idle' | 'success' | 'error'
  message: string | null
}

export async function grantAdminRoleByEmailAction(
  _prevState: GrantAdminActionState,
  formData: FormData,
): Promise<GrantAdminActionState> {
  const email = formData.get('email')

  if (typeof email !== 'string' || !email.trim()) {
    return {
      status: 'error',
      message: '이메일을 입력해주세요.',
    }
  }

  const normalizedEmail = email.trim().toLowerCase()
  const supabase = createSupabaseAdminClient()

  const { data: profile, error: findError } = await supabase
    .from('profiles')
    .select('id, email, role')
    .ilike('email', normalizedEmail)
    .maybeSingle()

  if (findError) {
    console.error('[grantAdminRoleByEmailAction:find]', findError.message)
    return {
      status: 'error',
      message: '회원 조회 중 오류가 발생했습니다.',
    }
  }

  if (!profile) {
    return {
      status: 'error',
      message: '해당 이메일의 회원이 없습니다. 먼저 회원가입이 필요합니다.',
    }
  }

  if (profile.role === 'admin') {
    return {
      status: 'success',
      message: '이미 관리자 권한이 부여된 계정입니다.',
    }
  }

  const { error: updateError } = await supabase
    .from('profiles')
    .update({ role: 'admin' })
    .eq('id', profile.id)

  if (updateError) {
    console.error('[grantAdminRoleByEmailAction:update]', updateError.message)
    return {
      status: 'error',
      message: '관리자 권한 부여에 실패했습니다.',
    }
  }

  revalidatePath('/admin/users')
  revalidatePath('/admin/dashboard')

  return {
    status: 'success',
    message: `${normalizedEmail} 계정에 관리자 권한을 부여했습니다.`,
  }
}
