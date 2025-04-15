import { useSelector } from "react-redux";

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites.items);

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
            />
          </div>
        ))
      )}
    </div>
  );
};

export default Favorites;
