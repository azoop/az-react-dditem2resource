import * as React from "react"
import { useDropItemToResource } from "az-react-dditem2resource"
import Timeline from "./Timeline"

const Resource = (props: any) => {
  const {
    data: resource
  } = props

  const name = `${resource.extra.employeeNumber}/${resource.name}`
  const { drop } = useDropItemToResource(resource)

  return (
    <div ref={drop} className="c-calendar-cell__time-cell-cover">
      <div className="c-calendar-cell__time-box__name">
        <a className="c-link" href="">{name}</a><span className="c-note">{resource.extra.salesOffice}</span>
      </div>
      <Timeline data={resource} />
    </div>
  )
}

export default Resource
