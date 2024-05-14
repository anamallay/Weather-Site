import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import moment from "moment";
import "moment/locale/ar";
import { useTranslation } from "react-i18next";
import CircularProgress from "@mui/material/CircularProgress";
// Redux imports
import { useSelector, useDispatch } from "react-redux";
import { fetchWeatherData } from "./features/weather/weatherApiSlice";


moment.locale("ar");

function App() {
  const { t, i18n } = useTranslation();
  // Redux code
  const weatherData = useSelector((state) => state.weather.weather);
  console.log("weather:: ", weatherData);
  const isLoading = useSelector((state) => state.weather.isLoading);
  const dispatch = useDispatch();
  // State
  // const [weatherData, setWeatherData] = useState({
  //   name: "",
  //   temp: "",
  //   temp_max: "",
  //   temp_min: "",
  //   description: "",
  //   icon: "",
  // });
  const [locales, setLocales] = useState("ar");
  const [dataAndTime, setDataAndTime] = useState(null);

  // event handlers
  function handleChangeLanguage() {
    if (locales === "ar") {
      setLocales("en");
      moment.locale("ar");
      i18n.changeLanguage(locales);
    } else {
      setLocales("ar");
      moment.locale("en");
      i18n.changeLanguage(locales);
    }
    setDataAndTime(moment().format("MMMM Do YYYY"));
  }

  useEffect(() => {
    dispatch(fetchWeatherData());
  }, []);

  return (
    <div
      className="app"
      style={{ direction: locales === "ar" ? "ltr" : "rtl" }}>
      <Container maxWidth="sm">
        <Card sx={{ minWidth: 275 }} className="card">
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom>
              {t("Weather Today")}
            </Typography>
            <div
              style={{
                display: "flex",
                alignItems: "end",
                justifyContent: "start",
              }}>
              <Typography variant="h4" component="div">
                {t(weatherData.name)}
              </Typography>
              <Typography
                variant="body2"
                style={{ marginLeft: "15px", marginRight: "15px" }}>
                {dataAndTime}
              </Typography>
            </div>
            <Divider />
            <Typography sx={{ mb: 2.5 }} color="text.secondary">
              {t("Temperature")}
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                width: "100%",
              }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Typography variant="h2">
                    {" "}
                    {isLoading ? <CircularProgress /> : ""} {weatherData.temp}
                  </Typography>
                </div>
                <div>
                  <Typography variant="h4">
                    {t(weatherData.description)}
                  </Typography>
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <img
                  style={{ width: "200px" }}
                  src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
                  alt="Weather Icon"
                />
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <Typography sx={{ fontSize: 14, marginRight: 2 }}>
                {t("High Temperature")} {weatherData.temp_max}
              </Typography>
              <Typography sx={{ fontSize: 14, marginRight: 2 }}>
                {t("Low Temperature")}
                {weatherData.temp_min}
              </Typography>
            </div>
          </CardContent>
        </Card>
        <div
          style={{
            marginTop: "10px",
            direction: locales === "ar" ? "ltr" : "rtl",
            display: "flex",
            justifyContent: "flex-end",
          }}>
          <Button
            style={{ backgroundColor: "#66bb6a" }}
            variant="contained"
            onClick={handleChangeLanguage}>
            {locales === "en" ? "انجليزي" : "Arabic"}
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default App;
