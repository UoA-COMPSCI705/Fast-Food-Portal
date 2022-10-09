// target elements with the "draggable" class
interact(".draggable").draggable({
  // enable inertial throwing
  inertia: true,
  // keep the element within the area of it's parent
  modifiers: [
    interact.modifiers.restrictRect({
      restriction: "parent",
      endOnly: true,
    }),
  ],
  // enable autoScroll
  autoScroll: true,

  listeners: {
    // call this function on every dragmove event
    move: dragMoveListener,

    // call this function on every dragend event
    end(event) {
      var textEl = event.target.querySelector("p");

      textEl &&
        (textEl.textContent =
          "moved a distance of " +
          Math.sqrt(
            (Math.pow(event.pageX - event.x0, 2) +
              Math.pow(event.pageY - event.y0, 2)) |
              0
          ).toFixed(2) +
          "px");
    },
  },
});

function addDrag(index) {
  if (index == 0) {
    document.getElementById("workspace").innerHTML +=
      '<div id="drag-bacon-burger" class="resize-drag drag-drop center-text"><h4>Bacon Burger</h4><img src="img/burger/cheeseburger.png" alt="bacon"></div>';
  } else if (index == 1) {
    document.getElementById("workspace").innerHTML +=
      '<div id="drag-cheese-burger" class="resize-drag drag-drop center center-text"><h4>Cheeseburger</h4><img src="img/burger/bacon-3.png" alt="cheese"></div>';
  } else if (index == 2) {
    document.getElementById("workspace").innerHTML +=
      '<div id="drag-chicken-burger" class="resize-drag drag-drop center center-text"><h4>Chicken Burger</h4><img src="img/burger/hawaii-chicken.png" alt="chicken"></div>';
  } else if (index == 3) {
    document.getElementById("workspace").innerHTML +=
      '<div id="drag-beef-burger" class="resize-drag drag-drop center center-text"><h4>Beef Burger</h4><img src="img/burger/beef-3.png" alt="beef"></div>';
  } else if (index == 4) {
    document.getElementById("workspace").innerHTML +=
      '<div id="drag-pickle" class="resize-drag drag-drop center center-text"><h4>Pickles $0.50</h4></div>';
  }
}

function dragMoveListener(event) {
  var target = event.target;
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
  var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

  // translate the element
  target.style.transform = "translate(" + x + "px, " + y + "px)";

  // update the posiion attributes
  target.setAttribute("data-x", x);
  target.setAttribute("data-y", y);
}

// this function is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;

// Resizable
interact(".resize-drag")
  .resizable({
    // resize from all edges and corners
    edges: { left: true, right: true, bottom: true, top: true },

    listeners: {
      move(event) {
        var target = event.target;
        var x = parseFloat(target.getAttribute("data-x")) || 0;
        var y = parseFloat(target.getAttribute("data-y")) || 0;

        // update the element's style
        target.style.width = event.rect.width + "px";
        target.style.height = event.rect.height + "px";

        // translate when resizing from top or left edges
        x += event.deltaRect.left;
        y += event.deltaRect.top;

        target.style.transform = "translate(" + x + "px," + y + "px)";

        target.setAttribute("data-x", x);
        target.setAttribute("data-y", y);
        //target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height)
      },
    },
    modifiers: [
      // keep the edges inside the parent
      interact.modifiers.restrictEdges({
        outer: "parent",
      }),

      // minimum size
      // interact.modifiers.restrictSize({
      //   min: { width: 100, height: 50 }
      // })
    ],

    inertia: false,
  })
  .draggable({
    listeners: { move: window.dragMoveListener },
    inertia: true,
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: "parent",
        endOnly: true,
      }),
    ],
  });

