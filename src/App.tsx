import { useState } from "react";

const NAMES = ["React", "Angular", "Vue", "Astro", "Next", "Svelte"];

const LIST_DATA: ListRow[] = Array.from(Array(100000).keys()).map((i) => ({
  name: NAMES[Math.floor(Math.random() * NAMES.length)],
  value: (Math.random() + 1).toString(36).substring(12),
}));

interface ListRow {
  name: string;
  value: string;
}

function App() {
  const [visibleList, setVisibleList] = useState<ListRow[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const onInputChange = (nextInput: string) => {
    setInputValue(nextInput);
    setVisibleList(
      LIST_DATA.filter(
        ({ name, value }: ListRow) =>
          nextInput !== "" &&
          (name.toLowerCase().includes(nextInput) ||
            value.toLocaleLowerCase().includes(nextInput))
      )
    );
  };

  return (
    <div className="App">
      <input
        type={"text"}
        value={inputValue}
        onChange={(e) => onInputChange(e.target.value)}
      />
      <ul>
        {inputValue.length === 0 && <li>Please type something to search</li>}
        {visibleList.map(({ name, value }: ListRow, index: number) => {
          return (
            <li key={index}>
              {name} - {value}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
