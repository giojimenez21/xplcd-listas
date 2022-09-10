import React from 'react'
import { utils, writeFile } from 'xlsx'

export const ExportXLSX = ({data}) => {
    const exportData = () => {
        const tableData = utils.table_to_book(data.current);
        writeFile(tableData, "Listas.xlsx");
    }
    
    return (
        <button className='btn btn-primary' onClick={exportData}>
            Exportar
        </button>
    )
}
