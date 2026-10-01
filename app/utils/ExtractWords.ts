export function extractText(text: string) {
  const nonWordCharRegex = /[^a-zA-Z\s]/g;

  const spacedText = text.replace(nonWordCharRegex, " ");
  const cleanedText = spacedText.replace(/\s+/g, " ").trim();

  return cleanedText;
}
