'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createProductAdmin, updateProductAdmin } from '@/features/products/server/products.repository'

function toSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function parseBool(value: FormDataEntryValue | null) {
  return value === 'true' || value === 'on'
}

function parseNumber(value: FormDataEntryValue | null, fallback = 0) {
  if (typeof value !== 'string') return fallback
  const num = Number(value)
  return Number.isFinite(num) ? num : fallback
}

export async function createProductAction(formData: FormData) {
  const name = String(formData.get('name') ?? '').trim()
  const slugInput = String(formData.get('slug') ?? '').trim()

  if (!name) {
    throw new Error('상품명은 필수입니다.')
  }

  const slug = toSlug(slugInput || name)

  await createProductAdmin({
    name,
    description: String(formData.get('description') ?? '').trim() || null,
    price: parseNumber(formData.get('price')),
    is_active: parseBool(formData.get('is_active')),
    slug,
    category: String(formData.get('category') ?? '').trim() || null,
    image: String(formData.get('image') ?? '').trim() || null,
    size: String(formData.get('size') ?? '').trim() || null,
    size_info: String(formData.get('size_info') ?? '').trim() || null,
    try_it_first: parseBool(formData.get('try_it_first')),
    display_order: parseNumber(formData.get('display_order')),
  })

  revalidatePath('/admin/products')
  revalidatePath('/admin/dashboard')
  revalidatePath('/shop')
  redirect('/admin/products')
}

export async function updateProductAction(productId: string, formData: FormData) {
  const name = String(formData.get('name') ?? '').trim()
  const slugInput = String(formData.get('slug') ?? '').trim()

  if (!name) {
    throw new Error('상품명은 필수입니다.')
  }

  const slug = toSlug(slugInput || name)

  await updateProductAdmin(productId, {
    name,
    description: String(formData.get('description') ?? '').trim() || null,
    price: parseNumber(formData.get('price')),
    is_active: parseBool(formData.get('is_active')),
    slug,
    category: String(formData.get('category') ?? '').trim() || null,
    image: String(formData.get('image') ?? '').trim() || null,
    size: String(formData.get('size') ?? '').trim() || null,
    size_info: String(formData.get('size_info') ?? '').trim() || null,
    try_it_first: parseBool(formData.get('try_it_first')),
    display_order: parseNumber(formData.get('display_order')),
  })

  revalidatePath('/admin/products')
  revalidatePath('/admin/dashboard')
  revalidatePath('/shop')
  redirect('/admin/products')
}

