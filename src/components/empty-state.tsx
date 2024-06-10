import React from "react";
import { MdOutlinePlaylistRemove } from "react-icons/md";

const EmptyState = ({ title, show }: { title?: string; show: boolean }) => {
  if (!show) return null;
  return (
    <div>
      <div className="p-5">
        <div className="text-center mb-3">
          <MdOutlinePlaylistRemove className="display-1" color="#007bff" />
        </div>
        <div className="text-center text-secondary">{title || "There is not data to show you right now"}</div>
      </div>
    </div>
  );
};

export default EmptyState;
