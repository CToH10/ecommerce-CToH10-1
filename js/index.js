let listaProdutos     = document.querySelector(".produtosDisponiveis")
let produtosCarrinhos = document.querySelector(".produtosCarrinhos")
let acessarCarrinho   = document.querySelector(".carrinho")

let carrinhoDeProdutos = []
let tags               = ["Todos", "Acessórios", "Calçados", "Camisetas"]
let produtosClicados   = []

function produtosDisponiveis(){
    listaProdutos.innerHTML = ``

    clicarIdentididade()
    navegacaoFuncional()
    barraDePesquisa()
    criarProdutos()
}

function criarProdutos(){
    for (let i = 0; i < data.length; i++){
        let exibirProduto     = document.createElement("li")
        let imagemProduto     = document.createElement("img")
        let categoriasLista   = document.createElement("ul")
        let categorias        = document.createElement("li")
        let tituloProduto     = document.createElement("h3")
        let descricaoProduto  = document.createElement("p")
        let precoProduto      = document.createElement("strong")
        let adicionarCarrinho = document.createElement("button")

        exibirProduto.classList.add("produto")
        imagemProduto.classList.add("imagemProduto")
        categoriasLista.classList.add("categoriasProduto")
        categorias.classList.add("cadaCategoria")
        tituloProduto.classList.add("tituloProduto")
        descricaoProduto.classList.add("descricaoProduto")
        precoProduto.classList.add("precoProduto")
        adicionarCarrinho.classList.add("adicionarCarrinho")

        imagemProduto.src           = `${data[i].img}`
        imagemProduto.alt           = `${data[i].nameItem}`
        tituloProduto.innerHTML     = `${data[i].nameItem}`
        descricaoProduto.innerHTML  = `${data[i].description}`
        precoProduto.innerHTML      = `R$ ${data[i].value},00`
        adicionarCarrinho.innerText = `Adicionar ao carrinho`
        
        for (let c = 0; c < data[i].tag.length; c++){
            categorias.innerHTML = `${data[i].tag[c]}`
        }

        exibirProduto.append(imagemProduto, categoriasLista, tituloProduto, descricaoProduto, precoProduto, adicionarCarrinho)
        categoriasLista.appendChild(categorias)

        let identificar = data[i]

        adicionarCarrinho.addEventListener("click", function(){
            if (carrinhoDeProdutos.length == 0){
                criarCarrinho()
            }
            carrinhoDeProdutos.push(identificar)
            adicionarAoCarrinho()
        })

        listaProdutos.appendChild(exibirProduto)
    }
}

produtosDisponiveis()

function adicionarAoCarrinho(){
    produtosCarrinhos.innerHTML = ``
    let valorTotal = 0
    for (let i = 0; i < carrinhoDeProdutos.length; i++){
        let produtosAdicionados   = document.createElement("li")
        let adicionadoImagem      = document.createElement("div")
        let imagemAdicionada      = document.createElement("img")
        let adicionadoInformacoes = document.createElement("div")
        let adicionadoTitulo      = document.createElement("h3")
        let adicionadoPreco       = document.createElement("p")
        let removerAdicionado     = document.createElement("button")

        produtosCarrinhos.classList.add("overflow")
        produtosAdicionados.classList.add("produtosAdicionados")
        adicionadoImagem.classList.add("adicionadoImagem")
        imagemAdicionada.classList.add("adicionadoImagem")
        adicionadoInformacoes.classList.add("adicionadoInformacoes")
        adicionadoTitulo.classList.add("adicionadoTitulo")
        adicionadoPreco.classList.add("adicionadoPreco")
        removerAdicionado.classList.add("removerAdicionado")

        produtosAdicionados.append(adicionadoImagem, adicionadoInformacoes)
        adicionadoImagem.appendChild(imagemAdicionada)
        adicionadoInformacoes.append(adicionadoTitulo, adicionadoPreco, removerAdicionado)

        imagemAdicionada.src        = `${carrinhoDeProdutos[i].img}`
        imagemAdicionada.alt        = `${carrinhoDeProdutos[i].nameItem}`
        adicionadoTitulo.innerHTML  = `${carrinhoDeProdutos[i].nameItem}`
        adicionadoPreco.innerHTML   = `R$ ${carrinhoDeProdutos[i].value},00`
        removerAdicionado.innerText = `Remover produto`


        removerAdicionado.addEventListener("click", function(event){
            removerProduto(event)
        })

        valorTotal += carrinhoDeProdutos[i].value

        produtosCarrinhos.appendChild(produtosAdicionados)
    }
    atualizarCarrinho(valorTotal)
}

