import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import jsonexport from 'jsonexport';
import { useDropzone } from 'react-dropzone';
import Button from 'react-bootstrap';

const ImportExport = () => {
  const [jsonData, setJsonData] = useState([]);
  const [csvData, setCsvData] = useState('');

  const onDrop = (acceptedFiles) => {
    // console.log(acceptedFiles)
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(sheet);
      // console.log(json)

      setJsonData(json);

      // Convert JSON to CSV for export
    //   if (json.length > 0) {
    //     const keys = Object.keys(json[0]);
    //     const csvContent = [
    //       keys.join(','),
    //       ...json.map((row) => keys.map((key) => row[key]).join(',')),
    //     ].join('\n');

    //     setCsvData(csvContent);
    //   }
    };

    reader.readAsArrayBuffer(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: '.xlsx',
    onDrop,
  });


  return (
    <div>
      <div {...getRootProps()} style={{ border: '1px solid black', padding: '20px', margin: '20px' }}>
        <input {...getInputProps()} />
        <p>Import</p>
      </div>

      {jsonData.length > 0 && (
        <div>
          <h2>Data preview:</h2>
          <pre>{JSON.stringify(jsonData, null, 2)}</pre>
        </div>
      )}
  <div  style={{ border: '1px solid black', padding: '20px', margin: '20px' }}>
        <a href='https://learnerhunt-assets.s3.amazonaws.com/Imarticus_Excel_Temp.xlsx' target='_blank'>Export</a>
      </div>

    </div>
  );
};

export default ImportExport;
