import { GET_ASSET_REQUEST, GET_USER_ASSETS_REQUEST, GET_ASSET_SUCCESS, GET_ASSET_DETAILS_SUCCESS, GET_ASSET_DETAILS_REQUEST, GET_USER_ASSETS_SUCCESS, GET_ASSET_FAILURE, GET_USER_ASSETS_FAILURE, GET_ASSET_DETAILS_FAILURE } from "./ActionType";

const initialState = {
    asset: null,
    userAssets: [],
    loading: false,
    error: null,
    assetDetails:null,
};

const assetReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ASSET_REQUEST:
        case GET_ASSET_DETAILS_REQUEST:
        case GET_USER_ASSETS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case GET_ASSET_SUCCESS:
            return {
                ...state,
                asset: action.payload,
                loading: false,
                error: null,
            };
        case GET_ASSET_DETAILS_SUCCESS:
            return {
                ...state,
                assetDetails: action.payload,
                loading: false,
                error: null,
            };
        case GET_USER_ASSETS_SUCCESS:
            return {
                ...state,
                userAssets: action.payload,
                loading: false,
                error: null,
            };
        case GET_ASSET_FAILURE:
        case GET_ASSET_DETAILS_FAILURE:
        case GET_USER_ASSETS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
};

export default assetReducer;