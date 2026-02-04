import type { Metadata } from 'next'

type Props = {
  params: Promise<{
    place: string
  }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { place } = await params
  return {
    title: `${place} Store - Byredo`,
    description: `Byredo store in ${place}`,
  }
}

export default async function StorePlacePage({ params }: Props): Promise<React.JSX.Element> {
  const { place } = await params

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <a href="/offline-store" className="text-blue-600 hover:underline mb-4 inline-block">
          ← Back to All Stores
        </a>
        
        <h1 className="text-4xl font-bold mb-6 capitalize">
          {place.replace(/-/g, ' ')} Store
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Store Information</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-700">Address</h3>
                <p className="text-gray-600">
                  123 Main Street<br />
                  {place.replace(/-/g, ' ')}, 12345
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Hours</h3>
                <p className="text-gray-600">
                  Monday - Friday: 10:00 AM - 8:00 PM<br />
                  Saturday: 10:00 AM - 9:00 PM<br />
                  Sunday: 11:00 AM - 7:00 PM
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Contact</h3>
                <p className="text-gray-600">
                  Phone: +1 (555) 123-4567<br />
                  Email: {place}@byredo.com
                </p>
              </div>
            </div>
          </div>
          
          <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Map placeholder</p>
          </div>
        </div>
      </div>
    </main>
  )
}
