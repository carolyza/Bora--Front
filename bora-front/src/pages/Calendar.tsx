import React, { useEffect, useState, ChangeEventHandler, useRef } from "react";

import { DayPicker } from "react-day-picker";
import FocusTrap from "focus-trap-react";
import { usePopper } from "react-popper";

export default function Calendar() {
  const initialDays: Date[] = [];
  //const [array, setArray] = useState({});
  const [days, setDays] = React.useState<Date[] | undefined>(initialDays);
  //const [selected, setSelected] = useState<Date>();
  const [inputValue, setInputValue] = useState<string>("");
  const [isPopperOpen, setIsPopperOpen] = useState(false);

  const popperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );

  const popper = usePopper(popperRef.current, popperElement, {
    placement: "bottom-start",
  });

  // const map = ()=> {

  //     days.map((d)=>
  //     setArray([...array,(format(d, 'y-MM-dd'))]);
  //   )};

  const closePopper = () => {
    setIsPopperOpen(false);
    console.log(days);

    buttonRef?.current?.focus();
  };

  const handleButtonClick = () => {
    setIsPopperOpen(true);
  };

  return (
    <>
      <div ref={popperRef}>
        <input
          type="text"
          value={inputValue}
          className="input-reset pa2 ma2 bg-white black ba"
        />
        <button
          ref={buttonRef}
          type="button"
          className="pa2 bg-white button-reset ba"
          aria-label="Pick a date"
          onClick={handleButtonClick}
        >
          <span role="img" aria-label="calendar icon">
            📅
          </span>
        </button>
      </div>
      {isPopperOpen && (
        <FocusTrap
          active
          focusTrapOptions={{
            initialFocus: false,
            allowOutsideClick: true,
            clickOutsideDeactivates: true,
            onDeactivate: closePopper,
          }}
        >
          <div
            tabIndex={-1}
            style={popper.styles.popper}
            className="dialog-sheet"
            {...popper.attributes.popper}
            ref={setPopperElement}
            role="dialog"
          >
            <DayPicker
              mode="multiple"
              min={1}
              selected={days}
              onSelect={setDays}
            />
          </div>
        </FocusTrap>
      )}
    </>
  );
}
