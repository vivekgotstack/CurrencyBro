import { useEffect, useId, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface InputProps {
  label: string;
  amount: number;
  onAmountChange: (num: number) => void;
  onCurrencyChange: (currency: string) => void;
  selectCurrency: string;
  amountDisable?: boolean;
  currencyDisable?: boolean;
  className?: string;
  currencyOptions: string[];
}

export function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  selectCurrency,
  amountDisable = false,
  currencyDisable = false,
  className = "",
  currencyOptions,
}: InputProps) {
  const amountInputId = useId();
  const [inputValue, setInputValue] = useState(amount.toString());

  useEffect(() => {
    setInputValue(amount.toString());
  }, [amount]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    onAmountChange(val === "" ? 0 : Number(val));
  };

  return (
    <div className={`bg-gray-400/40 gap-4 p-3 rounded-lg text-sm flex ${className}`}>
      <div className="w-1/2">
        <Label htmlFor={amountInputId} className="p-2">{label}</Label>
        <Input
          type="number"
          className="bg-gray-200"
          id={amountInputId}
          placeholder="Amount"
          disabled={amountDisable}
          value={inputValue}
          onChange={handleChange}
        />
      </div>

      <div className="w-1/2 flex flex-col justify-end">
        <Label className="p-2">Currency Type</Label>
        <Select
          value={selectCurrency}
          onValueChange={(value) => onCurrencyChange(value)}
          disabled={currencyDisable}
        >
          <SelectTrigger className="w-full bg-gray-200 cursor-pointer">
            <SelectValue placeholder="Select currency" />
          </SelectTrigger>
          <SelectContent>
            {currencyOptions.map((currency) => (
              <SelectItem key={currency} value={currency}>
                {currency}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
