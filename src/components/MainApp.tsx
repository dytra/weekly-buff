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
import { useEffect, useState } from "react";
import Footer from "./Footer";
import useLocalStorage from "react-storage-helper";
import { DatePicker } from "./ui/datepicker";
import { format } from "date-fns";
import {
  capFirst,
  getTotalWeekPassed,
  getWeekTypeByTotalWeeks,
} from "@/lib/utils";
// import useLocalStorage from "react-storage-helper";

const MainApp = () => {
  const [currentWeekType, setCurrentWeekType] = useLocalStorage<WeekType>(
    "currentWeekType"
    // "technical"
  );
  const [actualWeekType, setActualWeekType] = useState<WeekType>();

  const [initialWeekType, setInitialWeekType] =
    useLocalStorage<WeekType>("initialWeekType");
  const [initialDate, setInitialDate] = useLocalStorage<number>("initialDate");
  const [totalWeekPassed, setTotalWeekPassed] = useState(0);

  // console.log("currentWeekTypexu", currentWeekType)

  const handleConfirmWeekType = ({
    weekType,
    initialDate,
  }: {
    weekType: WeekType;
    initialDate: Date;
  }) => {
    setCurrentWeekType(weekType);
    setInitialWeekType(weekType);
    const timestamp = initialDate.getTime();
    setInitialDate(timestamp);
  };

  useEffect(() => {
    if (!initialWeekType) return;
    let totalWeekPassed;
    const initialDateStorage = localStorage.getItem("initialDate");
    const initialDateObj = initialDateStorage
      ? new Date(parseInt(initialDateStorage))
      : null;
    if (initialDateObj) {
      totalWeekPassed = getTotalWeekPassed(initialDateObj, new Date());
      // totalWeekPassed = 0;
      const calculatedWeekType = getWeekTypeByTotalWeeks(
        initialWeekType,
        totalWeekPassed
      );
      setTotalWeekPassed(totalWeekPassed);
      setActualWeekType(calculatedWeekType);
      // console.log("calculated ",calculatedWeekType);
    }
  }, [initialWeekType]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-h-[100svh] py-12 px-4 sm:px-6 lg:px-8">
      <span
        className="relative flex shrink-0 overflow-hidden rounded-full w-24 mb-8"
        // src="/placeholder.svg?height=100&amp;width=100"
      ></span>
      <h1 className="text-4xl font-bold text-center mb-4">Weekly Buff</h1>
      {!!currentWeekType && (
        <ActiveCard
          // currentWeekType={currentWeekType}
          currentWeekType={actualWeekType}
          totalWeekPassed={totalWeekPassed}
        />
      )}
      {!currentWeekType && (
        <HeroBox
          currentweekType={currentWeekType}
          onConfirmWeekType={handleConfirmWeekType}
        />
      )}
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

type ActiveCardProps = {
  currentWeekType?: WeekType;
  totalWeekPassed?: number;
};
const ActiveCard: React.FC<ActiveCardProps> = ({
  currentWeekType,
  totalWeekPassed,
}) => {
  const weekTypeString =
    currentWeekType === "marketing" ? "Marketing" : "Technical";
  return (
    <div className="rounded-lg bg-card text-card-foreground border shadow-sm mb-8 w-full max-w-md mx-auto">
      <div className="flex-col space-y-1.5 p-6 flex items-center justify-between">
        <h3 className="tracking-tight text-lg font-semibold">Current Week</h3>
        <div
          className="inline-flex items-center rounded-full border px-2.5 py-0.5 w-fit font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-sm"
          color="blue"
        >
          {weekTypeString} Week
        </div>
        <Spacer className="h-1" />
        <div>
          <p className="font-bold text-5xl text-center mb-3">
            {totalWeekPassed}
          </p>
          <p className="text-sm">Your Week Streak</p>
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
    </div>
  );
};

interface HeroBoxProps {
  currentweekType?: string;
  onConfirmWeekType?: (params: {
    weekType: WeekType;
    initialDate: Date;
  }) => void;
}
const HeroBox: React.FC<HeroBoxProps> = ({
  // currentweekType,
  onConfirmWeekType,
}) => {
  const [weekTypeTemp, setWeekTypeTemp] = useState<WeekType | undefined>();
  const [initialDateTemp, setInitialDateTemp] = useState<Date | undefined>();
  const formattedInitDate = initialDateTemp
    ? format(initialDateTemp, "MMMM do, yyyy")
    : "";
  const dayName = initialDateTemp ? format(initialDateTemp, "EEEE") : "";
  const filled = weekTypeTemp && initialDateTemp;
  const handleChangeWeekType = ({ value }: { value?: string }) => {
    // console.log("value ", value);
    if (value) setWeekTypeTemp(value as WeekType);
  };
  const handleChangeInitialDate = (date: Date) => {
    setInitialDateTemp(date);
  };
  return (
    <div className="p-6 text-sm max-w-md text-center">
      <p>
        Are you a Solo Founder and struggling to manage between coding and
        marketing tasks? Let me, help you boost your productivity by getting our
        weekly buff.
      </p>
      {/* <p>Let me, help you boost your productivity by getting our weekly buff.</p> */}
      {/* <p>Let's pick your weekly buff</p> */}
      <Spacer />
      <Dialog>
        <DialogTrigger asChild>
          <div>
            <Button className="px-7">GET STARTED</Button>
            <Button variant={"link"}>WAIT WHAT?</Button>
          </div>
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
              value={weekTypeTemp}
              onChange={handleChangeWeekType}
            />
            <DatePicker
              placeholder="Pick Your Initial Date"
              onChange={handleChangeInitialDate}
              date={initialDateTemp}
            />
          </div>
          {filled && (
            <>
              <p>
                This week You will get a{" "}
                <strong>{capFirst(weekTypeTemp)}</strong> buff, with the initial
                date of <strong>{formattedInitDate}</strong>. And the buff cycle
                will change every <strong>{dayName}</strong>.
              </p>
            </>
          )}

          <DialogTrigger asChild>
            <Button
              onClick={() => {
                if (onConfirmWeekType && filled) {
                  onConfirmWeekType({
                    weekType: weekTypeTemp,
                    initialDate: initialDateTemp,
                  });

                  // Get the timestamp (number of milliseconds since the Unix epoch)

                  // localStorage.setItem(
                  //   "initialDate",
                  //  timestamp?.toString()
                  // );
                }
              }}
              disabled={!filled}
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
    iconClass: "fa-laptop-code",
  },
  {
    key: "marketing",
    label: "Marketing",
    iconClass: "fa-bullhorn",
  },
];

// <p>Being a solo founder comes with challenge like to decide between when to do code and marketing. </p>
// <p>Inspired by the founder of BannerBear, One way to solve this problem is just to focus on 1 thing for 1 week. </p>
// <p>This app will (hopefully) help you to remind what type of week is currently active</p>
export default MainApp;
