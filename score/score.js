function scoreReallProc(arrNum, arrScores, arrProportions, desiredScore) {
    let proportion_sum = 0;
    let a = 0;
    let b = 0;
    let x;

    for (let i = 0; i < arrNum.length; i++) {
        let num = Number(arrNum[i]);
        let proportion = Number(arrProportions[i]) / 100;
        proportion_sum = proportion_sum + proportion;

        let strScores = arrScores[i].replaceAll(' ', '');
        let arr_scores = strScores.split(",");
        let scores_sum = 0;
        
        if (arr_scores[0] == "none") {
            b = b + proportion;
        } else {
            for (let j = 0; j < arr_scores.length; j++) {
                scores_sum = scores_sum + Number(arr_scores[j]);
            }
            a = a + scores_sum * proportion / num;
            b = b + (1 - arr_scores.length / num) * proportion;
        }
    }
    x = (desiredScore - a) / b;
    if (proportion_sum == 1) {
        if (x > 100) {
            document.getElementById("result").innerHTML = "Unfortunately, you can not achieve this score, unless you can earn " + x + " later";
        } else if (x < 0) {
            document.getElementById("result").innerHTML = "The score you need to achieve later is 0!";
        } else {
            document.getElementById("result").innerHTML = "The score you need to achieve later is " + x;
        }
    } else {
        document.getElementById("result").innerHTML = "The sum of the proportions is not equal to 100";
    }
} 