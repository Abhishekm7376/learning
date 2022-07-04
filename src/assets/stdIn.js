process.stdin.resume();
process.stdin.setEncoding('utf8');
let number='';

process.stdin.on('number', (input) => {
    number = number + input;
    main(number.trim())
    
});

function main(n) {
    console.log(n);
}
