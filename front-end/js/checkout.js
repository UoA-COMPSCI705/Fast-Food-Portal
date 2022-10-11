let totalprice = 13.8;
let coke = 0;
let chips = 0;
let confirmed = false;
let isconfirmed = false;
// target elements with the "draggable" class
interact(".draggable").draggable({
  // enable inertial throwing
  inertia: false,
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
    inertia: false,
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

let taskMode = false;
let taskComplete = false;
let stage1Complete = false;
let stage2Complete = false;
let stage3Complete = false;
let stage4Complete = false;
let timer = 0;
let misclicks = -7;

function stage2Alert() {
  document.getElementById("id02").style.display = "block";
}

window.addEventListener("click", (event) => {
  if (taskMode) {
    misclicks = misclicks + 1;
  }
});

function openTimerTutorial() {
  isconfirmed = true;
  document.getElementById("id03").style.display = "block";
  document.getElementById("burger-component").style.display = "none";
  document.getElementById("bacon-burger").style.display = "none";
  document.getElementById("cheese-burger").style.display = "none";
  document.getElementById("chicken-deluxe").style.display = "none";
  document.getElementById("fries").style.display = "none";
  document.getElementById("hot-fries").style.display = "none";
  document.getElementById("coca-cola").style.display = "none";
}

window.onload = stage2Alert();

function enableModalListener() {
  const editButtons = document.querySelectorAll(".edit-item");
  editButtons.forEach((editButton) => {
    editButton.addEventListener("click", opensesameModal);
  });

  const addButtons = document.querySelectorAll(".add-size");
  addButtons.forEach((addButton) => {
    addButton.addEventListener("click", openModal);
  });
}

setInterval(myTimer, 10);

function myTimer() {
  if (taskMode && taskComplete == false) {
    timer += 1;
    document.getElementById("timer").innerHTML = "Timer: " + timer / 100 + "s";
    if (confirmed) {
      taskComplete = true;
      console.log("Task Completed");
      document.getElementById("id04").style.display = "block";
      document.getElementById("taskcomplete").innerHTML =
        "Task 2 Complete - Your Time: " + timer / 100 + "s";
      store(localStorage.getItem("username"), 2, timer / 100, misclicks);
    }
  }
}

function addItemMenu(id) {
  if (taskMode) {
    if (id == 0 && stage1Complete == false) {
      stage1Complete = true;
      stageActive = false;
      if (isconfirmed) {
        document.getElementById("item10").style.backgroundColor = "transparent";
        document.getElementById("item11").style.backgroundColor = "transparent";
        document.getElementById("item12").style.backgroundColor = "transparent";
        document.getElementById("item13").style.backgroundColor = "transparent";
        document.getElementById("burger-component").style.display = "none";
        document.getElementById("bacon-burger").style.display = "none";
        document.getElementById("cheese-burger").style.display = "none";
        document.getElementById("chicken-deluxe").style.display = "none";
        document.getElementById("fries").style.display = "none";
        document.getElementById("hot-fries").style.display = "none";
        document.getElementById("coca-cola").style.display = "none";
      }
      document.getElementById("menu-list").innerHTML +=
        '<div class="order-item"><div class="details"><img src="img/drink/coca-cola.png"><div class="detail-item"><h5 style="margin-bottom:10px">Coca Cola (for Beef Burger) </h5><a class="btn-sm min" href="javascript:void(0)" onclick="btnMinusOrder(event)"></a><small>1</small><a class="btn-sm max" href="javascript:void(0)" onclick="btnPlusOrder(event)"></a><a class="remove" href="javascript:void(0)" onclick="btnRemoveOrder(event)">delete</a></div></div><h2 class="price">$4.7</h2></div>';
      document.getElementById("beef-burger-task").innerHTML =
        "A̶d̶d̶ ̶C̶o̶c̶a̶ ̶C̶o̶l̶a̶ ̶D̶r̶i̶n̶k̶ ̶t̶o̶ ̶t̶h̶e̶ ̶B̶e̶e̶f̶ ̶B̶u̶r̶g̶e̶r̶";
      totalprice += 2;
      document.getElementById("TotalCheckoutPrice").innerHTML =
        "$" + totalprice;
    } else if (id == 1 && stage2Complete == false && stage1Complete) {
      stage2Complete = true;
      stageActive = false;
      if (isconfirmed) {
        document.getElementById("item10").style.backgroundColor = "transparent";
        document.getElementById("item11").style.backgroundColor = "transparent";
        document.getElementById("item12").style.backgroundColor = "transparent";
        document.getElementById("item13").style.backgroundColor = "transparent";
        document.getElementById("burger-component").style.display = "none";
        document.getElementById("bacon-burger").style.display = "none";
        document.getElementById("cheese-burger").style.display = "none";
        document.getElementById("chicken-deluxe").style.display = "none";
        document.getElementById("fries").style.display = "none";
        document.getElementById("hot-fries").style.display = "none";
        document.getElementById("coca-cola").style.display = "none";
      }
      document.getElementById("menu-list").innerHTML +=
        '<div class="order-item"><div class="details"><img src="img/fries/fries-4.png"><div class="detail-item"><h5 style="margin-bottom:10px">French Fries Original (for Cheese Burger)</h5><a class="btn-sm min" href="javascript:void(0)" onclick="btnMinusOrder(event)"></a><small>1</small><a class="btn-sm max" href="javascript:void(0)" onclick="btnPlusOrder(event)"></a><a class="remove" href="javascript:void(0)" onclick="btnRemoveOrder(event)">delete</a></div></div><h2 class="price">$4.8</h2></div>';
      document.getElementById("cheese-burger-task").innerHTML =
        "A̶d̶d̶ ̶F̶r̶e̶n̶c̶h̶ ̶F̶r̶i̶e̶s̶ ̶O̶r̶i̶g̶i̶n̶a̶l̶ ̶t̶o̶ ̶t̶h̶e̶ ̶C̶h̶e̶e̶s̶e̶ ̶B̶u̶r̶g̶e̶r̶";
      totalprice += 2.5;
      document.getElementById("TotalCheckoutPrice").innerHTML =
        "$" + totalprice;
    } else if (
      id == 2 &&
      stage3Complete == false &&
      stage2Complete &&
      stage1Complete
    ) {
      stage3Complete = true;
      stageActive = false;
      if (isconfirmed) {
        document.getElementById("item10").style.backgroundColor = "transparent";
        document.getElementById("item11").style.backgroundColor = "transparent";
        document.getElementById("item12").style.backgroundColor = "transparent";
        document.getElementById("item13").style.backgroundColor = "transparent";
        document.getElementById("burger-component").style.display = "none";
        document.getElementById("bacon-burger").style.display = "none";
        document.getElementById("cheese-burger").style.display = "none";
        document.getElementById("chicken-deluxe").style.display = "none";
        document.getElementById("fries").style.display = "none";
        document.getElementById("hot-fries").style.display = "none";
        document.getElementById("coca-cola").style.display = "none";
      }
      document.getElementById("menu-list").innerHTML +=
        '<div class="order-item"><div class="details"><img src="img/drink/slushie.png"><div class="detail-item"><h5 style="margin-bottom:10px">Rainbow Slushie (for Deluxe Cheese Burger)</h5><a class="btn-sm min" href="javascript:void(0)" onclick="btnMinusOrder(event)"></a><small>1</small><a class="btn-sm max" href="javascript:void(0)" onclick="btnPlusOrder(event)"></a><a class="remove" href="javascript:void(0)" onclick="btnRemoveOrder(event)">delete</a></div></div><h2 class="price">$12.5</h2></div>';
      document.getElementById("french-fries-task").innerHTML =
        "A̶d̶d̶ ̶R̶a̶i̶n̶b̶o̶w̶ ̶S̶l̶u̶s̶h̶i̶e̶ ̶t̶o̶ ̶t̶h̶e̶ ̶D̶e̶l̶u̶x̶e̶ ̶C̶h̶e̶e̶s̶e̶ ̶B̶u̶r̶g̶e̶r̶";
      totalprice += 1.5;
      document.getElementById("TotalCheckoutPrice").innerHTML =
        "$" + totalprice;
    } else if (
      id == 3 &&
      stage4Complete == false &&
      stage3Complete &&
      stage2Complete &&
      stage1Complete
    ) {
      stage4Complete = true;
      stageActive = false;
      if (isconfirmed) {
        document.getElementById("item10").style.backgroundColor = "transparent";
        document.getElementById("item11").style.backgroundColor = "transparent";
        document.getElementById("item12").style.backgroundColor = "transparent";
        document.getElementById("item13").style.backgroundColor = "transparent";
        document.getElementById("burger-component").style.display = "none";
        document.getElementById("bacon-burger").style.display = "none";
        document.getElementById("cheese-burger").style.display = "none";
        document.getElementById("chicken-deluxe").style.display = "none";
        document.getElementById("fries").style.display = "none";
        document.getElementById("hot-fries").style.display = "none";
        document.getElementById("coca-cola").style.display = "none";
      }
      document.getElementById("menu-list").innerHTML +=
        '<div class="order-item"><div class="details"><img src="img/chicken/deluxe-1.png"><div class="detail-item"><h5 style="margin-bottom:10px">Chicken Deluxe (for Pineapple Burger)</h5><a class="btn-sm min" href="javascript:void(0)" onclick="btnMinusOrder(event)"></a><small>1</small><a class="btn-sm max" href="javascript:void(0)" onclick="btnPlusOrder(event)"></a><a class="remove" href="javascript:void(0)" onclick="btnRemoveOrder(event)">delete</a></div></div><h2 class="price">$2.5</h2></div>';
      document.getElementById("coca-cola-task").innerHTML =
        "A̶d̶d̶ ̶C̶h̶i̶c̶k̶e̶n̶ ̶D̶e̶l̶u̶x̶e̶ ̶t̶o̶ ̶t̶h̶e̶ ̶P̶i̶n̶e̶a̶p̶p̶l̶e̶ ̶B̶u̶r̶g̶e̶r̶";
      totalprice += 3;
      document.getElementById("TotalCheckoutPrice").innerHTML =
        "$" + totalprice;
    }
  }
}

function disableDrag() {
  interact(".resize-drag").draggable(false).resizable(false);
  // document.getElementById('chipcount').innerHTML= chips;
  // document.getElementById('colacount').innerHTML= cola;
  document.getElementById("controls").innerHTML =
    'Complete the order by adding the following sides (must be done in the correct order):<ul><li id="beef-burger-task">Add Coca Cola Drink to the Beef Burger</li><li id="cheese-burger-task">Add French Fries Original to the Cheese Burger</li><li id="french-fries-task">Add Rainbow Slushie to the Deluxe Cheese Burger</li><li id="coca-cola-task">Add Chicken Deluxe to the Pineapple Burger</li><li>Hit the "Checkout" button to complete the order</li>';
  document.getElementById("controls").style.lineHeight = "1.6";
  document.getElementById("header2").innerHTML = "Task to Complete";
  document.getElementById("controls").style.lineHeight = "1.6";
  taskMode = true;
  // document.getElementById("menu-list").innerHTML = "";
  document.getElementById("sidebar").innerHTML +=
    '<div id="timer">Timer: 0.00s</div>';
  document.getElementById("check-out-btn").addEventListener("click", finish);
}

var modal = document.getElementById("addings");

function openModal() {
  document.getElementById("addings").style.display = "block";
}

function opensesameModal() {
  document.getElementById("addings2").style.display = "block";
}

function closeModal() {
  document.getElementById("addings").style.display = "none";
}
function closeModal2() {
  document.getElementById("addings2").style.display = "none";
}
function removeitem1() {
  document.getElementById("orderitem1").style.display = "none";
}
function removeitem2() {
  document.getElementById("orderitem2").style.display = "none";
}
function removeitem3() {
  document.getElementById("orderitem3").style.display = "none";
}

function removeCoke() {
  document.getElementById("coke").style.display = "none";
}

function removeFries() {
  document.getElementById("fries").style.display = "none";
}

function addCoke() {
  // document.getElementById("coke").style.display = null;
  totprice += 1.5;
  document.getElementById("TotalCheckoutPrice").innerHTML = "$" + totprice;
}
function addFries() {
  // document.getElementById("fries").style.display = null;
  totprice += 2.5;
  document.getElementById("TotalCheckoutPrice").innerHTML = "$" + totprice;
}
function addCheese() {
  // document.getElementById("coke").style.display = null;
  totprice += 0.7;
  document.getElementById("TotalCheckoutPrice").innerHTML = "$" + totprice;
}
function addPickles() {
  // document.getElementById("fries").style.display = null;
  totprice += 0.5;
  document.getElementById("TotalCheckoutPrice").innerHTML = "$" + totprice;
}

function finish() {
  if (stage4Complete && stage1Complete && stage2Complete && stage3Complete) {
    confirmed = true;
  }
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

let stageActive = false;

function hadouken(id) {
  if (stageActive == false && taskMode) {
    if (id == "item10" && stage1Complete == false) {
      stageActive = true;
      document.getElementById(id).style.backgroundColor = "#e3a34c";
      document.getElementById("burger-component").style.display = "block";
      document.getElementById("bacon-burger").style.display = "block";
      document.getElementById("cheese-burger").style.display = "block";
      document.getElementById("chicken-deluxe").style.display = "block";
      document.getElementById("fries").style.display = "block";
      document.getElementById("hot-fries").style.display = "block";
      document.getElementById("coca-cola").style.display = "block";
    } else if (id == "item11" && stage2Complete == false && stage1Complete) {
      stageActive = true;
      document.getElementById(id).style.backgroundColor = "#e3a34c";
      document.getElementById("burger-component").style.display = "block";
      document.getElementById("bacon-burger").style.display = "block";
      document.getElementById("cheese-burger").style.display = "block";
      document.getElementById("chicken-deluxe").style.display = "block";
      document.getElementById("fries").style.display = "block";
      document.getElementById("hot-fries").style.display = "block";
      document.getElementById("coca-cola").style.display = "block";
    } else if (
      id == "item12" &&
      stage3Complete == false &&
      stage2Complete &&
      stage1Complete
    ) {
      stageActive = true;
      document.getElementById(id).style.backgroundColor = "#e3a34c";
      document.getElementById("burger-component").style.display = "block";
      document.getElementById("bacon-burger").style.display = "block";
      document.getElementById("cheese-burger").style.display = "block";
      document.getElementById("chicken-deluxe").style.display = "block";
      document.getElementById("fries").style.display = "block";
      document.getElementById("hot-fries").style.display = "block";
      document.getElementById("coca-cola").style.display = "block";
    } else if (
      id == "item13" &&
      stage4Complete == false &&
      stage3Complete &&
      stage2Complete &&
      stage1Complete
    ) {
      stageActive = true;
      document.getElementById(id).style.backgroundColor = "#e3a34c";
      document.getElementById("burger-component").style.display = "block";
      document.getElementById("bacon-burger").style.display = "block";
      document.getElementById("cheese-burger").style.display = "block";
      document.getElementById("chicken-deluxe").style.display = "block";
      document.getElementById("fries").style.display = "block";
      document.getElementById("hot-fries").style.display = "block";
      document.getElementById("coca-cola").style.display = "block";
    }
  }
}
