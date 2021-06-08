const mapa = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
]

// Construindo tabela
const gerarTabela = () => {
    for(let i = 0; i < mapa.length; i++) {
        const tabela = document.getElementById('tabela');
        let divLinha = i;
        divLinha = document.createElement('div');
        divLinha.style.display = 'flex';
        divLinha.classList.add('divLinha');
        tabela.appendChild(divLinha);

        for(let j = 0; j < mapa[i].length; j++) {
            let quadrado = mapa[i][j];
            quadrado = document.createElement('div');
            quadrado.classList.add('quadrado');
            divLinha.appendChild(quadrado);
        }
    }
}

// setTimeout(function () {
//     gerarTabela()
// }, 3000);



