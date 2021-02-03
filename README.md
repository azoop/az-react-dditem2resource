# az-react-dditem2resource

> Azoop, React Drag & Drop Item To Resource

[![NPM](https://img.shields.io/npm/v/az-react-dditem2resource.svg)](https://www.npmjs.com/package/az-react-dditem2resource) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save az-react-dditem2resource
```

## Usage

```tsx
import React, { Component } from 'react'

import { AzDDItem2Resource, useItems, useResources } from 'az-react-dditem2resource'

const fetchItems = async (): Array<any> => {
  // return item data
  return [...]
}

const fetchResources = async (): Array<any> => {
  // return resource data
  return [...]
}

const ItemList = () => {
  const items = useItems()

  // define render items
  return (
    ...
  )
}

const ResourceList = () => {
  const resource = useResources()

  // define redner resources
  return (
    ...
  )
}

const Example = () => {
  return (
    <AzDDItem2Resource
      asyncFetchItemsFunction={fetchItems}
      asyncFetchResourcesFunction={fetchResources}
    >
      <ItemList />
      <ResourceList />
    </AzDDItem2Resource>
  )
}
```

## License

MIT © [w-toguchi83](https://github.com/w-toguchi83)
