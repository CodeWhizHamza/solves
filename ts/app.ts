;(async () => {
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
    total: 0,
  }
  const questionsData = {
    current: 0,
    total: 9,
  }
  const mcqs: any[] = []
  const userAnswers: string[] = []

  async function fetchMcqs() {
    const response = await fetch(`/mcqs/${userInformation.subject}.json`)
    const data = await response.json()
    return data
  }
  async function divideArray(array: Array<any>) {
    const arrayLength = array.length
    const arrayPieces = Math.ceil(arrayLength / 10)
    const arrayChunks = []
    for (let i = 0; i < arrayPieces; i++) {
      const sliced: any[] = array.slice(i * 10, (i + 1) * 10)
      arrayChunks.push(sliced)
    }
    return arrayChunks
  }
  async function getFormattedMcqs() {
    const data: any[] | null = await fetchMcqs()
    if (!data) return
    const formattedData = await divideArray(data)
    mcqs.push(...formattedData)
    testData.total = mcqs.length - 1
  }
  function formatOptions(currentQuestion: any) {
    const optionsKey: string[] = ['a', 'b', 'c', 'd']
    const options = currentQuestion.options
      .split('\n')
      .filter((opt: string) => {
        return opt !== ''
      })
      .map((opt: string | any[]) => opt.slice(3))
      .map(
        (opt: string, i: number) => `
        <li class="mcq__option">
            <input
            class="mcq__option-checker"
            type="radio"
            name="mcq"
            id="answer-${i + 1}"
            value="${optionsKey[i]}"
            />
            <label for="answer-${i + 1}" class="mcq__option-text">${opt}</label>
        </li>
    `,
      )
      .join('')
    return options
  }
  function handleMcqSubmit(e: any, questions: any[]) {
    e.preventDefault()
    const answer = e.target
      .closest('.container')
      .querySelector('.mcq__option-checker:checked').value
    userAnswers.push(answer)

    if (questionsData.current === questionsData.total) {
      handleResultModal()

      if (testData.current === testData.total) {
        handleGreetModal(
          `Congrats! ${userInformation.userName} you completed the test`,
        )
        return
      } else {
        testData.current++
        questionsData.current = 0
        userAnswers.length = 0
      }
    } else {
      questionsData.current++
      askQuestion(questions)
    }
  }
  async function askQuestion(questions: any[]) {
    const mcqContainer = document.querySelector('.question-panel')
    const currentQuestion = questions[questionsData.current]
    const stringOptions = formatOptions(currentQuestion)

    if (!mcqContainer) return
    mcqContainer.innerHTML = `
      <h3 class="mcq__question">
      ${questionsData.current + 1}. ${currentQuestion?.question}
      </h3>
      <ul class="mcq__options">
      ${stringOptions}
      </ul>
      <button class="btn btn--primary mcq__next" type="submit">
      Next &rarr;
      </button>
    `
    const submitButton = mcqContainer.querySelector('.mcq__next')
    if (!submitButton) return
    submitButton.addEventListener('click', e => handleMcqSubmit(e, questions))
  }

  const startNextTest = function () {
    const questions = mcqs[testData.current]
    questionsData.total = questions.length - 1
    askQuestion(questions)
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
  const handleGreetModal = function (greetMsg: string = '') {
    const greetUserModalText: Element | null = document.querySelector(
      '.modal__best-of-luck',
    )
    if (!greetUserModalText) return

    if (greetMsg) greetUserModalText.innerHTML = greetMsg
    else
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
  function calculateResult() {
    const correctAnswers = userAnswers.filter((answer: string, i: number) => {
      return answer === mcqs[testData.current][i].answer.toLowerCase()
    })
    userResult.correct = correctAnswers.length
    userResult.wrong = userAnswers.length - userResult.correct
  }
  function handleResultModal() {
    calculateResult()

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

  // Start by getting user information
  async function getUserInformation() {
    const userName: HTMLInputElement | null = document.querySelector(
      '.form-control--name',
    )
    const subject: HTMLInputElement | null = document.querySelector(
      '.form-control--subject',
    )

    if (!userName || !subject) return

    const userNameMessage = userName
      .closest('.form-group')
      ?.querySelector('.form-control__message')
    const subjectMessage = subject
      .closest('.form-group')
      ?.querySelector('.form-control__message')

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

    // Get the mcqs
    await getFormattedMcqs()

    startNextTest()
  }

  const startTestButton: Element | null = document.querySelector(
    '#user-information__start-test',
  )
  if (!startTestButton) return
  startTestButton.addEventListener('click', getUserInformation)
  document.addEventListener('DOMContentLoaded', showUserInputModal)
})()
