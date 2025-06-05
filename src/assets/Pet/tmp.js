import { Link } from "react-router-dom";

<div className="pet-details-container">
    <Button startIcon={<ArrowBackIcon />} onClick={goBack}>
        Wróć do listy zwierząt
    </Button>
    <h1 className="pet-name">{name}</h1>

    <div className="pet-details-single-wrapper"></div>

    <div className="details-layout">
        <div className="left-column">
            <div className="image-wrapper">
                <a href={getImageUrl(id_image)} target="_blank">
                    dsadsadsadas
                    <img className="pet-image" src={getImageUrl(id_image)} alt={name} />
                </a>
                <button className="favorite-button" onClick={handleFavorite}>
                    {favorite ? "❤️" : "🤍"}
                </button>
            </div>

            {tags?.length > 0 && (
                <div className="tags">
                    {tags.map((tag) => (
                        <span className="tag" key={tag.id}>
                            {tag.character}
                        </span>
                    ))}
                </div>
            )}

            <div className="pet-info">
                <p>
                    <strong>Wiek:</strong> {age}
                </p>
                <p>
                    <strong>Płeć:</strong> {sex}
                </p>
                <p>
                    <strong>Stan zdrowia:</strong> {condition}
                </p>
                <p>
                    <strong>Rasa:</strong> {breed?.name || "-"}
                </p>
                <p>
                    <strong>Gatunek:</strong> {species?.name || "-"}
                </p>
                <p>
                    <strong>Schronisko:</strong> {shelter?.name || "-"}
                </p>
                <p>
                    <strong>Status:</strong> {status}
                </p>
            </div>
        </div>

        <div className="right-column">
            <button className="action-button">Wyślij wiadomość</button>
            <button className="action-button adopt">Adoptuj</button>
        </div>
    </div>
</div>;
