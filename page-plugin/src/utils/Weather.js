const API_KEY = "4f5ea0930f7140d0a968d0627c16d9a1";

const URL = "https://devapi.qweather.com/v7/weather/now";
const GEO_URL = "https://geoapi.qweather.com/v2/city/lookup";

async function getCity(position) {
  const resp = await fetch(
    `${GEO_URL}?key=${API_KEY}&location=${position.coords.longitude.toFixed(
      2
    )},${position.coords.latitude.toFixed(2)}`,
    {
      mode: "cors",
    }
  );
  return await resp.json();
}

export function getLocation() {
  if (!navigator.geolocation) {
    console.warn("Cannot get Geolocation");
    return false;
  }
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("位置信息：", position);
      if (!position) reject();
      getCity(position).then((data) => {
        console.log("地理位置：", data);
        resolve({
          geo: `${position.coords.longitude.toFixed(
            2
          )},${position.coords.latitude.toFixed(2)}`,
          city: `${data.location[0].country}${data.location[0].adm1}${data.location[0].name}`,
          adm1: data.location[0].adm1,
        });
      });
    });
  });
}

export async function getWeatherInfo(geostr) {
  const resp = await fetch(`${URL}?key=${API_KEY}&location=${geostr}`, {
    mode: "cors",
  });
  return await resp.json();
}
