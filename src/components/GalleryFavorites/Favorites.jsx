import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modal/Modal";
import { useState } from "react";
import {
  removeFromFavorites,
  updateDescription,
} from "../../features/favoritesSlice";

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites.items);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const dispatch = useDispatch();

  const handleUpdateDescription = (id, newDescription) => {
    dispatch(updateDescription({ id, newDescription }));
  };

  const handleRemoveFavorite = (id) => {
    dispatch(removeFromFavorites(id));
    setSelectedPhoto(null);
  };

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
              style={{ cursor: "pointer" }}
            />
          </div>
        ))
      )}
      {selectedPhoto && (
        <Modal
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
          onUpdateDescription={handleUpdateDescription}
          onRemoveFavorite={handleRemoveFavorite}
        />
      )}
    </div>
  );
};

export default Favorites;