function criarCarrinho(){
    let atualCarrinho      = document.createElement("div")
    let quantidadeProdutos = document.createElement("div")
    let somaProdutos       = document.createElement("h2")
    let atualQuantidade    = document.createElement("p")
    let precoTotal         = document.createElement("div")
    let infoTotal          = document.createElement("h2")
    let atualPreco         = document.createElement("p")

    atualCarrinho.classList.add("atualCarrinho")
    quantidadeProdutos.classList.add("quantidadeProdutos")
    somaProdutos.classList.add("somaProdutos")
    atualQuantidade.classList.add("atualQuantidade")
    precoTotal.classList.add("precoTotal")
    infoTotal.classList.add("infoTotal")
    atualPreco.classList.add("atualPreco")

    quantidadeProdutos.append(somaProdutos, atualQuantidade)
    precoTotal.append(infoTotal, atualPreco)
    atualCarrinho.append(quantidadeProdutos, precoTotal)

    acessarCarrinho.appendChild(atualCarrinho)
}

function atualizarCarrinho (valorTotal){
    let atualCarrinho      = document.querySelector(".atualCarrinho")
    let somaProdutos       = document.querySelector(".somaProdutos")
    let atualQuantidade    = document.querySelector(".atualQuantidade")
    let infoTotal          = document.querySelector(".infoTotal")
    let atualPreco         = document.querySelector(".atualPreco")

    somaProdutos.innerHTML    = `Quantidade:`
    atualQuantidade.innerHTML = carrinhoDeProdutos.length
    infoTotal.innerHTML       = `Total:`
    atualPreco.innerHTML      = `R$ ${valorTotal},00`

    if (carrinhoDeProdutos.length == 0){
        let nenhumItem    = document.createElement("li")
        let carrinhoVazio = document.createElement("h2")
        let infoVazio     = document.createElement("p")

        nenhumItem.classList.add("vazio")
        carrinhoVazio.classList.add("carrinhoVazio")
        infoVazio.classList.add("infoVazio")

        carrinhoVazio.innerText = "Carrinho vazio"
        infoVazio.innerText     = "Adicione itens"
        atualCarrinho.remove()
        nenhumItem.append(carrinhoVazio, infoVazio)
        produtosCarrinhos.appendChild(nenhumItem)
    }
}

function removerProduto(event){
    produtosCarrinhos.classList.remove("overflow")
    let divARemover     = event.composedPath()[1]
    let produtoARemover = divARemover.querySelector("h3")
    let aRemover        = event.composedPath()[2]

    for (let i = 0; i < carrinhoDeProdutos.length; i++){
        if (produtoARemover.innerText == carrinhoDeProdutos[i].nameItem){
            aRemover.remove()
            carrinhoDeProdutos.splice(i, 1)
            adicionarAoCarrinho()  
            return `Produto removido`
        }
    }
}

function navegacaoFuncional(){
    let secoes      = document.querySelector(".secoes ul")
    for (let i = 0; i < tags.length; i++){
        
        let secoesLista = document.createElement("li")
        let secoesLink  = document.createElement("a")

        if (i == 0){
            secoesLista.classList.add("active")
        }

        secoesLink.setAttribute("target", "_blank")
        secoesLink.setAttribute("href", "http://")
        secoesLink.setAttribute("rel", "noopener noreferrer")

        secoes.appendChild(secoesLista)
        secoesLista.appendChild(secoesLink)

        secoesLink.innerHTML = `${tags[i]}`
        secoesLink.addEventListener("click", function(event){
            event.preventDefault()
            
            removerAtivo(event)
            event.composedPath()[1].classList.add("active")
            exibirApenas(event)
            normalizarLista()
    })
    }
}

