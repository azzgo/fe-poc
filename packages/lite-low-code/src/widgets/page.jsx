import React from "react"

function Page({body, render}){
  return(
    <div className="page">
      {render(body)}
    </div>
    )
}

export default Page
