# Admin Dashboard 초기 세팅 가이드 (Next.js App Router + TypeScript)

이 프로젝트는 이미 `Next.js 14(App Router)`, `TailwindCSS`, `Supabase` 연동 기본 구조와 관리자 라우트를 포함하고 있습니다.

현재 기준 확인 사항:
- `next@14.x` 사용 중
- `tailwindcss` 설치됨
- `@supabase/supabase-js`, `@supabase/ssr` 설치됨
- 관리자 라우트 기본 화면 존재: `src/app/admin/(protected)/*`
- feature 기반 구조 존재: `src/features/*`

## 1) 새 프로젝트를 처음부터 만드는 경우 (참고)

```bash
npx create-next-app@latest admin-dashboard \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*"
```

## 2) 필요한 패키지 설치

이 저장소는 이미 설치되어 있지만, 신규 프로젝트 기준으로는 아래를 설치합니다.

```bash
npm install @supabase/supabase-js @supabase/ssr
```

## 3) 환경변수 파일 세팅 (`.env.local`)

`.env.local.example`를 복사해서 `.env.local` 생성:

```bash
cp .env.local.example .env.local
```

필수 환경변수:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY
ADMIN_EMAILS=admin@example.com,ops@example.com
```

참고:
- `NEXT_PUBLIC_*` 값은 클라이언트/서버 공용으로 사용됩니다.
- `SUPABASE_SERVICE_ROLE_KEY`는 서버 전용입니다. 클라이언트 컴포넌트에서 직접 사용하면 안 됩니다.
- `ADMIN_EMAILS`는 초기 관리자 접근 제어(부트스트랩)용이며, 이후 `profiles.role = 'admin'` 기반 RBAC로 확장 가능합니다.

## 4) 현재 프로젝트의 확장 가능한 Supabase 구조

- 공통 env 접근: `src/lib/env.ts`
- 브라우저 클라이언트: `src/lib/supabase/client.ts`
- 서버 클라이언트: `src/lib/supabase/server.ts`
- 미들웨어 세션/보호 라우트: `src/lib/supabase/middleware.ts`

이 구조는 기능별 repository/service 계층과 분리되어 있어, 추후 CRUD 확장 시 재사용하기 좋습니다.

## 5) feature 기준 폴더 구조 (현재 프로젝트 기준)

```text
src/
  app/
    admin/
      login/
      (protected)/
        users/
        products/
        orders/
        payments/
  features/
    admin/
      auth/
      components/
    users/
      server/
    products/
      server/
    orders/
      server/
    payments/
      server/
  lib/
    supabase/
    env.ts
```

## 6) 실행

```bash
npm run dev
```

관리자 페이지 경로:
- `/admin/login`
- `/admin`
- `/admin/users`
- `/admin/products`
- `/admin/orders`
- `/admin/payments`
