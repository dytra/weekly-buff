import { cn } from "@/lib/utils";
import Spacer from "./Spacer";

export interface RadioSelectProps {
  options: RadioItem[];
  value?: string;
  onChange?: (params: { value?: string }) => void;
}

export interface RadioItem {
  key: string;
  label: string;
}
const RadioSelect: React.FC<RadioSelectProps> = ({
  options,
  value,
  onChange,
}) => {
  return (
    <div className="flex gap-2 mb-3">
      {options.map((option) => {
        const selected = option.key === value;
        return (
          <button
            key={option.key}
            onClick={() => {
              if (onChange) onChange({ value:option.key });
            }}
            className={cn(
              "flex-1 flex flex-col border rounded-md items-center py-3 hover:bg-border transition-all",
              "border-secondary",
              {
                "border-primary": selected,
              }
            )}
          >
            <i className="fa-solid fa-laptop-code text-2xl"></i>
            <Spacer />
            <span className={cn(
              {
                "font-semibold":selected
              }
            )}>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default RadioSelect;
