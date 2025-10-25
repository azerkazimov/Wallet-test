import { useNavigate } from "react-router-dom";
import { useFinanceStore } from "../store";
import {isSameMonth} from "../utils/format"
import { useMemo } from "react";

export default function HomeScreen() {
  const navigate = useNavigate();

  const entries = useFinanceStore((s) => s.entries);

  const { balance, monthIncome, monthExpence } = useMemo(() => {
    const sum = (arr, type) =>
      arr.filter((e) => e.type === type).reduce((a, b) => a + b.amount, 0);

    const inc = sum (entries, "income")
    const exp = sum (entries, "expense")
    const now = new Date()

    const monthEntries = entries.filter((e) => isSameMonth(e.date, now))

    const monthInc = sum (monthEntries, "income")
    const monthExp = sum (monthEntries, "expence")

    return {
        income: inc,
        expence: exp,
        balance: inc-exp,
        monthIncome: monthInc,
        monthExpence: monthExp,
    }
  }, [entries]);

  return (
    <div className="screen">
      <h1>Type here your code ...</h1>
      <p>You can type your code here...</p>
      <p>You can type your code here...</p>
    </div>
  );
}
