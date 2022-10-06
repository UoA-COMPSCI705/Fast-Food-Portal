let totprice = 13.8
let coke = 0
let chips = 0
let confirmed = false
// target elements with the "draggable" class
interact('.draggable')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent',
        endOnly: true
      })
    ],
    // enable autoScroll
    autoScroll: true,

    listeners: {
      // call this function on every dragmove event
      move: dragMoveListener,

      // call this function on every dragend event
      end (event) {
        var textEl = event.target.querySelector('p')

        textEl && (textEl.textContent =
          'moved a distance of ' +
          (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                     Math.pow(event.pageY - event.y0, 2) | 0))
            .toFixed(2) + 'px')
      }
    }
  })

function addDrag(index) {
    if (index == 0) {
        document.getElementById('workspace').innerHTML += '<div id="drag-bacon-burger" class="resize-drag drag-drop center-text"><h4>Bacon Burger</h4><img src="img/burger/cheeseburger.png" alt="bacon"></div>';
    } else if (index == 1) {
        document.getElementById('workspace').innerHTML += '<div id="drag-cheese-burger" class="resize-drag drag-drop center center-text"><h4>Cheeseburger</h4><img src="img/burger/bacon-3.png" alt="cheese"></div>';
    } else if (index == 2) {
        document.getElementById('workspace').innerHTML += '<div id="drag-chicken-burger" class="resize-drag drag-drop center center-text"><h4>Chicken Burger</h4><img src="img/burger/hawaii-chicken.png" alt="chicken"></div>';
    } else if (index == 3) {
        document.getElementById('workspace').innerHTML += '<div id="drag-beef-burger" class="resize-drag drag-drop center center-text"><h4>Beef Burger</h4><img src="img/burger/beef-3.png" alt="beef"></div>';
    } else if (index ==4) {
        document.getElementById('workspace').innerHTML += '<div id="drag-pickle" class="resize-drag drag-drop center center-text"><h4>Pickles $0.50</h4></div>';
    }

}

function dragMoveListener (event) {
  var target = event.target
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

  // translate the element
  target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

  // update the posiion attributes
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)
}

// this function is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener


// Resizable
interact('.resize-drag')
  .resizable({
    // resize from all edges and corners
    edges: { left: true, right: true, bottom: true, top: true },

    listeners: {
      move (event) {
        var target = event.target
        var x = (parseFloat(target.getAttribute('data-x')) || 0)
        var y = (parseFloat(target.getAttribute('data-y')) || 0)

        // update the element's style
        target.style.width = event.rect.width + 'px'
        target.style.height = event.rect.height + 'px'

        // translate when resizing from top or left edges
        x += event.deltaRect.left
        y += event.deltaRect.top

        target.style.transform = 'translate(' + x + 'px,' + y + 'px)'

        target.setAttribute('data-x', x)
        target.setAttribute('data-y', y)
        //target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height)
      }
    },
    modifiers: [
      // keep the edges inside the parent
      interact.modifiers.restrictEdges({
        outer: 'parent'
      }),

      // minimum size
      // interact.modifiers.restrictSize({
      //   min: { width: 100, height: 50 }
      // })
    ],

    inertia: true
  })
  .draggable({
    listeners: { move: window.dragMoveListener },
    inertia: true,
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent',
        endOnly: true
      })
    ]
  })


// Dropzone
// enable draggables to be dropped into this
interact('.dropzone')
    .dropzone({
        // only accept elements matching this CSS selector
        // accept: 'drag-1',
        // Require a 75% element overlap for a drop to be possible
        overlap: 1,

        // listen for drop related events:

        ondropactivate: function (event) {
            // add active dropzone feedback
            event.target.classList.add('drop-active')
        },
        ondragenter: function (event) {
            var draggableElement = event.relatedTarget
            var dropzoneElement = event.target

            // feedback the possibility of a drop
            dropzoneElement.classList.add('drop-target')
            draggableElement.classList.add('can-drop')
            draggableElement.textContent = 'Dragged in'
        },
        ondragleave: function (event) {
            // remove the drop feedback style
            event.target.classList.remove('drop-target')
            event.relatedTarget.classList.remove('can-drop')
            event.relatedTarget.textContent = 'Dragged out'
        },
        ondrop: function (event) {
            event.relatedTarget.textContent = 'Dropped'
        },
        ondropdeactivate: function (event) {
            // remove active dropzone feedback
            event.target.classList.remove('drop-active')
            event.target.classList.remove('drop-target')
        }
    })

