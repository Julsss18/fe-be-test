import { put, all, fork, takeEvery } from "redux-saga/effects";
import {
  getCafesSuccessAction,
  getCafesErrorAction,
  getEmployeesSuccessAction,
  getEmployeesErrorAction,
  updateEmployeesErrorAction,
} from "./slice";

import {
  getCafe,
  getEmployees,
  updateEmployee,
  addEmployee,
  deleteEmployee,
  getCafeByLocation,
  deleteCafe,
  getEmployeesByCafeName,
} from "./services";

import { Cafe, Employee } from "./types";

function* deleteCafeSaga({ payload }: any) {
  try {
    yield deleteCafe(payload);
    window.location.reload();
    // yield put(deleteEmployeeSuccessAction(payload));
  } catch (err) {
    console.log(err);
  }
}

function* getCafeByLocationSaga(payload: any) {
  try {
    const response: Cafe[] = yield getCafeByLocation(payload);
    yield put(getCafesSuccessAction(response));
  } catch (err) {
    yield put(getCafesErrorAction({ payload: true }));
  }
}

function* getCafesSaga() {
  try {
    const response: Cafe[] = yield getCafe();
    yield put(getCafesSuccessAction(response));
  } catch (err) {
    yield put(getCafesErrorAction({ payload: true }));
  }
}

function* getEmployeesSaga() {
  try {
    const response: Employee[] = yield getEmployees();
    yield put(getEmployeesSuccessAction(response));
  } catch (err) {
    yield put(getEmployeesErrorAction({ payload: true }));
  }
}

function* getEmployeesByCafeSaga(payload: any) {
  try {
    const response: Employee[] = yield getEmployeesByCafeName(payload);
    yield put(getEmployeesSuccessAction(response));
  } catch (err) {
    yield put(getEmployeesErrorAction({ payload: true }));
  }
}

function* updateEmployeeSaga(payload: any) {
  try {
    yield updateEmployee(payload);
  } catch (err) {
    yield put(updateEmployeesErrorAction({ payload: true }));
  }
}

function* addEmployeeSaga(payload: any) {
  try {
    yield addEmployee(payload);
  } catch (err) {
    throw new Error();
  }
}

function* deleteEmployeeSaga({ payload }: any) {
  try {
    yield deleteEmployee(payload);
    window.location.reload();
    // yield put(deleteEmployeeSuccessAction(payload));
  } catch (err) {
    console.log(err);
  }
}

function* watchGetCafe() {
  yield takeEvery("coffeeshop/getCafesAction", getCafesSaga);
}

function* watchGetCafeByLocation() {
  yield takeEvery("coffeeshop/getCafeByLocationAction", getCafeByLocationSaga);
}

function* watchGetEmployees() {
  yield takeEvery("coffeeshop/getEmployeesAction", getEmployeesSaga);
}

function* watchGetEmployeesByCafe() {
  yield takeEvery(
    "coffeeshop/getEmployeesByCafeAction",
    getEmployeesByCafeSaga
  );
}

function* watchUpdateEmployee() {
  yield takeEvery("coffeeshop/updateEmployeesAction", updateEmployeeSaga);
}

function* watchAddEmployee() {
  yield takeEvery("coffeeshop/addEmployeeAction", addEmployeeSaga);
}

function* watchDeleteEmployee() {
  yield takeEvery("coffeeshop/deleteEmployeeAction", deleteEmployeeSaga);
}

function* watchDeleteCafe() {
  yield takeEvery("coffeeshop/deleteCafeAction", deleteCafeSaga);
}

const rootSaga = function* () {
  yield all([
    fork(watchGetCafe),
    fork(watchGetEmployees),
    fork(watchUpdateEmployee),
    fork(watchAddEmployee),
    fork(watchDeleteEmployee),
    fork(watchGetEmployeesByCafe),
    fork(watchDeleteCafe),
    fork(watchGetCafeByLocation),
  ]);
};

export default rootSaga;
