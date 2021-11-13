import React, {useState} from "react"

function Page({body, render}){
  return(
    <div>
      {render(body)}
    </div>
    )
}

export default Page
