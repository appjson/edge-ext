import React from "react";
import "./App-edge-ext.less";
import { notification, Popover, Button } from "antd";
import { getInfo, getLocation, getWeatherInfo } from "./utils";

function getCovidInfo() {
  notification.info({
    key: "covid19",
    message: "请稍等...",
    placement: "bottomRight",
    bottom: 200,
  });
  getLocation()
    .then((data) => {
      return getInfo(data.adm1);
    })
    .then((data) => {
      console.log(data);
      notification.open({
        key: "covid19",
        message: data,
        placement: "bottomRight",
        bottom: 200,
      });
    })
    .catch(() => {
      getInfo("中国")
        .then((data) => {
          notification.open({
            key: "covid19",
            message: data,
            placement: "bottomRight",
            bottom: 200,
          });
        })
        .catch(() => {
          notification.error({
            key: "covid19",
            message: "获取失败",
            placement: "bottomRight",
            bottom: 200,
          });
        });
    });
}

function getWeather() {
  getLocation()
    .then((data) => {
      // console.log(data);
      const weatherMsg = `当前天气：${data.city}`;
      notification.open({
        duration: 8,
        message: weatherMsg,
        placement: "bottomRight",
        bottom: 200,
      });
      return getWeatherInfo(data.geo);
    })
    .then((v) => {
      // console.log(v);
      const weatherMsg = `现在是${v.now.text}天；气温${v.now.temp}°；体感气温${v.now.feelsLike}°；相对湿度${v.now.humidity}%；风向${v.now.windDir}；风速${v.now.windSpeed}km/h`;
      notification.open({
        duration: 5,
        message: weatherMsg,
        placement: "bottomRight",
        bottom: 200,
      });
    })
    .catch(() => {
      notification.warn({
        message: "获取天气失败\n请查看是否给予位置权限！",
      });
      return;
    });
}

const popContent = function () {
  const btnStyle = {
    margin: "6px 0",
    height: "36px",
    width: "140px",
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        pointerEvents: "auto",
      }}
    >
      <Button style={btnStyle} type="primary" onClick={getCovidInfo}>
        疫情信息
      </Button>
      <Button style={btnStyle} type="primary" onClick={getWeather}>
        天气信息
      </Button>
    </div>
  );
};

function App() {
  return (
    <div className="App-edge-ext">
      <Popover placement="leftTop" content={popContent()}>
        <canvas
          className="canvas-edge-ext"
          style={{
            pointerEvents: "auto",
          }}
        ></canvas>
      </Popover>
    </div>
  );
}

export default App;
