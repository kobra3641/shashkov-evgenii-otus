const getPath = require('./getPath');

const para = document.createElement('p');
para.id = 'testId';
document.body.appendChild(para);

const head = document.createElement('h1');
head.classList.add('text');
head.classList.add('color');
document.body.appendChild(head);

test('getPath use with not null element', () => {
    let result = getPath(para);
    expect(result).not.toBeNull();
});

test('getPath into body', () =>{
    let result = getPath(document.body);
    expect(result).toMatch('html body');
})

test('getPath with selector', () => {
    let result = getPath(para);
    expect(result).toMatch('html body p.#testId');
})

test('getPath with classes', () => {
    let result = getPath(head);
    expect(result).toMatch('html body h1.text.color');
})

test('getPath with querySelector', () => {
    let result = getPath(document.querySelector('h1'));
    expect(result).toMatch('html body h1.text.color');
})
