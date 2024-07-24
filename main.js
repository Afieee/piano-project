const whiteKeys = document.querySelectorAll(".white-key");
const blackKeys = document.querySelectorAll(".black-key");
  
const keySoundMap = {
"z": { key: "one", sound: new Audio("./sounds/white-keys/0.mp3") },
"x": { key: "two", sound: new Audio("./sounds/white-keys/1.mp3") },
"c": { key: "three", sound: new Audio("./sounds/white-keys/2.mp3") },
"v": { key: "four", sound: new Audio("./sounds/white-keys/3.mp3") },
"b": { key: "five", sound: new Audio("./sounds/white-keys/4.mp3") },
"n": { key: "six", sound: new Audio("./sounds/white-keys/5.mp3") },
"m": { key: "seven", sound: new Audio("./sounds/white-keys/6.mp3") },

"a": { key: "eight", sound: new Audio("./sounds/white-keys/7.mp3") },
"s": { key: "nine", sound: new Audio("./sounds/white-keys/8.mp3") },
"d": { key: "ten", sound: new Audio("./sounds/white-keys/9.mp3") },
"f": { key: "eleven", sound: new Audio("./sounds/white-keys/10.mp3") },
"g": { key: "twelve", sound: new Audio("./sounds/white-keys/11.mp3") },
"h": { key: "thirteen", sound: new Audio("./sounds/white-keys/12.mp3") },
"j": { key: "fourteen", sound: new Audio("./sounds/white-keys/13.mp3") },

"q": { key: "fifteen", sound: new Audio("./sounds/white-keys/14.mp3") },
"w": { key: "sixteen", sound: new Audio("./sounds/white-keys/15.mp3") },
"e": { key: "seventeen", sound: new Audio("./sounds/white-keys/16.mp3") },
"r": { key: "eighteen", sound: new Audio("./sounds/white-keys/17.mp3") },
"t": { key: "nineteen", sound: new Audio("./sounds/white-keys/18.mp3") },
"y": { key: "twenty", sound: new Audio("./sounds/white-keys/19.mp3") },
"u": { key: "twentyone", sound: new Audio("./sounds/white-keys/20.mp3") },

// mode rage
"Z": { key: "one", sound: new Audio("./sounds/white-keys/0.mp3") },
"X": { key: "two", sound: new Audio("./sounds/white-keys/1.mp3") },
"C": { key: "three", sound: new Audio("./sounds/white-keys/2.mp3") },
"V": { key: "four", sound: new Audio("./sounds/white-keys/3.mp3") },
"B": { key: "five", sound: new Audio("./sounds/white-keys/4.mp3") },
"N": { key: "six", sound: new Audio("./sounds/white-keys/5.mp3") },
"M": { key: "seven", sound: new Audio("./sounds/white-keys/6.mp3") },

"A": { key: "eight", sound: new Audio("./sounds/white-keys/7.mp3") },
"S": { key: "nine", sound: new Audio("./sounds/white-keys/8.mp3") },
"D": { key: "ten", sound: new Audio("./sounds/white-keys/9.mp3") },
"F": { key: "eleven", sound: new Audio("./sounds/white-keys/10.mp3") },
"G": { key: "twelve", sound: new Audio("./sounds/white-keys/11.mp3") },
"H": { key: "thirteen", sound: new Audio("./sounds/white-keys/12.mp3") },
"J": { key: "fourteen", sound: new Audio("./sounds/white-keys/13.mp3") },

"Q": { key: "fifteen", sound: new Audio("./sounds/white-keys/14.mp3") },
"W": { key: "sixteen", sound: new Audio("./sounds/white-keys/15.mp3") },
"E": { key: "seventeen", sound: new Audio("./sounds/white-keys/16.mp3") },
"R": { key: "eighteen", sound: new Audio("./sounds/white-keys/17.mp3") },
"T": { key: "nineteen", sound: new Audio("./sounds/white-keys/18.mp3") },
"Y": { key: "twenty", sound: new Audio("./sounds/white-keys/19.mp3") },
"U": { key: "twentyone", sound: new Audio("./sounds/white-keys/20.mp3") },

"`": { key: "black-one", sound: new Audio("./sounds/black-keys/0.mp3") },
"1": { key: "black-two", sound: new Audio("./sounds/black-keys/1.mp3") },
"2": { key: "black-four", sound: new Audio("./sounds/black-keys/2.mp3") },
"3": { key: "black-five", sound: new Audio("./sounds/black-keys/3.mp3") },
"4": { key: "black-six", sound: new Audio("./sounds/black-keys/4.mp3") },

"5": { key: "black-eight", sound: new Audio("./sounds/black-keys/5.mp3") },
"6": { key: "black-nine", sound: new Audio("./sounds/black-keys/6.mp3") },
"7": { key: "black-eleven", sound: new Audio("./sounds/black-keys/7.mp3") },
"8": { key: "black-twelve", sound: new Audio("./sounds/black-keys/8.mp3") },
"9": { key: "black-thirteen", sound: new Audio("./sounds/black-keys/9.mp3") },

"0": { key: "black-fifteen", sound: new Audio("./sounds/black-keys/10.mp3") },
"-": { key: "black-sixteen", sound: new Audio("./sounds/black-keys/11.mp3") },
"=": { key: "black-eighteen", sound: new Audio("./sounds/black-keys/12.mp3") },
"[": { key: "black-nineteen", sound: new Audio("./sounds/black-keys/13.mp3") },
"]": { key: "black-twenty", sound: new Audio("./sounds/black-keys/14.mp3") },
};
const activeKeys = new Set();

