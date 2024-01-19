function collatzProc(strNum) {
    if (Number(strNum) <= 0) {
        let element = document.getElementById("extension");
        element.innerHTML = "Please enter positive integer here";
    } else {
        let num = Number(strNum);
        if (num == 1) {
            document.getElementById("extension").innerHTML = "This number is already 1"
            return;
        } else {
            let element = document.getElementById("extension");
            element.style.textAlign = "left";
            let emptyArr = [];
            let arr = collatz(num, emptyArr);
            outCollatz(num, arr);
            let emptyArr2 = [];
            let arr2 = fakeCollatz(num, emptyArr2);
            outCollatz2(num, arr2);
            return;
        }
    }
}

function collatz(num, arr) {
    if (num == 1) {
        return arr;
    } else if (num % 2 == 0) {
        arr.push("even", num / 2);
        return collatz(num / 2, arr);
    } else {
        arr.push("odd", num * 3 + 1);
        return collatz(num * 3 + 1, arr);
    }
}

function fakeCollatz(num, arr) {
    if (num == 1) {
        return arr;
    } else if (num % 2 == 0) {
        arr.push(num / 2);
        return fakeCollatz(num / 2, arr);
    } else {
        arr.push(3 * num + 1);
        return fakeCollatz(3 * num + 1, arr);
    }
}

function outCollatz(num, arr) {
    let paragraph = "We can get the target '1' by doing " + arr.length / 2 + " times operations as below" + "<br>" + String(num);
    for (i = 0; i < arr.length; i++) {
        if (arr[i] == "even") {
            paragraph = paragraph + " -- (n / 2) --> ";
        } else if (arr[i] == "odd") {
            paragraph  = paragraph + " -- (3 * n + 1) --> ";
        } else {
            paragraph = paragraph + arr[i] + " (" + (i + 1) /2 + ")" + "<br>";
        }
    }
    document.getElementById("extension").innerHTML = paragraph;
    let element = document.getElementById("lst");
    element.style.display = "inline-block";
}

function outCollatz2(num, arr) {
    let paragraph = String(num);
    for (i = 0; i < arr.length; i++) {
        paragraph = paragraph + ", " + arr[i]; 
    }
    let element = document.getElementById("extension2");
    element.innerHTML = paragraph;
    element.style.display = "none";
}