import { useState } from "react";

interface RadioOption {
  value: string;
  color: string; // inner circle color
}

export default function AppColorRadio() {
  const [selected, setSelected] = useState("option-one");

  const options: RadioOption[] = [
    { value: "option-one", color: "#F87171" }, // red
    { value: "option-two", color: "#60A5FA" }, // blue
    { value: "option-three", color: "#34D399" }, // green
  ];

  const handleChange = (value: string) => {
    setSelected(value);
    //alert(`Selected value: ${value}`); 
  };

  return (
    <div className="flex gap-2">
      {options.map((opt) => {
        const isSelected = selected === opt.value;

        return (
          <label key={opt.value} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              value={opt.value}
              checked={isSelected}
              onChange={() => handleChange(opt.value)}
              className="hidden"
            />
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200`}
              style={{
                borderColor: isSelected ? "#000" : "#ccc",
              }}
            >
              <div
                className={`w-3 h-3 rounded-full`}
                style={{ backgroundColor: opt.color }}
              />
            </div>
          </label>
        );
      })}
    </div>
  );
}
