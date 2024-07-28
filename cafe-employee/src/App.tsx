import MainLayout from "./pages/MainLayout";

import { Route, Routes } from "react-router-dom";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";

import CafePage from "./pages/CafePage";
import EmployeePage from "./pages/EmployeePage";
import AddEditPage from "./pages/AddEditPage";

import { Provider } from "react-redux";
import store from "./redux/store";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<CafePage />}></Route>
            <Route
              path="add"
              element={<AddEditPage type="cafe" action="add" />}
            />
            <Route
              path="edit"
              element={<AddEditPage type="cafe" action="edit" />}
            />
            <Route path="employee" element={<EmployeePage />}></Route>
            <Route
              path="employee/add"
              element={<AddEditPage type="employee" action="add" />}
            />
            <Route
              path="employee/edit"
              element={<AddEditPage type="employee" action="edit" />}
            />
          </Route>
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
