// vai criar uma nova linha para a tabela frutifera.
const addFruteiraTabela = (fruteira) => {
    // Seleciona o corpo da tabela onde as linhas serão inseridas
    const fruteirasTBody = document.getElementById('frutiferaTBody');

    // de acordo com o video que vi no youtube, funciona assim:
    const dataPlantio = new Date(fruteira.dataPlantio);
    //hoje recebe a data de hoje
    const hoje = new Date();
    let meses = (hoje.getFullYear() - dataPlantio.getFullYear()) * 12;
    meses -= dataPlantio.getMonth();
    meses += hoje.getMonth();
    // Garante que a idade não seja negativa se a data for no futuro
    const idadeEmMeses = meses <= 0 ? 0 : meses;

    // Vai formatar a data de plantio para o padrão brasileiro (dia,mes,ano)
    // vai adicionar 'T00:00:00' para evitar problemas com fuso horário 
    const dataFormatada = new Date(fruteira.dataPlantio + 'T00:00:00').toLocaleDateString('pt-BR');

    const fruteiraTr = `<tr>
        <th scope="row">${fruteira.id}</th>
        <td>${fruteira.nomePopular}</td>
        <td>${fruteira.nomeCientifico}</td>
        <td>${fruteira.prodMedia}</td>
        <td>${dataFormatada}</td>
        <td>${idadeEmMeses}</td>
    </tr>`;

    fruteirasTBody.insertAdjacentHTML('beforeend', fruteiraTr);
};

//Carrega as fruteiras salvas no localStorage e as exibe na tabela.


const carregarTabela = () => {
    const fruteiras = JSON.parse(localStorage.getItem('fruteiras')) ?? [];
    for (const fruteira of fruteiras) {
        addFruteiraTabela(fruteira);
    }
};


const setPreparacaoFormValues = (nomeEspecie = '', nomeCientifico = '', producaoMedia = '', dataPlantio = '') => {
    const nomeEspecieInput = document.querySelector('#nomePopular');
    const nomeCientificoInput = document.querySelector('#nomeCientifico');
    const producaoMediaInput = document.querySelector('#prodMedia');
    const dataPlantioInput = document.querySelector('#dataPlantio');

    nomeEspecieInput.value = nomeEspecie;
    nomeCientificoInput.value = nomeCientifico;
    producaoMediaInput.value = producaoMedia;
    dataPlantioInput.value = dataPlantio;
};


//Manipula o evento de envio do formulário de cadastro de fruteira.

const handleSubmit = (event) => {
    event.preventDefault();

    // Dados do formulário -> criação do objeto.
    const form = document.getElementById('frutaCadastrarForm');
    const formData = new FormData(form);
    const fruteira = Object.fromEntries(formData);

    // Adiciona o ID único gerado automaticamente
    fruteira.id = Date.now();

    // Pega os itens que JÁ EXISTEM no localStorage. Se não houver nenhum, cria um array vazio.
    const fruteirasAtuais = JSON.parse(localStorage.getItem('fruteiras')) ?? [];

    // Adiciona a nova fruteira ao array que acabamos de carregar.
    fruteirasAtuais.push(fruteira);

    // Salva o array COMPLETO E ATUALIZADO de volta no localStorage.
    localStorage.setItem('fruteiras', JSON.stringify(fruteirasAtuais));

    // Adicionar na tabela.
    addFruteiraTabela(fruteira);

    // Limpar os valores do formulário.
    form.reset();

    // 1 Fechar o modal.
    //const fruteiraModal = bootstrap.Modal.getInstance(document.getElementById('fruteiraModal'));
    //fruteiraModal.hide();
    
    // 2 Fechar o modal.
    $('#cardapioModal').modal('toggle');

    // Exibe uma notificação de sucesso.
    Toastify({
        text: 'Item do cardápio adicionado com sucesso!',
        duration: 3000,
    }).showToast();
};


// Adiciona os listeners (ouvintes de eventos)
const form = document.getElementById('frutaCadastrarForm');
form.addEventListener('submit', handleSubmit);

let body = document.body;
body.onload = carregarTabela;
