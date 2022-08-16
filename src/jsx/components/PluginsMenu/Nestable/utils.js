const sortObjectKeys = (obj) =>
   Object.entries(obj)
      .sort()
      .reduce((o, [k, v]) => ((o[k] = v), o), {});

export const isEqual = (val1, val2) => {
   if (typeof val1 === "number" && typeof val2 === "number")
      return val1 === val2;
   if (typeof val1 === "string" && typeof val2 === "string")
      return val1 === val2;
   if (Array.isArray(val1) && Array.isArray(val2)) {
      return JSON.stringify(val1) === JSON.stringify(val2);
   }
   if (typeof val1 === "object" && typeof val2 === "object") {
      return (
         JSON.stringify(sortObjectKeys(val1)) ===
         JSON.stringify(sortObjectKeys(val2))
      );
   }
   return false;
};

export const camelize = (str) => {
   return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
   }).replace(/\s+/g, '');
}