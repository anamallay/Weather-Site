import { configureStore } from "@reduxjs/toolkit";
import  weatherApiSlice  from "../features/weather/weatherApiSlice";
export default configureStore({
  reducer: {
    weather: weatherApiSlice,
  },
});
