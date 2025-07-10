const toggleBtn = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

toggleBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links li').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.nav-links li').forEach(el => el.classList.remove('active'));
    item.classList.add('active');
  });
});

document.querySelectorAll('.card-produto').forEach((card) => {
  const imagens = card.querySelectorAll('.imagem-principal');
  let atual = 0;

  const delay = parseFloat(card.dataset.delay) * 1000;
  let intervalo;

  function iniciarCarrossel() {
    intervalo = setInterval(() => {
      imagens[atual].classList.remove('ativo');
      atual = (atual + 1) % imagens.length;
      imagens[atual].classList.add('ativo');
    }, 5000);
  }

  setTimeout(() => {
    iniciarCarrossel();
  }, delay);

  card.addEventListener('mouseenter', () => clearInterval(intervalo));
  card.addEventListener('mouseleave', () => iniciarCarrossel());
});

// Animação do título ao rolar a tela
const animarEsquerda = document.querySelectorAll('.animar-esquerda');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('ativo');
    }
  });
}, {
  threshold: 0.4
});

animarEsquerda.forEach(elemento => {
  observer.observe(elemento);
});


console.log(document.querySelector('.grid-produtos').children.length);


document.querySelectorAll('.card-produto').forEach((card) => {
  const imagens = card.querySelectorAll('.imagem-principal');
  const btnAnterior = card.querySelector('.btn-anterior');
  const btnProximo = card.querySelector('.btn-proximo');
  let atual = 0;
  let intervalo;
  const delay = parseFloat(card.dataset.delay) * 1000;

  function mostrarImagem(index) {
    imagens.forEach(img => img.classList.remove('ativo'));
    imagens[index].classList.add('ativo');
  }

  function proximaImagem() {
    atual = (atual + 1) % imagens.length;
    mostrarImagem(atual);
  }

  function imagemAnterior() {
    atual = (atual - 1 + imagens.length) % imagens.length;
    mostrarImagem(atual);
  }

  function iniciarCarrossel() {
    intervalo = setInterval(() => {
      proximaImagem();
    }, 10000);
  }

  setTimeout(() => {
    iniciarCarrossel();
  }, delay);

  card.addEventListener('mouseenter', () => clearInterval(intervalo));
  card.addEventListener('mouseleave', () => iniciarCarrossel());

  btnProximo.addEventListener('click', (e) => {
    e.stopPropagation();
    clearInterval(intervalo);
    proximaImagem();
  });

  btnAnterior.addEventListener('click', (e) => {
    e.stopPropagation();
    clearInterval(intervalo);
    imagemAnterior();
  });
});
