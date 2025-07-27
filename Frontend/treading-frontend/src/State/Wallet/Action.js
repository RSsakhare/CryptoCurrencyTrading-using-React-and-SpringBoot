import api from "@/config/api";
import {
  DEPOSIT_MONEY_REQUEST,
  DEPOSIT_MONEY_SUCCESS,
  DEPOSIT_MONEY_FAILURE,
  Get_USER_WALLET_REQUEST,
  Get_USER_WALLET_SUCCESS,
  Get_USER_WALLET_FAILURE,
  Get_WALLET_TRANSACTION_REQUEST,
  Get_WALLET_TRANSACTION_SUCCESS,
  Get_WALLET_TRANSACTION_FAILURE,
  TRANSFER_MONEY_REQUEST,
  TRANSFER_MONEY_SUCCESS,
  TRANSFER_MONEY_FAILURE,
} from "./ActionTypes";

// 🪙 Fetch User Wallet
export const getUserWallet = (jwt) => async (dispatch) => {
  dispatch({ type: Get_USER_WALLET_REQUEST });

  try {
    const response = await api.get("/api/wallet", {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    dispatch({
      type: Get_USER_WALLET_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.error("getUserWallet error:", error);
    dispatch({
      type: Get_USER_WALLET_FAILURE,
      error: error.message,
    });
  }
};

// 📜 Get Wallet Transactions
export const getWalletTransactions = ({ jwt }) => async (dispatch) => {
  dispatch({ type: Get_WALLET_TRANSACTION_REQUEST });

  try {
    const response = await api.get("/api/transactions", {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    dispatch({
      type: Get_WALLET_TRANSACTION_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.error("getWalletTransactions error:", error);
    dispatch({
      type: Get_WALLET_TRANSACTION_FAILURE,
      error: error.message,
    });
  }
};

// 💰 Deposit Money
export const depositMoney = ({ jwt, orderId, paymentId, navigate }) => async (dispatch) => {
  dispatch({ type: DEPOSIT_MONEY_REQUEST });

  try {
    const response = await api.put("/api/wallet/deposit", null, {
      params: {
        order_id: orderId,
        payment_id: paymentId,
      },
      headers: { Authorization: `Bearer ${jwt}` },
    });

    dispatch({
      type: DEPOSIT_MONEY_SUCCESS,
      payload: response.data,
    });

    console.log("Deposit response:", response.data);
    navigate("/wallet");
  } catch (error) {
    console.error("depositMoney error:", error);
    dispatch({
      type: DEPOSIT_MONEY_FAILURE,
      error: error.message,
    });
  }
};

// 🧾 Trigger Payment Flow
export const paymentHandler = ({ jwt, amount, paymentMethod }) => async (dispatch) => {
  dispatch({ type: DEPOSIT_MONEY_REQUEST });

  try {
    const response = await api.post(`/api/payment/${paymentMethod}/amount/${amount}`, null, {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    dispatch({
      type: DEPOSIT_MONEY_SUCCESS,
      payload: response.data,
    });

    window.location.href = response.data.payment_url;
  } catch (error) {
    console.error("paymentHandler error:", error);
    dispatch({
      type: DEPOSIT_MONEY_FAILURE,
      error: error.message,
    });
  }
};

// 🔄 Transfer Money
export const transferMoney = ({ jwt, walletId, reqData }) => async (dispatch) => {
  dispatch({ type: TRANSFER_MONEY_REQUEST });

  try {
    const response = await api.put(`/api/wallet/${walletId}/transfer`, reqData, {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    dispatch({
      type: TRANSFER_MONEY_SUCCESS,
      payload: response.data,
    });
    
  } catch (error) {
    console.error("transferMoney error:", error);
    dispatch({
      type: TRANSFER_MONEY_FAILURE,
      error: error.message,
    });
  }
};
