const userInformation = {
  userName: '',
  subject: '',
}
const userResult = {
  correct: 0,
  wrong: 0,
  total: 10,
}
const testData = {
  current: 0,
  total: null,
}

const startNextTest = function () {
  console.log('Next,', testData.current)
}
// Show/Hide user input modal
const showUserInputModal = function () {
  const userInputModal: Element | null =
    document.querySelector('#user-information')
  if (userInputModal) {
    userInputModal.classList.remove('hidden')
  }
}
const hideUserInputModal = function () {
  const userInputModal: Element | null =
    document.querySelector('#user-information')
  if (userInputModal) {
    userInputModal.classList.add('hidden')
  }
}

// Show/Hide user greet modal
const showGreetUserModal = function () {
  const greetUserModal: Element | null = document.querySelector('#greet-user')
  if (greetUserModal) {
    greetUserModal.classList.remove('hidden')
  }
}
const hideGreetModal = function () {
  const greetUserModal: Element | null = document.querySelector('#greet-user')
  if (greetUserModal) {
    greetUserModal.classList.add('hidden')
  }
}

const handleGreetModal = function () {
  const greetUserModalText: Element | null = document.querySelector(
    '.modal__best-of-luck',
  )

  if (greetUserModalText)
    greetUserModalText.innerHTML = `${userInformation.userName}, best of luck!`

  showGreetUserModal()
  setTimeout(hideGreetModal, 2500)
}

// Show/Hide result modal
const showResultModal = function () {
  const resultModal: Element | null = document.querySelector('#result')
  if (resultModal) {
    resultModal.classList.remove('hidden')
  }
}
const hideResultModal = function () {
  const resultModal: Element | null = document.querySelector('#result')
  if (resultModal) {
    resultModal.classList.add('hidden')
  }
}

const handleResultModal = function () {
  const score: Element | null = document.querySelector('.result__score')
  const total: Element | null = document.querySelector('.result__total')

  if (score) score.innerHTML = `${userResult.correct}`
  if (total) total.innerHTML = `${userResult.total}`
  showResultModal()

  const resultNext: Element | null = document.querySelector('#result-next')
  if (resultNext) {
    resultNext.addEventListener('click', () => {
      hideResultModal()
      testData.current += 1
      startNextTest()
    })
  }
}

const getUserInformation = function () {
  const userName: Element | null = document.querySelector('.form-control--name')
  const subject: Element | null = document.querySelector(
    '.form-control--subject',
  )

  if (!userName || !subject) return

  const userNameMessage: Element | null = userName
    .closest('.form-group')
    .querySelector('.form-control__message')
  const subjectMessage = subject
    .closest('.form-group')
    .querySelector('.form-control__message')

  if (!userNameMessage || !subjectMessage) return

  if (!userName.value) {
    userNameMessage.innerHTML = 'Please enter your name'
    userNameMessage.classList.remove('hidden')
  } else {
    userNameMessage.innerHTML = ''
    userNameMessage.classList.add('hidden')
  }
  if (!subject.value) {
    subjectMessage.innerHTML = 'Please select your subject'
    subjectMessage.classList.remove('hidden')
  } else {
    subjectMessage.innerHTML = ''
    subjectMessage.classList.add('hidden')
  }
  if (!userName.value || !subject.value) return
  userInformation.userName = userName.value
  userInformation.subject = subject.value
  hideUserInputModal()
  handleGreetModal()
}

// const startTestButton = document.querySelector('#user-information__start-test')
// startTestButton.addEventListener('click', getUserInformation)
// document.addEventListener('DOMContentLoaded', showUserInputModal)
