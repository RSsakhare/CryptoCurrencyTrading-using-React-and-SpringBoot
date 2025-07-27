import {
  Get_USER_WALLET_REQUEST,
  Get_USER_WALLET_SUCCESS,
  Get_USER_WALLET_FAILURE,
  Get_WALLET_TRANSACTION_REQUEST,
  Get_WALLET_TRANSACTION_SUCCESS,
  Get_WALLET_TRANSACTION_FAILURE,
  DEPOSIT_MONEY_REQUEST,
  DEPOSIT_MONEY_SUCCESS,
  DEPOSIT_MONEY_FAILURE,
  TRANSFER_MONEY_REQUEST,
  TRANSFER_MONEY_SUCCESS,
  TRANSFER_MONEY_FAILURE,
} from "./ActionTypes";

const initialState = {
  userWallet: null,
  transactions: [],
  loading: false,
  error: null,
};

const walletReducer = (state = initialState, action) => {
  switch (action.type) {
    case Get_USER_WALLET_REQUEST:
    case Get_WALLET_TRANSACTION_REQUEST:
    case DEPOSIT_MONEY_REQUEST:
    case TRANSFER_MONEY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case Get_USER_WALLET_SUCCESS:
    case DEPOSIT_MONEY_SUCCESS:
    case TRANSFER_MONEY_SUCCESS:
      return {
        ...state,
        userWallet: action.payload,
        loading: false,
        error: null,
      };

    case Get_WALLET_TRANSACTION_SUCCESS:
      return {
        ...state,
        transactions: action.payload,
        loading: false,
        error: null,
      };

    case Get_USER_WALLET_FAILURE:
    case DEPOSIT_MONEY_FAILURE:
    case TRANSFER_MONEY_FAILURE:
    case Get_WALLET_TRANSACTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export default walletReducer;
