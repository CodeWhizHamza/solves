"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
;
(function () { return __awaiter(void 0, void 0, void 0, function () {
    function fetchMcqs() {
        return __awaiter(this, void 0, void 0, function () {
            var response, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("/mcqs/".concat(userInformation.subject, ".json"))];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    }
    function divideArray(array) {
        return __awaiter(this, void 0, void 0, function () {
            var arrayLength, arrayPieces, arrayChunks, i, sliced;
            return __generator(this, function (_a) {
                arrayLength = array.length;
                arrayPieces = Math.ceil(arrayLength / 10);
                arrayChunks = [];
                for (i = 0; i < arrayPieces; i++) {
                    sliced = array.slice(i * 10, (i + 1) * 10);
                    arrayChunks.push(sliced);
                }
                return [2 /*return*/, arrayChunks];
            });
        });
    }
    function getFormattedMcqs() {
        return __awaiter(this, void 0, void 0, function () {
            var data, formattedData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetchMcqs()];
                    case 1:
                        data = _a.sent();
                        if (!data)
                            return [2 /*return*/];
                        return [4 /*yield*/, divideArray(data)];
                    case 2:
                        formattedData = _a.sent();
                        mcqs.push.apply(mcqs, formattedData);
                        testData.total = mcqs.length - 1;
                        return [2 /*return*/];
                }
            });
        });
    }
    function formatOptions(currentQuestion) {
        var optionsKey = ['a', 'b', 'c', 'd'];
        var options = currentQuestion.options
            .split('\n')
            .filter(function (opt) {
            return opt !== '';
        })
            .map(function (opt) { return opt.slice(3); })
            .map(function (opt, i) { return "\n        <li class=\"mcq__option\">\n            <input\n            class=\"mcq__option-checker\"\n            type=\"radio\"\n            name=\"mcq\"\n            id=\"answer-".concat(i + 1, "\"\n            value=\"").concat(optionsKey[i], "\"\n            />\n            <label for=\"answer-").concat(i + 1, "\" class=\"mcq__option-text\">").concat(opt, "</label>\n        </li>\n    "); })
            .join('');
        return options;
    }
    function handleMcqSubmit(e, questions) {
        e.preventDefault();
        var answer = e.target
            .closest('.container')
            .querySelector('.mcq__option-checker:checked').value;
        userAnswers.push(answer);
        if (questionsData.current === questionsData.total) {
            handleResultModal();
            if (testData.current === testData.total) {
                handleGreetModal("Congrats! ".concat(userInformation.userName, " you completed the test"));
                return;
            }
            else {
                testData.current++;
                questionsData.current = 0;
                userAnswers.length = 0;
            }
        }
        else {
            questionsData.current++;
            askQuestion(questions);
        }
    }
    function askQuestion(questions) {
        return __awaiter(this, void 0, void 0, function () {
            var mcqContainer, currentQuestion, stringOptions, submitButton;
            return __generator(this, function (_a) {
                mcqContainer = document.querySelector('.question-panel');
                currentQuestion = questions[questionsData.current];
                stringOptions = formatOptions(currentQuestion);
                if (!mcqContainer)
                    return [2 /*return*/];
                mcqContainer.innerHTML = "\n      <h3 class=\"mcq__question\">\n      ".concat(questionsData.current + 1, ". ").concat(currentQuestion === null || currentQuestion === void 0 ? void 0 : currentQuestion.question, "\n      </h3>\n      <ul class=\"mcq__options\">\n      ").concat(stringOptions, "\n      </ul>\n      <button class=\"btn btn--primary mcq__next\" type=\"submit\">\n      Next &rarr;\n      </button>\n    ");
                submitButton = mcqContainer.querySelector('.mcq__next');
                if (!submitButton)
                    return [2 /*return*/];
                submitButton.addEventListener('click', function (e) { return handleMcqSubmit(e, questions); });
                return [2 /*return*/];
            });
        });
    }
    function calculateResult() {
        var correct = 0;
        for (var i = 0; i < userAnswers.length; i++) {
            if (userAnswers[i] == mcqs[testData.current][i].answer.toLowerCase())
                correct++;
        }
        // const correctAnswers = userAnswers.filter((answer: string, i: number) => {
        //   return answer === mcqs[testData.current][i].answer.toLowerCase()
        // })
        userResult.correct = correct;
        userResult.wrong = userAnswers.length - userResult.correct;
    }
    function handleResultModal() {
        calculateResult();
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
    }
    // Start by getting user information
    function getUserInformation() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var userName, subject, userNameMessage, subjectMessage;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        userName = document.querySelector('.form-control--name');
                        subject = document.querySelector('.form-control--subject');
                        if (!userName || !subject)
                            return [2 /*return*/];
                        userNameMessage = (_a = userName
                            .closest('.form-group')) === null || _a === void 0 ? void 0 : _a.querySelector('.form-control__message');
                        subjectMessage = (_b = subject
                            .closest('.form-group')) === null || _b === void 0 ? void 0 : _b.querySelector('.form-control__message');
                        if (!userNameMessage || !subjectMessage)
                            return [2 /*return*/];
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
                            return [2 /*return*/];
                        userInformation.userName = userName.value;
                        userInformation.subject = subject.value;
                        hideUserInputModal();
                        handleGreetModal();
                        // Get the mcqs
                        return [4 /*yield*/, getFormattedMcqs()];
                    case 1:
                        // Get the mcqs
                        _c.sent();
                        startNextTest();
                        return [2 /*return*/];
                }
            });
        });
    }
    var userInformation, userResult, testData, questionsData, mcqs, userAnswers, startNextTest, showUserInputModal, hideUserInputModal, showGreetUserModal, hideGreetModal, handleGreetModal, showResultModal, hideResultModal, startTestButton;
    return __generator(this, function (_a) {
        userInformation = {
            userName: '',
            subject: '',
        };
        userResult = {
            correct: 0,
            wrong: 0,
            total: 10,
        };
        testData = {
            current: 0,
            total: 0,
        };
        questionsData = {
            current: 0,
            total: 9,
        };
        mcqs = [];
        userAnswers = [];
        startNextTest = function () {
            var questions = mcqs[testData.current];
            questionsData.total = questions.length - 1;
            askQuestion(questions);
        };
        showUserInputModal = function () {
            var userInputModal = document.querySelector('#user-information');
            if (userInputModal) {
                userInputModal.classList.remove('hidden');
            }
        };
        hideUserInputModal = function () {
            var userInputModal = document.querySelector('#user-information');
            if (userInputModal) {
                userInputModal.classList.add('hidden');
            }
        };
        showGreetUserModal = function () {
            var greetUserModal = document.querySelector('#greet-user');
            if (greetUserModal) {
                greetUserModal.classList.remove('hidden');
            }
        };
        hideGreetModal = function () {
            var greetUserModal = document.querySelector('#greet-user');
            if (greetUserModal) {
                greetUserModal.classList.add('hidden');
            }
        };
        handleGreetModal = function (greetMsg) {
            if (greetMsg === void 0) { greetMsg = ''; }
            var greetUserModalText = document.querySelector('.modal__best-of-luck');
            if (!greetUserModalText)
                return;
            if (greetMsg)
                greetUserModalText.innerHTML = greetMsg;
            else
                greetUserModalText.innerHTML = "".concat(userInformation.userName, ", best of luck!");
            showGreetUserModal();
            setTimeout(hideGreetModal, 2500);
        };
        showResultModal = function () {
            var resultModal = document.querySelector('#result');
            if (resultModal) {
                resultModal.classList.remove('hidden');
            }
        };
        hideResultModal = function () {
            var resultModal = document.querySelector('#result');
            if (resultModal) {
                resultModal.classList.add('hidden');
            }
        };
        startTestButton = document.querySelector('#user-information__start-test');
        if (!startTestButton)
            return [2 /*return*/];
        startTestButton.addEventListener('click', getUserInformation);
        document.addEventListener('DOMContentLoaded', showUserInputModal);
        return [2 /*return*/];
    });
}); })();
