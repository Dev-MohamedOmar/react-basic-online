/**
 * 
 * @param {string} txt - The input text to be sliced.
 * @param {number} max - The Maximum length before truncation.
 * @returns The sliced text, with an ellipsis (...) appended if truncated.
 */

export function txtSlicer(txt: string, max: number = 50) {

    if (txt.length >= max) {
        return `${txt.slice(0, max)}...`;
    } else {
        return txt;
    }

}