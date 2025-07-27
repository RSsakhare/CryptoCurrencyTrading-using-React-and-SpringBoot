import {
  FETCH_COIN_BY_ID_FAILURE,
  FETCH_COIN_BY_ID_REQUEST,
  FETCH_COIN_BY_ID_SUCCESS,
  FETCH_COIN_DETAILS_FAILURE,
  FETCH_COIN_DETAILS_REQUEST,
  FETCH_COIN_DETAILS_SUCCESS,
  FETCH_COIN_LIST_FAILURE,
  FETCH_COIN_LIST_REQUEST,
  FETCH_COIN_LIST_SUCCESS,
  FETCH_MARKET_CHART_FAILURE,
  FETCH_MARKET_CHART_REQUEST,
  FETCH_MARKET_CHART_SUCCESS,
  FETCH_TOP_50_COINS_FAILURE,
  FETCH_TOP_50_COINS_REQUEST,
  FETCH_TOP_50_COINS_SUCCESS,
  SEARCH_COIN_FAILURE,
  SEARCH_COIN_REQUEST,
  SEARCH_COIN_SUCCESS,
} from "./ActionType";

import api from "@/config/api";

const handleError = (dispatch, type, error) => {
  const msg = error.response?.data?.message || error.message || "Unknown error";
  dispatch({ type, payload: msg });
};

export const getCoinList = (page) => async (dispatch) => {
  dispatch({ type: FETCH_COIN_LIST_REQUEST });
  try {
    const { data } = await api.get(`/coins?page=${page}`);
    dispatch({ type: FETCH_COIN_LIST_SUCCESS, payload: data });
  } catch (error) {
    handleError(dispatch, FETCH_COIN_LIST_FAILURE, error);
  }
};

export const getTop50CoinList = () => async (dispatch) => {
  dispatch({ type: FETCH_TOP_50_COINS_REQUEST });
  try {
    const { data } = await api.get("/coins/top50");
    dispatch({ type: FETCH_TOP_50_COINS_SUCCESS, payload: data });
  } catch (error) {
    handleError(dispatch, FETCH_TOP_50_COINS_FAILURE, error);
  }
};

export const fetchMarketChart = ({ coinId, days, jwt }) => async (dispatch) => {
  dispatch({ type: FETCH_MARKET_CHART_REQUEST });
  try {
    const { data } = await api.get(`/coins/${coinId}/chart?days=${days}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    dispatch({ type: FETCH_MARKET_CHART_SUCCESS, payload: data });
  } catch (error) {
    handleError(dispatch, FETCH_MARKET_CHART_FAILURE, error);
  }
};

export const fetchCoinById = (coinId) => async (dispatch) => {
  dispatch({ type: FETCH_COIN_BY_ID_REQUEST });
  try {
    const { data } = await api.get(`/coins/${coinId}`);
    dispatch({ type: FETCH_COIN_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    handleError(dispatch, FETCH_COIN_BY_ID_FAILURE, error);
  }
};

export const fetchCoinDetails = ({ coinId, jwt }) => async (dispatch) => {
  dispatch({ type: FETCH_COIN_DETAILS_REQUEST });
  try {
    const { data } = await api.get(`/coins/details/${coinId}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    dispatch({ type: FETCH_COIN_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    handleError(dispatch, FETCH_COIN_DETAILS_FAILURE, error);
  }
};

export const searchCoin = (keyword) => async (dispatch) => {
  dispatch({ type: SEARCH_COIN_REQUEST });
  try {
    const { data } = await api.get(`/coins/search?q=${keyword}`);
    dispatch({ type: SEARCH_COIN_SUCCESS, payload: data });
  } catch (error) {
    handleError(dispatch, SEARCH_COIN_FAILURE, error);
  }
};
