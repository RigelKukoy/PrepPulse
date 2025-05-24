function sanitizeUrl(input) {
  if (typeof input !== "string") return input;

  let trimmed = input.trim();

  if (!/^https?:\/\//i.test(trimmed)) {
    trimmed = `https://${trimmed}`;
  }

  try {
    const url = new URL(trimmed);
    if (url.protocol === "http:" || url.protocol === "https:") {
      return url.href;
    } else {
      return input;
    }
  } catch {
    return input;
  }
}

export default sanitizeUrl;
