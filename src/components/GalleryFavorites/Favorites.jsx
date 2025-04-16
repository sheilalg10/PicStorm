import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modal/Modal";
import { useState } from "react";
import {
  removeFromFavorites,
  updateDescription,
} from "../../features/favoritesSlice";
import { Funnel } from "lucide-react";

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites.items);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    minLikes: 0,
    minWidth: 0,
    minHeight: 0,
    dateFrom: "",
  });

  const [sortField, setSortField] = useState("likes"); // El campo por el cual se ordena
  const [sortOrder, setSortOrder] = useState("asc"); // Ascendente o Descendente

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateDescription = (id, newDescription) => {
    dispatch(updateDescription({ id, newDescription }));
  };

  const handleRemoveFavorite = (id) => {
    dispatch(removeFromFavorites(id));
    setSelectedPhoto(null);
  };

  // Función para ordenar las fotos
  const sortPhotos = (photos) => {
    return photos.sort((a, b) => {
      let aValue = a[sortField] || 0; // Obtener el valor del campo seleccionado
      let bValue = b[sortField] || 0;

      // Si el campo es 'dateFrom', se compara las fechas
      if (sortField === "importedAt") {
        aValue = new Date(a.importedAt || a.created_at);
        bValue = new Date(b.importedAt || b.created_at);
      }

      // Ordenar dependiendo de la dirección
      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });
  };

  // Filtrar las fotos
  const filteredFavorites = favorites.filter((photo) => {
    const likes = photo.likes || 0;
    const width = photo.width || 0;
    const height = photo.height || 0;
    const date = new Date(photo.importedAt || photo.created_at);
    return (
      likes >= filters.minLikes &&
      width >= filters.minWidth &&
      height >= filters.minHeight &&
      (!filters.dateFrom || date >= new Date(filters.dateFrom))
    );
  });

  // Ordenar las fotos filtradas
  const sortedFavorites = sortPhotos(filteredFavorites);

  return (
    <div className="favorites-container">
      {/* Header */}
      <div className="favorites-header">
        <div className="favorites-title">
          <h2>Your Favourites</h2>
          <div className="title-underline" />
        </div>

        {/* Contenedor para el filtro */}
        <div className="filter-container">
          <div className="filter-label">
            <Funnel className="filter-icon" /> Filter
          </div>
          
          {/* Select para ordenar las fotos */}
          <select
            className="filter-select"
            value={`${sortField}_${sortOrder}`}
            onChange={(e) => {
              const [field, order] = e.target.value.split("_");
              setSortField(field);
              setSortOrder(order);
            }}
          >
            <option value="likes_asc">Likes Ascendente</option>
            <option value="likes_desc">Likes Descendente</option>
            <option value="width_asc">Width Ascendente</option>
            <option value="width_desc">Width Descendente</option>
            <option value="height_asc">Height Ascendente</option>
            <option value="height_desc">Height Descendente</option>
            <option value="importedAt_asc">Fecha Ascendente</option>
            <option value="importedAt_desc">Fecha Descendente</option>
          </select>
        </div>
      </div>

      {/* Galería */}
      <div className="gallery-grid">
        {sortedFavorites.length === 0 ? (
          <p>No favorites match your filters.</p>
        ) : (
          sortedFavorites.map((photo) => (
            <div key={photo.id} className="photo-card">
              <img
                src={photo.urls.small}
                alt={photo.alt_description || "Photo"}
                onClick={() => setSelectedPhoto(photo)}
              />
            </div>
          ))
        )}
      </div>

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
