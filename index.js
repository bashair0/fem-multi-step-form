const radioButtons = document.querySelectorAll('input[name="Add-ons"]')
const selectedPlan = document.querySelector('#plan')
const planlabels = document.querySelectorAll('.plan-card')

/* PICK ADD_ONS CARDS */
const pickCard = document.querySelectorAll('.pick')
const pick = document.querySelectorAll('input[class="plan"]')

/* SWITCHER */
const switcher = document.querySelector('#plan-switcher')
const monthlyPlan = document.querySelector('.monthly')
const yearlyPlan = document.querySelector('.yearly')
const specialDeal = document.querySelectorAll('.special-deal')

/* MONTHLY / YEARLY SLIDER */
const slider = document.querySelector('.slider')
const sliderRound = window.getComputedStyle(slider, '::before')

/* BUTTONS AND PROGRESS BAR */
const prevBtns = document.querySelectorAll('.btn-prev')
const nextBtns = document.querySelectorAll('.btn-next')
const formSteps = document.querySelectorAll('.form-step')
const progress = document.getElementById('progress')
const progressSteps = document.querySelectorAll('.progress-step__num')
const confirmBtn = document.querySelector('.btn-conf')

let time
let currentStep = 1
let currentCircle = 0
const obj = {
  plan: null,
  kind: null,
  price: null
}

let formStepsNum = 0

function summary (obj) {
  const planName = document.querySelector('.plan-name')
  const planPrice = document.querySelector('.plan-price')
  planPrice.innerHTML = `${obj.price.innerText}`
  planName.innerHTML = `${obj.plan.innerText} (${
    obj.kind ? 'yearly' : 'monthly'
  })`
}

function validate (e) {
  let valid = true
  const requestedField = document.querySelectorAll('.input-group .input')
  const emptyFieldError = document.querySelectorAll('.nameError')

  if (requestedField.value === '' || requestedField == null) {
    console.log('invalid')
    valid = false
  }

  return valid
}

radioButtons.forEach(element => {
  element.addEventListener('click', () => {
    for (let radioButton of radioButtons) {
      if (radioButton.checked) {
        console.log(radioButton.value)
        console.log(radioButton.getAttribute('aria-valueprice'))
        for (let label of radioButton.labels) {
          label.classList.add('plan-selected')
        }
      } else {
        for (let label of radioButton.labels) {
          label.classList.remove('plan-selected')
        }
      }
    }
  })
})

pick.forEach(el => {
  el.addEventListener('click', () => {
    for (let pic of pick) {
      if (pic.checked) {
        for (let card of pic.labels) {
          card.classList.add('pick-checked')
        }
      } else {
        for (let card of pic.labels) {
          card.classList.remove('pick-checked')
        }
      }
    }
  })
})

switcher.addEventListener('click', () => {
  if (switcher.checked) {
    monthlyPlan.classList.add('plan-active')
    yearlyPlan.classList.remove('plan-active')
    slider.style.setProperty('--left', '5px')
    specialDeal.forEach(el => {
      el.style.display = 'none'
    })
  } else {
    monthlyPlan.classList.remove('plan-active')
    yearlyPlan.classList.add('plan-active')
    slider.style.setProperty('--left', '27px')
    specialDeal.forEach(el => {
      el.style.display = 'block'
    })
  }
})

nextBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (formStepsNum < progressSteps.length) {
      formStepsNum++
      updateFormSteps()
      updateProgressBar()
      validate()
    }
  })
})

prevBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    formStepsNum--
    updateFormSteps()
    updateProgressBar()
  })
})

function updateFormSteps () {
  formSteps.forEach(formStep => {
    formStep.classList.contains('form-step-active') &&
      formStep.classList.remove('form-step-active')
  })

  formSteps[formStepsNum].classList.add('form-step-active')
}

function updateProgressBar () {
  progressSteps.forEach(progressStep => {
    progressStep.classList.contains('progress-step-active') &&
      progressStep.classList.remove('progress-step-active')
  })

  progressSteps[formStepsNum].classList.add('progress-step-active')
}
