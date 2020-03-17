
 axios.get('https://api.themoviedb.org/3/movie/popular?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES&page=1')
         .then(res=>{
             const peliculas =res.data.results;
             peliculasContainer.innerHTML ='';
             const baseImgUrl= 'https://image.tmdb.org/t/p/w185';
             peliculas.forEach(pelicula=>{
                const imagen = pelicula.poster_path ? `
                <img src="${baseImgUrl}${pelicula.poster_path}" alt="">`:'<h4 class="noimagen">Película no disponible</h4>'
                peliculasContainer.innerHTML+=`
                <div class="pelicula">
                    <h3 class="title">${pelicula.title}
                </h3>
                ${imagen}
            </div>`
            })


         })
        

const peliculasContainer=document.querySelector('main.peliculas');
document.querySelector('.buscarForm')
.addEventListener('submit',event=>{//Poner a escuchar el el evento submit y que la función que viene debajo.
  event.preventDefault();//Para evitar que el evento se ejecute automaticamente por el navegador.
        fetch('https://api.themoviedb.org/3/search/movie?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES&query='+event.target.buscarInput.value) //con fetch vamos a ir a buscar la url de la API y la vamos a concatenar con el valor que introduzca el usario a través de .buscarInput en el lugar del envento.
        .then(res=>res.json())
        .then(res=>{
            const peliculas =res.results;
            peliculasContainer.innerHTML='';
            const baseImgUrl= 'https://image.tmdb.org/t/p/w185';
            peliculas.forEach(pelicula=>{
                const imagen = pelicula.poster_path ? `
                <img src="${baseImgUrl}${pelicula.poster_path}" alt="">`:'<h4 class="noimagen">Película no disponible</h4>'
                peliculasContainer.innerHTML+=`
                <div class="pelicula" onclick="getPeliculaDetailed(${pelicula.id})">
                    <h3 class="title">${pelicula.title}
                </h3>
                ${imagen}
            </div>`
            })
        })

        // axios.get('https://api.themoviedb.org/3/search/movie?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES&query='+event.target.value)
        // .then(res=>{
        //     const peliculas =res.data.results;
        //     peliculasContainer.innerHTML='';
        //     const baseImgUrl= 'https://image.tmdb.org/t/p/w185';
        //     peliculas.forEach(pelicula=>{
        //         const imagen = pelicula.poster_path ? `
        //         <img src="${baseImgUrl}${pelicula.poster_path}" alt="">`:''
        //         peliculasContainer.innerHTML+=`
        //         <div class="pelicula">
        //             <h3 class="title">${pelicula.title}
        //         </h3>
        //         ${imagen}
        //     </div>`
        //     })
        // })
   // }
})

const mainContainer = document.querySelector('main');
const paginah3 = document.getElementById('pagina');
const baseImgUrl = 'https://image.tmdb.org/t/p/w185';
let page = 1;
const getPeliculasPopulares = async (page) => {
    if(page<1) {
        page=1
    }else {
    paginah3.innerText=page;
    const res = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES&page=' + page);
    const peliculas = res.data.results
    mainContainer.innerHTML = '';
    peliculas.forEach(pelicula => {
        mainContainer.innerHTML += `<div class="pelicula" onclick="getPeliculaDetailed(${pelicula.id})">
            <h3>${pelicula.title}</h3>
            <img src="${baseImgUrl}${pelicula.poster_path}" alt="">
        </div>`
    })
}
}
getPeliculasPopulares(page);
// const getPeliculasPopulares =  ()=>{
//      axios.get('https://api.themoviedb.org/3/movie/popular?api_key=cea68b520beecac6718820e4ac576c3a')
//      .then(res=>{
//      })
// }

const getPeliculaDetailed = movie_id=>{
    axios.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES`)
    .then(res=>{
        const pelicula = res.data;
        mainContainer.innerHTML = `<div id="contenedordetalle">
        <div class="pelicula" id="idpelicula>
            <h3 class="titlepelicula">${pelicula.title}</h3>
            <img src="${baseImgUrl}${pelicula.poster_path}" alt="">
            <p class="parrafo">${pelicula.overview}</p>
            </div>
        </div>
        <div>
        <a href="index.html" class="btn btn-primary target="_blank"">Home</a></div>
        
        `
     
    })
}



