import { createSlice } from "@reduxjs/toolkit";

export const addToCart = (productId,product) => {
  return {
    type: "ADD_TO_CART",
    payload: { productId, product },
  };
};

export const removeFromCart = (productId) => ({
  type: "REMOVE_FROM_CART",
  payload: { productId },
});

export const updateQuantity = (productId, quantity) => ({
  type: "UPDATE_QUANTITY",
  payload: { productId, quantity },
});

export const clearCart = () => ({
  type: "CLEAR_CART",
});

export const cartReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.find(
        (item) => item.productId === action.payload.productId
      );
      if (existingItem) {
        return state.map((item) =>
          item.productId === action.payload.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...state, { ...action.payload, quantity: 1 }];
      }

    case "REMOVE_FROM_CART":
      return state.filter(
        (item) => item.productId !== action.payload.productId
      );

      case 'UPDATE_QUANTITY':
        const item = state.map(item => {
          if (item.productId === action.payload.productId) {
            const quantityChange =  item.quantity + action.payload.quantity;
            return { ...item, quantity: quantityChange };
          }
          return item;
        });
     return item.filter(item => item.quantity > 0)

    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
};
