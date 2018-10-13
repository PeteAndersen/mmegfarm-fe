export const titleCase = str =>
  str
    .toLowerCase()
    .split(" ")
    .map(capFirst)
    .join(" ");

export const capFirst = str => str.charAt(0).toUpperCase() + str.slice(1);
