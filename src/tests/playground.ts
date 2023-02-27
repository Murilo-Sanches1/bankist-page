// + HtmlColletion é diferente de NodeList
// * se for excluido algum elemento do html, nesse caso um botão, essa váriavel tem seu valor atualizado
// * esse comportamento não acontece em NodeList<K>, sempre vai retornar os valores referentes a quando
// * a váriavel foi criada
//   const HTMLColletion = document.getElementsByTagName('button');

// + createElement cria um objeto referente ao tipo específicado, mas não insere sozinho no DOM
// const cookieElement: HTMLDivElement = document.createElement('div');
// cookieElement.classList.add('cookie-message');
//   cookieElement.textContent = 'Nós usamos cookies para melhorar a qualidade de nossos serviços';
// cookieElement.innerHTML = `Nós usamos cookies para melhorar a qualidade de nossos serviços.
//                                 <button class="btn btn--close--cookie">Entendido</button>`;
// const header = HTMLFactory<HTMLElement>('.header');
// + prepend adiciona o elemento como o primeiro filho do pai
// header.prepend(cookieElement);
// + prepend adiciona o elemento como o primeiro filho do pai
// header.append(cookieElement);
// + o mesmo elemento não pode aparecer duas vezes no mesmo lugar
// * mesmo usando prepend e append, só existe um desse elemento na DOM, que foi criado pela última operação
// + para criar duas "instâncias" do mesmo elemento DOM precisa-se clonar primeiro
//   header.prepend(cookieElement.cloneNode(true));
// + inserindo elementos antes e depois do header em si
// * muito parecido com insertadjacentelement, mas parece ser mais moderno
//   header.before(cookieElement)
//   header.after(cookieElement)
// HTMLFactory<HTMLButtonElement>('.btn--close--cookie').addEventListener('click', () => {
// + deleta o node da DOM - método "recente"
//   cookieElement.remove();
// + jeito antigo
// cookieElement.parentElement?.removeChild(cookieElement)
// });

// cookieElement.style.backgroundColor = '#37383d';
// cookieElement.style.width = '120%';
// + vazio, só conseque pegar valores que também estão inline, não consegue pegar propriedades do CSS externo
// console.log(cookieElement.style.color);
// console.log(getComputedStyle(cookieElement).height);
// cookieElement.style.height = Number.parseFloat(getComputedStyle(cookieElement).height) + 40 + 'px';

// document.documentElement.style.setProperty('--color-primary', 'red');

// const logo = HTMLFactory<HTMLImageElement>('.nav__logo');
// console.log(logo.src); // + caminho absoluto
// console.log(logo.getAttribute('src')); // + caminho relativo
// console.log(logo.className);
// console.log(logo.logo); // + undefined porque essa propriedade não existe na tipagem
// console.log(logo.getAttribute('logo')); // + agora sim da certo
// console.log(logo.setAttribute('dev', 'murilo'));
// console.log(logo.dataset);

// + selecionando filhos
// const h1 = document.querySelector('h1')!;
// * querySelector atribuído a um elemento seleciona somente os filhos desse elemento
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes); // * filhos diretos de todos os tipos de Node

// * elementos diretos filhos do h1 - retorna um HTMLColletion
// console.log(h1.children);
// (h1!.firstElementChild as HTMLElement).style.color = 'white';
// (h1!.lastElementChild as HTMLElement).style.color = 'black';

// + selecionando pais
// console.log(h1.parentNode);
// console.log(h1.parentElement);
// * digamos que existam diversos elementos pais com a mesma classe na DOM, mas estamos buscando o pai
// * mais próximo do h1
// console.log(h1.closest('.header'));
// * retorna o elemento h1 mais próximo do h1, ou seja, ele mesmo
// console.log(h1.closest('h1'));
// h1.closest('h1')?.style.backgroundColor = 'black';
// * seleciona somente o irmão da frente ou o de trás, não o irmão com mais de uma "casa"
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);
// console.log(h1.previousSibling);
// console.log(h1.nextSibling);
// * celecionar todos os irmãos acessando primeiro o elemento pai
// console.log(h1.parentElement?.children);
// [...h1.parentElement?.children].forEach((el) =>
//   el !== h1 ? (el.style.transform = 'scale(0.5') : ''
// );
