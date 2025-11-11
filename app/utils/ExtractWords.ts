export function extractText(text: string) {
  const nonWordCharRegex = /[^a-zA-Z\s]/g;

  let spacedText = text.replace(nonWordCharRegex, " ");
  let cleanedText = spacedText.replace(/\s+/g, " ").trim();

  return cleanedText;
}
