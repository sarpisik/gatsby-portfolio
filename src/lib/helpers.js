export function capitalizeLetter(text, locale = "tr-TR") {
  if (typeof text === "string")
    return text
      .split(" ")
      .map(word => word.charAt(0).toLocaleUpperCase(locale) + word.slice(1))
      .join(" ")

  return text
}
