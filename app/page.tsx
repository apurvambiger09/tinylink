"use client"; // required for hooks
import React from "react";
import LinkForm from "./components/LinkForm";
import LinkTable from "./components/LinkTable";

export default function Dashboard() {
  const [refresh, setRefresh] = React.useState(false);

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">TinyLink Dashboard</h1>

      <LinkForm onAdd={() => setRefresh(!refresh)} />
      <LinkTable key={refresh ? "r" : "n"} />
    </main>
  );
}
