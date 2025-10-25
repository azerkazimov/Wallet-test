import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from "react-native";
import { useFinanceStore } from "../store";

export default function AddEntryScreen({ route, navigation }) {
    const presetType = route.params?.type ?? "expense";
    const addEntry = useFinanceStore((s) => s.addEntry);
    console.log(presetType);
    const [type, setType] = useState(presetType);
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [notes, setNotes] = useState("");

    const onSave = () => {
        const num = Number(amount.replace(",", "."));
        if (!title.trim() || !Number.isFinite(num) || num <= 0) {
            Alert.alert("Проверь поля", "Название и сумма (>0) обязательны");
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
        navigation.goBack();
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.select({ ios: "padding", android: undefined })}
            style={{ flex: 1 }}
        >
            <Text>Type here your code ...</Text>
            <Text>You can type your code here...</Text>

        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    switchRow: { flexDirection: "row", gap: 8 },
    switchBtn: {
        flex: 1,
        padding: 12,
        backgroundColor: "#e5e7eb",
        borderRadius: 8,
        alignItems: "center",
    },
    switchActiveGreen: { backgroundColor: "#c8e6c9" },
    switchActiveRed: { backgroundColor: "#ffcdd2" },
    switchText: { fontWeight: "700", color: "#333" },
    switchTextActive: { color: "#000" },
    input: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
    },
    saveBtn: {
        backgroundColor: "#0d47a1",
        padding: 14,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 4,
    },
    saveText: { color: "#fff", fontWeight: "800", fontSize: 16 },
});
