import jsTokens from 'js-tokens';

export function transform(text) {
  for (const token of jsTokens(text)) {
    if (token.type !== "StringLiteral" && token.type !== "IdentifierName") {
      process.stdout.write(token.value);
      continue;
    }

    process.stdout.write(token.value
      .split("")
      .map(char => {
        const codePoint = char.codePointAt(0);
        if (codePoint < 128)
          return char;
        const codePointHex = codePoint.toString(16);
        return '\\u' + '0'.repeat(4 - codePointHex.length) + codePointHex;
      })
      .join(""));
  }
}

const exampleCode = `
  const someText = 'Yeah, it\\'s an example.';
  const someFunction = () => "Reallī awesome!"; // Some comment.
  let π = 3.14;
  console.log('Done.'); 
`;

transform(exampleCode);
