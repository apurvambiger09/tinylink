"use client";

interface DeleteButtonProps {
  code: string;
  onDelete: () => void; // function to refresh table after deletion
}

export default function DeleteButton({ code, onDelete }: DeleteButtonProps) {
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this link?")) return;

    try {
      const res = await fetch(`/api/links/${code}`, { method: "DELETE" });
      const data = await res.json();
      console.log("DELETE response:", data);

      if (!res.ok) {
        alert("Delete failed: " + data.error);
        return;
      }

      alert("Link deleted successfully!");
      onDelete(); // refresh the table
    } catch (err) {
      console.error(err);
      alert("Something went wrong while deleting the link.");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="text-red-500 hover:underline"
    >
      Delete
    </button>
  );
}


