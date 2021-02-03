import {
  add as addDate,
} from "date-fns"

import {
  getBeginningOfDay,
  createItemData,
  createResourceData,
} from "az-react-dditem2resource"

const today = new Date()
const beginningOfToday = getBeginningOfDay(today)

const itemData = [
  createItemData({
    name: "Task0",
    size: "中型_4t",
    company: "AA運輸",
    spot: "世田谷区〜板橋区",
  }),
  createItemData({
    name: "Task1",
    time: {
      start: addDate(beginningOfToday, { hours: 9}).toISOString(),
      end: addDate(beginningOfToday, { hours: 10}).toISOString(),
    },
    allowOverlap: true,
    size: "中型_4t",
    company: "AA運輸",
    spot: "世田谷区〜板橋区",
  }),
  createItemData({
    name: "Task1#",
    time: {
      start: addDate(beginningOfToday, { hours: 9}).toISOString(),
      end: addDate(beginningOfToday, { hours: 11}).toISOString(),
    },
    allowOverlap: true,
    size: "#中型_4t",
    company: "AA運輸",
    spot: "世田谷区〜板橋区",
  }),
  createItemData({
    name: "Task1##",
    time: {
      start: addDate(beginningOfToday, { hours: 9}).toISOString(),
      end: addDate(beginningOfToday, { hours: 10}).toISOString(),
    },
    allowOverlap: false,
    size: "##中型_4t",
    company: "AA運輸",
    spot: "世田谷区〜板橋区",
  }),
  createItemData({
    name: "Task2",
    time: {
      start: addDate(beginningOfToday, { hours: 10}).toISOString(),
      end: addDate(beginningOfToday, { hours: 13}).toISOString(),
    },
    allowOverlap: true,
    size: "中型_4t",
    company: "AA運輸",
    spot: "世田谷区〜板橋区",
  }),
  createItemData({
    name: "Task3",
    time: {
      start: addDate(beginningOfToday, { hours: 13}).toISOString(),
      end: addDate(beginningOfToday, { hours: 15}).toISOString(),
    },
    size: "中型_4t",
    company: "AA運輸",
    spot: "世田谷区〜板橋区",
  }),
  createItemData({
    name: "Task4",
    time: {
      start: addDate(beginningOfToday, { hours: 14, minutes: 15}).toISOString(),
      end: addDate(beginningOfToday, { hours: 18, minutes: 30}).toISOString(),
    },
    size: "中型_4t",
    company: "AA運輸",
    spot: "世田谷区〜板橋区",
  }),
  createItemData({
    name: "Task5",
    time: {
      start: addDate(beginningOfToday, { hours: 20}).toISOString(),
      end: addDate(beginningOfToday, { hours: 22}).toISOString(),
    },
    size: "中型_4t",
    company: "AA運輸",
    spot: "世田谷区〜板橋区",
  }),
]

const resourceData = [
  createResourceData({
    employeeNumber: "001",
    name: "鈴木太郎",
    salesOffice: "ABC営業所",
    acceptTypes: ["task"],
  }),
  createResourceData({
    employeeNumber: "002",
    name: "佐藤一子",
    salesOffice: "ABC営業所",
    acceptTypes: ["task"],
  }),
  createResourceData({
    employeeNumber: "003",
    name: "田中次郎",
    salesOffice: "XYZ営業所",
    acceptTypes: ["task"],
  }),
  createResourceData({
    employeeNumber: "004",
    name: "高橋二子",
    salesOffice: "XYZ営業所",
    acceptTypes: ["task"],
  }),
  createResourceData({
    employeeNumber: "005",
    name: "伊藤三郎",
    salesOffice: "XYZ営業所",
    acceptTypes: ["task"],
  }),
]

export { itemData, resourceData }
