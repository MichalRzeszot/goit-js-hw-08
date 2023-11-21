import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');

const localStorageKey = 'feedback-form-state';

const saveFormState = () => {
  const formData = {
    email: feedbackForm.elements.email.value,
    message: feedbackForm.elements.message.value,
  };
  localStorage.setItem(localStorageKey, JSON.stringify(formData));
};

const loadFormState = () => {
  const storedData = localStorage.getItem(localStorageKey);
  if (storedData) {
    const formData = JSON.parse(storedData);
    feedbackForm.elements.email.value = formData.email || '';
    feedbackForm.elements.message.value = formData.message || '';
  }
};

feedbackForm.addEventListener('input', throttle(saveFormState, 500));

document.addEventListener('DOMContentLoaded', loadFormState);

feedbackForm.addEventListener('submit', event => {
  event.preventDefault();

  const storedData = localStorage.getItem(localStorageKey);

  if (storedData) {
    console.log('Submitted Data:', JSON.parse(storedData));
  } else {
    console.log('No data submitted.');
  }

  localStorage.removeItem(localStorageKey);
  feedbackForm.reset();
});
