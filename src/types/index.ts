// Type definitions for common types used across the application
export type Product = {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
}

export type Store = {
  id: string
  name: string
  address: string
  city: string
  country: string
  phone: string
  email: string
  hours: {
    monday: string
    tuesday: string
    wednesday: string
    thursday: string
    friday: string
    saturday: string
    sunday: string
  }
  coordinates: {
    lat: number
    lng: number
  }
}