// Dropzone
// enable draggables to be dropped into this
interact(".dropzone").dropzone({
  // only accept elements matching this CSS selector
  // accept: 'drag-1',
  // Require a 75% element overlap for a drop to be possible
  overlap: 1,

  // listen for drop related events:

  ondropactivate: function (event) {
    // add active dropzone feedback
    event.target.classList.add("drop-active");
  },
  ondragenter: function (event) {
    var draggableElement = event.relatedTarget;
    var dropzoneElement = event.target;

    // feedback the possibility of a drop
    dropzoneElement.classList.add("drop-target");
    draggableElement.classList.add("can-drop");
    draggableElement.textContent = "Dragged in";
  },
  ondragleave: function (event) {
    // remove the drop feedback style
    event.target.classList.remove("drop-target");
    event.relatedTarget.classList.remove("can-drop");
    event.relatedTarget.textContent = "Dragged out";
  },
  ondrop: function (event) {
    event.relatedTarget.textContent = "Dropped";
  },
  ondropdeactivate: function (event) {
    // remove active dropzone feedback
    event.target.classList.remove("drop-active");
    event.target.classList.remove("drop-target");
  },
});

document.getElementById("id01").style.display = "block";

let taskMode = false;
let taskComplete = false;
let beefCounter = 1;
let cheeseCounter = 2;
let friesCounter = 1;
let colaCounter = 2;
let timer = 0;
let misclicks = -6;

setInterval(myTimer, 10);

function myTimer() {
  if (taskMode && taskComplete == false) {
    timer += 1;
    document.getElementById("timer").innerHTML = "Timer: " + timer / 100 + "s";
    if (
      beefCounter <= 0 &&
      cheeseCounter <= 0 &&
      friesCounter <= 0 &&
      colaCounter <= 0
    ) {
      taskComplete = true;
      document.getElementById("id04").style.display = "block";
      document.getElementById("taskcomplete").innerHTML =
        "Task 1 Complete - Your Time: " + timer / 100 + "s";
      store(localStorage.getItem("username"), 1, timer / 100, misclicks);
    }
  }
}

window.addEventListener("click", (event) => {
  if (taskMode) {
    misclicks = misclicks + 1;
  }
});

function addItemMenu(id) {
  if (taskMode) {
    if (id == 0) {
      document.getElementById("menu-list").innerHTML +=
        '<div class="order-item"><div class="details"><img src="img/burger/beef.png"><div class="detail-item"><h5 style="margin-bottom:10px">beef burger</h5><a class="btn-sm min" href="javascript:void(0)" onclick="btnMinusOrder(event)"></a><small>1</small><a class="btn-sm max" href="javascript:void(0)" onclick="btnPlusOrder(event)"></a><a class="remove" href="javascript:void(0)" onclick="btnRemoveOrder(event)">delete</a></div></div><h2 class="price">$4.7</h2></div>';
      beefCounter -= 1;
      if (beefCounter == 0) {
        document.getElementById("beef-burger-task").innerHTML =
          "1̶x̶ ̶B̶e̶e̶f̶ ̶B̶u̶r̶g̶e̶r̶";
      }
    } else if (id == 1) {
      document.getElementById("menu-list").innerHTML +=
        '<div class="order-item"><div class="details"><img src="img/burger/cheeseburger.png"><div class="detail-item"><h5 style="margin-bottom:10px">Chese Burger</h5><a class="btn-sm min" href="javascript:void(0)" onclick="btnMinusOrder(event)"></a><small>1</small><a class="btn-sm max" href="javascript:void(0)" onclick="btnPlusOrder(event)"></a><a class="remove" href="javascript:void(0)" onclick="btnRemoveOrder(event)">delete</a></div></div><h2 class="price">$4.8</h2></div>';
      cheeseCounter -= 1;
      if (cheeseCounter == 0) {
        document.getElementById("cheese-burger-task").innerHTML =
          "2̶x̶ ̶C̶h̶e̶e̶s̶e̶ ̶B̶u̶r̶g̶e̶r̶s̶";
      }
    } else if (id == 2) {
      document.getElementById("menu-list").innerHTML +=
        '<div class="order-item"><div class="details"><img src="img/fries/fries-4.png"><div class="detail-item"><h5 style="margin-bottom:10px">French Fries Original</h5><a class="btn-sm min" href="javascript:void(0)" onclick="btnMinusOrder(event)"></a><small>1</small><a class="btn-sm max" href="javascript:void(0)" onclick="btnPlusOrder(event)"></a><a class="remove" href="javascript:void(0)" onclick="btnRemoveOrder(event)">delete</a></div></div><h2 class="price">$12.5</h2></div>';
      friesCounter -= 1;
      if (friesCounter == 0) {
        document.getElementById("french-fries-task").innerHTML =
          "1̶x̶ ̶F̶r̶e̶n̶c̶h̶ ̶F̶r̶i̶e̶s̶ ̶O̶r̶i̶g̶i̶n̶a̶l̶";
      }
    } else if (id == 3) {
      document.getElementById("menu-list").innerHTML +=
        '<div class="order-item"><div class="details"><img src="img/drink/coca-cola.png"><div class="detail-item"><h5 style="margin-bottom:10px">Coca Cola Drink</h5><a class="btn-sm min" href="javascript:void(0)" onclick="btnMinusOrder(event)"></a><small>1</small><a class="btn-sm max" href="javascript:void(0)" onclick="btnPlusOrder(event)"></a><a class="remove" href="javascript:void(0)" onclick="btnRemoveOrder(event)">delete</a></div></div><h2 class="price">$2.5</h2></div>';
      colaCounter -= 1;
      if (colaCounter == 0) {
        document.getElementById("coca-cola-task").innerHTML =
          "2̶x̶ ̶C̶o̶c̶a̶ ̶C̶o̶l̶a̶ ̶D̶r̶i̶n̶k̶";
      }
    }
  }
}

