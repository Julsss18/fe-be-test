import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import {
  Form,
  Input,
  Upload,
  Button,
  UploadProps,
  message,
  UploadFile,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { useSelector, useDispatch } from "react-redux";
import { CafeEmployeeState } from "../redux/types";
import { getCafeByIdAction } from "../redux/slice";

const { TextArea } = Input;

const inputNameRules = [
  { required: true },
  { pattern: /^[a-zA-Z]/, message: "Only alphabet is allowed" },
  { min: 6, message: "Minimum of 6 characters" },
  { max: 10, message: "Maximum of 10 characters" },
];

const AddEditCafeForm = ({ action, form }: any) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const cafe = useSelector((state: CafeEmployeeState) => state.cafe);

  useEffect(() => {
    dispatch(getCafeByIdAction(searchParams.get("id")));
  }, [dispatch, searchParams]);

  useEffect(() => {
    form.setFieldValue("name", cafe?.name);
    form.setFieldValue("description", cafe?.description);
    form.setFieldValue("location", cafe?.location);
    if (cafe !== null && cafe !== undefined) {
      const file: UploadFile = {
        uid: cafe!.id,
        name: cafe!.logo,
      };
      setFileList((state) => [file]);
      form.setFieldValue("logo", cafe?.logo);
    }
  }, [cafe, form]);

  const uploadProps: UploadProps = useMemo(
    () => ({
      beforeUpload: (file) => {
        const isValidSize = file.size / 1024 / 1024 <= 2;
        const isValidImage =
          file.type === "image/png" ||
          file.type === "image/jpg" ||
          file.type === "image/jpeg";
        if (!isValidImage) {
          setFileList((state) => [...state]);
          message.error(`${file.name} is not a valid image file`);
        } else {
          setFileList((state) => [file]);
        }

        if (!isValidSize) {
          setFileList((state) => [...state]);
          message.error(`${file.name} exceeds 2MB`);
        } else {
          setFileList((state) => [file]);
        }

        return false;
      },
      onRemove: (info) => {
        setFileList([]);
      },
    }),
    []
  );

  return (
    <>
      <Form.Item
        fieldId="name"
        name={["name"]}
        label="Name"
        rules={inputNameRules}
      >
        <Input />
      </Form.Item>
      <Form.Item
        fieldId="description"
        name={["description"]}
        label="Description"
      >
        <TextArea />
      </Form.Item>
      <Form.Item
        fieldId="logo"
        getValueFromEvent={(event) => {
          return event.fileList;
        }}
        name={["logo"]}
        label="Logo"
      >
        <Upload {...uploadProps} fileList={fileList}>
          <Button icon={<UploadOutlined />}>Upload logo</Button>
        </Upload>
      </Form.Item>
      <Form.Item fieldId="location" name={["location"]} label="Location">
        <Input />
      </Form.Item>
    </>
  );
};

export default AddEditCafeForm;
