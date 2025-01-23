import React from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const Table = ({ columns, data, actions }) => {
  return (
    <div className="p-8 bg-white rounded shadow-md w-full">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Customers' List</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">+ New Customer</button>
      </div>
      <input
        type="text"
        placeholder="Search..."
        className="w-full p-2 border rounded mb-4"
      />
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            {columns.map((col, index) => (
              <th key={index} className="border p-2 text-left">{col.header}</th>
            ))}
            {actions && <th className="border p-2">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="text-center">
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="border p-2">{row[col.accessor]}</td>
              ))}
              {actions && (
                <td className="border p-2 flex justify-center gap-2">
                  {actions.includes("view") && (
                    <button className="text-blue-500"><FaEye /></button>
                  )}
                  {actions.includes("edit") && (
                    <button className="text-yellow-500"><FaEdit /></button>
                  )}
                  {actions.includes("delete") && (
                    <button className="text-red-500"><FaTrash /></button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
