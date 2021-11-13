import React from "react"

function Page({body, render}){
  return(
    <div>
      {render(body)}
    </div>
    )
}

export default Page
