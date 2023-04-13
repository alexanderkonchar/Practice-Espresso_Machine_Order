"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 13
   Review Assigment

   Shopping Cart Form Script
   
   Author: Alex Konchar
   Date: 2023-04-12
   
   Filename: co_cart.js
   
   Function List
   =============
   
   calcCart()
      Calculates the cost of the customer order
      
   formatNumber(val, decimals)
      Format a numeric value, val, using the local
      numeric format to the number of decimal
      places specified by decimals
      
   formatUSACurrency(val)
      Formats val as U.S.A. currency
   
*/

const cart = document.cart;

window.addEventListener('load', () => {
    calcCart();
    cart.onchange = calcCart;

    document.querySelectorAll('input[name="shipping"]').forEach((option) => {
        option.onclick = calcCart;
    });
});

function calcCart() {
    const quantity = cart.elements.modelQty[cart.elements.modelQty.selectedIndex].value;
    const orderCost = cart.elements.modelCost.value * quantity;

    cart.elements.orderCost.value = formatUSCurrency(orderCost);

    const shippingType = document.querySelector('input[name="shipping"]:checked');
    const shipCost = shippingType.value * quantity;
    cart.shippingCost.value = formatNumber(shipCost, 2);

    cart.subTotal.value = formatNumber(orderCost + shipCost, 2);

    const salesTax = formatNumber(0.05 * (orderCost + shipCost), 2);

    cart.salesTax.value = salesTax;

    cart.cartTotal.value = formatUSCurrency(orderCost + shipCost + salesTax);

    cart.shippingType.value = shippingType.label;
}

function formatNumber(val, decimals) {
    return val.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    });
}

function formatUSCurrency(val) {
    return val.toLocaleString('en-US', {style: "currency", currency: "USD"});
}
