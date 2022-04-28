import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

function CustomToolbar() {
    return (
      <GridToolbarContainer className="flex justify-end">
        <GridToolbarExport 
        printOptions={{ 
          disableToolbarButton: true 
        }} 
        csvOptions={{
          fileName: 'Water Data',
          delimiter: ';',
          utf8WithBom: true,
        }}
        className="flex justify-center bg-blue-400 px-2 py-2 text-xs text-white"
     />
      </GridToolbarContainer>
    );
}

export default function ListViewComponent() {

    const { data, loading } = useDemoData({
        dataSet: 'tableData',
        rowLength: 4,
        maxColumns: 6,
      });
    
    const [tableData, setTableData] = useState([])
    const [loadData, setLoadData] = useState(false);
    // const [dateTime, setDateTime] = useState([]);

    const columns = [
    // { field: 'id', headerName: 'ID', width: 0, hidden: 'true'},
    { field: 'pH', headerName: 'pH', width: 150 },
    { field: 'EC', headerName: 'EC', width: 150 },
    { field: 'DO', headerName: 'DO', width: 150 },
    { field: 'latitude', headerName: 'Latitude', width: 250 },
    { field: 'longitude', headerName: 'Longitude', width: 250 },
    { field: 'lastupdate', headerName: 'Last update', width: 250},
    ]

    const getSensor = async () => {
        try {
            setLoadData(true)
            const resp = await axios.get('http://localhost:8000/api/sensor/all');
            setTableData(resp.data);
        } catch (error) {
            console.log(error)
        } finally {
            setLoadData(false)
        }
    };

    React.useEffect(() => {

        getSensor();

        const interval = setInterval(() => {
        getSensor();
        }, 300000);

        return () => clearInterval(interval);
    }, []);
  if (loadData === true) {
      return (
        <div className="fixed top-0 left-0 bottom-0 z-10 bg-white" style={{hight: "100vh", width: "500px"}}>
            <div class="animate-pulse flex rows my-2">
                <div class="flex-1 space-y-6 py-1">
                    <div class="h-4 mx-2 bg-slate-700 rounded-full"></div>
                    <div class="h-4 mx-2 bg-slate-700 rounded-full"></div>
                    <div class="h-4 mx-2 bg-slate-700 rounded-full"></div>
                    <div class="h-4 mx-2 bg-slate-700 rounded-full"></div>
                    <div class="h-4 mx-2 bg-slate-700 rounded-full"></div>
                    <div class="h-4 mx-2 bg-slate-700 rounded-full"></div>
                    <div class="h-4 mx-2 bg-slate-700 rounded-full"></div>
                    <div class="h-4 mx-2 bg-slate-700 rounded-full"></div>
                    <div class="h-4 mx-2 bg-slate-700 rounded-full"></div>
                    <div class="h-4 mx-2 bg-slate-700 rounded-full"></div>
                    <div class="h-4 mx-2 bg-slate-700 rounded-full"></div>
                    <div class="h-4 mx-2 bg-slate-700 rounded-full"></div>
                    <div class="h-4 mx-2 bg-slate-700 rounded-full"></div>
                    <div class="h-4 mx-2 bg-slate-700 rounded-full"></div>
                    <div class="h-4 mx-2 bg-slate-700 rounded-full"></div>
                    <div class="h-4 mx-2 bg-slate-700 rounded-full"></div>
                    <div class="h-4 mx-2 bg-slate-700 rounded-full"></div>
                    <div class="h-4 mx-2 bg-slate-700 rounded-full"></div>
                    <div class="h-4 mx-2 bg-slate-700 rounded-full"></div>
                    <div class="h-4 mx-2 bg-slate-700 rounded-full"></div>
                    <div class="h-4 mx-2 bg-slate-700 rounded-full"></div>
                    <div class="h-4 mx-2 bg-slate-700 rounded-full"></div>
                    <div class="h-4 mx-2 bg-slate-700 rounded-full"></div>
                </div>
            </div>
        </div>
      )
  } else {
    return (
        <div className="fixed top-0 left-0 bottom-0 z-10 bg-white" style={{hight: "100vh", width: "500px"}}>
          <DataGrid
              rows={tableData}
              columns={columns}
              loading={loading}
              localeText={{
                toolbarExport: "Export All"
              }}
              components={{
                Toolbar: CustomToolbar,
              }}
          />
        </div>
      );
  }
}
