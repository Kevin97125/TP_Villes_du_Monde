class WorldCities extends AbstractApp {
    constructor(containerDiv) {
        super(containerDiv);

        this.baseTowns = [];
        this.towns = [];
        this.indexer;
        this.searchIpt;
    }

    set index(value){

    }

    init(dataSource) {
        this.initTowns(dataSource);
        this.initIndexer();
        this.initInput();
        this.loadTown(0);
        super.init(dataSource);
    }

    initTowns(dataSource){
        for (const town of dataSource.towns) {
            // console.log(town);

            const city = new City(town);
            this.baseTowns.push(city);
        }
    }

    loadTown(index){
        const town = this.baseTowns[index];
       
        const leftContainerDiv = this.containerDiv.querySelector("#left_container");
        const leftContainerDivH2 = leftContainerDiv.querySelector("h2");
        const desc = this.containerDiv.querySelector("#desc");

        const rightContainerDiv = this.containerDiv.querySelector("#right_container");
        const townNameDiv = this.containerDiv.querySelector("#town_name");
        const townNameDivH3 = townNameDiv.querySelector("h3");
        const townNameDivH4 = townNameDiv.querySelector("h4");

        leftContainerDivH2.innerHTML = '<a href="' + town.link + '" target="blank">' + town.name + '</a>';
        desc.innerHTML = town.description;

        townNameDivH3.textContent = town.name;
        const sup = town.region == "" ? town.state : town.region;
        townNameDivH4.innerHTML = '<i>' + town.country + ", " + sup + '</i>';

        this.loadGallery(town.images);

        const townMiscRight = this.containerDiv.querySelector("#town_misc_content_right");
        const ulMajor = townMiscRight.querySelectorAll("li")[0];
        const ulInhabitants = townMiscRight.querySelectorAll("li")[1];

        ulMajor.textContent = town.major;
        ulInhabitants.textContent = town.inhabitants;
    }

    loadGallery(images){
        const gallery = this.containerDiv.querySelector("#gallery");
        const galleryDivs = gallery.querySelectorAll("div");
        for (const div of galleryDivs) {
            div.remove();
        }
        for (const image of images) {
            const div = document.createElement("div");
            const img = document.createElement("img");
            img.src = "image/" + image.url;
            img.className = "gallery_img";
            div.appendChild(img);

            const h6 = document.createElement("h6");
            h6.textContent = image.caption;
            div.appendChild(h6);
            gallery.appendChild(div);
        }
    }

    searchInputHandler(){
        
        
    }

    clearSearchInputHandler(){

    }

    refresh(){

    }

    filterElement(arr, filter){

    }

    initInput(){
        this.searchIpt = new SearchInput(this.containerDiv.querySelector("#search"));
        this.searchIpt.addEventListener(SearchInputEventNames.SEARCH_INPUT, function () {
            this.searchInputHandler();
        }.bind(this));
    }

    indexerIndexChangeHandler(){
        this.loadTown(this.indexer.index);
    }

    initIndexer(){
        const optionsDiv = this.containerDiv.querySelector("#options");
        this.indexer = new Indexer(optionsDiv, this.baseTowns.length, indexerMode.LOOP);
        console.log(this.indexer);
        this.indexer.addEventListener(IndexerEventNames.INDEX_CHANGED, function(){
            this.indexerIndexChangeHandler();
        }.bind(this));
    }
}

const SearchInputEventNames = {
    SEARCH_INPUT: "search_input",
    CLEAR_SEARCH_INPUT: "clear_search_input"
}

class SearchInputEvent extends CustomEvent {
    constructor(type, options) {
        super(type, options);
    }
}

class SearchInput extends AbstractUIComponent {
    constructor(UIView) {
        super(UIView);

        // Codez ici les propriétés définies dans le diagramme de classes.
        this.boundSearchInputHandler = this.searchInputHandler.bind(this);
        
        this.boundClearSearchHandler;
        this.init();
    }

    get value() {
        return super.value;
    }

    set value(value){

    }

    searchInputHandler(evt) {
        // Codez cette méthode. Adaptation en classe du TP Citation.
        console.log(this);
        this.dispatchEvent(new SearchInputEvent(SearchInputEventNames.SEARCH_INPUT));
    }

    clearSearchHandler() {
        // Codez cette méthode. Adaptation en classe du TP Citation.
    }

    checkClearButton() {
        // Codez cette méthode. Adaptation en classe du TP Citation.
    }

    init() {
        // Appelez ici les méthodes d'initialisation du composant décrites dans le diagrammes de classe.
        this.searchIpt = this.UIView.querySelector("#search_ipt");
        this.searchIpt.addEventListener(EventNames.INPUT, this.boundSearchInputHandler);

        super.init();
    }
}

const indexerMode = {
    NONE: 1,
    LOOP: 2
}

const indexerDirection = {
    NEXT: "next",
    PREVIOUS: "previous"
}

const IndexerEventNames = {
    INDEX_CHANGED: "index_changed"
}

