/* Tools */

// Selectors

const i = document.getElementById.bind(document);
const q = document.querySelector.bind(document);
const qt = document.querySelectorAll.bind(document);

// Remove grammar checked (inputs)

qt('input').forEach((e) => e.setAttribute('spellcheck', false));

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
	name: /^[a-zA-Z0-9]+/,
};

const passwordValidation = {
	week: {
		reg: /(?=^.{7,}$)/,
		color: 'red',
		text: 'Week',
	},
	short: {
		reg: /(?=^.{1,7}$)/,
		color: 'grey',
		text: 'Too short',
	},
	medium: {
		reg: /(?=^.{8,}$)(?=.*[a-z])(?=.*[0-9]).*/,
		color: 'rgb(163, 147, 0)',
		text: 'Medium',
	},
	strong: {
		reg: /(?=^.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*/,
		color: 'darkgreen',
		text: 'Strong',
	},
	veryStrong: {
		reg: /(?=^.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).*/,
		color: 'green',
		text: 'Very strong',
	},
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
