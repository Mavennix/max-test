const MORSE_CODE = {
  '-.-.--': '!',
  '.-..-.': '"',
  '...-..-': '$',
  '.-...': '&',
  '.----.': "'",
  '-.--.': '(',
  '-.--.-': ')',
  '.-.-.': '+',
  '--..--': ',',
  '-....-': '-',
  '.-.-.-': '.',
  '-..-.': '/',
  '-----': '0',
  '.----': '1',
  '..---': '2',
  '...--': '3',
  '....-': '4',
  '.....': '5',
  '-....': '6',
  '--...': '7',
  '---..': '8',
  '----.': '9',
  '---...': ':',
  '-.-.-.': ';',
  '-...-': '=',
  '..--..': '?',
  '.--.-.': '@',
  '.-': 'A',
  '-...': 'B',
  '-.-.': 'C',
  '-..': 'D',
  '.': 'E',
  '..-.': 'F',
  '--.': 'G',
  '....': 'H',
  '..': 'I',
  '.---': 'J',
  '-.-': 'K',
  '.-..': 'L',
  '--': 'M',
  '-.': 'N',
  '---': 'O',
  '.--.': 'P',
  '--.-': 'Q',
  '.-.': 'R',
  '...': 'S',
  '-': 'T',
  '..-': 'U',
  '...-': 'V',
  '.--': 'W',
  '-..-': 'X',
  '-.--': 'Y',
  '--..': 'Z',
  '..--.-': '_',
  '...---...': 'SOS',
};

Object.freeze(MORSE_CODE);

/**
 * This is the entry point to the program.
 *
 * @param {string} morseCode The string to decode.
 */
function decodeMorse(morseCode) {
  // Your code should go here.
  decodeWord = function(morseWord) {
    let morseSegments = morseWord.split(" ");
    let decodedSegments = [];
    let sLength = morseSegments.length;

    for (let i = 0; i < sLength; i++) {
        if (morseSegments[i] in MORSE_CODE) {
            decodedSegments += MORSE_CODE[morseSegments[i]];
        } else if (morseSegments[i] === "...---...") {
            decodedSegments += " SOS ";
        }
    }
    return decodedSegments;
};

let morseWords = morseCode.split("   ");
let mLength = morseWords.length;
let decodedMessage = "";
for (let i = 0; i < mLength; i++) {
    let decodedWord = decodeWord(morseWords[i]);
    decodedMessage += decodedWord + " ";
}
return decodedMessage.trim();
}

module.exports = decodeMorse;
