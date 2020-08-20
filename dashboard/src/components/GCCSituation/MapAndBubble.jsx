import React, { useContext } from "react";
import { Bubble } from "./Bubble";
import { Map } from "./Map";
import { Context } from "../../contexts/GCCContext";
import { DatePicker } from "@material-ui/pickers";

export const MapAndBubble = () => {
  const {
    state: { to, originalDate, mapChoice, bubbleChoice, GCCData },
    changeTo,
    changeMap,
    changeBubble,
  } = useContext(Context);
  let datee = originalDate.split("-");
  let last = `${datee[2]}/${datee[1]}/${datee[0]}`;

  return (
    <div className="">
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          marginBottom: 5,
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <p style={{ marginRight: 10 }}>Situation On:</p>
          <DatePicker
            disableToolbar
            allowKeyboardControl
            format="dd/MM/yyyy"
            value={to}
            variant="inline"
            onChange={(date) => {
              let month =
                date.getUTCMonth() + 1 < 10
                  ? `0${date.getUTCMonth() + 1}`
                  : date.getUTCMonth() + 1;
              let ndate =
                date.getUTCDate() + 1 < 10
                  ? `0${date.getUTCDate()}`
                  : date.getUTCDate();
              let year = date.getUTCFullYear();
              let newDate = `${year}-${month}-${ndate}`;
              if (
                new Date(newDate) > new Date(originalDate) ||
                new Date(newDate) < new Date("2020-01-04")
              )
                alert(`Please select a date between 04/01/2020 and ${last}`);
              else changeTo(newDate);
            }}
            style={{ marginRight: 3 }}
          />
        </div>
        <p>Last Updated On: {`${last}`}</p>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div
              className="card-container"
              style={{ height: 500, width: "100%" }}
            >
              <div
                className="btn-group btn-group-sm mb-1 mt-1"
                role="group"
                style={{ width: "100%" }}
              >
                <label className="btn btn-info">
                  <input
                    type="radio"
                    name={"mapChoice"}
                    defaultChecked={mapChoice === "confirmed" ? true : false}
                    value={"confirmed"}
                    onClick={(event) => {
                      changeMap(event.target.value);
                    }}
                  />
                  {" Confirmed"}
                </label>
                <label className="btn btn-info">
                  <input
                    type="radio"
                    name={"mapChoice"}
                    defaultChecked={mapChoice === "recovered" ? true : false}
                    value={"recovered"}
                    onClick={(event) => {
                      console.log(event.target.value);
                      changeMap(event.target.value);
                    }}
                  />
                  {" Recovered"}
                </label>
                <label className="btn btn-info">
                  <input
                    type="radio"
                    name={"mapChoice"}
                    defaultChecked={mapChoice === "deaths" ? true : false}
                    value={"deaths"}
                    onClick={(event) => {
                      changeMap(event.target.value);
                    }}
                  />
                  {" Deaths"}
                </label>
              </div>
              <Map data={GCCData} choice={mapChoice} />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div
              className="card-container"
              style={{ height: 500, width: "100%" }}
            >
              <div
                className="btn-group btn-group-sm mb-1 mt-1"
                role="group"
                style={{ width: "100%" }}
              >
                <label className="btn btn-info">
                  <input
                    type="radio"
                    name={"bubbleChoice"}
                    defaultChecked={bubbleChoice === "confirmed" ? true : false}
                    value={"confirmed"}
                    onClick={(event) => {
                      changeBubble(event.target.value);
                    }}
                  />
                  {"Confirmed"}
                </label>
                <label className="btn btn-info">
                  <input
                    type="radio"
                    name={"bubbleChoice"}
                    defaultChecked={bubbleChoice === "recovered" ? true : false}
                    value={"recovered"}
                    onClick={(event) => {
                      changeBubble(event.target.value);
                    }}
                  />
                  {" Recovered"}
                </label>
                <label className="btn btn-info">
                  <input
                    type="radio"
                    name={"bubbleChoice"}
                    defaultChecked={bubbleChoice === "deaths" ? true : false}
                    value={"deaths"}
                    onClick={(event) => {
                      changeBubble(event.target.value);
                    }}
                  />
                  {" Deaths"}
                </label>
              </div>
              <Bubble data={GCCData} choice={bubbleChoice} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
