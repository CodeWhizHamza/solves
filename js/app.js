"use strict";
var userInformation = {
    userName: '',
    subject: '',
};
var userResult = {
    correct: 0,
    wrong: 0,
    total: 10,
};
var testData = {
    current: 0,
    total: null,
};
var startNextTest = function () {
    console.log('Next,', testData.current);
};
// Show/Hide user input modal
var showUserInputModal = function () {
    var userInputModal = document.querySelector('#user-information');
    if (userInputModal) {
        userInputModal.classList.remove('hidden');
    }
};
var hideUserInputModal = function () {
    var userInputModal = document.querySelector('#user-information');
    if (userInputModal) {
        userInputModal.classList.add('hidden');
    }
};
// Show/Hide user greet modal
var showGreetUserModal = function () {
    var greetUserModal = document.querySelector('#greet-user');
    if (greetUserModal) {
        greetUserModal.classList.remove('hidden');
    }
};
var hideGreetModal = function () {
    var greetUserModal = document.querySelector('#greet-user');
    if (greetUserModal) {
        greetUserModal.classList.add('hidden');
    }
};
var handleGreetModal = function () {
    var greetUserModalText = document.querySelector('.modal__best-of-luck');
    if (greetUserModalText)
        greetUserModalText.innerHTML = "".concat(userInformation.userName, ", best of luck!");
    showGreetUserModal();
    setTimeout(hideGreetModal, 2500);
};
// Show/Hide result modal
var showResultModal = function () {
    var resultModal = document.querySelector('#result');
    if (resultModal) {
        resultModal.classList.remove('hidden');
    }
};
var hideResultModal = function () {
    var resultModal = document.querySelector('#result');
    if (resultModal) {
        resultModal.classList.add('hidden');
    }
};
var handleResultModal = function () {
    var score = document.querySelector('.result__score');
    var total = document.querySelector('.result__total');
    if (score)
        score.innerHTML = "".concat(userResult.correct);
    if (total)
        total.innerHTML = "".concat(userResult.total);
    showResultModal();
    var resultNext = document.querySelector('#result-next');
    if (resultNext) {
        resultNext.addEventListener('click', function () {
            hideResultModal();
            testData.current += 1;
            startNextTest();
        });
    }
};
var getUserInformation = function () {
    var userName = document.querySelector('.form-control--name');
    var subject = document.querySelector('.form-control--subject');
    if (!userName || !subject)
        return;
    var userNameMessage = userName
        .closest('.form-group')
        .querySelector('.form-control__message');
    var subjectMessage = subject
        .closest('.form-group')
        .querySelector('.form-control__message');
    if (!userNameMessage || !subjectMessage)
        return;
    if (!userName.value) {
        userNameMessage.innerHTML = 'Please enter your name';
        userNameMessage.classList.remove('hidden');
    }
    else {
        userNameMessage.innerHTML = '';
        userNameMessage.classList.add('hidden');
    }
    if (!subject.value) {
        subjectMessage.innerHTML = 'Please select your subject';
        subjectMessage.classList.remove('hidden');
    }
    else {
        subjectMessage.innerHTML = '';
        subjectMessage.classList.add('hidden');
    }
    if (!userName.value || !subject.value)
        return;
    userInformation.userName = userName.value;
    userInformation.subject = subject.value;
    hideUserInputModal();
    handleGreetModal();
};
// const startTestButton = document.querySelector('#user-information__start-test')
// startTestButton.addEventListener('click', getUserInformation)
// document.addEventListener('DOMContentLoaded', showUserInputModal)
