import { CustomCellRendererProps } from "@ag-grid-community/react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";

import { useNavigate } from "react-router-dom";

const FullWidthCellRenderer = (props: CustomCellRendererProps) => {
  const navigate = useNavigate();

  const handleNavigate = (e: CustomCellRendererProps) => {
    navigate(e.data.path);
  };

  return (
    <>
      <Flex
        align="center"
        justify="center"
        style={{ width: "100%", height: "100%" }}
      >
        <Button
          onClick={() => handleNavigate(props)}
          type="primary"
          style={{ minWidth: 200 }}
          icon={<PlusOutlined />}
        >
          {props.data.buttonLabel}
        </Button>
      </Flex>
    </>
  );
};

export default FullWidthCellRenderer;