let taskMode = false;
let taskComplete = false;
let beefCounter = 1;
let cheeseCounter = 2;
let friesCounter = 1;
let colaCounter = 2;
let timer = 0;

setInterval(myTimer, 10);

function myTimer() {
  if (taskMode && taskComplete == false) {
    timer += 1;
    document.getElementById("timer").innerHTML = "Timer: " + timer / 100 + "s";
    if (
      taskComplete == true
    ) {
      alert(
        "The task is completed... You did it in " +
          timer / 100 +
          "s. Great work!"
      );
    }
  }
}

function disableDrag() {
    interact('.resize-drag').draggable(false).resizable(false);
    document.getElementById('TotalCheckoutPrice').innerHTML = "$" + totprice;
    document.getElementById('inputPrompt').innerHTML = "";
    confirmed = true;
    // document.getElementById('chipcount').innerHTML= chips;
    // document.getElementById('colacount').innerHTML= cola;

    alert(
      "You are now entering the testing phase of your design. You will be timed while completing a simple task."
    );
    document.getElementById("controls").innerHTML =
      'Add the following to the order:<br><p id="beef-burger-task">1x Beef Burger w/ Cheese s/ Coke</p><p id="cheese-burger-task">2x Cheese Burger w/ Chips</p><p id="french-fries-task">Hawaii Chicken w/ Pickles w/ Cheese</p>';
    document.getElementById("controls").style.lineHeight = "1.6";
    document.getElementById("header").innerHTML = "Task to Complete";
    document.getElementById("controls").style.lineHeight = "1.6";
    taskMode = true;
    // document.getElementById("menu-list").innerHTML = "";
    document.getElementById("sidebar").innerHTML +=
      '<div id="timer">Timer: 0.00s</div>';
    document.getElementById("check-out-btn").addEventListener("click", finish);
}

var modal = document.getElementById("addings");

function openModal() {
    if (confirmed){
      document.getElementById("addings").style.display = "block";
    }
    }

function opensesameModal() {
  if (confirmed){
    document.getElementById("addings2").style.display = "block";
  }
}
   

function closeModal() {
    document.getElementById("addings").style.display = "none";
}
function closeModal2() {
  document.getElementById("addings2").style.display = "none";
}
function removeitem1(){
    document.getElementById("orderitem1").style.display = "none";
}
function removeitem2(){
  document.getElementById("orderitem2").style.display = "none";
}
function removeitem3(){
  document.getElementById("orderitem3").style.display = "none";
}

function removeCoke(){
  document.getElementById("coke").style.display = "none";
}

function removeFries(){
  document.getElementById("fries").style.display = "none";
}

function addCoke(){
  // document.getElementById("coke").style.display = null;
  totprice += 1.5;
  document.getElementById("TotalCheckoutPrice").innerHTML = "$" + totprice;
}
function addFries(){
  // document.getElementById("fries").style.display = null;
  totprice += 2.5;
  document.getElementById("TotalCheckoutPrice").innerHTML = "$" + totprice;
}
function addCheese(){
  // document.getElementById("coke").style.display = null;
  totprice += 0.7;
  document.getElementById("TotalCheckoutPrice").innerHTML = "$" + totprice;
}
function addPickles(){
  // document.getElementById("fries").style.display = null;
  totprice += 0.5;
  document.getElementById("TotalCheckoutPrice").innerHTML = "$" + totprice;
}

function finish(){
  if (confirmed){
    taskComplete = true;
    let timesec = timer/100;
    document.getElementById('controls').innerHTML = "Well Done! You completed the task in " + timesec + " seconds. Onto the next one.";
  }
    
  
}