import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useFinanceStore } from "../store";
import { formatMoney, isSameMonth } from "../utils/format";

export default function StatsScreen() {
    const navigate = useNavigate();
    const entries = useFinanceStore((s) => s.entries);

    const { monthIncome, monthExpense, byCategory } = useMemo(() => {
        const now = new Date();
        const month = entries.filter((e) => isSameMonth(e.date, now));
        const monthIncome = month
            .filter((e) => e.type === "income")
            .reduce((a, b) => a + b.amount, 0);
        const monthExpense = month
            .filter((e) => e.type === "expense")
            .reduce((a, b) => a + b.amount, 0);
        const byCat = month
            .filter((e) => e.type === "expense")
            .reduce((acc, e) => {
                const key = e.category || "Без категории";
                acc[key] = (acc[key] ?? 0) + e.amount;
                return acc;
            }, {});
        return { monthIncome, monthExpense, byCategory: byCat };
    }, [entries]);

    return (
        <div className="screen">
            <div className="container">
                <div className="header">
                    <button className="back-btn" onClick={() => navigate("/")}>
                        ← Назад
                    </button>
                    <h1>Статистика</h1>
                </div>

                <div className="card">
                    <div className="card-header">Текущий месяц</div>
                    <div className="kpi">Доход: {formatMoney(monthIncome)}</div>
                    <div className="kpi">
                        Расходы: {formatMoney(monthExpense)}
                    </div>
                    <div className="kpi">
                        Итого: {formatMoney(monthIncome - monthExpense)}
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">Расходы по категориям</div>
                    {Object.keys(byCategory).length === 0 ? (
                        <div className="empty-state">Нет данных</div>
                    ) : (
                        <div className="category-list">
                            {Object.entries(byCategory).map(([cat, sum]) => (
                                <div key={cat} className="category-row">
                                    <span>{cat}</span>
                                    <span className="category-amount">
                                        {formatMoney(sum)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

