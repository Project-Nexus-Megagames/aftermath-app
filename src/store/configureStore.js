import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';
import toast from './middleware/toast';
import api from './middleware/api';

export default function foobar() {
  return configureStore({
    reducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(api, toast),
  });
}
