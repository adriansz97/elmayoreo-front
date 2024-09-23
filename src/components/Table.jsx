export const Table = ({ headers, keys, items }) => {
  return (
    <table className="w-full table-auto text-sm text-left">
      <thead className="text-gray-600 font-medium border-b">
        <tr>
          {headers.map((item, idx) => (
            <th className="py-3 px-6">{item}</th>
          ))}
        </tr>
      </thead>
      <tbody className="text-gray-600 divide-y">
        {items.map((item, idx) => (
          <tr key={idx} className="odd:bg-gray-50 even:bg-white">
            {keys.map((item2) => (
              <td className="px-6 py-4 whitespace-nowrap">{item[item2]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