function adicionarProduto(img, nameItem, description, value, tag){
    let novoProduto = {
        id: data.length + 1,
        img: img,
        nameItem: nameItem,
        description: description,
        value: value,
        tag: tag
    }
    data.push(novoProduto)
    if (tags.includes(tag)){
    } else {
        tags.push(tag)
    }
}

function removerAtivo(event){
    let tamanho = event.composedPath()[2].children.length
    for (let i = 0; i < tamanho; i++){
        let ativoAtual = event.composedPath()[2].children[i]
        if(ativoAtual.classList.contains("active") == true){
            ativoAtual.classList.remove("active")
        }
    }
}

function exibirApenas(event){
    listaProdutos.innerHTML = ``
    produtosClicados = []
    let clicado = event.composedPath()[0].innerHTML
    
    for (let c = 0; c < data.length; c++){
        if (clicado == data[c].tag[0]){
            produtosClicados.push(data[c])
        }
    }

    if (clicado == "Todos"){
        criarProdutos()
    } else if (produtosClicados.length == 0){
        let nenhumItemEncontrado    = document.createElement("li")
        let nenhumProdutoEncontrado = document.createElement("h2")

        nenhumItemEncontrado.appendChild(nenhumProdutoEncontrado)
        listaProdutos.appendChild(nenhumItemEncontrado)

        nenhumProdutoEncontrado.classList.add("nenhum")

        nenhumProdutoEncontrado.innerHTML = `Nenhum produto encontrado :(`
    }
    

    for (let i = 0; i < produtosClicados.length; i++){
        let exibirProduto     = document.createElement("li")
        let imagemProduto     = document.createElement("img")
        let categoriasLista   = document.createElement("ul")
        let categorias        = document.createElement("li")
        let tituloProduto     = document.createElement("h3")
        let descricaoProduto  = document.createElement("p")
        let precoProduto      = document.createElement("strong")
        let adicionarCarrinho = document.createElement("button")

        exibirProduto.classList.add("produto")
        imagemProduto.classList.add("imagemProduto")
        categoriasLista.classList.add("categoriasProduto")
        categorias.classList.add("cadaCategoria")
        tituloProduto.classList.add("tituloProduto")
        descricaoProduto.classList.add("descricaoProduto")
        precoProduto.classList.add("precoProduto")
        adicionarCarrinho.classList.add("adicionarCarrinho")

        imagemProduto.src           = `${produtosClicados[i].img}`
        imagemProduto.alt           = `${produtosClicados[i].nameItem}`
        tituloProduto.innerHTML     = `${produtosClicados[i].nameItem}`
        descricaoProduto.innerHTML  = `${produtosClicados[i].description}`
        precoProduto.innerHTML      = `R$ ${produtosClicados[i].value},00`
        adicionarCarrinho.innerText = `Adicionar ao carrinho`
        
        for (let c = 0; c < produtosClicados[i].tag.length; c++){
            categorias.innerHTML = `${produtosClicados[i].tag[c]}`
        }

        exibirProduto.append(imagemProduto, categoriasLista, tituloProduto, descricaoProduto, precoProduto, adicionarCarrinho)
        categoriasLista.appendChild(categorias)

        let identificar = produtosClicados[i]

        adicionarCarrinho.addEventListener("click", function(){
            if (carrinhoDeProdutos.length == 0){
                criarCarrinho()
            }
            carrinhoDeProdutos.push(identificar)
            adicionarAoCarrinho()
        })

        listaProdutos.appendChild(exibirProduto)
    }
}

function barraDePesquisa(){
    let botaoPesquisar = document.querySelector(".pesquisar .pesquisar button")

    botaoPesquisar.addEventListener("click", function(event){
        produtosClicados = []
        event.preventDefault()
        listaProdutos.innerHTML = ``
        procurarPorNome()
    })
    
}

