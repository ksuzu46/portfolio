/**
 * lib.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */

export const capitalize = (s) => (
    typeof s !== 'string' ? '' : s.charAt(0).toUpperCase() + s.slice(1)
);

export const getBaseURI = (pathString) => {
    console.log(pathString);
    const pathRe = /.*\/.*$/g;
    const matched = pathRe.exec(pathString) || [];
    return matched[0] ? matched[0] : '';
};

export const removeSlash = (s) => {
    console.log(getBaseURI(s));
    return typeof s !== 'string' ? '' : s.substr(1);
};
export const validEmail = (s) => (
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(s)
);

export const getHeight = (height, rem) => (
    height - rem * getRootElementFontSize()
);

export const convertRem2Pix = (value) => (
    value * getRootElementFontSize()
);

export const getRootElementFontSize = () => (
    parseFloat(getComputedStyle(document.documentElement).fontSize)
);

export const stripHtml = (html) =>
{
    let tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
}

export const requestConfig = () => ({
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
    },
    cache: 'no-cache',
    redirect: 'follow',
});
