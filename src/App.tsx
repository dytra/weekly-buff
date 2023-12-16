import React, { useState, useEffect } from "react";
import { format, addDays, isAfter } from "date-fns";
import useLocalStorage from "react-storage-helper";
import { Button } from "./components/ui/button";
import { ThemeProvider } from "./components/theme-provider";
import MainApp from "./components/MainApp";

type WeekType = "technical" | "marketing";
function App() {
  //
  const [weekType, setWeekType] = useState(
    localStorage.getItem("weekType") || "technical"
  );
  const [startDate, setStartDate] = useState(new Date());
  const endDate = addDays(new Date(startDate), 7);
  const [currentWeekType, setCurrentWeekType] =
    useLocalStorage<WeekType>("currentWeekType");
  console.log("cur bro ", currentWeekType);

  const handleButtonClick = (type: string) => {
    // if (weekType !== type) {
    setWeekType(type);
    setStartDate(new Date());
    localStorage.setItem("weekType", type);
    localStorage.setItem("startDate", new Date().toISOString());
    // }
  };

  // const isTechnicalWeek = weekType === "technical";
  const currentDateString = format(new Date(), "MMMM d, yyyy");

  useEffect(() => {
    if (!currentWeekType) setCurrentWeekType("technical");
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="App">
        <MainApp />
        {/* <div className="container w-full flex flex-col">
          <h1>Business Week Type</h1>

          <p>
            Current Week: {weekType.charAt(0).toUpperCase() + weekType.slice(1)}
          </p>
          <p>Current Date: {currentDateString}</p>
          <p>End Date: {format(endDate, "MMMM d, yyyy")}</p>
          <Button onClick={() => handleButtonClick("technical")}>
            Technical Week
          </Button>
          <button onClick={() => handleButtonClick("marketing")}>
            Marketing Week
          </button>
          {isAfter(new Date(), endDate) && (
            <p>
              It's time to switch to a{" "}
              {weekType === "technical" ? "marketing" : "technical"} week!
            </p>
          )}
        </div> */}
      </div>
    </ThemeProvider>
  );
}

export default App;
