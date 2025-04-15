import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPhotos, setPage, setQuery } from "../../features/photosSlice";
import { Download, Heart, Search, ThumbsUp } from "lucide-react";
import "../../styles/css/style.css";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../features/favoritesSlice";

const PicStormGallery = () => {
  const dispatch = useDispatch();
  const { photos, query, page, totalPages, status, error } = useSelector(
    (state) => state.photos
  );
  const favorites = useSelector((state) => state.favorites.items);

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
  const [activeTag, setActiveTag] = useState(null);
  const [downloaded, setDownloaded] = useState(false);

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
          <p
            key={tag}
            className={`tag-button ${activeTag === tag ? "active" : ""}`}
            onClick={() => {
              const isSameTag = activeTag === tag;
              const newTag = isSameTag ? null : tag;

              setActiveTag(newTag);
              setSearchInput(newTag || "");
              dispatch(setQuery(newTag || ""));
              dispatch(setPage(1));
            }}
          >
            #{tag}
          </p>
        ))}
      </div>

      {status === "loading" && <p>Loading photos...</p>}
      {status === "failed" && <p>Error: {error}</p>}

      <div className="gallery-grid">
        {photos.map((photo) => {
          const isLiked = favorites.some((fav) => fav.id === photo.id);

          return (
            <div key={photo.id} className="photo-card">
              <img
                src={photo.urls.small}
                alt={photo.alt_description || "Photo"}
                className="photo-img"
              />

              {/* ICONOS SUPERIORES */}
              <div className="top-icons">
                <button className="icon-button">
                  <Heart
                    size={16}
                    className={`icon__heart ${isLiked ? "active" : ""}`}
                    fill={isLiked ? "red" : "none"}
                    onClick={() => {
                      if (isLiked) {
                        dispatch(removeFromFavorites(photo.id));
                      } else {
                        dispatch(addToFavorites(photo));
                      }
                    }}
                  />
                </button>
              </div>

              {/* ICONOS INFERIORES */}
              <div className="bottom-icons">
                <div className="likes">
                  {photo.likes}
                  <ThumbsUp size={14} />
                </div>

                <a
                  href={`${photo.links.download}?force=true`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-button"
                  onClick={() => setDownloaded(true)}
                >
                  <Download size={16} className={"icon__download"} />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pagination">
        <button onClick={() => handlePageClick(page - 1)} disabled={page === 1}>
          Previous
        </button>
        {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => (
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
