// noinspection JSUnresolvedReference

"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 13
   Review Assignment

   Credit Card Form Script
   
   Author: Alex Konchar
   Date: 2023-04-12
   
   Filename: co_credit.js
   
   Function List
   =============
   
   runSubmit()
      Runs validation tests when the submit button is clicked
      
   validateCVC()
      Validates the credit card CVC number
      
   validateDate()
      Validates that the user has entered a valid expiration date for the credit card
      
   validateYear()
      Validates that the user has selected the expiration year of the credit card
      
   validateNumber()
      Validates that the user has entered a valid and legitimate card number
      
   validateCredit()
      Validates that the user has selected a credit card type
      
   validateName()
      Validates that the user has specified the name on the credit card
      
   sumDigits(numStr)
      Sums the digits characters in a text string
      
   luhn(idNum)
      Returns true of idNum satisfies the Luhn Algorithm

*/

const order = document.order;

window.addEventListener('load', () => {
    let orderData = location.search.slice(1);
    orderData = orderData.replace(/\+/g, " ");
    orderData = decodeURIComponent(orderData);
    const orderFields = orderData.split(/[&=]/g);

    order.modelName.value = orderFields[3];
    order.modelQty.value = orderFields[5]
    order.orderCost.value = orderFields[7];
    order.shippingType.value = orderFields[9];
    order.shippingCost.value = orderFields[13];
    order.subTotal.value = orderFields[15];
    order.salesTax.value = orderFields[17];
    order.cartTotal.value = orderFields[19];
});

window.addEventListener('load', () => {
    document.getElementById("subButton").onclick = runSubmit;
    document.getElementById("cardHolder").onchange = validateName;
    document.getElementById("cardNumber").onchange = validateNumber;
    document.getElementById("expDate").onchange = validateDate;
    document.getElementById("cvc").onchange = validateCVC;
});

function runSubmit() {
    validateName();
    validateCredit();
    validateNumber();
    validateDate();
    validateCVC();
}

function validateDate() {
    if (order.expDate.validity.valueMissing) {
        order.expDate.setCustomValidity("Enter the expiration date");
    } else if ((/^(0[1-9]|1[0-2])\/20[12]\d$/).test(order.expDate.value) === false) {
        order.expDate.setCustomValidity("Enter a valid expiration date");
    } else {
        order.expDate.setCustomValidity("");
    }
}

/* Functions already provided in the file */

function validateName() {
    const cardName = document.getElementById("cardHolder");
    if (cardName.validity.valueMissing) {
        cardName.setCustomValidity("Enter the card holder");
    } else {
        cardName.setCustomValidity("");
    }
}


function validateCredit() {
    const creditCard = document.forms.credit.elements.company[0];
    if (creditCard.validity.valueMissing) {
        creditCard.setCustomValidity("Select your credit card");
    } else {
        creditCard.setCustomValidity("");
    }
}

function validateNumber() {
    const cardNumber = document.getElementById("cardNumber");
    if (cardNumber.validity.valueMissing) {
        cardNumber.setCustomValidity("Enter your card number");
    } else if (cardNumber.validity.patternMismatch) {
        cardNumber.setCustomValidity("Enter a valid card number");
    } else if (luhn(cardNumber.value) === false) {
        cardNumber.setCustomValidity("Enter a legitimate card number");
    } else {
        cardNumber.setCustomValidity("");
    }
}

function validateCVC() {
    const cardCVC = document.getElementById("cvc");
    const creditCard = document.querySelector('input[name="company"]:checked').value;

    if (cardCVC.validity.valueMissing) {
        cardCVC.setCustomValidity("Enter your code CVC number");
    } else if ((creditCard === "amex") && (/^\d{4}$/.test(cardCVC.value) === false)) {
        cardCVC.setCustomValidity("Enter a 4-digit CVC number");
    } else if ((creditCard !== "amex") && (/^\d{3}$/.test(cardCVC.value) === false)) {
        cardCVC.setCustomValidity("Enter a 3-digit CVC number");
    } else {
        cardCVC.setCustomValidity("");
    }
}

function sumDigits(numStr) {
    let digitTotal = 0;
    for (let i = 0; i < numStr.length; i++) {
        digitTotal += parseInt(numStr.charAt(i));
    }
    return digitTotal;
}

function luhn(idNum) {
    let i;
    let string1 = "";
    let string2 = "";

    // Retrieve the odd-numbered digits
    for (i = idNum.length - 1; i >= 0; i -= 2) {
        string1 += idNum.charAt(i);
    }
    // Retrieve the even-numbered digits and double them
    for (i = idNum.length - 2; i >= 0; i -= 2) {
        string2 += 2 * idNum.charAt(i);
    }

    // Return whether the sum of the digits is divisible by 10
    return sumDigits(string1 + string2) % 10 === 0;
}
