import * as React from "react"
import { useResources, deepCopy, ResourceInterface } from "az-react-dditem2resource"
import Resource from "./Resource"

const { useState, useEffect } = React

const ResourceHeader = (props: any) => {
  const {
    onClickSortAsc,
    onClickSortDesc,
  } = props

  return (
    <div className="c-calendar-cell__time-cover">
      <div className="c-calendar-cell__time-box__title">
        <div className="c-sort-cover">
          社員番号/ドライバー名
          <div className="c-sort-toggle">
            <div className="c-sort-toggle-btn-cover c-sort-toggle-btn-cover--up">
              <a className="c-sort-toggle-btn" onClick={onClickSortAsc}></a>
            </div>
            <div className="c-sort-toggle-btn-cover c-sort-toggle-btn-cover--down">
              <a className="c-sort-toggle-btn" onClick={onClickSortDesc}></a>
            </div>
          </div>
        </div>
      </div>
      <div className="c-calendar-cell__time-box__timeline">
        <div className="c-calendar-cell__time-box__timeline__time">
          00:00
        </div>
        <div className="c-calendar-cell__time-box__timeline__time">
          06:00
        </div>
        <div className="c-calendar-cell__time-box__timeline__time">
          12:00
        </div>
        <div className="c-calendar-cell__time-box__timeline__time">
          18:00<span>24:00</span>
        </div>
      </div>
    </div>
  )
}

const ResourceList = () => {
  // リソースデータの取得ができる
  const { resources } = useResources()
  const [resourceList, setResourceList] = useState([])
  const [sortType, setSortType] = useState("asc")

  useEffect(() => {
    const num = sortType === "asc" ? 1 : -1
    const sorted = deepCopy(resources).sort((a: ResourceInterface, b: ResourceInterface) => {
      return num * (a.extra.employeeNumber.localeCompare(b.extra.employeeNumber))
    })
    setResourceList(sorted)
  }, [resources, sortType])

  const onClickSortAsc = () => {
    setSortType("asc")
  }

  const onClickSortDesc = () => {
    setSortType("desc")
  }

  return (
    <div className="c-calendar-cell-box">
      <div className="c-calendar-cell__time-box">
        <ResourceHeader
          onClickSortAsc={onClickSortAsc}
          onClickSortDesc={onClickSortDesc}
        />
        { resourceList.length > 0
          ? resourceList.map((rsc: ResourceInterface) => <Resource key={rsc.id} data={rsc} />)
          : null
        }
      </div>
    </div>
  )
}

export default ResourceList
