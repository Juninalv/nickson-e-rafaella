const dataInicio = new Date("2024-07-13T00:00:00");

function atualizarContador() {
  const agora = new Date();

  const diferenca = agora - dataInicio;

  const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
  const horas = Math.floor(
    (diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

  document.getElementById("tempo-juntos").textContent =
    `${dias} dias, ${horas} horas, ${minutos} minutos e ${segundos} segundos`;
}

atualizarContador();
setInterval(atualizarContador, 1000);

const imagens = document.querySelectorAll(".gallery-track img");

const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const fechar = document.querySelector(".lightbox-fechar");

let indexAtual = 0;

// abre imagem
function abrirLightbox(index) {
  indexAtual = index;
  lightbox.classList.add("ativo");
  lightboxImg.src = imagens[indexAtual].src;
}

const setaEsquerda = document.querySelector(".seta.esquerda");
const setaDireita = document.querySelector(".seta.direita");

setaDireita.addEventListener("click", proxima);
setaEsquerda.addEventListener("click", anterior);

// próxima imagem
function proxima() {
  indexAtual = (indexAtual + 1) % imagens.length;
  lightboxImg.src = imagens[indexAtual].src;
}

// imagem anterior
function anterior() {
  indexAtual = (indexAtual - 1 + imagens.length) % imagens.length;
  lightboxImg.src = imagens[indexAtual].src;
}

// clique nas imagens
imagens.forEach((img, index) => {
  img.addEventListener("click", () => {
    abrirLightbox(index);
  });
});

// fechar
fechar.addEventListener("click", () => {
  lightbox.classList.remove("ativo");
});

// clicar fora
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove("ativo");
  }
});

// teclado (ESC, setas)
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("ativo")) return;

  if (e.key === "Escape") {
    lightbox.classList.remove("ativo");
  }

  if (e.key === "ArrowRight") {
    proxima();
  }

  if (e.key === "ArrowLeft") {
    anterior();
  }
});
