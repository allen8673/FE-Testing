import { createAsyncThunk, AsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import _ from 'lodash';

import { AppDispatch } from './store';

export interface BaseState {
    $isLoading?: any;
    status: string;
    currentRequestId?: string;
    error: any;
}

export const buildAsyncThunk = <T>(
    domainKey: string,
    action: string,
    apiCall: (payload: T, thunkAPI?: any) => Promise<any>
): AsyncThunk<any, T, any> =>
    createAsyncThunk(
        action,
        async (
            payload: T,
            thunkApi: {
                dispatch: AppDispatch;
                getState: any;
                requestId: string;
                rejectWithValue: any;
            }
        ): Promise<any> => {
            const { getState, requestId } = thunkApi;
            // check current state of store slice
            const { currentRequestId, status } = getState()?.[domainKey] || {};
            if (status !== 'pending' || requestId !== currentRequestId) {
                return;
            }
            // call api if everything looks correct
            const response = await apiCall(payload, thunkApi);
            // if error in response, throw error
            if (response?.error) throw new Error(response.error);
            // if (response.error) return rejectWithValue(response.error);
            // otherwise, return data of response
            return response?.data;
        }
    );

export const buildReducer = ({
    thunk,
    onPending,
    onFulfilled,
    onRejected,
}: {
    thunk: AsyncThunk<any, any, any>;
    onPending?: (state: any, action: PayloadAction<any>) => void;
    onFulfilled?: (state: any, action: PayloadAction<any>) => void;
    onRejected?: (state: any, action: PayloadAction<any>) => void;
}): any => {
    return {
        [thunk.pending?.toString()]: (state: any, action: any): void => {
            if (state.status === 'idle') {
                state.$isLoading = {
                    ...state.$isLoading,
                    [thunk.typePrefix]: true,
                };
                state.status = 'pending';
                state.currentRequestId = action.meta.requestId;

                onPending?.(state, action);
            }
        },
        [thunk.fulfilled?.toString()]: (state: any, action: any): void => {
            if (
                state.status === 'pending' &&
                state.currentRequestId === action.meta.requestId
            ) {
                state.status = 'idle';
                state.$isLoading = {
                    ...state.$isLoading,
                    [thunk.typePrefix]: false,
                };
                state.currentRequestId = undefined;
                onFulfilled?.(state, action);
            }
        },
        [thunk.rejected?.toString()]: (state: any, action: any): void => {
            if (
                state.status === 'pending' &&
                state.currentRequestId === action.meta.requestId
            ) {
                state.status = 'idle';
                state.$isLoading = {
                    ...state.$isLoading,
                    [thunk.typePrefix]: false,
                };
                state.currentRequestId = undefined;
                // store error
                state.error = action.error;

                onRejected?.(state, action);
            }
        },
    };
};
