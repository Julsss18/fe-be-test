import { createSlice } from "@reduxjs/toolkit";
import { CafeEmployeeState } from "./types";

const coffeeShopInitialState: CafeEmployeeState = {
  cafes: [],
  employees: [],
  error: false,
  isLoading: false,
  employee: null,
  cafe: null,
  loc: "/",
};

export const dataSlice = createSlice({
  name: "coffeeshop",
  initialState: coffeeShopInitialState,
  reducers: {
    setLocationAction: (state: CafeEmployeeState, action) => {
      state.loc = action.payload;
    },
    getCafeByIdAction: (state: CafeEmployeeState, action) => {
      state.cafe = state.cafes.filter((caf) => caf.id === action.payload)[0];
    },
    getCafeByLocationAction: (state: CafeEmployeeState, action) => {
      state.isLoading = true;
    },
    getCafesAction: (state: CafeEmployeeState) => {
      state.isLoading = true;
    },
    getCafesSuccessAction: (state: CafeEmployeeState, action) => {
      state.isLoading = false;
      state.cafes = action.payload;
    },
    getCafesErrorAction: (state: CafeEmployeeState, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteCafeAction: (state: CafeEmployeeState, action) => {
      state.isLoading = true;
    },
    deleteCafeActionSuccessAction: (state: CafeEmployeeState, action) => {
      state.isLoading = false;

      state.cafes = state.cafes.filter((x) => x.id !== action.payload);
    },
    getEmployeeByIdAction: (state: CafeEmployeeState, action) => {
      state.employee = state.employees.filter(
        (emp) => emp.id === action.payload
      )[0];
    },
    getEmployeesAction: (state: CafeEmployeeState) => {
      state.isLoading = true;
    },
    getEmployeesByCafeAction: (state: CafeEmployeeState, action) => {
      state.isLoading = true;
    },
    getEmployeesSuccessAction: (state: CafeEmployeeState, action) => {
      state.isLoading = false;
      state.employees = action.payload;
    },
    getEmployeesErrorAction: (state: CafeEmployeeState, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addEmployeeAction: (state: CafeEmployeeState, action) => {
      state.isLoading = true;
    },
    updateEmployeesAction: (state: CafeEmployeeState, action) => {
      state.isLoading = true;
    },
    updateEmployeesSuccessAction: (state: CafeEmployeeState, action) => {
      state.isLoading = false;
    },
    updateEmployeesErrorAction: (state: CafeEmployeeState, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteEmployeeAction: (state: CafeEmployeeState, action) => {
      state.isLoading = true;
    },
    deleteEmployeeSuccessAction: (state: CafeEmployeeState, action) => {
      state.isLoading = false;

      state.employees = state.employees.filter((x) => x.id !== action.payload);
    },
  },
});

export const {
  setLocationAction,
  deleteCafeAction,
  deleteCafeActionSuccessAction,
  getCafeByIdAction,
  getCafeByLocationAction,
  getCafesAction,
  getCafesSuccessAction,
  getCafesErrorAction,
  getEmployeesAction,
  getEmployeesByCafeAction,
  getEmployeesSuccessAction,
  getEmployeesErrorAction,
  getEmployeeByIdAction,
  updateEmployeesAction,
  updateEmployeesSuccessAction,
  updateEmployeesErrorAction,
  addEmployeeAction,
  deleteEmployeeAction,
  deleteEmployeeSuccessAction,
} = dataSlice.actions;

export default dataSlice.reducer;
