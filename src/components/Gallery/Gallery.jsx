import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPhotos, setPage } from "../../features/photosSlice";

function GalleryPhotos() {
    const dispatch = useDispatch();
    const { photos, query, page, totalPages } = useSelector((state) => state.photos);

    useEffect(() => {
        dispatch(fetchPhotos({ query, page}));
        [query, page, dispatch]
    });

    const handleSearch = () =>{
        dispatch(setPage(1));
        dispatch(fetchPhotos({ query, page: 1 }));
    };
};