function disableDrag() {
  interact(".resize-drag").draggable(false).resizable(false);
  document.getElementById("controls").innerHTML =
    'Add the following to the order:<ul><li id="beef-burger-task">1x Beef Burger</li><li id="cheese-burger-task">2x Cheese Burgers</li><li id="french-fries-task">1x Deluxe Cheese Burger</li><li id="coca-cola-task">2x Pineapple Burger</li>';
  document.getElementById("controls").style.lineHeight = "1.6";
  document.getElementById("header").innerHTML = "Task to Complete";
  document.getElementById("controls").style.lineHeight = "1.6";
  taskMode = true;
  document.getElementById("menu-list").innerHTML = "";
  document.getElementById("sidebar").innerHTML +=
    '<div id="timer">Timer: 0.00s</div>';
}

function openTimerTutorial() {
  document.getElementById("id03").style.display = "block";
}

function fetchAll() {
  fetch("http://al8n.wiki/")
    .then((resp) => {
      console.log(resp.json());
    })
    .catch((err) => {
      console.log(err);
    });
}

function store(username, taskId, timeTaken, numOfMisclicks) {
  fetch("http://al8n.wiki/store", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      taskId: taskId,
      timeTaken: timeTaken,
      numOfMisclicks: numOfMisclicks,
    }),
  })
    .then((resp) => {
      console.log(resp.json());
    })
    .catch((err) => {
      console.log(err);
    });
}

function fetch_data_by_user(username) {
  fetch("http://al8n.wiki/user", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
    }),
  })
    .then((resp) => {
      console.log(resp.json());
    })
    .catch((err) => {
      console.log(err);
    });
}

function fetch_data_by_user_and_task(username, taskId) {
  fetch("http://al8n.wiki/user/task", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      taskId: taskId,
    }),
  })
    .then((resp) => {
      console.log(resp.json());
    })
    .catch((err) => {
      console.log(err);
    });
}

function fetch_data_by_task(taskId) {
  fetch("http://al8n.wiki/task", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      taskId: taskId,
    }),
  })
    .then((resp) => {
      console.log(resp.json());
    })
    .catch((err) => {
      console.log(err);
    });
}
