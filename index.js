import inquirer from "inquirer";


const validateNumber = async (input) => {
    const regexp = /^[0-9]*(\.[0-9]{0,2})?$/;
   
    if(input === '0') return 'Por favor ingrese un monto mayor a 0';
    
    if(!regexp.test(input)) {
        return 'Por favor ingrese un monto valido. Ejemplo 20.20' ;
    }
    return true;
}


inquirer.prompt([{
    type: 'input',
    name: 'subtotal',
    message: 'Ingrese el monto sub-total:',
    validate: validateNumber

},
{
    type: 'input',
    name: 'tax',
    message: 'Ingrese el porcentaje de impuesto:',
    validate: validateNumber

},
{
    type: 'checkbox',
    name: 'checkboxtip',
    message: 'Desea agregar propina:',
    choices: [
        {
            value: 'Si'   
        },
        {
            value: 'No'
        }
    ],
    default: 'Si'
},
{
    type: 'input',
    name: 'tip',
    message: 'Ingrese el porcentaje de propina: ',
    validate: validateNumber,
    when: (answers) => answers.checkboxtip[0] === 'Si'

},
{
    type: 'input',
    name: 'persons',
    message: 'Ingrese el numero de personas para compartir la cuenta: ',
    validate: validateNumber

},
]).then(answers =>{
    const subtotal = parseFloat(answers.subtotal);
    const tax = parseFloat(answers.tax) / 100;
    if (answers.checkboxtip[0] === 'Si') {
        const tip = parseFloat(answers.tip) / 100;
        const total = subtotal + (subtotal * tax) + (subtotal * tip);
        const shared = total / parseInt(answers.persons);
        console.log(`Total monto a pagar: ${total.toFixed(2)}`);
        console.log(`Monto a pagar por persona: ${shared.toFixed(2)}`);
    } else {
        const total = subtotal + (subtotal * tax);
        const shared = total / parseInt(answers.persons);
        console.log(`Total monto a pagar: ${total.toFixed(2)}`);
        console.log(`Monto a pagar por persona: ${shared.toFixed(2)}`);
    }

})