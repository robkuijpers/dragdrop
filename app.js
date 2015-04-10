$(function() {
  
  console.log( "ready!" );
  
    // Get the div element that will serve as the drop target.
  var dropZoneOne = document.querySelector('#drop-zone');

  // Get the draggable elements.
  var dragElements = document.querySelectorAll('button');

  // Track the element that is being dragged.
  var elementDragged = null;
  
  _.each(dragElements, function(value, key, list) {
      value.addEventListener('dragstart', function(event) {
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text', this.innerHTML);
        elementDragged = this;
        
        var ghost = this.cloneNode(true);
        ghost.style.border = "2px dotted black";
        ghost.style.position = "absolute"; 
        ghost.style.top = "0px"; 
        ghost.style.right = "-1000px";
        document.body.appendChild(ghost);
        event.dataTransfer.setDragImage(ghost, 0, 0);
        
      });

      value.addEventListener('drag', function(event) {
        this.className = "drag";      
      });
    
      value.addEventListener('dragend', function(event) {
        elementDragged = null;
        this.className = "";
      });
  });
  
  // Event Listener for when the dragged element is over the drop zone.
  dropZoneOne.addEventListener('dragover', function(event) {
    if (event.preventDefault) {
      event.preventDefault();
    }
    event.dataTransfer.dropEffect = 'move';
    return false;
  });
  
  // Event Listener for when the dragged element enters the drop zone.
  dropZoneOne.addEventListener('dragenter', function(event) {
    this.className = "dragover";
  });

  // Event Listener for when the dragged element leaves the drop zone.
  dropZoneOne.addEventListener('dragleave', function(event) {
    this.className = "";
  });

  // Event Listener for when the dragged element dropped in the drop zone.
  dropZoneOne.addEventListener('drop', function(event) {
    if (event.preventDefault) event.preventDefault(); 
    if (event.stopPropagation) event.stopPropagation();

    this.className = "";
    // Remove the element from the list.
    document.querySelector('#drag-elements').removeChild(elementDragged);
    dropZoneOne.appendChild(elementDragged);

    return false;
  });
  
});