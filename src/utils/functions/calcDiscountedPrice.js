export function calcDiscountedPrice(price, discount) {
    if (!discount) return price;  //0 falsy

    const discountAmount = (price * discount) / 100;
    const finalPrice = price - discountAmount;

    return finalPrice;
}