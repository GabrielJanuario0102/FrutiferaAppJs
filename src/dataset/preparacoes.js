let fruteirasCard = [
    {
        
        imagem: "/assets/imagens/morango.jpg",
        nomePopular: "Morango",
        nomeCientifico: "Fragaria x ananassa",
        producaoMedia: "185",
        dataPlantio: "2019-06-15"
    },
    {
    
        imagem: "/assets/imagens/abacate.jpg",
        nomePopular: "Abacate",
        nomeCientifico: "Pyrus communis",
        producaoMedia: "200",
        dataPlantio: "2021-06-10"
    },
    {
        
        imagem: "/assets/imagens/manga.jpg",
        nomePopular: "Manga",
        nomeCientifico: "Mangifera indica",
        producaoMedia: "90",
        dataPlantio: "2022-09-20"
    },
    {
        
        imagem: "/assets/imagens/maca.jpg",
        nomePopular: "Maça",
        nomeCientifico: "Malus domestica",
        producaoMedia: "200",
        dataPlantio: "2022-03-05"
    }
];

let listaFruteiras = JSON.parse(localStorage.getItem('fruteiras'));
for (let itemListaFruteiras of listaFruteiras) {
    fruteirasCard.push(itemListaFruteiras);
}

let preparacoesfrutas = [];

let inserirfrutas = () => { };
// Exporta as variáveis para que possam ser usadas em outros arquivos .
export { fruteirasCard, preparacoesfrutas, inserirfrutas };
