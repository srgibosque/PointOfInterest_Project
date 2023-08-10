//Sergi Bosque i Ródenas

function log(message) {
    // Crea un nuevo elemento p y establece su contenido de texto al mensaje
    var messageElement = document.createElement('p');
    messageElement.textContent = message;

    // Agrega el nuevo elemento al cuerpo del documento
    document.body.appendChild(messageElement);
}

function logTitle(message) {
  // Crea un nuevo elemento h2 y establece su contenido de texto al mensaje
  var messageElement = document.createElement('h2');
  messageElement.textContent = message;

  // Agrega el nuevo elemento al cuerpo del documento
  document.body.appendChild(messageElement);
}

const poiList = document.querySelector(".poiList");

class Review{
    constructor(comment, score){
      this._comment = comment;
      this._score = score;
    }
    
    get comment(){
      return this._comment;
    }
    
    set comment(comment){
      this._comment = comment;
    }
    
    get score(){
      return this._score;
    }
    
    set score(score){
      this._score = score;
    }
    
    printReview(){
      switch(this._score){
        case 0: 
          log("(_ _ _) " + this._comment);
          break;
        case 1: 
          log("(* _ _) " + this._comment);
          break;
        case 2: 
          log("(* * _) " + this._comment);
          break;
        case 3: 
          log("(* * *) " + this._comment);
          break;
      }
    }
  }
  
  class POI {
    constructor(longitud, latitud, description, reviews = []){
      this._longitud = longitud;
      this._latitud = latitud;
      this._description = description;
      this._reviews = reviews;
    }
    get longitud(){
      return this._longitud;
    }
    
    set longitud(longitud){
      this._longitud = longitud;
    }
    
    get latitud(){
      return this._latitud;
    }
    
    set latitud(latitud){
      this._latitud = latitud;
    }
    
    get description(){
      return this._description;
    }
    
    set description(description){
      this._description = description;
    }
    
    getDistanceFromInKM(longitud, latitud){
      const R = 6371e3; // metres
      const φ1 = this._latitud * Math.PI/180; // φ, λ in radians
      const φ2 = latitud * Math.PI/180;
      const Δφ = (latitud-this._latitud) * Math.PI/180;
      const Δλ = (longitud-this._longitud) * Math.PI/180;
  
      const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ/2) * Math.sin(Δλ/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  
      const d = R * c; // in metres
  
      return d / 1000; //return in km
    }
    
    addReview(review){
      this._reviews.push(review);
    }
    
    mitjanaValoracions(){
      let acum = 0;
      let i = 0;
      let mitjana = null;
      if(this._reviews.length >= 1){
        for(let review of this._reviews){
          acum = acum + review.score;
        i++;
        }
        mitjana = Math.round(acum / i);
      } 
        return mitjana
    }
    
    printInfo(){
      let print = "";
      switch(this.mitjanaValoracions()){
        case 0: 
          // print = `(#Reviews: ${this._reviews.length}, _ _ _ ) ${this._description} / Lon: ${this._longitud}, Lat: ${this._latitud}`;
          print = `<article>
          <div class="location-coor">
              <h3>${this._description}</h3>
              <div class="coordinates">
                  <p><span class="bold">longitude:</span> ${this._longitud}</p>
                  <p><span class="bold">latitude:</span> ${this._latitud}</p>
                  <p><span class="bold">Nº of Reviews: </span>${this._reviews.length} _ _ _</p>
              </div>
          </div>
      </article>`
          break;
        case 1: 
          print = `<article>
          <div class="location-coor">
              <h3>${this._description}</h3>
              <div class="coordinates">
                  <p><span class="bold">longitude:</span> ${this._longitud}</p>
                  <p><span class="bold">latitude:</span> ${this._latitud}</p>
                  <p><span class="bold">Nº of Reviews: </span>${this._reviews.length} * _ _</p>
              </div>
          </div>
      </article>`
          break;
        case 2: 
          print = `<article>
          <div class="location-coor">
              <h3>${this._description}</h3>
              <div class="coordinates">
                  <p><span class="bold">longitude:</span> ${this._longitud}</p>
                  <p><span class="bold">latitude:</span> ${this._latitud}</p>
                  <p><span class="bold">Nº of Reviews: </span>${this._reviews.length} * * _</p>
              </div>
          </div>
      </article>`
          break;
        case 3: 
        `<article>
        <div class="location-coor">
            <h3>${this._description}</h3>
            <div class="coordinates">
                <p><span class="bold">longitude:</span> ${this._longitud}</p>
                <p><span class="bold">latitude:</span> ${this._latitud}</p>
                <p><span class="bold">Nº of Reviews: </span>${this._reviews.length} * * *</p>
            </div>
        </div>
    </article>`
          break;
        case null:
          `<article>
          <div class="location-coor">
              <h3>${this._description}</h3>
              <div class="coordinates">
                  <p><span class="bold">longitude:</span> ${this._longitud}</p>
                  <p><span class="bold">latitude:</span> ${this._latitud}</p>
                  <p><span class="bold">Nº of Reviews: </span>${this._reviews.length} No reviews yet</p>
              </div>
          </div>
      </article>`
          break;
      }
      return print
    }
    
    printAllReviews(){
      if(this._reviews.length >= 1){
        for(let review of this._reviews){
        review.printReview();
        }
      } else {
        log("There are no reviews yet !")
      }
    }
  }
  
  class POIManager{
    constructor(poiArray) {
      if (poiArray !== undefined) {
        let parsedData = JSON.parse(poiArray);
        this._poiArray = [];
        
        for(let obj of parsedData._pois){
          let reviews = [];
          for(let objReview of obj._reviews){
            let review = new Review(objReview._comment, objReview._rating);
            reviews.push(review);
          }
          let poi = new POI(obj._lon, obj._lat, obj._description, reviews);
          this._poiArray.push(poi);
        }
      } else {
        this._poiArray = [];
      }
    }
    get poiArray(){
      return this._poiArray
    }
    
    addPoi(poi){
      this._poiArray.push(poi);
    }
    
    printClosePoi(longitud, latitud, distance){
      log(`The following POI are closer than ${distance} km from point: (${longitud}, ${latitud})`);
      log("-----------------------");
      for(let poi of this._poiArray){
        console.log(poi.description + ": " + poi.getDistanceFromInKM(longitud, latitud));
        if(distance >= poi.getDistanceFromInKM(longitud, latitud)){
          log(poi.printInfo());
        } 
      }
    }
    
    printReviews(position){
        log("Reviews of " + this._poiArray[position - 1].description);
        log("-----------------------");
        for(let i = 1; i <= this._poiArray.length; i++){
            if(position == i){
                this._poiArray[i-1].printAllReviews();
         }
        }
       }
    
    addReviewToPoi(position, review){
      for(let i = 1; i <= this._poiArray.length; i++){
        if(position == i){
          this._poiArray[i-1].addReview(review);
         }
       }
    }
    
    printAllPoi(){
      let i = 1;
       for(let poi of this._poiArray){
          let print = poi.printInfo();
          poiList.innerHTML = poiList.innerHTML + print;
       }

       const articles = document.querySelectorAll("article");
       articles.forEach((article) => {
        let description = article.firstElementChild.firstElementChild;
        let textNode = document.createTextNode(i + " ");
        description.insertBefore(textNode, description.firstChild);
        i++;
       })
    }
    
    deletePoi(position){
      this._poiArray.splice(position - 1, 1);
    }
    
    
    }


