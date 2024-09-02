const info = document.getElementById('info')
const btn = document.getElementById('btn-buscar')
const searchTag = document.getElementById('heroname')


let dummy = {
    "response": "success",
    "id": "2",
    "name": "Abe Sapien",
    "powerstats": {
        "intelligence": "88",
        "strength": "28",
        "speed": "35",
        "durability": "65",
        "power": "100",
        "combat": "85"
    },
    "biography": {
        "full-name": "Abraham Sapien",
        "alter-egos": "No alter egos found.",
        "aliases": [
            "Langdon Everett Caul",
            "Abraham Sapien",
            "Langdon Caul"
        ],
        "place-of-birth": "-",
        "first-appearance": "Hellboy: Seed of Destruction (1993)",
        "publisher": "Dark Horse Comics",
        "alignment": "good"
    },
    "appearance": {
        "gender": "Male",
        "race": "Icthyo Sapien",
        "height": [
            "6'3",
            "191 cm"
        ],
        "weight": [
            "145 lb",
            "65 kg"
        ],
        "eye-color": "Blue",
        "hair-color": "No Hair"
    },
    "work": {
        "occupation": "Paranormal Investigator",
        "base": "-"
    },
    "connections": {
        "group-affiliation": "Bureau for Paranormal Research and Defense",
        "relatives": "Edith Howard (wife, deceased)"
    },
    "image": {
        "url": "https://www.superherodb.com/pictures2/portraits/10/100/956.jpg"
    }
}



btn.addEventListener("click", async () => {

    const search = searchTag.value.trim()
    console.log(search);

    let data;
 
    
    if (isNaN(search)) { alert('búsqueda solo por ID numérico'); throw new Error('el tagSearch solo puede ser un numero'); }

    // https://superheroapi.com/api/{access-token}/{character-id}
    try {
        const resp = await fetch(`https://superheroapi.com/api/ce90deb60c2c95c293a710496818246a/${search}`)
        const json = await resp.json()
        data = json
        console.log(data)

    } catch (error) {
        alert('Error en petición, a continuación vista de dummy')
        data = dummy;
    }


    const characterInfo = `
    <div>
        <h1>Información del Personaje</h1>
        <div class="infobox">
            <div>
                <img src="${data.image.url}" alt="${data.name}" style="max-width: 200px;">
            </div>
            <div>
                <p><strong>Nombre:</strong> ${data.name}</p>
                <p><strong>Publicado por:</strong> ${data.biography.publisher}</p>
                <p><strong>Conexiones:</strong> ${data.connections['group-affiliation']}</p>
                <p><strong>Primera aparición:</strong> ${data.biography['first-appearance']}</p>
                <p><strong>Ocupación:</strong> ${data.work.occupation}</p>
                <p><strong>Peso:</strong> ${data.appearance.weight[1]}</p>
                <p><strong>Altura:</strong> ${data.appearance.height[1]}</p>
                <p><strong>Alianzas:</strong> ${data.biography.aliases.join(", ")}</p>
            </div>
        </div>
    </div>
`;

    info.innerHTML = characterInfo;


    const { powerstats } = data

    const dataPoints = Object.keys(powerstats).map(key => ({
        y: parseInt(powerstats[key], 10),
        label: key.charAt(0).toUpperCase() + key.slice(1)
    }));

    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title: {
            text: `Estadísticas de ${data.name}`
        },
        data: [{
            type: "doughnut",
            startAngle: 60,
            indexLabel: "{label} ({y})",
            yValueFormatString: "#,##0",
            dataPoints: dataPoints
        }]
    });
    chart.render();
})
