import { createAction } from "@reduxjs/toolkit";
import { apiCall } from "../config/types";

export const apiCallBegan = createAction<apiCall>("api/callBegan");
export const apiCallSuccess = createAction("api/callSuccess");
export const apiCallFailed = createAction("api/callFailed");
