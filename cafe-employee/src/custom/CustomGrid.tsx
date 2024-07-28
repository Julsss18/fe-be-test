import { useMemo, useCallback, MutableRefObject } from "react";

import { isFullWidth } from "../helpers/AgGridHelpers";

import FullWidthCellRenderer from "../custom/FullWidthCellRenderer";

import { ColDef, IsFullWidthRowParams } from "@ag-grid-community/core";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";

interface ICustomGrid {
  colDefs: ColDef[];
  rowData: any[];
  pagination: boolean;
  pinnedBottomRowData?: any;
  gridRef: MutableRefObject<AgGridReact | null>;
  onFilter?: () => void;
  onDoubleClick?: (e: any) => void;
}

const CustomGrid = ({
  colDefs,
  rowData,
  pagination,
  pinnedBottomRowData,
  gridRef,
  onFilter,
  onDoubleClick,
}: ICustomGrid) => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "80%" }), []);
  const gridStyle = useMemo(() => ({ width: "100%", height: "80%" }), []);
  const defaultColDef = useMemo(
    () => ({
      wrapHeaderText: true,
      resizable: false,
      flex: 1,
    }),
    []
  );

  const fullWidthCellRenderer = useCallback(FullWidthCellRenderer, []);
  const isFullWidthRow = useCallback(
    (params: IsFullWidthRowParams) => isFullWidth(params),
    []
  );

  return (
    <div style={containerStyle}>
      <div className="ag-theme-quartz" style={gridStyle}>
        <AgGridReact
          onRowDoubleClicked={onDoubleClick}
          rowHeight={80}
          ref={gridRef}
          gridOptions={{ suppressCellFocus: true }}
          rowData={rowData}
          defaultColDef={defaultColDef}
          pagination={pagination}
          isFullWidthRow={isFullWidthRow}
          fullWidthCellRenderer={fullWidthCellRenderer}
          columnDefs={colDefs}
          pinnedBottomRowData={pinnedBottomRowData}
          onFilterChanged={onFilter}
        />
      </div>
    </div>
  );
};

export default CustomGrid;
