
import React, {useState} from "react"

function Columns({columns, render}){
  return columns.map(render);
}

export default Columns
