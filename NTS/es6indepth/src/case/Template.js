const string = 'hello'
    , template = `template`;

console.log(string + template);
console.log(template + template);
console.log(template.length + template.charAt(0));

// template string의 특징 1.
const name = 'jaewon'
    , age = 39;

console.log(`my name is ${name}, age is ${age}`);

// template string의 특징 2.
const html =
`<div>
    <p>good</p>
</div>
`;
console.log(html);
