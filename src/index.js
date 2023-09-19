const stringLiterals = {
  "\"": function (text, start) {
    let i = start + 1;
    while (i < text.length) {
      if (text[Math.max(i - 1, 0)] === "\\") {
        i += 2;
        continue;
      }
      if (text[i] === "\"") {
        return [ start, i ];
      }
      i++;
    }
  },
  "'": function (text, start) {
    let i = start + 1;
    while (i < text.length) {
      if (text[Math.max(i - 1, 0)] === "\\") {
        i += 2;
        continue;
      }
      if (text[i] === "'") {
        return [ start, i ];
      }
      i++;
    }
  },
  "`": function (text, start) {

  }
};

export function transform(text) {
  const stringLiteralChars = Object.keys(stringLiterals);

  let i = 0;
  while (i < text.length) {
    if (text[Math.max(i - 1, 0)] === "\\") {
      i += 2;
      continue;
    }
    for (const stringLiteralChar of stringLiteralChars) {
      if (text[i] === stringLiteralChar) {
        console.log(stringLiterals[stringLiteralChar]);
        const [ start, end ] = stringLiterals[stringLiteralChar](text, i);
        console.log(stringLiteralChar, start, end, text.slice(start, end + 1));
        i = end;
        break;
      }
    }
    i++;
  }
}
