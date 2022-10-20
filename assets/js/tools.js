/* Tools */

// Selectors

const i = document.getElementById.bind(document);
const q = document.querySelector.bind(document);
const qt = document.querySelectorAll.bind(document);

// Remove grammar checked (inputs)

qt('input').forEach((e) => {
	e.setAttribute('spellcheck', false);
	e.setAttribute('autocorrect', false);
	e.setAttribute('autocapitalize', false);
});

//
// Control labels
//

const mainLabels = qt('.main-label');
const mainInputs = qt('.main-input');

mainInputs.forEach((inp) => {
	updateLabelInput(inp);
	inp.addEventListener('blur', () => updateLabelInput(inp));
	inp.addEventListener('focus', function () {
		this.classList.add('active');
	});
	inp.addEventListener('load', () => updateLabelInput(inp));
});

function updateLabelInput(inp) {
	if (inp.value) inp.classList.add('active');
	else inp.classList.remove('active');
}

//
// Validation object
//

const objValidation = {
	email: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/,
	name: /^[a-zA-Z]([a-zA-Z0-9\s]+)?$/,
};

const passwordValidation = {
	0: {
		color: 'grey',
		text: 'Too short',
	},
	1: {
		color: 'red',
		text: 'Week',
	},
	2: {
		color: 'rgb(163, 147, 0)',
		text: 'Medium',
	},
	3: {
		color: 'darkgreen',
		text: 'Strong',
	},
	4: {
		color: 'green',
		text: 'Very strong',
	},
};

const testPassword = {
	lower: /(?=^.{7,}$)(?=.*[a-z])/,
	upper: /(?=^.{7,}$)(?=.*[A-Z])/,
	number: /(?=^.{7,}$)(?=.*[0-9])/,
	symbol: /(?=^.{7,}$)(?=.*[^A-Za-z0-9])/,
};

// Functions

function isInpEmpty(inp) {
	return inp.value.trim() === '';
}

function checkForReg(inp) {
	let reg = inp.getAttribute('data-reg');
	let value = inp.value;
	return objValidation[reg].test(value);
}
