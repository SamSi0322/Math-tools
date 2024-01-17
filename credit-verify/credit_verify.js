function verifyProc(cardNum) {
    if (cardNum.length == 16) {
        let result = verify_card(cardNum);
        document.getElementById("output").innerHTML = result;
        return;
    } else {
        document.getElementById("output").innerHTML = "Input card number should be 16 digits";
        return;
    }
}

function sum_digits(n) {
    if (n < 10) {
        return n;
    } else {
        return n%10 + sum_digits(Math.floor(n/10));
    }
}

function sum_digits_to_one_digits(n) {
    if (n < 10) {
        return n;
    } else {
        return sum_digits_to_one_digits(sum_digits(n));
    }
}

function sum_luhn_helper(strNum, i) {
    if (strNum.length == 1) {
        return sum_digits((i%2 + 1) * Number(strNum));
    } else {
        return sum_digits((i%2 + 1) * Number(strNum.slice(-1))) + sum_luhn_helper(strNum.substring(0, strNum.length - 1), i + 1);
    }
}

function sum_luhn(strNum) {
    return sum_luhn_helper(strNum, 1);
}

function verify_card(strNum) {
    generateTable(strNum.substring(0, 15), strNum.slice(-1));
    extendWord(strNum.substring(0, 15), strNum.slice(-1));
    if (Number(strNum.slice(-1)) == sum_digits_to_one_digits(sum_luhn(strNum.substring(0, strNum.length - 1)))) {
        return "This is a valid credit card number";
    } else {
        return "This is an invalid credit card number";
    }
}

function explain(n) {
    if (n < 10) {
        return n;
    } else {
        return (n - n%10) / 10 + " + " + n%10;
    }
}

function preCalc(strNum) {
    return sum_luhn(strNum);
}

function generateTable(strNum){
    let table = document.getElementById("verifyTable");

    while (table.rows.length > 0) {
        table.deleteRow(-1);
    }

    let row = table.insertRow(0);
    let cell_1 = row.insertCell(0);
    cell_1.innerHTML = "";
    let cell_2 = row.insertCell(1);
    cell_2.innerHTML = "Payload (exclude the last digit of the card number)";
    cell_2.colSpan = 15;

    let firstRow = table.insertRow(-1);
    let firstCell_0 = firstRow.insertCell(0);
    firstCell_0.innerHTML = "card number";

    let secondRow = table.insertRow(-1);
    let secondCell_0 = secondRow.insertCell(0);
    secondCell_0.innerHTML = "operations";

    let thirdRow = table.insertRow(-1);
    let thirdCell_0 = thirdRow.insertCell(0);
    thirdCell_0.innerHTML = "result";

    let fourthRow = table.insertRow(-1);
    let fourthCell_0 = fourthRow.insertCell(0);
    fourthCell_0.innerHTML = "add all digits up";

    let fifthRow = table.insertRow(-1);
    let fifthCell_0 = fifthRow.insertCell(0);
    fifthCell_0.innerHTML = "result";

    let sixthRow = table.insertRow(-1);
    let sixthCell_0 = sixthRow.insertCell(0);
    sixthCell_0.innerHTML = "add all digits up";
    let sixthCell_1 = sixthRow.insertCell(1);
    sixthCell_1.innerHTML = preCalc(strNum);
    sixthCell_1.colSpan = 15;

    for (i = 1; i < 16; i++) {
        let cell = firstRow.insertCell(i);
        cell.innerHTML = strNum.charAt(i - 1);

        if (i%2 == 1) {
            let newCell_2 = secondRow.insertCell(i);
            newCell_2.innerHTML = "* 2";
            newCell_2.style.width = "5%";

            let newCell_3 = thirdRow.insertCell(i);
            newCell_3.innerHTML = 2 * Number(strNum.charAt(i-1));

            let newCell_4 = fourthRow.insertCell(i);
            newCell_4.innerHTML = explain(2 * Number(strNum.charAt(i-1)));

            let newCell_5 = fifthRow.insertCell(i);
            newCell_5.innerHTML = sum_digits(2 * Number(strNum.charAt(i-1)));
        } else {
            let newCell_2 = secondRow.insertCell(i);
            newCell_2.innerHTML = "* 1";
            newCell_2.style.width = "5%";

            let newCell_3 = thirdRow.insertCell(i);
            newCell_3.innerHTML = Number(strNum.charAt(i-1));

            let newCell_4 = fourthRow.insertCell(i);
            newCell_4.innerHTML = explain(Number(strNum.charAt(i-1)));

            let newCell_5 = fifthRow.insertCell(i);
            newCell_5.innerHTML = sum_digits(Number(strNum.charAt(i-1)));
        }
    }
}

function nxtCalc(n) {
    return (10 - n%10) % 10;
}

function extendWord(strNum, lstDig) {
    let var1 =  preCalc(strNum);
    let var2 = nxtCalc(var1);
    if (var2 == lstDig) {
        paragraph_1 = "As shown in the table above, " + var1 + " => (10 - " + var1 + "%10) % 10 = " + var2 + " = " + lstDig + ", so we can deduce that this credit card number is valid. (If this card number supports Luhn algorithm)"
        document.getElementById("extension").innerHTML = paragraph_1;
    } else {
        paragraph_2 = "As shown in the table above, " + var1 + " => (10 - " + var1 + "%10) % 10 = " + var2 + " = " + lstDig + ", so we can deduce that this credit card number is invalid. (If this card number supports Luhn algorithm)"
        document.getElementById("extension").innerHTML = paragraph_2;
    }
}