function procurarPorNome(){
    let pesquisaDeProduto = document.querySelector(".pesquisaDeProduto")
    for (let i = 0; i < data.length; i++){
        let nomeItem = data[i].nameItem
        if (pesquisaDeProduto.value == "tshirt"){
            pesquisaDeProduto.value = "t-shirt"
        }
        let pesquisaNormalizada = pesquisaDeProduto.value.split(" ")
        for (let z = 0; z < pesquisaNormalizada.length; z++){
            let pesquisaUpper = pesquisaNormalizada[z].charAt(0).toUpperCase() + pesquisaNormalizada[z].slice(1)
            if (pesquisaUpper == "T-shirt"){
                pesquisaUpper = "T-Shirt"
            }
            if ((nomeItem.includes(pesquisaUpper)) == true){
                produtosClicados.push(data[i])
            }
        }
    }

    for (let p = 0; p < produtosClicados.length; p++){
            listaProdutos.innerHTML = ``
            for (let i = 0; i < produtosClicados.length; i++){
                let exibirProduto     = document.createElement("li")
                let imagemProduto     = document.createElement("img")
                let categoriasLista   = document.createElement("ul")
                let categorias        = document.createElement("li")
                let tituloProduto     = document.createElement("h3")
                let descricaoProduto  = document.createElement("p")
                let precoProduto      = document.createElement("strong")
                let adicionarCarrinho = document.createElement("button")
        
                exibirProduto.classList.add("produto")
                imagemProduto.classList.add("imagemProduto")
                categoriasLista.classList.add("categoriasProduto")
                categorias.classList.add("cadaCategoria")
                tituloProduto.classList.add("tituloProduto")
                descricaoProduto.classList.add("descricaoProduto")
                precoProduto.classList.add("precoProduto")
                adicionarCarrinho.classList.add("adicionarCarrinho")
        
                imagemProduto.src           = `${produtosClicados[i].img}`
                imagemProduto.alt           = `${produtosClicados[i].nameItem}`
                tituloProduto.innerHTML     = `${produtosClicados[i].nameItem}`
                descricaoProduto.innerHTML  = `${produtosClicados[i].description}`
                precoProduto.innerHTML      = `R$ ${produtosClicados[i].value},00`
                adicionarCarrinho.innerText = `Adicionar ao carrinho`
                
                for (let c = 0; c < produtosClicados[i].tag.length; c++){
                    categorias.innerHTML = `${produtosClicados[i].tag[c]}`
                }
        
                exibirProduto.append(imagemProduto, categoriasLista, tituloProduto, descricaoProduto, precoProduto, adicionarCarrinho)
                categoriasLista.appendChild(categorias)
        
                let identificar = produtosClicados[i]
        
                adicionarCarrinho.addEventListener("click", function(){
                    if (carrinhoDeProdutos.length == 0){
                        criarCarrinho()
                    }
                    carrinhoDeProdutos.push(identificar)
                    adicionarAoCarrinho()
                })
        
                listaProdutos.appendChild(exibirProduto)
            }
    }
    if (produtosClicados.length == 0){
        let nenhumItemEncontrado    = document.createElement("li")
        let nenhumProdutoEncontrado = document.createElement("h2")

        nenhumItemEncontrado.appendChild(nenhumProdutoEncontrado)
        listaProdutos.appendChild(nenhumItemEncontrado)

        nenhumProdutoEncontrado.classList.add("nenhum")

        nenhumProdutoEncontrado.innerHTML = `Nenhum produto encontrado :(`
    }
    normalizarLista()
}

function normalizarLista(){
    if (produtosClicados.length == 2 || produtosClicados.length == 1){
        listaProdutos.style.justifyContent = "space-evenly"
    } else {
        listaProdutos.style.justifyContent = "space-between"
    }
}

function clicarIdentididade (){
    let identidade = document.querySelector(".identidade h2 a")
    identidade.addEventListener("click", function(event){
        listaProdutos.innerHTML = ``
        event.preventDefault()
        criarProdutos()
    })
}