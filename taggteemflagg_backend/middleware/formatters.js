import pkg from 'google-libphonenumber';
const { PhoneNumberFormat, PhoneNumberUtil } = pkg;
import logger from "../middleware/logger.js";
export const formatPhoneNumber = (number) => {
    const phoneUtil = PhoneNumberUtil.getInstance();
    try {
        const parsedNumber = phoneUtil.parseAndKeepRawInput(number);
        if (parsedNumber == null)
            return [null, null];
        // first try formatting in national format, then international
        //if (parsedNumber.getCountryCode() == 1)
        //return phoneUtil.format(parsedNumber, PhoneNumberFormat.NATIONAL);
        //else
        return [`+${parsedNumber.getCountryCode()}`, phoneUtil.format(parsedNumber, PhoneNumberFormat.INTERNATIONAL)];
    }
    catch (error) {
        console.error('Invalid number:', error);
        return [null, null]; // or handle the error in some other way
    }
};
export const formatPhoneNumberOLD = (input) => {
    logger.info("Formatting phone number");
    //logger.info("Input:" + input);
    if (input == null)
        return null;
    // Remove all non-numeric characters from the input
    const cleaned = input.replace(/\D/g, '');
    /*
    // Match and format the number based on its length
    if (cleaned.length === 10) {
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            //return `( ${match[1]} )${match[2]}-${match[3]}`;
            return `1${cleaned}`;
        }
    } else if (cleaned.length === 11) {
        const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            //return `${match[1]} ( ${match[2]} )${match[3]}-${match[4]}`;
            return cleaned;
        }
    } else if (cleaned.length === 12) {
        const match = cleaned.match(/^(\d{2})(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            //return `${match[1]} ( ${match[2]} )${match[3]}-${match[4]}`;
            return cleaned;
        }
    }
    */
    // For numbers that are 10 digits long (e.g., 1234567890), we assume it's a US number
    if (cleaned.length === 10) {
        return `+1${cleaned}`;
    }
    if (input[0] == '+')
        return `+${cleaned}`;
    return cleaned; // return null or a custom message for invalid numbers
};
//# sourceMappingURL=formatters.js.map