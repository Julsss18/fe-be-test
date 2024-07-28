import { ICellRendererParams } from "@ag-grid-community/core";
import { Flex, Button, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { createSearchParams, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { deleteEmployeeAction, deleteCafeAction } from "../redux/slice";
import { useCallback } from "react";

interface CellParams extends ICellRendererParams {
  type: "cafe" | "employee";
}

const ButtonCellRenderer = (p: CellParams) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [modal, modalContextHolder] = Modal.useModal();

  const handleOkButton = useCallback(() => {
    if (p.type === "employee") {
      dispatch(deleteEmployeeAction(p.data.id));
    }
    if (p.type === "cafe") {
      dispatch(deleteCafeAction(p.data.id));
    }
  }, [dispatch, p.data.id, p.type]);

  return (
    <>
      <Flex gap="small">
        <Button
          type="link"
          onClick={() => {
            navigate({
              pathname: "edit",
              search: createSearchParams({
                id: p.data.id,
              }).toString(),
            });
          }}
          icon={<EditOutlined />}
        >
          Edit
        </Button>
        <Button
          onClick={() => {
            modal.confirm({
              title: "Deleting item",
              content: `Are you sure you want to delete ${p.data.id}?`,
              onOk: handleOkButton,
            });
          }}
          danger
          type="link"
          icon={<DeleteOutlined />}
        >
          Delete
        </Button>
        {modalContextHolder}
      </Flex>
    </>
  );
};

export default ButtonCellRenderer;
