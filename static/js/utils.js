export const capitalizeEachWord = (text) => {
    return text.replace(/\b\w/g, function(match) {
        return match.toUpperCase();
    })
}
