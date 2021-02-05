# az-react-dditem2resource

> Azoop, React Drag & Drop Item To Resource

**リソースにアイテムを割り当てる機能** のライブラリです。リソースとアイテムのデータ管理とドラッグ&ドロップ機能を提供します。UIは含まれていません。UIはライブラリ使用者が任意にデザイン・構築します。

[![NPM](https://img.shields.io/npm/v/az-react-dditem2resource.svg)](https://www.npmjs.com/package/az-react-dditem2resource) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save az-react-dditem2resource
```

## Demo

```bash
yarn demo:up
```

[demo: Day Calendar(http://localhost:3000)](http://localhost:3000)

## Usage

```tsx
import React from 'react'

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

## Components

### AzDDItem2Resource

トップレベルのコンポーネントです。

Reduxストアを生成する役割があります。生成したストアは `AzDDItem2Resource` に渡されます。

カスタマイズした自作のReduxストアを使いたい場合はこのコンポーネントは使いません。

#### props

 * asyncFetchItemsFunction ... アイテムを取得する非同期関数(必須)
 * asyncFetchResourcesFunction ... リソースを取得する非同期関数(必須)
 * params ... アプリケーションのパラメータ(任意)
 * sortItemComparer ... 取得したアイテムのソート順を決定する関数(任意)
 * sortResourceComparer ... 取得したリソースのソート順を決定する関数(任意)

### AzDDItem2ResourceProvider

Reduxストアを受け取り、コンテキストを作成するコンポーネントです。

Reduxのコンテキストを作成します。またドラッグ&ドロップ機能のコンテキストも作成します。

Reduxコンテキストとドラッグ&ドロップコンテキストの中に子コンポーネントを入れます。

`AzDDItem2ResourceProvider` の下層コンポーネントでフック機能が有効になります。

## Hooks

### useParams

アプリケーション全体で使用する任意のパラメータを取得できるフックです。

アプリケーションのパラメータの初期値は、 `AzDDItem2Resource` コンポーネントのpropsに渡すことができます。

```tsx
const Example = () => {
  return (
    <AzDDItem2Resource
      params={{
        hello: 'world',
        num: 99
      }}
    />
      ... // here mixed components
    </AzDDItem2Resource>
  )
}

// other place
const params = useParams()
console.log(params)
/**
{
  hello: 'world',
  num: 99
}
*/
```

### useItems 

アイテムの一覧を取得できるフックです。

```tsx
const items = useItems()
const ItemNameList = items.map(i => <li key={i.id}>{i.name}</li>)

return (
  <ul>
    {ItemNameList}
  </ul>
)
```

### useResources

リソースの一覧を取得できるフックです。

```tsx
const resources = useResources()
const ResourceNameList = resources.map(r => <li key={r.id}>{r.name}</li>)

return (
  <ul>
    {ResourceNameList}
  </ul>
)
```

### useDragItem

アイテムをドラッグできるようにするオブジェクトを返すフックです。

```tsx
const item = { ... } // item data
const { collectedProps, drag } = useDragItem(item)
const { isDragging } = collectedProps

return (
  <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
    <span>{item.name}</span>
  </div>
)
```

### useDropItemToResource

リソースにアイテムをドロップできるようにするオブジェクトを返すフックです。

```tsx
const resource = { ... } // resource data
const { drop } = useDropItemToResource(resource)

return (
  <div ref={drop} className="timeline">
    <p>Resource Timeline. Drop item here</p>
  </div>
)
```

### useReturnItemToList

リソースに割り当てられたアイテムの解除をする関数を返すフックです。

```tsx
const returnItemToList = useReturnItemToList()
const resource = { ... } // resource data
const item = { ... } // item data

const onClickRemove = () => {
  returnItemToList({ resource, item })
}

return (
  <button onClick={onClickRemove}>リソースから削除</button>
)
```

## License

MIT © [w-toguchi83](https://github.com/w-toguchi83)
