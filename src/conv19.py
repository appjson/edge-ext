import requests
import json
import datetime
import random


class Conv19:
    def __init__(self):
        # 现有确诊
        self.present = 0
        # 昨日新增
        self.sure_new_cnt = 0
        # 昨日无症状
        self.sure_new_hid = 0
        # 省份 默认：福建
        self.province = "福建"
        # 截止日期
        self.dateline = datetime.datetime.now().strftime("%D")
        # 温馨提示
        self.report = ""

    def conv19(self, city):
        url = "https://covid.myquark.cn/quark/covid/data"

        param = {
            'format': 'json',
            'method': 'Huoshenshan.ncov2022',
            'type': 'latest',
            'news_type': 'ncp',
            'is_gray': '1',
            'city': city,
            'uc_param_str': 'dnfrpfbivesscpgimibtbmnijblaupogpintnwktprchmtut'
        }

        response = requests.get(url=url, params=param)
        data = json.loads(response.text)
        data = data['cityData']
        # 现有确诊
        self.present = str(data['present'])
        # 昨日新增
        self.sure_new_cnt = data['sure_new_cnt']
        # 昨日无症状
        self.sure_new_hid = data['sure_new_hid']
        # 省份
        self.province = data['province']
        if '-' in self.present:
            self.present = self.present.replace("-", "0")
        # title
        data = json.loads(response.text)
        data = data['localReport']
        self.dateline = data['dateline']
        self.report = data['report']
        if '<br>' in self.report:
            self.report = self.report.replace("<br>", "")

cv = Conv19()
if __name__ == '__main__':
    cv.conv19("福州")
    print("现有确诊{}\n昨日新增{}\n昨日无症状{}\n省份{}".format(cv.present, cv.sure_new_cnt, cv.sure_new_hid, cv.province))