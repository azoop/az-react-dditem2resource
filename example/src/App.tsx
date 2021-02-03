import React from 'react'
import './App.css'

import {
  AzDDItem2Resource,
  wrapToAsyncFunction,
  ResourceInterface,
} from 'az-react-dditem2resource'

/** sample data and components */
import Calendar from "./sample/Calendar"
import ResourceList from "./sample/ResourceList"
import ItemList from "./sample/ItemList"
import ItemPreview from "./sample/ItemPreview"
import HandleEvent from "./sample/HandleEvent"
import { itemData, resourceData } from "./sample/data"

const today = new Date()

const fetchItems = wrapToAsyncFunction(itemData)
const fetchResources = wrapToAsyncFunction(resourceData)

const sortResourceComparer = (a: ResourceInterface, b: ResourceInterface): number => {
  return a.extra.employeeNumber.localeCompare(b.extra.employeeNumber)
}

const App = () => {
  return (
    <AzDDItem2Resource
      params={{
        day: today.toISOString(),
      }}
      asyncFetchItemsFunction={fetchItems}
      asyncFetchResourcesFunction={fetchResources}
      sortResourceComparer={sortResourceComparer}
    >
      <Calendar>
        <ResourceList />
        <ItemList />
        <ItemPreview />
      </Calendar>
      <HandleEvent />
    </AzDDItem2Resource>
  )
}

export default App
