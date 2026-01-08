function GenerateUniqueSlug(title: string) {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

  const uniquePart = Math.random().toString(36).substring(2, 7);
  return `${base}-${uniquePart}`;
}
export default GenerateUniqueSlug;
