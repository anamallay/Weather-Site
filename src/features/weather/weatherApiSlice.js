import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const APIkey = "96acddd2839417a091b1ec5eee875906";
const lat = "16.909683";
const lon = "42.567902";

export const fetchWeatherData = createAsyncThunk(
  "weatherApi/fetchWeatherData",
  async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`
      );
      let name = response.data.name;
      let temp = Math.round(response.data.main.temp - 272.15);
      let temp_max = Math.round(response.data.main.temp_max - 272.15);
      let temp_min = Math.round(response.data.main.temp_min - 272.15); ;
      let description = response.data.weather[0].description;
      let icon = response.data.weather[0].icon;
      return { name, temp, temp_max, temp_min, description, icon };
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }
);
export const weatherApiSlice = createSlice({
  name: "weather",
  initialState: {
    weather: {},
    isLoading: false,
  },
  reducers: {
    changeResult: (state) => {},
  },
  extraReducers(builder) {
    builder
      .addCase(fetchWeatherData.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.weather = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { changeResult } = weatherApiSlice.actions;

export default weatherApiSlice.reducer;
