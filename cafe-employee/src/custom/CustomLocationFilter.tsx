import { IAfterGuiAttachedParams } from "@ag-grid-community/core";
import { CustomFilterProps, useGridFilter } from "@ag-grid-community/react";
import { ChangeEvent, useCallback, useRef, useState, useEffect } from "react";

import { Flex } from "antd";

const CustomLocationFilter = ({ model, onModelChange }: CustomFilterProps) => {
  const refInput = useRef<HTMLInputElement>(null);

  const [closeFilter, setCloseFilter] = useState<(() => void) | null>();
  const [filterModel, setFilterModel] = useState(model);

  useEffect(() => {
    setFilterModel(model);
  }, [model]);

  const doesFilterPass = useCallback(() => {
    return true;
  }, []);

  const afterGuiAttached = useCallback(
    ({ hidePopup }: IAfterGuiAttachedParams) => {
      window.setTimeout(() => {
        refInput.current?.focus();
        setCloseFilter(() => hidePopup);
      });
    },
    []
  );

  useGridFilter({
    doesFilterPass,
    afterGuiAttached,
  });

  const onChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setFilterModel({ value });
  };

  const handleApply = () => {
    onModelChange(filterModel);
    if (closeFilter) {
      closeFilter();
    }
  };

  const handleReset = () => {
    setFilterModel({ value: "" });
    onModelChange({ value: "" });
    if (closeFilter) {
      closeFilter();
    }
  };

  const style = {
    borderRadius: "5px",
    width: "200px",
    height: "",
    padding: "10px",
  };

  return (
    <Flex vertical gap={"small"} style={style}>
      Search By Location:
      <input
        style={{ height: "20px" }}
        value={filterModel !== null ? filterModel.value : ""}
        ref={refInput}
        onChange={onChange}
        className="form-control"
      />
      <button onClick={handleApply}>Apply</button>
      <button onClick={handleReset}>Reset</button>
    </Flex>
  );
};

export default CustomLocationFilter;
