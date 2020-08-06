(() => {

  const musicPieces = document.querySelectorAll(".choices"), // music pieces
        dropZones = document.querySelectorAll(".placeholder"); // drop zone

  // get all audio tracks:
  // each audio track index maps to a placeholder id
  // audios = [a1 a2 a3 a4 a5]
  // eg. a1 index 0 => placeholder id 0
  let audios = document.querySelectorAll("audio");

  //let audio = document.querySelector("audio");


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

    // then get dragged music piece node by ID
    // node = <img id="img0" data-trackref="singer-1.mp3" data-phref="" src="images/singer-1.svg" alt="Male Signer Icon" height="100" width="100">
    let droppedImg = document.querySelector(`#${droppedImgID}`);

    // append the image pieces
    event.target.appendChild(document.querySelector(`#${droppedImgID}`));

    // check where the image is dropped
    // image drops to dropzone => play
    if (this.className == "placeholder"){
      let placeholderID = this.id;

      // assign placeholderID to data-phref=""
      droppedImg.dataset.phref = placeholderID;
      loadAndPlay(droppedImgID, parseInt(placeholderID));

      // droppedImg.classList.toggle("boucing-img");
    }
    // image dops back to original places => pause
    else {
      let placeholderID = droppedImg.dataset.phref;

      // assign track's data-phref to empty
      droppedImg.dataset.phref = "";
      pasue(droppedImgID, parseInt(placeholderID));
    }
  }


  function pasue(droppedImgID, placeholderID) {
    console.log("pause here");
    audios[placeholderID].pause();
    audios[placeholderID].currenttime = 0;
  }


  function loadAndPlay(droppedImgID, placeholderID) {
      console.log("load and play audio here");

      // get the image node by id
      let img = document.querySelector(`#${droppedImgID}`);

      // set audio source
      audios[placeholderID].src = `audio/${img.dataset.trackref}`;

      // load method loads whatever resource you indicate
      audios[placeholderID].load();

      // play aduio
      audios[placeholderID].play();
  }


  // function playAudio() {
  //     // play the audio track
  //     audio.play(); // round brackets means it's a method (a built-in function)
  // }
  //


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

})();
