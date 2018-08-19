var mm, pt, convertionType = "mm", isExpanded = true;

function convert() {
    var mmInput = document.getElementById("mm-value").value;
    var ptInput = document.getElementById("pt-value").value;

    if (validateInput(mmInput, ptInput, convertionType)) {
        setPtAndMm(mmInput, ptInput);
        printResults();
    }
}

function setPtAndMm(mmInput, ptInput) {
    switch (convertionType) {
        case "mm":
            pt = convertMmToPoint(mmInput, standard);
            mm = mmInput;
            break;
        case "pt":
            mm = convertPointToMm(ptInput, standard);
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

function getPointValue(standard) {
    switch (standard) {
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

function convertMmToPoint(mmValue, standard) {
    return mmValue / getPointValue(standard);
}

function convertPointToMm(pointValue, standard) {
    return getPointValue(standard) > 0 ? pointValue * getPointValue(standard) : 0;
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
        if (isPositive(mmInput) && isNumber(mmInput)) {
            clearError();
            return true;
        } else {
            setError("Millimeters can be only positive integer or float number");
            return false;
        }
    } else if (convertionType === "pt") {
        if (isPositive(ptInput) && isNumber(ptInput)) {
            clearError();
            return true;
        } else {
            setError("Points can be only positive integer or float number");
            return false;
        }
    } else {
        setError("Something went wrong, please refresh the page");
        return false;
    }
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
}

function resetFields() {
    clearAllFields();
    clearError();
    checkDidot();
}

function clearFieldOnError() {
    document.getElementById("cicero-value").value = "";
    document.getElementById("quad-value").value = "";

    if (convertionType === "mm") {
        document.getElementById("pt-value").value = "";
    } else if (convertionType === "pt") {
        document.getElementById("mm-value").value = "";
    } else {
        setError("Something went wrong, please refresh the page");
    }
}

function setError(error) {
    clearFieldOnError();
    document.getElementById("error").innerText = error;
    document.getElementById("error").style.display = "block";
    setRedTitle();
}

function setRedTitle() {
    if (convertionType === "mm") {
        document.getElementById("mm-title").style.color = "#ff7675";
        document.getElementById("pt-title").style.color = "#3498db";
    } else if (convertionType === "pt") {
        document.getElementById("pt-title").style.color = "#ff7675";
        document.getElementById("mm-title").style.color = "#3498db";
    } else {
        document.getElementById("pt-title").style.color = "#3498db";
        document.getElementById("mm-title").style.color = "#3498db";
    }
}

function clearError() {
    document.getElementById("error").innerText = "";
    document.getElementById("error").style.display = "none";
    document. getElementById("mm-title").style.color = "#3498db";
    document. getElementById("pt-title").style.color = "#3498db";
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
    } else if (convertionType === "pt") {
        focusOnPt();
    }
}

function printResults() {
    if (mm != "" && mm != null && mm != "0" && pt != "" && pt != null && pt != "0") {
        document.getElementById("mm-value").value = round(mm, 2);
        document.getElementById("pt-value").value = round(pt, 2);
        document.getElementById("cicero-value").value = round(convertPointToCicero(pt), 2);
        document.getElementById("quad-value").value = round(convertPointToQuad(pt), 2);
    }
}

function expandTips() {
    if (isExpanded === true) {
        isExpanded = false;
        document.getElementById("tips-hidden").style.display = "none";
        document.getElementById("tips-close").style.display = "inline";
        document.getElementById("tips-open").style.display = "none";
    } else {
        isExpanded = true;
        document.getElementById("tips-hidden").style.display = "block";
        document.getElementById("tips-close").style.display = "none";
        document.getElementById("tips-open").style.display = "inline";
    }
}

var standard;

function checkDidot() {
    uncheckHawks();
    uncheckFournier();
    document.getElementById("standard-didot").style.borderColor = "#f39c12";
    document.getElementById("standard-value-didot").style.color = "#f39c12";
    document.getElementById("standard-name-didot").style.color = "#f39c12";
    standard="didot";
    emptyFieldsOnSwitch();
    focusAfterTypeSwitch();
}

function checkHawks() {
    uncheckDidot();
    uncheckFournier();
    document.getElementById("standard-hawks").style.borderColor = "#f39c12";
    document.getElementById("standard-value-hawks").style.color = "#f39c12";
    document.getElementById("standard-name-hawks").style.color = "#f39c12";
    standard="hawks";
    emptyFieldsOnSwitch();
    focusAfterTypeSwitch();
}

function checkFournier() {
    uncheckDidot();
    uncheckHawks();
    document.getElementById("standard-fournier").style.borderColor = "#f39c12";
    document.getElementById("standard-value-fournier").style.color = "#f39c12";
    document.getElementById("standard-name-fournier").style.color = "#f39c12";
    standard="fournier";
    emptyFieldsOnSwitch();
    focusAfterTypeSwitch();
}

function uncheckDidot() {
    document.getElementById("standard-didot").style.borderColor = "#bdc3c7";
    document.getElementById("standard-value-didot").style.color = "#bdc3c7";
    document.getElementById("standard-name-didot").style.color = "#95a5a6";
}

function uncheckHawks() {
    document.getElementById("standard-hawks").style.borderColor = "#bdc3c7";
    document.getElementById("standard-value-hawks").style.color = "#bdc3c7";
    document.getElementById("standard-name-hawks").style.color = "#95a5a6";
}

function uncheckFournier() {
    document.getElementById("standard-fournier").style.borderColor = "#bdc3c7";
    document.getElementById("standard-value-fournier").style.color = "#bdc3c7";
    document.getElementById("standard-name-fournier").style.color = "#95a5a6";
}

function emptyFieldsOnSwitch() {
    document.getElementById("cicero-value").value = "";
    document.getElementById("quad-value").value = "";

    if (convertionType === "mm") {
        document.getElementById("pt-value").value = "";
    }

    if (convertionType === "pt") {
        document.getElementById("mm-value").value = "";
    }

}