const cards = document.querySelectorAll('.country-card');
const dropzones = document.querySelectorAll('.dropzone');

// Eventos de Drag nos países
cards.forEach(card => {
  card.addEventListener('dragstart', dragStart);
  card.addEventListener('dragend', dragEnd);
});

function dragStart(event) {
  event.dataTransfer.setData('text/plain', event.target.id);
  setTimeout(() => event.target.classList.add('dragging'), 0);
}

function dragEnd(event) {
  event.target.classList.remove('dragging');
}

// Eventos de Drop nos continentes
dropzones.forEach(zone => {
  zone.addEventListener('dragover', dragOver);
  zone.addEventListener('dragenter', dragEnter);
  zone.addEventListener('dragleave', dragLeave);
  zone.addEventListener('drop', drop);
});

function dragOver(event) {
  event.preventDefault();
}

function dragEnter(event) {
  event.preventDefault();
  event.currentTarget.classList.add('hovered');
}

function dragLeave(event) {
  event.currentTarget.classList.remove('hovered');
}

function drop(event) {
  event.preventDefault();
  const zone = event.currentTarget;
  zone.classList.remove('hovered');

  const cardId = event.dataTransfer.getData('text/plain');
  const card = document.getElementById(cardId);

  if (!card) return;

  // Obter as categorias (continentes)
  const paisContinente = card.getAttribute('data-continente');
  const zonaContinente = zone.getAttribute('data-continente');

  // Move o cartão para dentro do continente
  zone.appendChild(card);

  // Validação no momento da soltura
  if (paisContinente === zonaContinente) {
    // Acerto: aplica contorno verde
    zone.classList.add('correto');
    zone.classList.remove('incorreto');
  } else {
    // Erro: aplica contorno vermelho
    zone.classList.add('incorreto');
    zone.classList.remove('correto');
  }
}