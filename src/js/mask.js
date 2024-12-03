function toggleForm(formId, btnId) {
  // Seleciona todos os botões e forms
  const buttons = document.querySelectorAll('.reveal-btn');
  const forms = document.querySelectorAll('.card');

  // Verifica se o form já está visível
  const form = document.getElementById(formId);
  const isFormVisible = !form.classList.contains('hidden');

  if (isFormVisible) {
    // Oculta o form visível e mostra os botões
    form.classList.add('hidden');
    buttons.forEach(button => button.classList.remove('hidden'));
  } else {
    // Oculta todos os botões e forms
    buttons.forEach(button => button.classList.add('hidden'));
    forms.forEach(formElement => formElement.classList.add('hidden'));

    // Mostra o form solicitado
    form.classList.remove('hidden');
  }
}