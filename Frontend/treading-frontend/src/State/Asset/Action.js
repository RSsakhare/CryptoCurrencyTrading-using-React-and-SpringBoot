import api from "@/config/api";
import { GET_ASSET_DETAILS_FAILURE, GET_ASSET_DETAILS_REQUEST, GET_ASSET_DETAILS_SUCCESS, GET_ASSET_FAILURE, GET_ASSET_REQUEST, GET_ASSET_SUCCESS, GET_USER_ASSETS_FAILURE, GET_USER_ASSETS_REQUEST, GET_USER_ASSETS_SUCCESS } from "./ActionType"

export const getAssetById = ({ assetId, jwt }) => async (dispatch) => {
    dispatch({ type: GET_ASSET_REQUEST });

    try {
        const response = await api.get(`/api/assets/${assetId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        dispatch({
            type: GET_ASSET_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: GET_ASSET_FAILURE,
            error: error.message,
        });
    }
};

export const getAssetDetails = ({ coinId, jwt }) => async (dispatch) => {
    dispatch({ type: GET_ASSET_DETAILS_REQUEST });

    try {
        const response = await api.get(`/api/assets/coin/${coinId}/user`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        dispatch({
            type: GET_ASSET_DETAILS_SUCCESS,
            payload: response.data,
        });
        console.log("asset details --- ",response.data)
    } catch (error) {
        dispatch({
            type: GET_ASSET_DETAILS_FAILURE,
            error: error.message,
        });
    }
};

export const getUserAssets = (jwt) => async (dispatch) => {
    dispatch({ type:GET_USER_ASSETS_REQUEST });

    try {
        const response = await api.get('/api/assets', {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        dispatch({
            type: GET_USER_ASSETS_SUCCESS,
            payload: response.data,
        });
        console.log("user assets--- ", response.data);
    } catch (error) {
        dispatch({
            type: GET_USER_ASSETS_FAILURE,
            error: error.message,
        });
    }
};