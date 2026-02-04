# Byredo Main Page Implementation

## 🎨 Design Implementation Summary

이 프로젝트는 Figma 디자인을 바탕으로 Next.js 14 + TypeScript로 구현한 Byredo 메인 페이지입니다.

### ✅ 완료된 작업

#### 1. **프로젝트 구조 설정**
- Next.js 14 + TypeScript 프로젝트 초기화
- Tailwind CSS 설정 및 커스텀 스타일 추가
- 폴더 구조 생성 및 라우팅 설정

#### 2. **에셋 관리**
- `/assets` 폴더의 이미지들을 `/public/images`로 복사
  - `main/` - 메인 페이지 히어로 이미지
  - `products/` - 제품 및 오프라인 매장 이미지
  - `logo.svg` - BYREDO 로고
- 커스텀 폰트 (Sk-Modernist) 추가

#### 3. **메인 페이지 구현**

##### **Header (고정 헤더)**
- 좌측: shop, offline-store 링크
- 중앙: BYREDO 로고
- 우측: mypage, login, join 링크
- 반응형 네비게이션
- 스크롤 시 고정 (fixed position)

##### **Hero Section (히어로 섹션)**
- 화면을 절반으로 나눈 레이아웃
- 좌측: LA COLLECTION 이미지
- 우측: LA MAISON 이미지 + BYREDO PARFUMS 텍스트
- 호버 시 이미지 확대 효과
- 그라데이션 오버레이

##### **Product Grid Section 1**
- 대형 타이틀 (TEXT) 양쪽 배치
- 4열 그리드 레이아웃
- 제품 이미지 카드
- 호버 시 확대 효과
- "Text Link" 버튼

##### **Large Image Section**
- 2열 그리드 레이아웃
- 좌측: 큰 이미지
- 우측: 컨텐츠 (타이틀 + 설명 + 링크)
- PLACEHOLDER 텍스트 스타일링

##### **Divider Section**
- 상단 보더
- 좌측: Placeholder Text
- 우측: Text Link 버튼

##### **Product Grid Section 2**
- 4열 정사각형 그리드
- 제품 이미지들
- 호버 효과

##### **Journal Section**
- 3열 레이아웃
- 중앙: Journal 타이틀 + 설명 + 버튼
- 좌우: 이미지들
- 하단: 추가 이미지 2개

##### **Footer**
- 대형 BYREDO 로고 텍스트
- 하단 정보: 이름, 이메일, 연락처
- 저작권 및 날짜 정보

### 📐 반응형 디자인

#### 구현된 반응형 기능
- `width: 100%` 설정으로 전체 너비 반응
- Flexbox 및 Grid 레이아웃 활용
- 이미지 비율 유지 (`aspect-ratio`)
- 텍스트 크기 조정 (md: 브레이크포인트)

#### 브레이크포인트
- 모바일: 기본
- 태블릿: `md:` (768px+)
- 데스크톱: 대형 화면

### 🎯 주요 기능

#### 1. **이미지 최적화**
- Next.js Image 컴포넌트 사용
- 자동 최적화 및 지연 로딩
- 우선순위 로딩 (hero 이미지)

#### 2. **애니메이션 & 인터랙션**
- 호버 효과 (이미지 확대, 버튼 이동)
- 부드러운 전환 효과
- 커스텀 CSS 애니메이션

#### 3. **타이포그래피**
- 커스텀 폰트 (Sk-Modernist)
- 다양한 폰트 크기 및 굵기
- 정확한 letter-spacing 및 line-height

#### 4. **컬러 시스템**
- 주요 색상: 흑백 베이스
- 그레이 음영 활용
- 투명도 및 그라데이션

### 🔧 기술 스택

```typescript
- Next.js 14.2.35
- React 18.2.0
- TypeScript 5.7.3
- Tailwind CSS 3.4.20
- PostCSS & Autoprefixer
```

### 📁 파일 구조

```
src/
├── app/
│   ├── globals.css          # 글로벌 스타일 + 커스텀 폰트
│   ├── layout.tsx           # 루트 레이아웃
│   └── page.tsx             # 메인 페이지 (★ 핵심 파일)
├── components/
│   ├── Button.tsx           # 재사용 버튼 컴포넌트
│   └── ui.tsx              # UI 컴포넌트 라이브러리
└── lib/
    └── utils.ts            # 유틸리티 함수

public/
├── images/
│   ├── main/               # 메인 히어로 이미지 (6개)
│   ├── products/           # 제품/매장 이미지 (20개)
│   └── logo.svg           # BYREDO 로고
└── fonts/
    ├── Sk-Modernist-Regular.woff
    └── Sk-Modernist-Bold.woff
```

### 🚀 실행 방법

```bash
# 개발 서버 시작
npm run dev

# 브라우저에서 열기
# http://localhost:3001 (포트 3000이 사용중일 경우)
```

### 🎨 디자인 시스템

#### 타이포그래피 스케일
- 초소형: 8px (uppercase labels)
- 소형: 11px (navigation)
- 중형: 16-26px (텍스트)
- 대형: 60-87px (섹션 타이틀)
- 초대형: 120-200px (브랜드 로고)

#### 간격 시스템
- 컴포넌트 간 간격: 24px (py-24)
- 그리드 간격: 2-8px (gap-2, gap-8)
- 섹션 간 간격: 32-64px

#### 애니메이션 타이밍
- 기본 전환: 0.2s (opacity, color)
- 이미지 확대: 0.5s-0.7s (transform)
- 버튼 이동: 0.2s (transform)

### ✨ 특별 구현 사항

1. **Split Hero Section**: 화면을 정확히 50:50으로 나눈 히어로 섹션
2. **Overlay Text**: 이미지 위에 텍스트 오버레이
3. **Grid Layouts**: 정확한 4열 그리드 시스템
4. **Custom Fonts**: Sk-Modernist 폰트 통합
5. **Hover Effects**: 모든 인터랙티브 요소에 호버 효과
6. **Fixed Header**: 스크롤해도 고정되는 헤더

### 🔄 향후 개선 가능 사항

1. **성능 최적화**
   - 이미지 최적화 강화
   - 코드 스플리팅
   - 지연 로딩 확장

2. **기능 추가**
   - 제품 데이터 동적 로딩
   - 검색 기능
   - 필터링
   - 장바구니

3. **접근성**
   - ARIA 레이블 추가
   - 키보드 네비게이션 강화
   - 스크린 리더 지원

4. **반응형 개선**
   - 모바일 최적화
   - 태블릿 레이아웃
   - 초대형 화면 대응

### 📝 참고 사항

- 모든 이미지 경로는 `/public/images/`를 기준으로 설정
- 컴포넌트는 TypeScript로 타입 안정성 보장
- Tailwind CSS 유틸리티 클래스 활용
- Next.js 14 App Router 패턴 준수

---

## 🎯 프로젝트 상태

✅ **완료**: Figma 디자인 구현
✅ **완료**: 반응형 레이아웃
✅ **완료**: 에셋 통합
✅ **실행 중**: http://localhost:3001

**Ready to use! 🚀**