class IndexerEvent extends CustomEvent {
    constructor(type, options) {
        super(type, options);
    }
}

class Indexer extends AbstractUIComponent {
    constructor(UIView, total, mode = indexerMode.NONE) {
        super(UIView);

        // Codez ici les propriétés définies dans le diagramme de classes.
        this.total = total;
        this.index = 0;
        this.indexerMode = mode;
        this.nextBtn;
        this.previousBtn;
        this.init();
    }

    set mode(value) {
        this.indexerMode = value;
    }

    set totalItems(value) {
        this.total = value;
        this.setNumbers();
    }

    get value() {
        return super.value;
    }

    set value(value) {
        this.index = value;
        this.checkIndex();
        super.value = value;
    }

    init() {
        // Appelez ici les méthodes d'initialisation du composant décrites dans le diagrammes de classe.
        this.initButtons();
        this.setNumbers();
        super.init();
    }

    // Adaptation en méthode de la fonction du TP Citations. Déjà codée pour vous. :)
    changeIndex(direction) {
        direction == indexerDirection.NEXT ? this.index++ : this.index--;
        
        this.checkIndex();
    }

    checkIndex() {
        // Codez cette méthode. Adaptation en classe du TP Citation.
        const min = 0;
        const max = this.total - 1;

        if (this.index < min) {
            this.index = max;
        }

        if (this.index > max) {
            this.index = min;
        }

        this.setNumbers();
        this.dispatchEvent(new IndexerEvent(IndexerEventNames.INDEX_CHANGED));
    }

    setNumbers() {
        // Codez cette méthode. Adaptation en classe du TP Citation.
        const indexDiv = this.UIView.querySelector("#index");
        indexDiv.textContent = this.getZeroFormat(this.index + 1, this.total) + "/" + this.total;
        
        
    }

    // Adaptation en méthode de la fonction du TP Citations. Déjà codée pour vous. :)
    getZeroFormat(num, limit) {
        const sNum = num.toString();
        const sLimit = limit.toString();
        const numZero = sLimit.length - sNum.length;
        let start = 0;
        let zero = "";
        while (start < numZero) {
            zero += "0";
            start++;
        }
        const format = zero + sNum;
        return format
    }

    initButtons() {
        // Codez cette méthode. Adaptation en classe du TP Citation.
        const nextDiv = this.UIView.querySelector("#next");
        const previousDiv = this.UIView.querySelector("#previous");
        const divs = [nextDiv, previousDiv];
        for (const div of divs) {
            console.log("div", div);
            
            const indexerBtn = new IndexerButton(div);
            indexerBtn.addEventListener(EventNames.CLICK, function () {
                this.changeIndex(indexerBtn.buttonDiv == nextDiv ? indexerDirection.NEXT : indexerDirection.PREVIOUS);
            }.bind(this));
            indexerBtn.disable(false);
        }
    }

}

class IndexerButton extends AbstractButton {
    constructor(buttonDiv) {
        super(buttonDiv);
    }

    disable(bool = true) {
        // Codez cette méthode pour changer la couleur des boutons via la classe CSS. Adaptation en classe du TP Citation.
        // buttonDiv.className = bool ? "disabled" : "buttonNextPrevious";
        super.disable(bool);
    }
}

const IndexerDirection = {
    NEXT: 1,
    PREVIOUS: 2
}

// Classe à utiliser pour stocker chaque ville des données chargées du fichier externe datas.json.
class City {
    constructor(dataSource) {
        this.country = dataSource.country;
        this.description = dataSource.description;
        this.images = dataSource.images;
        this.inhabitants = dataSource.inhabitants;
        this.major = dataSource.major;
        this.name = dataSource.name;
        this.region = dataSource.region;
        this.state = dataSource.state;
        this.link = dataSource.link;
    }
}

// Fonction de chargement du fichier externe datas.json. A NE PAS TOUCHER.
async function loadDatas() {
    const response = await fetch("data/datas.json")
        .then(response => response.json())
        .then(json => worldCities.init(json)
        );
}

function appInitHandler(evt) {
    console.log("worldCities.dataSource", worldCities.dataSource);
    checkIndex();
}

/**
 * Fonction de vérification de l'URL pour voir si un index est passé en param afin d'afficher directement une ville.
 * A coder par vos soins sur le modèle du mode debug déjà vu ensemble plusieurs fois.
 * Vérifier si le param index est bien un entier et si oui il doit être supérieur à 0.
 * Si l'index n'est pas un entier, mettre une alerte avec "Paramètre incorrect !\nVeuillez vérifier l'index saisi."
 * Si l'index est un entier mais plus petit que 0, mettre une alerte avec "Paramètre incorrect !\nL'index saisi ne peut être plus petit que 0."
 */
function checkIndex() {
    // Codez cette fonction.
}

// App déjà instanciée pour vous. Ne rien toucher.
const worldCities = new WorldCities(document);
worldCities.addEventListener(AbstractAppEventNames.INIT, appInitHandler);

// Tout est instancié, on charge les données. NE RIEN TOUCHER.
loadDatas();