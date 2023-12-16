import { WeekType } from "@/types";
import useLocalStorage from "@/vendor/react-storage-helper/useLocalStorage";
// import useLocalStorage from "react-storage-helper";

const MainApp = () => {
  const [currentWeekType, setCurrentWeekType] =
    useLocalStorage<WeekType>("currentWeekType","marketing");
  const weekTypeString =
    currentWeekType === "marketing" ? "Marketing" : "Technical";
  // console.log("currentWeekTypexu", currentWeekType)
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <span
        className="relative flex shrink-0 overflow-hidden rounded-full w-24 h-24 mb-8"
        // src="/placeholder.svg?height=100&amp;width=100"
      ></span>
      <h1 className="text-4xl font-bold text-center mb-4">
        What Week Is This?
      </h1>
      <div
        className="rounded-lg border bg-card text-card-foreground shadow-sm mb-8 w-full max-w-md mx-auto"
        data-v0-t="card"
      >
        <div className="flex-col space-y-1.5 p-6 flex items-center justify-between">
          <h3 className="tracking-tight text-lg font-semibold">Current Week</h3>
          <div
            className="inline-flex items-center rounded-full border px-2.5 py-0.5 w-fit font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-sm"
            color="blue"
          >
            {weekTypeString} Week
          </div>
        </div>
        <div className="p-6 text-center">
          <p className="text-sm text-gray-500">
            This week is a technical week. Focus on enhancing your technical
            skills.
          </p>
        </div>
      </div>
      <div className="flex gap-4">
        <a className="text-blue-500 hover:underline" href="#" rel="ugc">
          Previous Weeks
        </a>
        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
          Next Week
        </button>
      </div>
    </div>
  );
};

export default MainApp;
