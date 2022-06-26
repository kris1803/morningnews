
export default function wishlist(wishlist = [], action) {
    if (action.type === 'ADD_TO_WISHLIST') {
        let newWishlist = [...wishlist];
        newWishlist.push(action.payload);
        return newWishlist;
    } else if (action.type === 'REMOVE_FROM_WISHLIST') {
        let newWishlist = [...wishlist];
        newWishlist.splice(newWishlist.indexOf(action.payload), 1);
        return newWishlist;
    }
    else {
        return wishlist;
    }
}