const dataInicio = new Date("2024-07-13T00:00:00");
const elemento = document.getElementById("texto-digitado");

let animacaoConcluida = false;

function atualizarTexto() {
  const agora = new Date();

  let meses =
    (agora.getFullYear() - dataInicio.getFullYear()) * 12 +
    (agora.getMonth() - dataInicio.getMonth());

  let dataMesAtual = new Date(dataInicio);
  dataMesAtual.setMonth(dataMesAtual.getMonth() + meses);

  if (dataMesAtual > agora) {
    meses--;
    dataMesAtual = new Date(dataInicio);
    dataMesAtual.setMonth(dataMesAtual.getMonth() + meses);
  }

  const restante = agora - dataMesAtual;

  const dias = Math.floor(restante / (1000 * 60 * 60 * 24));
  const horas = Math.floor(
    (restante % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutos = Math.floor((restante % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((restante % (1000 * 60)) / 1000);

  return `Há ${meses} meses, ${dias} dias, ${horas} horas, ${minutos} minutos e ${segundos} segundos começou a melhor história da minha vida. ❤️`;
}

function escreverTexto(texto) {
  let i = 0;
  elemento.textContent = "";

  function digitar() {
    if (i < texto.length) {
      elemento.textContent += texto.charAt(i);
      i++;
      setTimeout(digitar, 40);
    } else {
      animacaoConcluida = true;

      setInterval(() => {
        elemento.textContent = atualizarTexto();
      }, 1000);
    }
  }

  digitar();
}

const observer = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting && !animacaoConcluida) {
      escreverTexto(atualizarTexto());
      observer.disconnect();
    }
  },
  { threshold: 0.5 },
);

observer.observe(elemento);

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

const header = document.querySelector(".main-header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
