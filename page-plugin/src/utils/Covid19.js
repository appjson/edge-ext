const URL = "https://lab.isaaclin.cn/nCoV/api/area";

export async function getResp(area) {
  const resp = await fetch(`${URL}?province=${area}`);
  return await resp.json();
}

export async function getInfo(area) {
  return getResp(area).then((data) => {
    console.log("疫情信息", data);
    return `【${data.results[0].provinceName}】目前确诊${data.results[0].currentConfirmedCount}个`;
  });
}
