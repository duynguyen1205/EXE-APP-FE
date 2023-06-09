import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

const initialState = {
    carts: [],
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    doAddToCartAction: (state, action) => {
        let carts = state.carts;
        const item = action.payload;

        const isExistCarts = carts.findIndex(c => c._id === item._id);
        // khi mà đã tồn tại carts 
        if( isExistCarts > -1) {
            carts[isExistCarts].quantity = item.quantity +  carts[isExistCarts].quantity;
            if(carts[isExistCarts].quantity > carts[isExistCarts].detail.quantity) {
                carts[isExistCarts].quantity = carts[isExistCarts].detail.quantity;
            }
        } else {
            carts.push({ quantity: item.quantity, _id: item._id, detail: item.detail })
        }
        state.carts = carts;
        message.success("Add to cart successful");
      },
      doUpdateCartAction: (state, action) => {
        let carts = state.carts;
        const item = action.payload;

        const isExistCarts = carts.findIndex(c => c._id === item._id);
        // khi mà đã tồn tại carts 
        if( isExistCarts > -1) {
            carts[isExistCarts].quantity = item.quantity;
            if(carts[isExistCarts].quantity > carts[isExistCarts].detail.quantity) {
                carts[isExistCarts].quantity = carts[isExistCarts].detail.quantity;
            }
        } else {
            carts.push({ quantity: item.quantity, _id: item._id, detail: item.detail })
        }
        state.carts = carts;
      }, 
      deleteCarts: (state, action) => {
        state.carts = state.carts.filter(c => c._id !== action.payload._id);
      },
      doPlaceOrderAction: (state, action) => {
        state.carts = [];
      }
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {},
});

export const { doAddToCartAction, doUpdateCartAction, deleteCarts, doPlaceOrderAction } = orderSlice.actions;

export default orderSlice.reducer;
