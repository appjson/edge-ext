const API_KEY_POOL = [
  "4f5ea0930f7140d0a968d0627c16d9a1",
  "f4bf39a5d1524d5db1b753f97a428caf",
  "6dcbc0d27eb6437bae26f175876277b3",
];

const URL = "https://devapi.qweather.com/v7/weather/now";
const GEO_URL = "https://geoapi.qweather.com/v2/city/lookup";

/**
 *
 * @returns 随机API KEY
 */
const API_KEY = () =>
  API_KEY_POOL[Math.floor(Math.random() * API_KEY_POOL.length)];

async function getCity(position) {
  const resp = await fetch(
    `${GEO_URL}?key=${API_KEY()}&location=${position.coords.longitude.toFixed(
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
  const resp = await fetch(`${URL}?key=${API_KEY()}&location=${geostr}`, {
    mode: "cors",
  });
  return await resp.json();
}
