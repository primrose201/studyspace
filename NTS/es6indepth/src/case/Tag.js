function myBasicTag(...rest) {
    let s = '';

    for (let i = 0; i < strings.length; i++) {
        s += strings[i] + rest[i];

        if (typeof rest[i] !== 'undefined') {
            s += rest[i];
        }
    }
}

function  basicTag(...rest) {
    console.log(rest);
}

const result = basicTag `a=${1}, b=${2}, c=${3}\t\t`;

const map = {
    done: ['확인', 'done'],
    cancel: ['취소', 'cancel']
}

const countryCode = 1;

function i18n(strings, node) {
    const key = node.getAttribute('value');

    return map[key][countryCode];
}

window.onload = function() {
    const nodes = document.querySelectorAll('.i18n');

    let node;

    for (let i = 0; i < nodes.length; i++) {
        node = nodes[i];

        node.setAttribute('value', i18n`${node}`);
    }
}