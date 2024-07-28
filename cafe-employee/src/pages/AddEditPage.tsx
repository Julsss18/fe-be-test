import { useCallback, useEffect, useState } from "react";
import { Button, Flex, Form, Modal } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { useDispatch } from "react-redux";
import {
  getCafesAction,
  updateEmployeesAction,
  addEmployeeAction,
} from "../redux/slice";

import { addCafe, updateCafe } from "../redux/services";

import { ValidateMessages } from "rc-field-form/lib/interface";

import AddEditEmployeeForm from "../components/AddEditEmployeeForm";
import AddEditCafeForm from "../components/AddEditCafeForm";

const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

interface IForm {
  type: "employee" | "cafe";
  action: "add" | "edit";
}

/* eslint-disable no-template-curly-in-string */
const validateMessages: ValidateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const AddEditPage = ({ type, action }: IForm) => {
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modal, modalContextHolder] = Modal.useModal();

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [isUnsaved, setIsUnsaved] = useState(false);

  useEffect(() => {
    dispatch(getCafesAction());
  }, [dispatch]);

  const handleCancelButton = () => {
    if (isUnsaved) {
      modal.confirm({
        title: "Unsaved field!",
        content: `You have unsaved field, do you want to go back to the previous page?`,
        onOk: handleProceedCancelButton,
      });
    } else {
      navigate(-1);
    }
  };

  const handleSubmit = () => {
    let payload = {};
    if (type === "employee") {
      if (action === "edit") {
        payload = {
          id: searchParams.get("id"),
          ...form.getFieldsValue(),
        };
        dispatch(updateEmployeesAction(JSON.stringify(payload)));
        navigate(-1);
      } else {
        payload = {
          ...form.getFieldsValue(),
        };

        dispatch(addEmployeeAction(JSON.stringify(payload)));
        navigate(-1);
      }
    }

    if (type === "cafe") {
      if (action === "edit") {
        payload = {
          id: searchParams.get("id"),
          ...form.getFieldsValue(),
        };
        updateCafe(payload);
        setTimeout(() => {
          navigate(-1);
        }, 500);
      } else {
        payload = Object.assign({ id: uuidv4() }, form.getFieldsValue());
        addCafe(payload);
        setTimeout(() => {
          navigate(-1);
        }, 500);
      }
    }
  };

  const handleProceedCancelButton = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <div>
      <Flex
        align="flex-start"
        justify="flex-start"
        style={{ padding: 12, width: "100%", height: "100%" }}
      >
        <Form.Provider
          onFormChange={(name, { forms }) => {
            setIsUnsaved(true);
            const isFieldComplete = !Object.values(
              forms[name].getFieldsValue()
            ).some((v) => v === undefined);

            const isError = Object.values(forms[name].getFieldsError()).some(
              (v) => v.errors.length > 0
            );

            if (isFieldComplete && !isError) {
              setButtonDisabled(false);
            } else {
              setButtonDisabled(true);
            }
          }}
        >
          <Form
            form={form}
            name={type}
            {...formLayout}
            style={{ maxWidth: 600, minHeight: 100, minWidth: 300 }}
            validateMessages={validateMessages}
          >
            {type === "employee" && (
              <AddEditEmployeeForm action={action} form={form} />
            )}
            {type === "cafe" && <AddEditCafeForm action={action} form={form} />}
            <Form.Item wrapperCol={{ offset: 8 }}>
              {
                <Button
                  type="primary"
                  disabled={buttonDisabled}
                  htmlType="submit"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              }
              <Button onClick={handleCancelButton} type="link" danger>
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </Form.Provider>
        {modalContextHolder}
      </Flex>
    </div>
  );
};

export default AddEditPage;
