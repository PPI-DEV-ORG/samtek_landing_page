export function logFragment(text: string, max = 80) {
  const sentence = text.split(". ")[0].replace(/\.$/, "");
  const short =
    sentence.length > max ? `${sentence.slice(0, max - 3)}…` : sentence;
  const second = short.charAt(1);
  const acronym =
    second !== "" &&
    second === second.toUpperCase() &&
    second !== second.toLowerCase();
  return acronym ? short : short.charAt(0).toLowerCase() + short.slice(1);
}
