export const getImageUrl = (id_image) =>
    id_image
        ? `${process.env.REACT_APP_API_BASE_URL}/image/${id_image}`
        : '/placeholder.png';