import logger from "../middleware/logger.ts"

export const formatPhoneNumber = (input: string): string | null => {
    logger.info("Formatting phone number");
    //logger.info("Input:" + input);

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
    
    return cleaned;  // return null or a custom message for invalid numbers
}
