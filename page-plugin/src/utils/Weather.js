const API_KEY_POOL = [
  "f5223c5de5e84b8fb72103d6f836a270",
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

/**
 * 根据经纬度获取行政位置
 * @param {object} position
 * @returns Promise<response>
 */
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

/**
 * 调用API获取地理位置
 * @returns Promise
 */
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
          city: `${data.location[0].country}${data.location[0].adm1}${data.location[0].adm2}${data.location[0].name}`,
          adm1: data.location[0].adm1,
          country: data.location[0].country,
        });
      });
    });
  });
}

/**
 * 获取天气
 * @param {string} geostr 行政位置
 * @returns Promise<response>
 */
export async function getWeatherInfo(geostr) {
  const resp = await fetch(`${URL}?key=${API_KEY()}&location=${geostr}`, {
    mode: "cors",
  });
  return await resp.json();
}
