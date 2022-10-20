/* Sign up page script */

// ! Some variables are from "../assets/js/tools.js"

// Dom elements

const stepIcons = qt('.step-item');
const progress = i('progress');
const mainsteps = qt('.step');

// Initial variables

let active = 0;

// Preload functions

updateStepIcons();
updateProgressBar();

// Update header steps icons

function updateStepIcons() {
	stepIcons.forEach((icon) => icon.classList.remove('current', 'complete'));

	let current = stepIcons[active];
	if (active < mainsteps.length) current.classList.add('current');

	if (active > 0) {
		stepIcons.forEach((e, indx) => {
			if (indx < active) e.classList.add('complete');
		});
	}
}

// Update steps progress

function updateProgressBar() {
	if (active < mainsteps.length) {
		progress.style.width = `${active * (100 / 2)}%`;
	}
}

// Animation

// In
function animationIn(elem) {
	setTimeout(() => {
		elem.classList.remove('hidden');
		elem.classList.add('in');
	}, 500);
}
// Out
function animationOut(elem) {
	elem.classList.remove('in');
	elem.classList.add('out');

	setTimeout(() => {
		elem.classList.add('hidden');
		elem.classList.remove('out');
	}, 500);
}

//
// Btns control
//

// Next btns
const nextStep1Btn = i('step1-btn');
const nextStep2Btn = i('step2-btn');
const nextStep3Btn = i('step3-btn');
// Back btns
const backBtns = qt('.back-btn');

backBtns.forEach((btn) => btn.addEventListener('click', prevStep));

// Add click events to next btns

// next Step1 btn
nextStep1Btn.addEventListener('click', () => {
	let validation = step1Validation();
	if (validation) nextStep();
});
// next Step2 btn
nextStep2Btn.addEventListener('click', () => {
	let validation = step2Validation();
	if (validation) nextStep();
});

// Get previous step

function prevStep() {
	active--;
	updateProgressBar();
	updateStepIcons();

	let current = mainsteps[active + 1];
	let prev = mainsteps[active];
	animationOut(current);
	animationIn(prev);
}

// Get next step

function nextStep() {
	active++;
	updateProgressBar();
	updateStepIcons();

	if (active < mainsteps.length) {
		let current = mainsteps[active - 1];
		let next = mainsteps[active];
		animationOut(current);
		animationIn(next);
	}
}

//
// Form Validation
//

/* ====== Step1 Validation ====== */

function step1Validation() {
	const inpts = [...qt('.step1 input[data-reg]')];

	let cond = inpts.every((inp) => {
		return checkForReg(inp);
	});

	if (cond) {
		return true;
	} else {
		let invalidInpts = inpts.filter((e) => !checkForReg(e));

		invalidInpts.forEach((e, i) => {
			if (i === 0) e.focus();

			let reg = e.getAttribute('data-reg');
			let errorField = e.parentElement.parentElement.lastElementChild;

			// Add error messages
			errorField.innerHTML = `<i class="bx bxs-error-circle"></i> ${
				isInpEmpty(e) ? 'required' : 'Invalid ' + reg
			}`;

			// Change border color
			e.classList.add('error');
		});
	}
}

/* ====== Step2 Validation ====== */

function step2Validation() {
	const emailInp = q('.step2 #email');
	let errorField = q('.step2 .error-field');

	let cond = checkForReg(emailInp);

	if (cond) {
		return true;
	} else {
		emailInp.focus();

		errorField.innerHTML = `<i class="bx bxs-error-circle"></i> ${
			isInpEmpty(emailInp) ? 'required' : 'Invalid email'
		}`;
		emailInp.classList.add('error');
	}
}

/* ====== Step3 Validation ====== */

const form = i('sign-up');
const passInp = q('.step3 #password');
const strengthEl = i('pass-strength');
const confirmPass = q('.step3 #confirm');

form.addEventListener('submit', function (e) {
	e.preventDefault();
	let validation = step3Validation() && step2Validation() && step1Validation();
	if (validation) form.submit();
});

function step3Validation() {
	let valid = ['Strong', 'Very strong', 'Medium'];
	let stgth = strengthEl.textContent.split(':').pop().trim();
	let erField = confirmPass.parentElement.nextElementSibling;

	let cond1 = valid.includes(stgth);
	let cond2 = passInp.value === confirmPass.value;
	let cond3 = passwordStrength(passInp.value).text === stgth;

	if (cond1 && cond2 && cond3) return true;
	else {
		// Invalid password
		if (!cond1) {
			passInp.classList.add('error');
			passInp.focus();
			strengthEl.classList.add('error-field');
			strengthEl.innerHTML = `<i class="bx bxs-error-circle"></i> ${
				passInp.value === ''
					? 'required'
					: 'Week password, must be at least with a medium strength'
			}`;
		}
		// Confirm password validation
		if (!cond2) {
			if (cond1) confirmPass.focus();
			confirmPass.classList.add('error');
			erField.innerHTML = `<i class="bx bxs-error-circle"></i> Those passwords didn't match`;
		}
		if (confirmPass.value === '') {
			if (cond1) confirmPass.focus();
			confirmPass.classList.add('error');
			erField.innerHTML = `<i class="bx bxs-error-circle"></i> required`;
		}
	}
}

confirmPass.addEventListener('input', function () {
	this.classList.remove('error');
	this.parentElement.nextElementSibling.innerHTML = '';
});

// Check password strength

passInp.addEventListener('input', function () {
	this.classList.remove('error');
	if (this.value) {
		const { color, text } = passwordStrength(this.value);
		strengthEl.classList.remove('error-field');
		strengthEl.innerHTML = `
        Password strength: <span style="color: ${color};">${text}</span>
        `;
	} else strengthEl.innerHTML = 'Password strength: ';
});

function passwordStrength(value) {
	let result = 0;
	for (let i in testPassword) {
		let reg = testPassword[i];
		result += reg.test(value);
	}
	return passwordValidation[result];
}

// Update error messages

const inpWithValidation = qt('.field input[data-reg]');

inpWithValidation.forEach((inp) => {
	let er = inp.parentElement.nextElementSibling;
	inp.addEventListener('input', function () {
		updateErrorMsg(er, inp);
	});
});

function updateErrorMsg(er, inp) {
	if (checkForReg(inp)) {
		inp.classList.remove('error');
		er.innerHTML = '';
	}
}
