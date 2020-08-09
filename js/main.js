(() => {

  const musicPieces = document.querySelectorAll(".choices"), // music pieces
        dropZones = document.querySelectorAll(".placeholder"), // drop zone
        resetButton = document.querySelector(".resetBtn");   // reset button

  // get all audio tracks:
  // each audio track index maps to a placeholder id
  // audios = [a1 a2 a3 a4 a5]
  // eg. a1 index 0 => placeholder id 0
  let audios = document.querySelectorAll("audio");

  // contain an array of placeholder id for which music is on
  let displayingZones = [];

  // an array of all 20 images in order.
  // this records the initial order of images
  let allImages = document.querySelectorAll(".images");


  function allowDrag(event) {
    // let the drag happen, and store a reference of the ID of the element we're dragging
    console.log('started dragging a music image: this one - ', event.target.id);

    // trasfer the dragged music piece id
    event.dataTransfer.setData("draggedImg", event.target.id);

  }


  function allowDragOver(event) {
    event.preventDefault();
    console.log('dragged something over me!');
  }


  function allowDrop(event) {
    console.log('dropped something on me');

    // first get dragged music piece ID
    let droppedImgID= event.dataTransfer.getData("draggedImg");
    // console.log(droppedImgID);
    // then get dragged music piece node by ID
    // node = <img id="img0" data-trackref="singer-1.mp3" data-phref="" src="images/singer-1.svg" alt="Male Signer Icon" height="100" width="100">
    let droppedImg = document.querySelector(`#${droppedImgID}`);

    // check where the image is dropped
    // image drops to dropzone => play
    if (this.className == "placeholder"){
      let placeholderID = this.id;

      if (this.childElementCount > 0){ // there is already a music here
        console.log("there is already a music, so cannot drop!!!");
      }
      else { // no music => can drop here
        // append the music pieces
        event.target.appendChild(document.querySelector(`#${droppedImgID}`));
        // assign placeholderID to data-phref=""
        droppedImg.dataset.phref = placeholderID;
        loadAndPlay(droppedImgID, parseInt(placeholderID));
      }
    }
    // image drops back to original places => pause
    else {
      let placeholderID = droppedImg.dataset.phref;
      if (this.childElementCount > 0){ // there is already a music here
        console.log("there is already a music, so cannot drop!!!");
      }
      else { // no music => can drop here
        // append the music pieces
        event.target.appendChild(document.querySelector(`#${droppedImgID}`));
        // assign track's data-phref to empty
        droppedImg.dataset.phref = "";
        pasue(droppedImgID, parseInt(placeholderID));
      }
    }
  }


  function pasue(droppedImgID, placeholderID) {
    console.log("pause here");
    audios[placeholderID].pause();
    audios[placeholderID].currenttime = 0;

    // update displayingZones => remove
    displayingZones.splice(displayingZones.indexOf(placeholderID.toString()), 1);
  }


  function loadAndPlay(droppedImgID, placeholderID) {
      console.log("load and play audio here");

      // update displayingZones => add
      displayingZones.push(placeholderID.toString());

      // get the image node by id
      let img = document.querySelector(`#${droppedImgID}`);

      // set audio source
      audios[placeholderID].src = `audio/${img.dataset.trackref}`;

      // load method loads whatever resource you indicate
      audios[placeholderID].load();

      // play aduio
      // here we need replay all the audios
      displayingZones.forEach(ID => {
        audios[ID].currentTime = 0;
        audios[ID].play();
      });
  }


  function reset(){
    console.log("reset!!!!");

    // stop the music
    audios.forEach(audio => audio.src = "");

    // remove from the drop zone
    dropZones.forEach(zone => {
      if (zone.firstChild) {
        zone.removeChild(zone.firstChild);
      }
    });

    // reset all music pieces
    musicPieces.forEach((piece, index) => {
      if (piece.childElementCount == 0) {
        piece.appendChild(allImages[index]);
      }
    });

    // reset displayingZones
    displayingZones = []
  }


  // direction 1: drag music piece to drop zone
  // direction 2: drag music piece from drop zone
  for (let piece of musicPieces) {
    piece.addEventListener('dragstart', allowDrag);    // direction 1
    piece.addEventListener('dragover', allowDragOver); // direction 2
    piece.addEventListener('drop', allowDrop);         // direction 2
  }
  for (let zone of dropZones) {
    zone.addEventListener('dragstart', allowDrag);    // direction 2
    zone.addEventListener('dragover', allowDragOver); // direction 1
    zone.addEventListener('drop', allowDrop);         // direction 1
  }


  // reset button
  resetButton.addEventListener('click', reset);

})();
