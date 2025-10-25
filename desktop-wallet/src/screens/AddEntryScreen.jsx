import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useFinanceStore } from "../store";

export default function AddEntryScreen() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const presetType = searchParams.get("type") ?? "expense";
    const addEntry = useFinanceStore((s) => s.addEntry);

    const [type, setType] = useState(presetType);
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [notes, setNotes] = useState("");

    const onSave = () => {
        const num = Number(amount.replace(",", "."));
        if (!title.trim() || !Number.isFinite(num) || num <= 0) {
            alert("Проверь поля: Название и сумма (>0) обязательны");
            return;
        }
        addEntry({
            type,
            title: title.trim(),
            amount: num,
            category: category.trim() || undefined,
            date: new Date().toISOString(),
            notes: notes.trim() || undefined,
        });
        navigate("/");
    };

    return (
        <div className="screen">
            <div className="container">
                <div className="header">
                    <button className="back-btn" onClick={() => navigate("/")}>
                        ← Назад
                    </button>
                    <h1>Новая операция</h1>
                </div>

                <div className="form">
                    <div className="switch-row">
                        <button
                            onClick={() => setType("income")}
                            className={`switch-btn ${type === "income" ? "switch-active-green" : ""}`}
                        >
                            Доход
                        </button>
                        <button
                            onClick={() => setType("expense")}
                            className={`switch-btn ${type === "expense" ? "switch-active-red" : ""}`}
                        >
                            Расход
                        </button>
                    </div>

                    <input
                        className="input"
                        placeholder="Название (например, Зарплата / Кофе)"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        className="input"
                        placeholder="Сумма (например, 12.5)"
                        type="number"
                        step="0.01"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <input
                        className="input"
                        placeholder="Категория (опционально)"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                    <textarea
                        className="input input-textarea"
                        placeholder="Заметка (опционально)"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />

                    <button className="save-btn" onClick={onSave}>
                        Сохранить
                    </button>
                </div>
            </div>
        </div>
    );
}

