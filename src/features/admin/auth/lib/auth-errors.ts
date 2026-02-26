export function getAdminAuthErrorMessage(errorCode: string | null | undefined) {
  switch (errorCode) {
    case 'invalid_credentials':
      return '이메일 또는 비밀번호가 올바르지 않습니다.'
    case 'admin_only':
      return '관리자 권한이 없는 계정입니다.'
    case 'profile_missing':
      return 'profiles row가 없습니다. SQL 트리거 설정을 확인하세요.'
    default:
      return null
  }
}