function createPopup(keyElement, dataName) {
  const popup = document.createElement('div');
  popup.classList.add('popup');
  popup.innerText = dataName;
  document.body.appendChild(popup);

  const rect = keyElement.getBoundingClientRect();
  popup.style.left = `${rect.left + window.scrollX + rect.width / 2}px`;
  popup.style.top = `${rect.top + window.scrollY - rect.height}px`;

  setTimeout(() => {
    popup.classList.add('fade-out');
    setTimeout(() => popup.remove(), 500); // Match this with the CSS animation duration
  }, 1000);
}

function playSound(key) {
  if (!activeKeys.has(key)) {
    const { key: keyId, sound } = keySoundMap[key];
    const keyElement = document.getElementById(keyId) || document.querySelector(`.${keyId}`);
    if (keyElement) {
      keyElement.classList.add(keyElement.classList.contains("white-key") ? "white-active" : "black-active");
      keyElement.classList.add("pressed"); // Add animation class
      sound.pause();
      sound.currentTime = 0;
      sound.play();
      activeKeys.add(key);

      // Show popup
      createPopup(keyElement, keyElement.getAttribute('data-name'));
    }
  }
}

function stopSound(key) {
  if (activeKeys.has(key)) {
    const { key: keyId, sound } = keySoundMap[key];
    const keyElement = document.getElementById(keyId) || document.querySelector(`.${keyId}`);
    if (keyElement) {
      keyElement.classList.remove(keyElement.classList.contains("white-key") ? "white-active" : "black-active");
      keyElement.classList.remove("pressed"); // Remove animation class
      activeKeys.delete(key);
    }
  }
}

document.addEventListener("keydown", (e) => {
  if (keySoundMap[e.key]) {
    playSound(e.key);
  }
});

document.addEventListener("keyup", (e) => {
  if (keySoundMap[e.key]) {
    stopSound(e.key);
  }
});

blackKeys.forEach((black) => {
  black.addEventListener("mousedown", () => playSound(black.innerText.toLowerCase()));
  black.addEventListener("mouseup", () => stopSound(black.innerText.toLowerCase()));
});

whiteKeys.forEach((white) => {
  white.addEventListener("mousedown", () => playSound(white.innerText.toLowerCase()));
  white.addEventListener("mouseup", () => stopSound(white.innerText.toLowerCase()));
});


