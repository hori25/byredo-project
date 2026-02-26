# Admin Dashboard Initial Setup (Next.js App Router + Supabase)

## 1) 새 프로젝트를 처음부터 만들 때

```bash
npx create-next-app@latest my-admin --ts --tailwind --app --src-dir --eslint --import-alias "@/*"
cd my-admin
npm install @supabase/supabase-js
```

## 2) 현재 프로젝트에 추가된 구조 (feature 기반)

- `src/app/admin/(protected)/*`: 관리자 보호 라우트
- `src/app/admin/login/page.tsx`: 로그인(임시)
- `src/features/admin/*`: 관리자 UI / 인증 가드
- `src/features/users|products|orders|payments/*`: 도메인별 서버 레이어
- `src/lib/supabase/*`: Supabase 클라이언트 생성
- `src/lib/env.ts`: 환경변수 접근 유틸
- `middleware.ts`: `/admin` 접근 제어(임시 쿠키 방식)

## 3) 환경변수

`.env.local` 기준:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (서버 전용)
- `ADMIN_EMAILS` (차후 RBAC 연결 시 사용)

## 4) 다음 단계 (권장)

1. Supabase Auth 로그인 폼 구현 (`/admin/login`)
2. JWT claim 또는 `profiles.role = 'admin'` 기반 권한 체크
3. 실제 테이블 스키마에 맞춘 repository / DTO / server action 연결
4. CRUD 폼 + 페이지네이션 + 검색 필터 추가
