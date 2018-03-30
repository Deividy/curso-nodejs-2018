export default 'foo';

export function add (a, b) { return a + b; };

export const sleep = async (secs = 1) => {
    return new Promise((resolve) => {
        setTimeout(resolve, secs * 1000);
    });
};
