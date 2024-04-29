const listaDeVideos = document.querySelector('.videos__container');
// const api = fetch('http://localhost:3000/videos')
// .then( res => res.json())
// .then( (videos) => {
//     videos.forEach(video => {
      
//         listaDeVideos.innerHTML += `
//             <li>
//                 <iframe src="${video.url}">
//             </li>
//         `
//     })
// })

async function buscaApi(){
    try{
        const api = await  fetch('http://localhost:3000/videos')
        const apiConvertida = await api.json()
        apiConvertida.forEach(video => {

        if(video.categoria == ""){
            throw new Error("Video sem categoria!");
        }

          listaDeVideos.innerHTML += `
          <li class="videos__item">
            <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
            <div class="descricao-video">
                    <img class="img-canal" src="${video.imagem} alt="Logo do Canal">
                    <h3 class="titulo-video">${video.titulo}</h3>
                    <p class="titulo-canal">${video.descricao}</p>
                    <p class="categoria-video" hidden>${video.categoria}</p>
            </div>
          </li>`  
        })
    }catch(error){
        listaDeVideos.innerHTML = `<p>Parece que tivemos um problema: ${error}</p>`
    }
}

buscaApi()

const campoDeBusca = document.querySelector('.pesquisar__input');

campoDeBusca.addEventListener('input', filtrarVideos);

function filtrarVideos(){
    
    const videos = document.querySelectorAll('.videos__item');
    videos.forEach( video => {
        
        let titulo = video.querySelector('.titulo-video').textContent.toLowerCase();
        let valorPesquisa = campoDeBusca.value.toLowerCase();

        if(valorPesquisa != ""){            
            if(!titulo.includes(valorPesquisa)){
                video.style.display = 'none';
            }else{
                video.style.display = 'block';
            }
        }else{
            video.style.display = 'block';
        }
    })

}

const btCategoria = document.querySelectorAll('.superior__item');

// for(i = 0; i < btCategoria.length; i++){

//     const categoriaClicada = btCategoria[i];    
//     categoriaClicada.onclick = ()=> {
//         let categoria = categoriaClicada.getAttribute('name');
//         filtrarCategoria(categoria);
//     }
// }

btCategoria.forEach( botao => {
    const categoria = botao.getAttribute('name');
    botao.addEventListener('click', ()=> filtrarCategoria(categoria));
})

function filtrarCategoria(valor){
    const videos = document.querySelectorAll('.videos__item');

    videos.forEach( video => {
        let categoriaVideo = video.querySelector('.categoria-video').textContent;

        if(valor == 'Tudo'){
            video.style.display = 'block';            
        }else{
            if(valor != categoriaVideo){
                video.style.display = 'none';
            }else{
                video.style.display = 'block';
            }

        }
    })
}