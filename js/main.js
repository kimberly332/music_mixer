(() => {
  const musicPieces = document.querySelectorAll(".choices"),
  dropZones = document.querySelectorAll(".placeholder");

  function allowDrag(event) {
  // let the drag happen, and store a reference of the ID of the element we're dragging
  console.log('started dragging a music image: this one - ', event.target.id);

  event.dataTransfer.setData("draggedMusic", event.target.id);  // here
  //event.dataTransfer.setData("targetTrack", this.dataset.track);

  // set a reference to a data track so i can retrieve it later in the drop
}

  function allowDragOver(event) {
  event.preventDefault(); // for next week
  console.log('dragged something over me!');
}

function allowDrop(event) {
  console.log('dropped something on me');

  let droppedMusic= event.dataTransfer.getData("draggedMusic"); // here
  // let currentTrack = event.dataTransfer.getData('targetTrack');


  event.target.appendChild(document.querySelector(`#${droppedMusic}`));
}

  // feature of dragging music
  musicPieces.forEach(piece => piece.addEventListener('dragstart', allowDrag));

  // feature of dragging over the drop zones, and
  //            dropping the music image on the drop zone
  for (let zone of dropZones) {
  zone.addEventListener('dragover', allowDragOver);
  zone.addEventListener('drop', allowDrop);
}
})();
