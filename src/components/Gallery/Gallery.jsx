import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPhotos, setPage, setQuery } from "../../features/photosSlice";
import { Download, Heart, Search } from "lucide-react";
import "../../styles/css/style.css";

const PicStormGallery = () => {
  const dispatch = useDispatch();
  const { photos, query, page, totalPages, status, error } = useSelector(
    (state) => state.photos
  );
  const [searchInput, setSearchInput] = useState(query);

  useEffect(() => {
    dispatch(fetchPhotos({ query, page }));
  }, [dispatch, query, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setQuery(searchInput));
    dispatch(setPage(1));
  };

  const handlePageClick = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      dispatch(setPage(newPage));
    }
  };

  const popularTags = ["city", "nature", "coffee", "sea", "football"];

  return (
    <div className="gallery-wrapper">
      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          placeholder="Search photos..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button type="submit">
          <Search size={16} />
        </button>
      </form>

      <div className="tags-container">
        {popularTags.map((tag) => (
          <button
            key={tag}
            className="tag-button"
            onClick={() => {
              setSearchInput(tag); // actualiza el input
              dispatch(setQuery(tag)); // dispara búsqueda con el tag
              dispatch(setPage(1)); // vuelve a página 1
            }}
          >
            #{tag}
          </button>
        ))}
      </div>

      {status === "loading" && <p>Loading photos...</p>}
      {status === "failed" && <p>Error: {error}</p>}

      <div className="gallery-grid">
        {photos.map(
          (photo) =>
            photo?.urls?.small && (
              <div key={photo.id} className="photo-card">
                <img
                  src={photo.urls.small}
                  alt={photo.alt_description || "Photo"}
                />
                <div className="card-overlay">
                  <div className="icon-button">
                    <Heart size={14} />
                    {photo.likes}
                  </div>
                  <a
                    href={`${photo.links.download}?force=true`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="icon-button"
                  >
                    <Download size={14} />
                    Download
                  </a>
                </div>
              </div>
            )
        )}
      </div>

      <div className="pagination">
        <button onClick={() => handlePageClick(page - 1)} disabled={page === 1}>
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageClick(i + 1)}
            className={page === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageClick(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PicStormGallery;
