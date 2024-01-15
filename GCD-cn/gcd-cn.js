function gcdHelper(x1, y1, r1, q1, x2, y2, r2, q2){
    if (r2 != 0){
        let r3 = r1 % r2;
        let q3 = r1 / r2;
        let x3 = x1 - x2 * q3;
        let y3 = y1 - y2 * q3;
        return gcdHelper(x2, y2, r2, q2, x3, y3, r3, q3);
    } else {
        return r1;
    }
}

function gcd(m, n){
    if ((m == 0) && (n == 0)){
        return 1;
    } else if (m == 0){
        return Math.abs(n);
    } else if (n == 0){
        return (Math.abs(m));
    } else if (Math.abs(m) >= Math.abs(n)){
        return gcdHelper(1, 0, Math.abs(m), 0, 0, 1, Math.abs(n), 0);
    } else {
        return gcdHelper(1, 0, Math.abs(n), 0, 0, 1, Math.abs(m), 0);
    } 
}

function gcdMult(arr){
    if (arr.length == 1) {
        return Number(arr[0]);
    } else {
        let m = Number(arr[0]);
        let n = Number(arr[1]);
        let m_new = gcd(m, n);
        arr.shift();
        arr.shift();
        arr.push(m_new);
        return gcdMult(arr);
    }
}

function checkInputValid(arr){
    for (let i = 0; i < arr.length; i++){
        const onlyContainsNumbers = (str) => /^\d+$/.test(str);
        if (! onlyContainsNumbers(arr[i])) {
            return false;
        }
    }
    return true;
}

function gcdProc(arr){
    if (checkInputValid(arr)) {
        return "最大公因数是" + gcdMult(arr);
    } else {
        return "不合法输入,可能包含了其他字符";
    }
}