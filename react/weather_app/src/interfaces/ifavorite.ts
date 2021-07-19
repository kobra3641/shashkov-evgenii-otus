interface IFavorite {
    favorites: string[],
    onClickFavoriteDelete: (value: string) => void
    onSelectChange: (value: string) => void
}

export default IFavorite