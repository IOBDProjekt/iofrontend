export const getImageUrl = (id_image, version) =>
	id_image
		? `${process.env.REACT_APP_API_BASE_URL}/image/${id_image}$${version}`
		: "/placeholder.png";

