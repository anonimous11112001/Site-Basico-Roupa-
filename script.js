// Navbar toggle
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

// Carrossel com botões e hover
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
    intervalo = setInterval(proximaImagem, 10000);
  }

  setTimeout(iniciarCarrossel, delay);

  card.addEventListener('mouseenter', () => clearInterval(intervalo));
  card.addEventListener('mouseleave', iniciarCarrossel);

  if (btnProximo) {
    btnProximo.addEventListener('click', (e) => {
      e.stopPropagation();
      clearInterval(intervalo);
      proximaImagem();
    });
  }

  if (btnAnterior) {
    btnAnterior.addEventListener('click', (e) => {
      e.stopPropagation();
      clearInterval(intervalo);
      imagemAnterior();
    });
  }
});

// Modal
const modal = document.getElementById("modal-imagem");
const modalImg = document.getElementById("imagem-ampliada");
const fecharModal = document.querySelector(".fechar-modal");

document.querySelectorAll(".carousel-imagem img").forEach(img => {
  img.addEventListener("click", () => {
    modal.style.display = "flex";
    modalImg.src = img.src;
  });
});

fecharModal.addEventListener("click", () => {
  modal.style.display = "none";
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Filtro de produtos
const botoesFiltro = document.querySelectorAll('.filtro-btn');
const cardsProdutos = document.querySelectorAll('.card-produto');

botoesFiltro.forEach(botao => {
  botao.addEventListener('click', () => {
    botoesFiltro.forEach(btn => btn.classList.remove('ativo'));
    botao.classList.add('ativo');

    const categoria = botao.getAttribute('data-categoria');

    cardsProdutos.forEach(card => {
      const categoriaCard = card.getAttribute('data-categoria');
      card.style.display = (categoria === 'todos' || categoriaCard === categoria) ? '' : 'none';
    });
  });
});

// Animação esquerda
const animarEsquerda = document.querySelectorAll('.animar-esquerda');
const observerEsquerda = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('ativo');
    }
  });
}, { threshold: 0.4 });

animarEsquerda.forEach(el => observerEsquerda.observe(el));

// Animação direita
const animarDireita = document.querySelectorAll('.animar-direita');
const observerDireita = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('ativo');
    }
  });
}, { threshold: 0.1 });

animarDireita.forEach(el => observerDireita.observe(el));


document.getElementById('form-contato').addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const mensagem = document.getElementById('mensagem').value.trim();

  const numeroWhatsApp = '5599999999999'; // Substitua pelo número da loja com DDI + DDD

  const texto = `Olá, meu nome é ${nome}.%0AEmail: ${email}%0A%0A${mensagem}`;

  const link = `https://wa.me/${numeroWhatsApp}?text=${texto}`;

  window.open(link, '_blank');
});
