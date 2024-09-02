const info = document.getElementById('info')
const formulario = document.getElementById('formulario')
const searchTag = document.getElementById('heroname')


let dummy = {
    "response": "success",
    "id": "213",
    "name": "Deadpool",
    "powerstats": {
    "intelligence": "69",
    "strength": "32",
    "speed": "50",
    "durability": "100",
    "power": "100",
    "combat": "100"
    },
    "biography": {
    "full-name": "Wade Wilson",
    "alter-egos": "Evil Deadpool, Venompool",
    "aliases": [
    "Wade Wilson",
    "Jack",
    "Chiyonosake (\"the Wolf of the Rice Wine\")",
    "Rhodes",
    "Corpus",
    "Lopez",
    "Hobgoblin",
    "Thom Cruz",
    "Peter Parker"
    ],
    "place-of-birth": "Canada",
    "first-appearance": "New Mutants #98 (February, 1991)",
    "publisher": "Evil Deadpool",
    "alignment": "neutral"
    },
    "appearance": {
    "gender": "Male",
    "race": "Mutant",
    "height": [
    "6'2",
    "188 cm"
    ],
    "weight": [
    "210 lb",
    "95 kg"
    ],
    "eye-color": "Brown",
    "hair-color": "No Hair"
    },
    "work": {
    "occupation": "Mercenary; former enforcer, government operative, sumo wrestler, soldier, assassin, anti-hero, others",
    "base": "Cavern-X, Sedona, Arizona, Mobile"
    },
    "connections": {
    "group-affiliation": "Thunderbolts (Strike Team), shares body with Agent Preston; formerly X-Force, Deadpool Corps, Agency X, S.H.I.E.L.D.; Code Red, Six Pack, One World Church, DP Inc., Weapon X, Weapon Plus, Heroes for Hire, Secret Defenders, Frightful Four, Team Deadpool, L",
    "relatives": "Thomas \"Mickey\" Wilson (father, deceased); Hailey Wilson (mother, deceased); Gretchen Wilson, Orksa (ex-wives); Evil Deadpool (clone); Widdle Wade (clone)"
    },
    "image": {
    "url": "https://www.superherodb.com/pictures2/portraits/10/100/835.jpg"
    }
    }



formulario.addEventListener("submit",async function (event){

    event.preventDefault();
    const search = searchTag.value.trim()
    console.log(search);

    let data;
 
    
    if (isNaN(search)) { alert('búsqueda solo por ID numérico'); throw new Error('el tagSearch solo puede ser un numero'); }

    // https://superheroapi.com/api/{access-token}/{character-id}
    try {
        const resp = await fetch(`https://superheroapi.com/api.php/ce90deb60c2c95c293a710496818246a/${search}`)
        const json = await resp.json()
        data = json
        if(data.response ==="error"){throw new Error(data.response.error)}

    } catch (error) {
        alert('Error en petición, a continuación vista de dummy DEADPOOL')
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
