# Supabase CLI 설정 (원격 테이블 생성/수정용)

이 프로젝트는 이미 Supabase CLI가 설치되어 있고, 프로젝트 링크도 되어 있습니다.

- CLI 버전: `supabase 2.75.0`
- 링크된 프로젝트 ref: `spvhabpsielhitengrpx`

## 현재 막힌 지점 (필수)

원격 DB에 마이그레이션을 적용하려면 CLI 인증이 필요합니다.

오류 확인:
- `Access token not provided. Supply an access token by running supabase login or setting the SUPABASE_ACCESS_TOKEN environment variable.`

즉, 아래 중 하나가 필요합니다.

## 방법 1) `supabase login` (권장)

```bash
supabase login
```

- 브라우저에서 발급받은 Personal Access Token(PAT)을 입력합니다.
- 토큰 발급 위치: Supabase Dashboard > Account > Access Tokens

## 방법 2) 환경변수로 토큰 설정

세션에서만 임시로 설정:

```bash
export SUPABASE_ACCESS_TOKEN=YOUR_SUPABASE_PAT
```

## 원격 DB 비밀번호 (db push 시 필요할 수 있음)

`supabase db push` 실행 시 원격 Postgres 비밀번호를 요구할 수 있습니다.

- Supabase Dashboard > Project Settings > Database 에서 확인
- 실행 예시:

```bash
supabase db push --linked -p 'YOUR_DB_PASSWORD'
```

또는 프롬프트에 입력

## 이 프로젝트에서 사용할 명령어 (npm scripts)

`package.json`에 추가됨:

```bash
npm run db:list
npm run db:new -- add_products_table
npm run db:push:dry
npm run db:push
npm run db:pull
```

## 내가 앞으로 테이블 생성/수정할 때 쓰는 절차

1. `npm run db:new -- <migration_name>`
2. `supabase/migrations/*.sql`에 SQL 작성/수정
3. `npm run db:push:dry`로 적용 예정 확인
4. `npm run db:push`로 원격 반영

## 참고

- 애플리케이션 런타임용 키(`.env.local`)와 CLI 인증 토큰(PAT)은 별개입니다.
- `.env.local`에 있는 `SUPABASE_SERVICE_ROLE_KEY`만으로는 `supabase db push` 인증이 대체되지 않습니다.
