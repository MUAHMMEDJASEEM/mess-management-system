import React, { useState, useEffect } from 'react';

const UserList = () => {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState('');
  const [tableData, setTableData] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);

  useEffect(() => {
    // Fetch table data when the component mounts
    const fetchTables = async () => {
      try {
        const response = await fetch('https://mess-server-new.onrender.com/table');
        const data = await response.json();
        setTables(data);
      } catch (error) {
        console.error('Error fetching table data:', error);
      }
    };

    fetchTables();
  }, []);

  useEffect(() => {
    // Fetch data based on the selected table
    const fetchData = async () => {
      if (selectedTable) {
        try {
          const response = await fetch(`https://mess-server-new.onrender.com/${selectedTable}`);
          const data = await response.json();

          // Extract column names from the first item in the data array
          const columns = Object.keys(data[0]);

          setTableColumns(columns);
          setTableData(data);
        } catch (error) {
          console.error(`Error fetching data for table ${selectedTable}:`, error);
        }
      }
    };

    fetchData();
  }, [selectedTable]);

  const handleTableChange = (event) => {
    setSelectedTable(event.target.value);
  };

  return (
    <div>
      <h1>Data Explorer</h1>
      <label>Select a Table:</label>
      <select value={selectedTable} onChange={handleTableChange}>
        <option value="">Select a table</option>
        {tables.map((table) => (
          <option key={table.table_name} value={table.table_name}>
            {table.table_name}
          </option>
        ))}
      </select>

      {selectedTable && (
        <div>
          <h2>Data for {selectedTable}</h2>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                {/* Dynamically render table headers based on columns */}
                {tableColumns.map((column) => (
                  <th key={column}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, index) => (
                <tr key={index}>
                  {/* Dynamically render table data based on columns */}
                  {tableColumns.map((column) => (
                    <td key={column} style={{ border: '1px solid #ddd', padding: '8px' }}>
                      {item[column]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserList;