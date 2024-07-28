import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import dayjs from "dayjs";

import { Form, Input, Select, DatePicker, Radio } from "antd";

import { CafeEmployeeState } from "../redux/types";
import { getEmployeeByIdAction, setLocationAction } from "../redux/slice";

const { Option } = Select;

const inputNameRules = [
  { required: true },
  { pattern: /^[a-zA-Z]/, message: "Only alphabet is allowed" },
  { min: 6, message: "Minimum of 6 characters" },
  { max: 10, message: "Maximum of 10 characters" },
];

const dateFormat = "YYYY-MM-DD";

const AddEditEmployeeForm = ({ action, form }: any) => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const cafes = useSelector((state: CafeEmployeeState) => state.cafes);
  const employee = useSelector((state: CafeEmployeeState) => state.employee);

  useEffect(() => {
    dispatch(setLocationAction("/employee"));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getEmployeeByIdAction(searchParams.get("id")));
  }, [dispatch, searchParams]);

  useEffect(() => {
    form.setFieldValue("name", employee?.name);
    form.setFieldValue("email_address", employee?.email_address);
    form.setFieldValue("phone_number", employee?.phone_number);
    form.setFieldValue("gender", employee?.gender);
    form.setFieldValue("cafe_location", employee?.cafe_location);
    form.setFieldValue(
      "start_date",
      dayjs(employee?.start_date, dateFormat).isValid()
        ? dayjs(employee?.start_date, dateFormat)
        : null
    );
  }, [employee, form]);

  return (
    <>
      <Form.Item
        fieldId="name"
        name={["name"]}
        label="Name"
        rules={inputNameRules}
      >
        <Input disabled={action === "edit"} />
      </Form.Item>
      <Form.Item
        fieldId="email_address"
        name={["email_address"]}
        label="Email"
        rules={[{ type: "email" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        fieldId="phone_number"
        name={["phone_number"]}
        label="Phone Number"
        rules={[
          { max: 8, message: "Maximum of 8 characters allowed" },
          { min: 8, message: "Minimum of 8 characters allowed" },
          {
            pattern: /^(8|9)/,
            message: "Must starts with 8 or 9",
          },
          {
            pattern: /^[0-9]/,
            message: "Only numeric characters allowed",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item fieldId="gender" name={["gender"]} label="Gender">
        <Radio.Group name="gender">
          <Radio value={"Male"}>Male</Radio>
          <Radio value={"Female"}>Female</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item fieldId="start_date" name={["start_date"]} label="Start Date">
        <DatePicker format={dateFormat} />
      </Form.Item>
      <Form.Item
        fieldId="cafe_location"
        name={["cafe_location"]}
        label="Location"
      >
        <Select>
          {cafes &&
            cafes.map((cafe, index) => (
              <Option key={index} value={cafe.id}>
                {cafe.name}
              </Option>
            ))}
        </Select>
      </Form.Item>
    </>
  );
};

export default AddEditEmployeeForm;
