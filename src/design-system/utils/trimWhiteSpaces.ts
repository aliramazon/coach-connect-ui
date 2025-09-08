export const trimWhiteSpaces = (str: string) => {
    return str
        .split(" ")
        .filter((item) => item !== "")
        .join(" ");
};
