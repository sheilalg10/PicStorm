import React, { useState } from "react";
import { X, Trash2, Download, ThumbsUp, Pencil } from "lucide-react";
import "../../styles/css/style.css";

const Modal = ({ photo, onClose, onUpdateDescription, onRemoveFavorite }) => {
  if (!photo) return null;

  const [description, setDescription] = useState(
    photo.description || photo.alt_description || ""
  );
  const [isEditing, setIsEditing] = useState(false);
  const isHorizontal = photo.width <= photo.height;

  const handleSave = () => {
    setIsEditing(false);
    onUpdateDescription(photo.id, description);
  };

  const handleDownload = async () => {
  try {
    const imageUrl = photo.urls.full; // URL directa a la imagen
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${photo.id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error("Error al descargar la imagen:", error);
  }
};

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-wrapper ${
          isHorizontal ? "modal-horizontal" : "modal-vertical"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-button" onClick={onClose}>
          <X />
        </button>

        <div className="modal-photo-container">
          <img
            src={photo.urls.regular}
            alt={photo.alt_description}
            className="modal-image"
          />

          <div className="photo-overlay">
            {isEditing ? (
              <div className="edit-container">
                <textarea
                  className="photo-description-edit"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSave();
                    }
                  }}
                />
                <button className="save-button" onClick={handleSave}>
                  Guardar
                </button>
              </div>
            ) : (
              <p
                className="photo-description"
                onClick={() => setIsEditing(true)}
              >
                {description || "Click to add description"}
                <Pencil size={14} className="edit-icon" />
              </p>
            )}

            <div className="photo-info-bar">
              <span className="likes">
                {photo.likes} <ThumbsUp size={18} />
              </span>

              <div className="photo-actions">
                <button
                  onClick={() => onRemoveFavorite(photo.id)}
                  title="Remove"
                >
                  <Trash2 size={20} className="trash"/>
                </button>

                <button onClick={handleDownload} title="Download">
                  <Download size={20} className="download"/>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-info">
          <p>
            <strong>Width:</strong> {photo.width}
          </p>
          <p>
            <strong>Height:</strong> {photo.height}
          </p>
          <p>
            <strong>Date Added:</strong>{" "}
            {photo.dateAdded?.split("T")[0] || "Unknown"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
