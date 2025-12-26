import { Note_dataSet, Note_Item } from "@/components/types";
import Image from "next/image";
import { useState } from "react";
import { BiDotsHorizontal, BiDotsVertical } from "react-icons/bi";
import { HiDotsVertical } from "react-icons/hi";

export default function Notes({
  datasetA,
  datasetB,
}: {
  datasetA: Note_Item;
  datasetB: Note_Item;
}) {
  return (
    <div className="container">
      <div className="favorites">
        <h1>Favorite</h1>
        <div className="objects">
          {datasetA.map((item) => (
            <div className="object" key={item.id}>
              <div
                className="img"
                style={{ background: `url(${item.imgUrl})` }}
              ></div>
              <div className="info">
                <div className="title">{item.title}</div>
                <button className="option-btn">
                <HiDotsVertical />
              </button>
              </div>
            </div>
          ))}
        </div>
      </div>{" "}
      <div className="suggestions">
        <h1>suggestions</h1>
        <div className="objects">
          {datasetB.map((item) => (
            <div className="object" key={item.id}>
              <div
                className="img"
                style={{ background: `url(${item.imgUrl})` }}
              ></div>
              <div className="info">
                <div className="title">{item.title}</div>
                <button className="option-btn">
                <HiDotsVertical />
              </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
