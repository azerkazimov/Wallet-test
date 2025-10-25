import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useFinanceStore } from "../store";
import { formatMoney, isSameMonth } from "../utils/format";
import EntryItem from "../components/EntryItem";

export default function HomeScreen() {
    const navigate = useNavigate();
    const entries = useFinanceStore((s) => s.entries);

    const {  balance, monthIncome, monthExpense } =
        useMemo(() => {
            const sum = (arr, type) =>
                arr
                    .filter((e) => e.type === type)
                    .reduce((a, b) => a + b.amount, 0);

            const inc = sum(entries, "income");
            const exp = sum(entries, "expense");
            const now = new Date();
            const monthEntries = entries.filter((e) =>
                isSameMonth(e.date, now),
            );
            const monthInc = sum(monthEntries, "income");
            const monthExp = sum(monthEntries, "expense");

            return {
                income: inc,
                expense: exp,
                balance: inc - exp,
                monthIncome: monthInc,
                monthExpense: monthExp,
            };
        }, [entries]);

    return (
        <div className="screen">
            <div className="container">
                <div className="card">
                    <div className="card-header">Баланс</div>
                    <div className="balance">{formatMoney(balance)}</div>
                    <div className="card-sub">
                        В этом месяце: +{formatMoney(monthIncome)} / −
                        {formatMoney(monthExpense)}
                    </div>
                </div>

                <div className="row-btns">
                    <button
                        className="btn btn-income"
                        onClick={() => navigate("/add?type=income")}
                    >
                        + Доход
                    </button>
                    <button
                        className="btn btn-expense"
                        onClick={() => navigate("/add?type=expense")}
                    >
                        − Расход
                    </button>
                    <button
                        className="btn btn-stats"
                        onClick={() => navigate("/stats")}
                    >
                        Статистика
                    </button>
                </div>

                <div className="section-title">Операции</div>

                <div className="entries-list">
                    {entries.length === 0 ? (
                        <div className="empty-state">Нет операций</div>
                    ) : (
                        entries.map((item) => (
                            <EntryItem key={item.id} entry={item} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

