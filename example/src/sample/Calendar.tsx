import * as React from "react"

const Calendar = (props: any) => {
  return (
    <div className="c-calendar-cell">
      {props.children}
    </div>
  )
}

export default Calendar
