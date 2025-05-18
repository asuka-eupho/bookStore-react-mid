import { createSlice } from "@reduxjs/toolkit"
import { message } from "antd";

const initialState = {
    carts: [] // cart info
}
export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        doAddItemAction: (state, action) => {
            let carts = state.carts
            const dataPayload = action.payload;
            let isExist = carts.findIndex(c => c._id === dataPayload._id);
            if (isExist > -1) {
                carts[isExist].quantity = carts[isExist].quantity + dataPayload.quantity
                if (carts[isExist].quantity > dataPayload.quantity) {
                    carts[isExist].quantity === dataPayload.quantity
                }
            } else {
                carts.push({ quantity: dataPayload.quantity, _id: dataPayload._id, detail: dataPayload.detail })
            }
            state.carts = carts;
            message.success("add product success")
        }
    },
    extraReducers: (builder) => {

    }
});
export const { doAddItemAction } = orderSlice.actions;
export default orderSlice.reducer;