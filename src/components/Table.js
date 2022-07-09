import React from "react";

const Table = ({ countries }) => {
  return (
    <div className="my-5 table_wrapper h-96 overflow-auto pr-4">
      <table className="table table-auto  w-full text-left rounded-md">
        <tbody className="">
          {countries.map(({ country, cases }) => (
            <tr
              key={country}
              className="odd:bg-blue-50 flex justify-between items-center"
            >
              <td className="p-1 ">{country}</td>
              <td className="p-1 ">{cases}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
