function reverseStr(str) {
    var listOfChars = str.split("");
    var reversedListOfChars = listOfChars.reverse();
    var reversedStr = reversedListOfChars.join("");
    return reversedStr;
}

function isPalindrome(str) {
    var reverse = reverseStr(str);
    if (str == reverse) {
        return true;
    }
    return false;
}

function checkPalindromeForAllFormats(date) {
    var listOfpalindromes = getAllDateFormats(date);
    var isPalindromes = false;
    for (var i = 0; i < listOfpalindromes.length; i++) {
        if (isPalindrome(listOfpalindromes[i])) {
            isPalindromes = true;
            break;
        }
    }
    return isPalindromes;
}

function convertDateToStr(date) {
    var dateStr = {
        day: "",
        month: "",
        year: "",
    };
    if (date.day < 10) {
        dateStr.day = "0" + date.day;
    } else {
        dateStr.day = date.day.toString();
    }
    if (date.month < 10) {
        dateStr.month = "0" + date.month;
    } else {
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();
    console.log(dateStr);
    return dateStr;
}

function getAllDateFormats(date) {
    var dateStr = convertDateToStr(date);
    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmmdd];
}

function isLeapYear(year) {
    if (year % 400 === 0) {
        return true;
    }
    if (year % 100 === 0) {
        return false;
    }
    if (year % 4 === 0) {
        return true;
    }
    return false;
}

function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month == 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month = month + 1;
            }
        } else {
            if (day > 28) {
                day = 1;
                month = month + 1;
            }
        }
    } else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }

    if (month > 12) {
        month = 1;
        year = year + 1;
    }
    return {
        day: day,
        month: month,
        year: year,
    };
}

function getNextPalindromeDate(date) {
    var ctr = 0;
    var nextDate = getNextDate(date);
    while (1) {
        ctr++;
        var isPalindrome = checkPalindromeForAllFormats(nextDate);
        if (isPalindrome) {
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [ctr, nextDate];
}

var date = {
    day: 31,
    month: 01,
    year: 2020,
};
var dateInputRef = document.querySelector("#bday-input");
var showBtnRef = document.querySelector("#showBtnRef");
var resultRef = document.querySelector("#result");

function clickHandler() {
    var bdayStr = dateInputRef.value;
    if (bdayStr !== "") {
        var listOfChars = bdayStr.split("-");
        var date = {
            day: Number(listOfChars[2]),
            month: Number(listOfChars[1]),
            year: Number(listOfChars[0]),
        };
        var isPalindrome = checkPalindromeForAllFormats(date);
        if (isPalindrome) {
            resultRef.innerHTML = "Yeah , your Birthday is a palindrome";
        } else {
            var [ctr, nextDate] = getNextPalindromeDate(date);
            resultRef.innerHTML = `Your Birthday is not a palindrome ! Next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}`;
        }
    }
}

showBtnRef.addEventListener("click", clickHandler);