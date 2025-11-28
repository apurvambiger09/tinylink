"use client";

import { useEffect, useState } from "react";
import DeleteButton from "./DeleteButton";

interface Link {
  id: number;
  url: string;
  code: string;
  clicks: number;
  createdAt: string;
  lastClicked: string | null;
}

export default function LinkTable() {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);

  // Use useCallback for fetchLinks to satisfy TS
  const fetchLinks = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/links");
      if (!res.ok) throw new Error("Failed to fetch links");
      const data: Link[] = await res.json();
      setLinks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []); // empty dependency array

  if (loading) return <p>Loading links...</p>;
  if (links.length === 0) return <p>No links yet.</p>;

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2">Code</th>
          <th className="border p-2">URL</th>
          <th className="border p-2">Clicks</th>
          <th className="border p-2">Last Clicked</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {links.map((link) => (
          <tr key={link.id} className="hover:bg-gray-50">
            <td className="border p-2">{link.code}</td>
            <td className="border p-2">
              <a href={link.url} target="_blank" className="text-blue-600">
                {link.url}
              </a>
            </td>
            <td className="border p-2">{link.clicks}</td>
            <td className="border p-2">
              {link.lastClicked ? new Date(link.lastClicked).toLocaleString() : "-"}
            </td>
            <td className="border p-2">
              <DeleteButton code={link.code} onDelete={fetchLinks} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
