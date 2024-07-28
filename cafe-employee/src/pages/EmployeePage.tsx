import { useEffect, useMemo, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CafeEmployeeState, Employee } from "../redux/types";
import {
  getEmployeesAction,
  getEmployeesByCafeAction,
  setLocationAction,
} from "../redux/slice";

import { useLocation } from "react-router-dom";

import ButtonCellRenderer from "../custom/ButtonCellRenderer";
import CustomGrid from "../custom/CustomGrid";
import CustomLocationFilter from "../custom/CustomLocationFilter";

import { ColDef } from "@ag-grid-community/core";
import { AgGridReact } from "@ag-grid-community/react";
import { createPinnedBottomAddButtonRow } from "../helpers/AgGridHelpers";
import dayjs from "dayjs";

const EmployeePage = () => {
  const location = useLocation();
  const gridRef = useRef<AgGridReact | null>(null);
  const dispatch = useDispatch();
  const employees = useSelector((state: CafeEmployeeState) => state.employees);
  const fieldName = useCallback((name: keyof Employee) => name, []);

  const pinnedBottomRowData = useMemo(
    () => createPinnedBottomAddButtonRow("Add New Employee", true, "add"),
    []
  );

  useEffect(() => {
    dispatch(setLocationAction("/employee"));
  }, [dispatch]);

  useEffect(() => {
    if (location.state?.cafe) {
      dispatch(getEmployeesByCafeAction(location.state.cafe));
      window.history.replaceState({}, "");
    } else {
      dispatch(getEmployeesAction());
    }
  }, [dispatch, location.state]);

  const colDefs: ColDef[] = [
    { field: fieldName("name") },
    { headerName: "Email Address", field: fieldName("email_address") },
    { headerName: "Phone Number", field: fieldName("phone_number") },
    { field: fieldName("gender") },
    {
      headerName: "Cafe Name",
      field: fieldName("cafe"),
      filter: CustomLocationFilter,
    },
    {
      headerName: "Start Date",
      field: fieldName("start_date"),
      cellRenderer: (params: any) => (
        <div>{dayjs(params.value).format("YYYY-MM-DD")}</div>
      ),
    },
    {
      headerName: "Number of work days",
      field: fieldName("num_of_work_days"),
      cellRenderer: (params: any) => (
        <div>{params.value < 0 ? "N/A" : params.value}</div>
      ),
    },
    {
      field: fieldName("actions"),
      cellRenderer: ButtonCellRenderer,
      cellRendererParams: {
        type: "employee",
      },
    },
  ];

  const handleFilter = () => {
    const filter = gridRef.current?.api.getFilterModel().cafe;
    if (filter !== undefined) {
      if (filter.value !== "") {
        dispatch(getEmployeesByCafeAction(filter.value));
      } else {
        dispatch(getEmployeesAction());
      }
    }
  };

  return (
    <>
      <CustomGrid
        gridRef={gridRef}
        colDefs={colDefs}
        pinnedBottomRowData={pinnedBottomRowData}
        rowData={employees}
        pagination={true}
        onFilter={handleFilter}
      />
    </>
  );
};

export default EmployeePage;
