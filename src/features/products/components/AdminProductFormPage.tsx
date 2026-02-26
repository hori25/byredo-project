'use client'

import Link from 'next/link'
import type { HTMLInputTypeAttribute } from 'react'
import { useRef, useState } from 'react'
import type { ProductRow } from '@/features/products/server/products.repository'

type AdminProductFormPageProps = {
  mode: 'create' | 'edit'
  productId?: string
  initialProduct?: ProductRow | null
  action: (formData: FormData) => void | Promise<void>
}

export function AdminProductFormPage({
  mode,
  productId,
  initialProduct,
  action,
}: AdminProductFormPageProps) {
  const isEdit = mode === 'edit'
  const [imageValue, setImageValue] = useState(initialProduct?.image ?? '')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handlePickImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : ''
      setImageValue(result)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-black/10 bg-white p-6 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              {isEdit ? '상품 수정' : '상품 추가'}
            </h2>
            <p className="mt-2 text-sm text-black/55">
              {isEdit
                ? `상품 ID(${productId ?? '-'}) 수정 페이지입니다. 변경 시 shop 목록에도 반영됩니다.`
                : '신규 상품 등록 페이지입니다. 저장 시 /shop 페이지에 노출됩니다(활성 상태일 때).'}
            </p>
          </div>
          <Link
            href="/admin/products"
            className="rounded-lg border border-black/10 bg-[#fafafa] px-4 py-2.5 text-sm font-medium text-black hover:bg-white"
          >
            목록으로
          </Link>
        </div>
      </section>

      <section className="rounded-xl border border-black/10 bg-white p-6 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
        <form action={action} className="grid gap-5 lg:grid-cols-2">
          <Field
            name="name"
            label="상품명"
            placeholder="예: BYREDO Candle"
            defaultValue={initialProduct?.name ?? ''}
          />
          <Field
            name="price"
            label="가격"
            type="number"
            placeholder="예: 59000"
            defaultValue={initialProduct?.price != null ? String(initialProduct.price) : ''}
          />

          <Field
            name="category"
            label="카테고리"
            placeholder="예: EAU DE PARFUM"
            defaultValue={initialProduct?.category ?? ''}
          />

          <Field
            name="slug"
            label="상품 슬러그"
            placeholder="예: byredo-candle"
            defaultValue={initialProduct?.slug ?? ''}
          />

          <label className="block lg:col-span-2">
            <span className="mb-2 block text-xs font-medium text-black/60">상품 사진</span>
            <div className="rounded-xl border border-black/10 bg-[#fafafa] p-4">
              <div className="flex flex-col gap-4 lg:flex-row">
                <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-lg border border-black/10 bg-white">
                  {imageValue ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={imageValue} alt="상품 미리보기" className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-xs text-black/40">미리보기</span>
                  )}
                </div>

                <div className="flex-1 space-y-3">
                  <input type="hidden" name="image" value={imageValue} />

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="rounded-lg border border-black bg-black px-3 py-2 text-sm font-medium text-white hover:bg-white hover:text-black"
                    >
                      사진 파일 선택
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageValue('')}
                      className="rounded-lg border border-black/10 bg-white px-3 py-2 text-sm font-medium text-black hover:bg-[#fafafa]"
                    >
                      사진 제거
                    </button>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePickImage}
                  />

                  <label className="block">
                    <span className="mb-2 block text-xs font-medium text-black/60">이미지 경로 / URL (직접 입력)</span>
                    <input
                      type="text"
                      value={imageValue}
                      onChange={(e) => setImageValue(e.target.value)}
                      placeholder="/images/products/shop_1.png 또는 https://..."
                      className="h-11 w-full rounded-lg border border-black/10 bg-white px-3 text-sm outline-none focus:border-black"
                    />
                  </label>
                </div>
              </div>
            </div>
          </label>

          <Field
            name="display_order"
            label="노출 순서"
            type="number"
            placeholder="0"
            defaultValue={initialProduct?.display_order != null ? String(initialProduct.display_order) : '0'}
          />

          <Field
            name="size"
            label="사이즈"
            placeholder="예: 100 ml"
            defaultValue={initialProduct?.size ?? ''}
          />
          <Field
            name="size_info"
            label="사이즈 보조 텍스트"
            placeholder="예: +2 SIZE"
            defaultValue={initialProduct?.size_info ?? ''}
          />

          <label className="block">
            <span className="mb-2 block text-xs font-medium text-black/60">상태</span>
            <select
              name="is_active"
              defaultValue={initialProduct?.is_active ? 'true' : 'false'}
              className="h-11 w-full rounded-lg border border-black/10 bg-white px-3 text-sm outline-none focus:border-black"
            >
              <option value="true">active</option>
              <option value="false">inactive</option>
            </select>
          </label>

          <label className="flex items-center gap-3 rounded-lg border border-black/10 px-3">
            <input
              name="try_it_first"
              type="checkbox"
              defaultChecked={initialProduct?.try_it_first ?? false}
              className="h-4 w-4 accent-black"
            />
            <span className="text-sm text-black/75">TRY-IT-FIRST 배지 표시</span>
          </label>

          <label className="block lg:col-span-2">
            <span className="mb-2 block text-xs font-medium text-black/60">설명</span>
            <textarea
              name="description"
              rows={6}
              defaultValue={initialProduct?.description ?? ''}
              placeholder="상품 설명 입력"
              className="w-full rounded-lg border border-black/10 bg-white px-3 py-3 text-sm outline-none focus:border-black"
            />
          </label>

          <div className="lg:col-span-2 flex items-center justify-end gap-3 pt-2">
            <Link
              href="/admin/products"
              className="rounded-lg border border-black/10 bg-[#fafafa] px-4 py-2.5 text-sm font-medium text-black hover:bg-white"
            >
              취소
            </Link>
            <button
              type="submit"
              className="rounded-lg border border-black bg-black px-4 py-2.5 text-sm font-medium text-white hover:bg-white hover:text-black"
            >
              {isEdit ? '상품 수정 저장' : '상품 등록'}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

function Field({
  name,
  label,
  placeholder,
  defaultValue,
  type = 'text',
}: {
  name: string
  label: string
  placeholder?: string
  defaultValue?: string
  type?: HTMLInputTypeAttribute
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-medium text-black/60">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="h-11 w-full rounded-lg border border-black/10 bg-white px-3 text-sm outline-none focus:border-black"
      />
    </label>
  )
}
