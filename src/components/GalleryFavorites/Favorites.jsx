import { useSelector } from "react-redux";
import Modal from "../Modal/Modal";
import { useState } from "react";

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites.items);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <div className="gallery-grid">
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        favorites.map((photo) => (
          <div key={photo.id} className="photo-card">
            <img
              src={photo.urls.small}
              alt={photo.alt_description || "Photo"}
              onClick={() => setSelectedPhoto(photo)}
              style={{cursor: "pointer"}}
            />
          </div>
        ))
      )}
      <Modal photo={selectedPhoto} onClose={() => setSelectedPhoto(null)}/>
    </div>
  );
};

export default Favorites;
