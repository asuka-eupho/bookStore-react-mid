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
                if (carts[isExist].quantity > carts[isExist].detail.quantity) {
                    carts[isExist].quantity === carts[isExist].detail.quantity
                }
            } else {
                carts.push({ quantity: dataPayload.quantity, _id: dataPayload._id, detail: dataPayload.detail })
            }
            state.carts = carts;
            message.success("add product success")
        },
        doDeleteItem: (state, action) => {
            state.carts = state.carts.filter(c => c._id !== action.payload._id)
        },
        doUpdateItem: (state, action) => {
            let carts = state.carts
            const item = action.payload
            let isExist = carts.findIndex(c => c._id === item._id);
            if (isExist > -1) {
                carts[isExist].quantity = item.quantity
                if (carts[isExist].quantity > carts[isExist].detail.quantity) {
                    carts[isExist].quantity === carts[isExist].detail.quantity
                }
            } else {
                carts.push({ quantity: item.quantity, _id: item._id, detail: item.detail })
            }
            state.carts = carts;
        },
        doReloadOrderAction: (state) => {
            state.carts = []
        }
    },
    extraReducers: (builder) => {

    }
});
export const { doAddItemAction, doDeleteItem, doUpdateItem, doReloadOrderAction } = orderSlice.actions;
export default orderSlice.reducer;