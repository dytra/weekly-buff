import { useEffect } from "react";
import { ThemeProvider } from "./components/theme-provider";
import MainApp from "./components/MainApp";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./components/ui/sheet";
import { Button } from "./components/ui/button";
import { Dialog } from "@radix-ui/react-dialog";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";
import ModalToggle from "./components/ModalToggle";
import { Separator } from "./components/ui/separator";
import Spacer from "./components/Spacer";

function App() {
  //
  // const [weekType, setWeekType] = useState(
  //   localStorage.getItem("weekType") || "technical"
  // );
  // const [startDate, setStartDate] = useState(new Date());
  // const endDate = addDays(new Date(startDate), 7);
  // const [currentWeekType, setCurrentWeekType] =
  //   useLocalStorage<WeekType>("currentWeekType");
  // console.log("cur bro ", currentWeekType);

  // const handleButtonClick = (type: string) => {
  //   setWeekType(type);
  //   setStartDate(new Date());
  //   localStorage.setItem("weekType", type);
  //   localStorage.setItem("startDate", new Date().toISOString());
  // };

  // const isTechnicalWeek = weekType === "technical";
  // const currentDateString = format(new Date(), "MMMM d, yyyy");

  useEffect(() => {
    // if (!currentWeekType) setCurrentWeekType("technical");
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="App">
        <RightSheetMenu />
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
        {/* <Footer /> */}
      </div>
    </ThemeProvider>
  );
}

const RightSheetMenu: React.FC = () => {
  return (
    <div className="absolute right-0 p-5">
      <Sheet>
        <SheetTrigger asChild>
          <button>
            <i className="fa-solid fa-bars text-2xl"></i>
          </button>
        </SheetTrigger>
        <SheetContent>
          <div className="flex flex-col h-full">
            <ModalToggle />
            <Spacer/>
            <Separator />
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant={"outline"}
                  className="mt-auto hover:bg-destructive hover:text-white"
                >
                  <i className="fa-solid fa-trash-can mr-3"></i>
                  Reset Data
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    Are you you want to reset the data ?
                  </DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    the data from your browser.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex gap-3">
                  <SheetClose className="flex-1" asChild>
                    <DialogClose asChild>
                      <Button
                        onClick={() => {
                          window.localStorage.removeItem("currentWeekType");
                          window.localStorage.removeItem("initialWeekType");
                          window.localStorage.removeItem("initialDate");
                          window.location.reload();
                        }}
                      >
                        Yes
                      </Button>
                    </DialogClose>
                  </SheetClose>
                  <DialogClose className="flex-1" asChild>
                    <Button variant={"link"}>Cancel</Button>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default App;