let initialInfo = `
    {"_pois":
    [
        {"_lon":-3.703790, 
        "_lat":40.416775, 
        "_description": "Madrid", 
        "_reviews":
        [
            {"_comment":"Preciosa", "_rating": 2}
        ]},
        
        {"_lon":2.173404, 
        "_lat":41.385063,
        "_description": "Barcelona", 
        "_reviews":
        [
            {"_comment":"Espectacular", "_rating": 3}, 
            {"_comment":"Regular", "_rating": 1}
        ]}
    ]}
`;


let poiManager = new POIManager(initialInfo);

//Option 1:
function addNewPOI(){
    let lon = parseFloat(prompt("Introduce the longitude: "));
    let lat = parseFloat(prompt("Introduce the latitude: "));
    let des = prompt("Introduce a description: ");

    let newPoi = new POI(lon, lat, des);

    poiManager.addPoi(newPoi);
}

//Option 2:
function printAllPOIs() {
  poiList.innerHTML = '';
  const title = document.createElement("h2");
  title.textContent = "POI List"
  poiList.appendChild(title);
  poiManager.printAllPoi();
}

//Option 3:
function printPOISNearTo() {
    let lon = parseInt(prompt("Introduce the longitude: "));
    let lat = parseInt(prompt("Introduce the latitude: "));
    let dist = parseInt(prompt("Introduce a maximum distance (in Km): "));
    poiManager.printClosePoi(lon, lat, dist);
}

//Option 4:
function printAllCommentsOfPOI() {
    let position;
    let isPositionCorrect = false;
    while(isPositionCorrect == false){
        position = parseInt(prompt("Introduce the number of the Poi you wish to see their reviews: "));
        if(position >= 1 && position <= poiManager.poiArray.length){
            isPositionCorrect = true;
        }
    }
    poiManager.printReviews(position);
}

//Option 5:
function addNewReviewToPOI() {
  let position;
    let isPositionCorrect = false;
    while(isPositionCorrect == false){
      position = parseInt(prompt("Introduce the number of the Poi you wish to add a review: "));
      if(position >= 1 && position <= poiManager.poiArray.length){
        isPositionCorrect = true;
      }
    }

  let comment = prompt("Please enter your comment: ");
  let score;
    let isScoreCorrect = false;
    while(isScoreCorrect == false){
      score = parseInt(prompt("Give a score from 0 to 3"));
      if(score >= 0 && score <= 3){
        isScoreCorrect = true;
      }
    }
  let newReview = new Review(comment, score);

  poiManager.addReviewToPoi(position, newReview);
}

//Option 6:
function removePOI() {
  let position;
    let isPositionCorrect = false;
    while(isPositionCorrect == false){
      position = parseInt(prompt("Introduce the number of the Poi you wish to delete: "));
      if(position >= 1 && position <= poiManager.poiArray.length){
        isPositionCorrect = true;
      }
    }

  poiManager.deletePoi(position);
}