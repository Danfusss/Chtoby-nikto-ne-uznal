import { encoded, translations } from "./data.js";
const decodeFields = (encoded, translations) => {
  const excludedFields = ["groupId", "service", "formatSize", "ca"];
  const decoded = encoded.map((item) => {
    const decodedItem = {};
    for (const key in item) {
      if (key.endsWith("Id") && !excludedFields.includes(key)) {
        const translationsKey = item[key];
        decodedItem[key] = translations[translationsKey] || "";
      } else {
        decodedItem[key] = item[key];
      }
    }
    return decodedItem;
  });
  const uniqueIds = [
    ...new Set(encoded.flatMap((item) => Object.values(item))),
  ];

  return { decoded, uniqueIds };
};

console.log(decodeFields(encoded, translations));

// console.log("Let's rock");
// console.log(encoded, translations);

// console.log(decoded)
