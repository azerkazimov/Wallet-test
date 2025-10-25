import React from "react";
import { formatMoney } from "../utils/format";
import { useFinanceStore } from "../store";

export default function EntryItem({ entry }) {
    const remove = useFinanceStore((s) => s.removeEntry);

    const handleRemove = () => {
        if (window.confirm("Удалить эту операцию?")) {
            remove(entry.id);
        }
    };

    return (
        <div className="entry-item" onClick={handleRemove}>
            <div className="entry-left">
                <div className="entry-title">{entry.title}</div>
                <div className="entry-meta">
                    {entry.category ?? "—"} •{" "}
                    {new Date(entry.date).toLocaleDateString()}
                </div>
            </div>
            <div
                className="entry-amount"
                style={{ color: entry.type === "income" ? "#1a7f37" : "#d32f2f" }}
            >
                {entry.type === "expense" ? "−" : "+"}
                {formatMoney(entry.amount)}
            </div>
        </div>
    );
}

