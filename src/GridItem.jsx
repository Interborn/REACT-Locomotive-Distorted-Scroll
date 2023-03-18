import React from "react";
import "./index.css";

export default function GridItem(props) {
  return (
    <div className="grid-item">
      <img className='grid-item-media w-full object-cover aspect-square' src={props.url} alt="" />
      <p className="p-1  text-[24px] uppercase text-right">{props.description}</p>
    </div>
  );
}
