import { cn } from "@/lib/utils";
import { WeekType } from "@/types";
// import useLocalStorage from "@/vendor/react-storage-helper/useLocalStorage";
import { Button } from "./ui/button";
import Spacer from "./Spacer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import RadioSelect, { RadioItem } from "./RadioSelect";
import { useState } from "react";
import Footer from "./Footer";
import useLocalStorage from "react-storage-helper";
// import useLocalStorage from "react-storage-helper";

const MainApp = () => {
  const [currentWeekType, setCurrentWeekType] = useLocalStorage<WeekType>(
    "currentWeekType"
    // "technical"
  );
  const weekTypeString =
    currentWeekType === "marketing" ? "Marketing" : "Technical";
  // console.log("currentWeekTypexu", currentWeekType)

  const handleConfirmWeekType = (value: string) => {
    setCurrentWeekType(value as WeekType);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <span
        className="relative flex shrink-0 overflow-hidden rounded-full w-24 mb-8"
        // src="/placeholder.svg?height=100&amp;width=100"
      ></span>
      <h1 className="text-4xl font-bold text-center mb-4">
        What Week Is This?
      </h1>
      <div
        className={cn(
          "rounded-lg  bg-card text-card-foreground shadow-sm mb-8 w-full max-w-md mx-auto",
          { border: currentWeekType }
        )}
        data-v0-t="card"
      >
        {!!currentWeekType && (
          <ActiveBox
            currentWeekType={currentWeekType}
            weekTypeString={weekTypeString}
          />
        )}
        {!currentWeekType && (
          <NewComerBox
            currentweekType={currentWeekType}
            onConfirmWeekType={handleConfirmWeekType}
          />
        )}
      </div>
      <Footer />
      {/* <div className="flex gap-4">
        <a className="text-blue-500 hover:underline" href="#" rel="ugc">
          Previous Weeks
        </a>
        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
          Next Week
        </button>
      </div> */}
    </div>
  );
};

type ActiveBoxProps = {
  weekTypeString: string;
  currentWeekType: WeekType;
};
const ActiveBox: React.FC<ActiveBoxProps> = ({
  weekTypeString,
  currentWeekType,
}) => {
  return (
    <>
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
          {currentWeekType === "technical" &&
            "This week is a technical week. Focus on enhancing your technical skills. Happy hacking!"}

          {currentWeekType === "marketing" &&
            "This week is a marketing week. Focus on enhancing your creative skills."}
        </p>
      </div>
    </>
  );
};

interface NewComerBoxProps {
  currentweekType?: string;
  onConfirmWeekType?: (value: string) => void;
}
const NewComerBox: React.FC<NewComerBoxProps> = ({
  // currentweekType,
  onConfirmWeekType,
}) => {
  const [weekType, setWeekType] = useState<string | undefined>();
  const handleChangeWeekType = ({ value }: { value?: string }) => {
    console.log("value ", value);
    if (value) setWeekType(value);
  };
  return (
    <div className="p-6 text-sm text-center">
      <p>Are you a Solo Founder and ready to start being productive?</p>
      <p>Let's pick your weekly buff</p>
      <Spacer />
      <Dialog>
        <DialogTrigger asChild>
          <Button>GET STARTED</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Choose your Weekly Buff</DialogTitle>
            <DialogDescription>
              For productivity purpose, this action currently cannot be undone.
              Except you hack this app.
            </DialogDescription>
          </DialogHeader>
          <div>
            <RadioSelect
              options={weekTypeOptions}
              value={weekType}
              onChange={handleChangeWeekType}
            />
          </div>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                if (onConfirmWeekType && weekType) onConfirmWeekType(weekType);
              }}
            >
              CONFIRM
            </Button>
          </DialogTrigger>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const weekTypeOptions: RadioItem[] = [
  {
    key: "technical",
    label: "Technical",
  },
  {
    key: "marketing",
    label: "Marketing",
  },
];

// <p>Being a solo founder comes with challenge like to decide between when to do code and marketing. </p>
// <p>Inspired by the founder of BannerBear, One way to solve this problem is just to focus on 1 thing for 1 week. </p>
// <p>This app will (hopefully) help you to remind what type of week is currently active</p>
export default MainApp;
