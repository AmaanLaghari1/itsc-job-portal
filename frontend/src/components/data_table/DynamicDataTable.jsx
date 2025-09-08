import React, { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import './Data-table.css';
import { useSelector } from "react-redux";

const DynamicDataTable = ({ columns, data, title }) => {
  const [searchText, setSearchText] = useState("");
  const theme = useSelector((state) => state.ui.theme);

  const customStyles = {
    table: {
      style: {
        backgroundColor: "#000",
        border: "1px solid #444",
      },
    },
    headRow: {
      style: {
        backgroundColor: "#111",
        color: "#fff",
        borderBottom: "2px solid #444",
      },
    },
    headCells: {
      style: {
        color: "#fff",
        fontWeight: "bold",
        borderRight: "1px solid #444",
      },
    },
    pagination: {
      style: {
        backgroundColor: "#111",
        color: "#fff",
        borderTop: "1px solid #444",
        minHeight: "56px",
      },
      pageButtonsStyle: {
        borderRadius: "4px",
        margin: "0 2px",
        color: "#fff",
        fill: "#fff",
        backgroundColor: "#222",
        "&:hover": {
          backgroundColor: "#333",
          color: "#fff",
          fill: "#fff",
        },
        "&:disabled": {
          cursor: "not-allowed",
          color: "#666",
          fill: "#666",
        },
      },
    },
    rows: {
      style: {
        backgroundColor: "#000",
        color: "#fff",
        borderBottom: "1px solid #444",
      },
      highlightOnHoverStyle: {
        backgroundColor: "#222",
        color: "#fff",
        cursor: "pointer",
      },
    },
    cells: {
      style: {
        color: "#fff",
        borderRight: "1px solid #444",
      },
    },
  };


  // Filtered data by searching all fields (case-insensitive)
  const filteredData = useMemo(() => {
    if (!searchText) return data;
    return data.filter(row =>
      Object.values(row).some(
        value =>
          String(value).toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [data, searchText]);

  return (
    <div className="custom-table">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-2">
        <h4 className="mb-0">{title}</h4>
        <input
          type="text"
          placeholder="Search..."
          className="form-control form-control-sm w-auto"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        responsive
        highlightOnHover
        pointerOnHover
        dense
        customStyles={theme === "dark" ? customStyles : {}}
      />
    </div>
  );
};

export default DynamicDataTable;
