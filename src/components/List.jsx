import React, { useEffect, useState } from "react";
import axios from "axios";
import ListItem from "./ListItem";

function List() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/list")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((error) => console.error());
  }, []);

  const [value, setValue] = useState();
  const addTask = (e) => {
    axios
      .post("http://localhost:5000/list", {
        todo: value,
      })
      .then((response) => response.send);
  };
  const all = data.data ? data.data.length : 0;
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="bg-violet-500 w-[375px] h-[70px] flex justify-around items-center font-[700] text-[22px] text-white shadow-md mb-2">
        <span>My ToDo list</span>
        <span className="bg-violet-600 text-[13px] rounded-full w-[40ox] px-3 py-1">
          0/{all}
        </span>
      </div>
      <div className="h-[500px] w-[375px] shadow-md bg-white px-10 flex flex-col justify-between">
        <div className="h-full mt-10 overflow-scroll">
          {Array.isArray(data.data)
            ? data.data.map((e) => <ListItem data={e} key={e._id} />)
            : null}
        </div>
        {/* form!!! */}
        <form className="">
          <input
            onChange={(e) => {
              setValue(e.target.value);
            }}
            autoCorrect="off"
            spellCheck="false"
            placeholder="what's next?"
            className="mb-[40px] w-full h-[40px] flex items-center border-b-[2px] border-violet-500 text-neutral-500 font-[500] input"
          />

          <div className="h-[1px] w-full relative mt-auto">
            <button
              type="submit"
              onClick={addTask}
              className="font-[700] bg-violet-500 p-3 text-[15px] rounded-3xl w-[120px] text-white absolute top-[-25px] right-[90px]"
            >
              Add task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default List;
