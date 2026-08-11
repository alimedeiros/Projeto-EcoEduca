const menu = document.querySelector('#menu'),
    nav = document.querySelector('nav');

menu.onclick = () => nav.classList.toggle('open');

document.querySelectorAll('nav a').forEach(a =>
    a.onclick = () => nav.classList.remove('open')
);

document.querySelectorAll('.actions button').forEach(b =>
    b.onclick = () => {
        const t = document.querySelector('#tip');

        t.textContent = '💚 ' + b.dataset.tip;
        t.style.display = 'block';
    }
);

const qs = [
    [
        'Qual é o principal objetivo da ODS 4?',
        [
            'Promover educação de qualidade',
            'Aumentar o consumo',
            'Reduzir o acesso à tecnologia',
            'Estimular o desperdício'
        ],
        0
    ],
    [
        'A ODS 13 está relacionada principalmente a:',
        [
            'Mudanças climáticas',
            'Turismo',
            'Esportes',
            'Transporte escolar'
        ],
        0
    ],
    [
        'Qual atitude ajuda a reduzir o desperdício?',
        [
            'Reutilizar materiais',
            'Deixar aparelhos ligados',
            'Desperdiçar água',
            'Comprar sem necessidade'
        ],
        0
    ],
    [
        'Por que a educação ambiental é importante?',
        [
            'Ajuda a compreender problemas e atitudes sustentáveis',
            'Serve apenas para decorar conceitos',
            'Substitui políticas públicas',
            'Impede o uso de tecnologia'
        ],
        0
    ],
    [
        'Qual ação contribui para um futuro sustentável?',
        [
            'Economizar recursos e compartilhar conhecimento',
            'Ignorar informações ambientais',
            'Aumentar o desperdício',
            'Evitar aprender sobre o clima'
        ],
        0
    ]
];

let n = 0,
    score = 0,
    locked = false;

const q = document.querySelector('#question'),
    ans = document.querySelector('#answers'),
    count = document.querySelector('#count'),
    bar = document.querySelector('#bar'),
    next = document.querySelector('#next');

function load() {
    locked = false;

    next.disabled = true;
    next.textContent = n === qs.length - 1 ? 'Ver resultado' : 'Próxima';

    count.textContent = `Pergunta ${n + 1} de ${qs.length}`;
    q.textContent = qs[n][0];

    bar.style.width = `${n / qs.length * 100}%`;

    ans.innerHTML = '';

    qs[n][1].forEach((x, i) => {
        let b = document.createElement('button');

        b.className = 'answer';
        b.textContent = x;
        b.onclick = () => choose(b, i);

        ans.appendChild(b);
    });
}

function choose(btn, i) {
    if (locked) return;

    locked = true;

    let c = qs[n][2];

    document.querySelectorAll('.answer').forEach((b, j) => {
        b.disabled = true;

        if (j === c)
            b.classList.add('correct');
    });

    if (i === c)
        score++;
    else
        btn.classList.add('wrong');

    next.disabled = false;
}

next.onclick = () => {
    if (n < qs.length - 1) {
        n++;
        load();
    } else {
        bar.style.width = '100%';

        count.textContent = 'Resultado';

        q.textContent = `Você acertou ${score} de ${qs.length}!`;

        ans.innerHTML = '<p>🌱 Continue aprendendo e compartilhando conhecimento.</p>';

        next.textContent = 'Refazer quiz';
        next.disabled = false;

        next.onclick = () => {
            n = 0;
            score = 0;
            next.onclick = nextAction;

            load();
        };
    }
};

function nextAction() {
    if (n < qs.length - 1) {
        n++;
        load();
    } else {
        bar.style.width = '100%';
    }
}

load();