import type { FactoryArea } from '../types/factoryArea'

export const factoryAreas: FactoryArea[] = [
  {
    "id": 1,
    "name": "第一轧钢车间",
    "shapeType": "rect",
    "x": 37.46674240914605,
    "y": 16.495120580098174,
    "width": 44.265977289905514,
    "height": 17.26194129611351,
    "riskLevel": "high",
    "summary": {
      "riskScore": 82,
      "activeAlerts": 3,
      "temperature": "28°C"
    },
    "trendData": [
      {
        "day": "周一",
        "alerts": 5
      },
      {
        "day": "周二",
        "alerts": 8
      },
      {
        "day": "周三",
        "alerts": 6
      },
      {
        "day": "周四",
        "alerts": 9
      },
      {
        "day": "周五",
        "alerts": 12
      },
      {
        "day": "周六",
        "alerts": 7
      },
      {
        "day": "今日",
        "alerts": 3
      }
    ],
    "eventTypeData": [
      {
        "name": "设备异常",
        "value": 2,
        "color": "#ea580c"
      },
      {
        "name": "安全违规",
        "value": 1,
        "color": "#ca8a04"
      }
    ],
    "rotation": -38.93551183880148
  },
  {
    "id": 2,
    "name": "第二轧钢车间",
    "shapeType": "rect",
    "x": 1.511362083082963,
    "y": 52.95220988055162,
    "width": 43.43217712220919,
    "height": 11.211779998481786,
    "riskLevel": "medium",
    "summary": {
      "riskScore": 65,
      "activeAlerts": 1,
      "temperature": "24°C"
    },
    "trendData": [
      {
        "day": "周一",
        "alerts": 2
      },
      {
        "day": "周二",
        "alerts": 3
      },
      {
        "day": "周三",
        "alerts": 4
      },
      {
        "day": "周四",
        "alerts": 2
      },
      {
        "day": "周五",
        "alerts": 5
      },
      {
        "day": "周六",
        "alerts": 3
      },
      {
        "day": "今日",
        "alerts": 1
      }
    ],
    "eventTypeData": [
      {
        "name": "设备异常",
        "value": 1,
        "color": "#ea580c"
      }
    ],
    "rotation": -38.64807669573962
  },
  {
    "id": 3,
    "name": "第三轧钢车间",
    "shapeType": "rect",
    "x": -9.053569938642514,
    "y": 40.65509361075018,
    "width": 42.78525520074934,
    "height": 13.064466310596663,
    "riskLevel": "low",
    "summary": {
      "riskScore": 30,
      "activeAlerts": 0,
      "temperature": "22°C"
    },
    "trendData": [],
    "eventTypeData": [],
    "rotation": -37.942099448960874
  },
  {
    "id": 4,
    "name": "中板车间",
    "shapeType": "rect",
    "x": 8.802558619126895,
    "y": 64.74335651409947,
    "width": 46.683945528567186,
    "height": 15.000000000000034,
    "riskLevel": "critical",
    "summary": {
      "riskScore": 95,
      "activeAlerts": 5,
      "temperature": "32°C"
    },
    "trendData": [],
    "eventTypeData": [],
    "rotation": -37.995652250516706
  },
  {
    "id": 5,
    "name": "1#动力房",
    "shapeType": "rect",
    "x": 61.979086381178625,
    "y": 36.81037739732927,
    "width": 40.549961462965726,
    "height": 15,
    "riskLevel": "medium",
    "summary": {
      "riskScore": 58,
      "activeAlerts": 2,
      "temperature": "26°C"
    },
    "trendData": [],
    "eventTypeData": [],
    "rotation": 0
  },
  {
    "id": 6,
    "name": "停车场",
    "shapeType": "rect",
    "x": 67.03687751029234,
    "y": 20.928995079827768,
    "width": 35.25330505070762,
    "height": 14.999999999999998,
    "riskLevel": "low",
    "summary": {
      "riskScore": 15,
      "activeAlerts": 0,
      "temperature": "23°C"
    },
    "trendData": [],
    "eventTypeData": [],
    "rotation": 0
  },
  {
    "id": 7,
    "name": "煤气区",
    "shapeType": "rect",
    "x": 17.462647011181247,
    "y": 78.80791696447672,
    "width": 33.09091741386589,
    "height": 10.00000000000001,
    "riskLevel": "high",
    "summary": {
      "riskScore": 88,
      "activeAlerts": 2,
      "temperature": "30°C"
    },
    "trendData": [],
    "eventTypeData": [],
    "rotation": -38.60562640884177
  }
]
