import { Box, Button, Stack, TextField } from "@mui/material";
import { useEffect, type FC } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  productFormFields,
  productSchema,
  type ProductModel,
} from "../models/product.model";
import {
  useCreateProductMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../productApi";
import { skipToken } from "@reduxjs/toolkit/query";

export const Product: FC<{
  onModalClose: () => void;
  productId: number | null;
}> = ({ onModalClose, productId }) => {
  const { control, handleSubmit, reset } = useForm<ProductModel>({
    defaultValues: productSchema.parse({}),
  });

  const { data: productDetail, isFetching } = useGetProductByIdQuery(
    productId ? productId : skipToken,
  );

  const [createProductFn, { isLoading: isCreateLoading }] =
    useCreateProductMutation();
  const [updateProductFn, { isLoading: isUpdateLoading }] =
    useUpdateProductMutation();

  useEffect(() => {
    if (!productDetail) return;
    reset({
      title: productDetail.title,
      price: productDetail.price,
      id: productDetail.id,
    });
  }, [productDetail, reset]);

  const onSubmit = async (formDetail: ProductModel) => {
    try {
      if (productId) {
        await updateProductFn(formDetail).unwrap();
      } else {
        await createProductFn(formDetail).unwrap();
      }
      onModalClose();
    } catch (error) {
      console.error("ERROR IN create/update product");
    }
  };

  return (
    <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Controller
          name={`${productFormFields.title}`}
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Tirle" variant="outlined" />
          )}
        />
        <Controller
          name={`${productFormFields.price}`}
          control={control}
          render={({ field }) => (
            <TextField
              type="number"
              {...field}
              label="Price"
              variant="outlined"
            />
          )}
        />
        <Button
          variant="contained"
          type="submit"
          loading={isCreateLoading || isUpdateLoading}
        >
          Save
        </Button>
      </Stack>
    </Box>
  );
};
