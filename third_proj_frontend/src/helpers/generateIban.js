const generateIBAN = (bankNumber) => {
    
    const prefix = "CRGIB";
    const paddedNumber = bankNumber.toString().padStart(10, '0');
    return prefix + paddedNumber; 
}

export default generateIBAN;