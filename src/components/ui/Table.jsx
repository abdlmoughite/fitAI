export default function Table({ columns, data, onRowClick, className = '' }) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#E2E8F0] dark:border-surface-700/50">
            {columns.map(col => (
              <th key={col.key} className={`px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider ${col.align === 'right' ? 'text-right' : ''}`}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E2E8F0]/50 dark:divide-surface-700/30">
          {data.map((row, i) => (
            <tr
              key={row.id || i}
              onClick={() => onRowClick?.(row)}
              className={`text-surface-600 dark:text-surface-300 ${onRowClick ? 'cursor-pointer hover:bg-[#F8FAFC] dark:hover:bg-surface-800/30' : ''} transition-colors`}
            >
              {columns.map(col => (
                <td key={col.key} className={`px-4 py-3 ${col.align === 'right' ? 'text-right' : ''}`}>
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="text-center py-8 text-surface-500 text-sm">Aucune donnée</div>
      )}
    </div>
  )
}
