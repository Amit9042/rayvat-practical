import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useState, type FC } from "react";
import { productFormFields } from "../models/product.model";
import { useGetProductsQuery } from "../productApi";
import { Box, Button, Drawer } from "@mui/material";
import { Product } from "./Product";

const columns: GridColDef[] = [
  { field: productFormFields.title, headerName: "Title", flex: 1 },
  { field: productFormFields.price, headerName: "Price", flex: 1 },
];

export const ProductList: FC = () => {
  const { data: response, isFetching } = useGetProductsQuery({});
  const [dialogType, setDialogType] = useState<string | null>(null);
  const isFormModal = dialogType === "update" || dialogType === "create";
  const [productId, setProductId] = useState<number | null>(null);

  const closeDialog = () => {
    setDialogType(null);
    setProductId(null);
  };

  if (isFetching) {
    return <>Loading...</>;
  }
  return (
    <Box>
      <Button onClick={() => setDialogType("create")} variant="contained">
        Create
      </Button>
      <DataGrid
        onRowClick={(row) => {
          setProductId(row.id);
          setDialogType("update");
        }}
        rows={response.products}
        columns={columns}
      />
      <Drawer open={isFormModal} onClose={closeDialog} anchor="right">
        {isFormModal && (
          <Box sx={{ width: 400, padding: 2 }}>
            <Product onModalClose={closeDialog} productId={productId} />
          </Box>
        )}
      </Drawer>
    </Box>
  );
};
