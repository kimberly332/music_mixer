(() => {
  const musicPieces = document.querySelectorAll(".choices"),
  dropZones = document.querySelectorAll(".placeholder");

  function allowDrag(event) {
    // let the drag happen, and store a reference of the ID of the element we're dragging
    console.log('started dragging a music image: this one - ', event.target.id);

    event.dataTransfer.setData("draggedImg", event.target.id);
    // event.dataTransfer.setData("targetTrack", event.target.dataset.track);
  }

  function allowDragOver(event) {
    event.preventDefault(); 
    console.log('dragged something over me!');
  }

  function allowDrop(event) {
    console.log('dropped something on me');

    // display dragged music piece
    let droppedImg= event.dataTransfer.getData("draggedImg");

    // display the img
    event.target.appendChild(document.querySelector(`#${droppedImg}`));
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
})();
