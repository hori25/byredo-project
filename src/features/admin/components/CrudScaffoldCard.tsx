type CrudScaffoldCardProps = {
  entity: string
  fields: string[]
}

export function CrudScaffoldCard({
  entity,
  fields,
}: CrudScaffoldCardProps) {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold">{entity} List</h2>
          <p className="text-sm text-zinc-600">
            CRUD 기본 화면 스캐폴드입니다. Supabase query 연결 전 단계입니다.
          </p>
        </div>
        <button
          type="button"
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
        >
          Create {entity}
        </button>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-zinc-200">
        <table className="min-w-full divide-y divide-zinc-200 text-sm">
          <thead className="bg-zinc-50">
            <tr>
              {fields.map((field) => (
                <th
                  key={field}
                  className="px-4 py-3 text-left font-semibold text-zinc-700"
                >
                  {field}
                </th>
              ))}
              <th className="px-4 py-3 text-left font-semibold text-zinc-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 bg-white">
            <tr>
              {fields.map((field) => (
                <td key={field} className="px-4 py-3 text-zinc-500">
                  sample_{field.toLowerCase()}
                </td>
              ))}
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="rounded-md border border-zinc-300 px-2 py-1 text-xs font-medium"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="rounded-md border border-rose-300 px-2 py-1 text-xs font-medium text-rose-600"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}
