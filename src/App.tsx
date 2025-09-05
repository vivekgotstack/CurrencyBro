import { useState, useEffect } from "react";
import { useFetch } from "./hooks/useFetch";
import { InputBox } from "./components/InputBox";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

function App() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState<string>("USD");
  const [to, setTo] = useState<string>("INR");
  const [convertedAmount, setConvertedAmount] = useState<number>(0);

  const { data, error, loading } = useFetch(from);
  const options = data?.rates ? Object.keys(data.rates) : [];

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  useEffect(() => {
    if (!data?.rates) return;
    setConvertedAmount(amount * data.rates[to]);
  }, [amount, to, data]);

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center p-4 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/17484901/pexels-photo-17484901.png')",
      }}
    >
      <div className="bg-white/20 backdrop-blur-3xl shadow-lg rounded-xl p-6 w-full max-w-md border border-white/20">
        <h1 className="text-2xl font-bold mb-6 text-center text-white drop-shadow">
          Currency Converter
        </h1>

        <InputBox
          label="From"
          amount={amount}
          onAmountChange={setAmount}
          onCurrencyChange={setFrom}
          selectCurrency={from}
          currencyOptions={options}
        />

        <div className="flex justify-center">
          <Button
            onClick={swap}
            disabled={loading}
            className="w-full py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white transition-all duration-1000 hover:from-amber-300 hover:to-blue-700 flex items-center justify-center"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Swap
          </Button>
        </div>

        <InputBox
          label="To"
          amount={convertedAmount}
          onAmountChange={() => {}}
          onCurrencyChange={setTo}
          selectCurrency={to}
          currencyOptions={options}
          amountDisable
        />

        {error && (
          <Alert variant="destructive" className="mt-4">
            {error}
          </Alert>
        )}
      </div>
    </div>
  );
}

export default App;
