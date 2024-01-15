function eeaHelper(x1, y1, r1, q1, x2, y2, r2, q2, arr){
    if (r2 != 0){
        let r3 = r1 % r2;
        let q3 = Math.floor(r1 / r2);
        let x3 = x1 - x2 * q3;
        let y3 = y1 - y2 * q3;
        arr.push(x3, y3, r3, q3);
        return eeaHelper(x2, y2, r2, q2, x3, y3, r3, q3, arr);
    } else {
        return arr;
    }
}

function eea(m, n){
    if (m >= n){
        const arr_temp = [1, 0, m, 0, 0, 1, n, 0];
        return eeaHelper(1, 0, m, 0, 0, 1, n, 0, arr_temp);
    } else {
        const arr_temp = [1, 0, n, 0, 0, 1, m, 0];
        return eeaHelper(1, 0, n, 0, 0, 1, m, 0, arr_temp);
    }
}

function checkInputValid(m, n){
    const onlyContainsNumbers = (str) => /^\d+$/.test(str);
    if (onlyContainsNumbers(m) && onlyContainsNumbers(n)){
        return true;
    } else {
        return false;
    }
}

function eeaProc(m, n){
    if (checkInputValid(m, n)) {
        m = Number(m);
        n = Number(n);
        if (m * n != 0){
            let result = eea(m, n);
            console.log(result)
            putIntoTable(result);
            if (m >= n) {
                extendWord(m, n);
            } else {
                extendWord(n, m);
            }
        } else {
            var table = document.getElementById("eeaTable");
            var message = document.createTextNode("Please input non zero integers");
            table.parentNode.replaceChild(message, table);
            return;
        }
    } else {
        var table = document.getElementById("eeaTable");
        var message = document.createTextNode("Please input integers");
        table.parentNode.replaceChild(message, table);
        return;
    }
}

function putIntoTable(arr){
    let table = document.getElementById("eeaTable");
    while (table.rows.length > 1) {
        table.deleteRow(-1);
    }
    for (var i = 0; i + 4 <= arr.length; i = i + 4){
        var newRow = table.insertRow(-1);
        var newCell_1 = newRow.insertCell(0);
        let row_num = i / 4 + 1;
        newCell_1.innerHTML = "row" + row_num;
        for (var t = 1; t < 5; t++){
            var newCell = newRow.insertCell(t);
            newCell.innerHTML = arr[t + i - 1];
        }
    }
    highlightSecondLastRow();
}

function highlightSecondLastRow() {
    table = document.getElementById("eeaTable");
    let secondLastRow = table.rows[table.rows.length - 2];
    secondLastRow.className = 'highlight';
}

function extendWord(m, n){
    table = document.getElementById("eeaTable");
    let secondLastRow = table.rows[table.rows.length - 2];
    let x = Number(secondLastRow.cells[1].innerHTML);
    let y = Number(secondLastRow.cells[2].innerHTML);
    let theGcd = Number(secondLastRow.cells[3].innerHTML);
    let lhs = m * x;
    let rhs = n * y;
    let paragraph_1 = "我们还可以从表格中发现" + m + " 和 " + n + " 的最大公因数等于 " + theGcd + ", 对此的验证是倒数第二行(高亮行), 以下是算式";
    let paragraph_2 = "" + m + " * (" + x + ") + " + n + " * (" + y + ") = (" + lhs + ") + (" + rhs + ") = " + theGcd;
    document.getElementById("extension_1").innerHTML = paragraph_1;
    document.getElementById("extension_2").innerHTML = paragraph_2;
}
