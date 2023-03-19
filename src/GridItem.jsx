import React from "react";
import "./index.css";

export default function GridItem(props) {
  return (
    <div className="grid-item pointer-events-none">
      <img className='grid-item-media w-full object-cover aspect-square pointer-events-none' src={props.url} alt="" />
      <p className="text-[38px] font-bold uppercase pointer-events-none">{props.description}</p>
    </div>
  );
}
