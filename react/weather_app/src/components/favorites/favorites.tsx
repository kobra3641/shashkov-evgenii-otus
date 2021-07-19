import React from "react";
import IFavorite from "../../interfaces/ifavorite";
import "./favorites.css"
import "./../homepage/app.css"

const Favorites: React.FC<IFavorite> = ({favorites, onClickFavoriteDelete, onSelectChange}) => {
    const favoriteCollection = favorites.map((town) => {
        return (
            <li className="btn-group" key={town}>
                <button
                    className="btn btn-outline-secondary border-form btn-block"
                    onClick={() => onSelectChange(town)}>
                    {town}
                </button>
                <button
                    className="btn btn-outline-secondary border-form col-2"
                    onClick={() => onClickFavoriteDelete(town)}>
                    <i className="fas fa-times fa-sm justify-content-end"> </i>
                </button>
            </li>
        )
    })
    return (
        <ul className="list-group btn-group-vertical my-2">
            {favoriteCollection}
        </ul>
    )
}

export default Favorites