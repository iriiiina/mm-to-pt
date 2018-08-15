var mm, pt, convertionType = "mm";

function convert() {
    var mmInput = document.getElementById("mm-value").value;
    var ptInput = document.getElementById("pt-value").value;

    validateInput(mmInput, ptInput, convertionType);

    setPtAndMm(mmInput, ptInput);

    printResults();
}

function setPtAndMm(mmInput, ptInput) {
    switch (convertionType) {
        case "mm":
            pt = convertMmToPoint(mmInput, type);
            mm = mmInput;
            break;
        case "pt":
            mm = convertPointToMm(ptInput, type);
            pt = ptInput;
            break;
        default:
            setError("Something went wrong, please refresh the page");
    }

    return;
}

function highlightConvertionType(elementId) {
    switch (elementId) {
        case "mm-value":
            document.getElementById("mm-value").style.borderColor = "#f39c12";
            document.getElementById("pt-value").style.borderColor = "#3498db";
            convertionType = "mm";
            break;
        case "pt-value":
            document.getElementById("pt-value").style.borderColor = "#f39c12";
            document.getElementById("mm-value").style.borderColor = "#3498db";
            convertionType = "pt";
            break;
    }
}

function getPointValue(pointType) {
    switch (pointType) {
        case "didot":
            return 0.3759;
            break;
        case "hawks":
            return 0.3514;
            break;
        case "fournier":
            return 0.364;
            break;
        default:
            return 0;
            break;
    }
}

function convertMmToPoint(mmValue, pointType) {
    return mmValue / getPointValue(pointType);
}

function convertPointToMm(pointValue, pointType) {
    return getPointValue(pointType) > 0 ? pointValue * getPointValue(pointType) : 0;
}

function convertPointToCicero(value) {
    return value / 12;
}

function convertPointToQuad(value) {
    return value / 48;
}

function round(value, precision) {
    return Number(value).toFixed(precision);
}

function validateInput(mmInput, ptInput, convertionType) {
    if (convertionType === "mm") {
        if (mmInput === "" || mmInput === null) {
            setError("Please fill millimeters value or move focus to points field");
        } else if (isPositive(mmInput) && isNumber(mmInput)) {
            clearError();
        } else {
            setError("Millimeters can be only positive integer or float number");
        }
    } else if (convertionType === "pt") {
        if (ptInput === "" || ptInput === null) {
            setError("Please fill points value or move focus to millimeters field");
        } else if (isPositive(ptInput) && isNumber(ptInput)) {
            clearError();
        } else {
            setError("Points can be only positive integer or float number");
        }
    } else {
        setError("Something went wrong, please refresh the page");
    }

    return;
}

function isPositive(value) {
    return value > 0;
}

function isNumber(value) {
    return typeof Number(value) === "number";
}

function clearAllFields() {
    document.getElementById("mm-value").value = "";
    document.getElementById("pt-value").value = "";
    document.getElementById("cicero-value").value = "";
    document.getElementById("quad-value").value = "";
    clearError();
}

function setError(error) {
    document.getElementById("error").innerText = error;
    document.getElementById("error").style.display = "block";
}

function clearError() {
    document.getElementById("error").innerText = "";
    document.getElementById("error").style.display = "none";
}

function selectOnMm() {
    document.getElementById("mm-value").select();
}

function selectOnPt() {
    document.getElementById("pt-value").select();
}

function focusOnMm() {
    document.getElementById("mm-value").focus();
}

function focusOnPt() {
    document.getElementById("pt-value").focus();
}

function focusAfterTypeSwitch() {
    if (convertionType === "mm") {
        focusOnMm();
        selectOnMm();
    } else if (convertionType === "pt") {
        focusOnPt();
        selectOnPt();
    }
}

function printResults() {
    document.getElementById("mm-value").value = round(mm, 2);
    document.getElementById("pt-value").value = round(pt, 2);
    document.getElementById("cicero-value").value = round(convertPointToCicero(pt), 2);
    document.getElementById("quad-value").value = round(convertPointToQuad(pt), 2);
}