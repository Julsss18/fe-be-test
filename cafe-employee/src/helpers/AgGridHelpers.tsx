import { IsFullWidthRowParams } from "@ag-grid-community/core";

export const createPinnedBottomAddButtonRow = (
  label: string,
  isFullWidth: boolean,
  path: string
) => {
  const data = [
    {
      fullWidth: isFullWidth,
      buttonLabel: label,
      path: path,
    },
  ];

  return data;
};

export const isFullWidth = (params: IsFullWidthRowParams) => {
  return params.rowNode.data.fullWidth;
};
