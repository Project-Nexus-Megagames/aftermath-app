import { createAction } from '@reduxjs/toolkit';
import { ApiCall } from '../config/types';

export const apiCallBegan = createAction<ApiCall>('api/callBegan');
export const apiCallSuccess = createAction('api/callSuccess');
export const apiCallFailed = createAction('api/callFailed');
