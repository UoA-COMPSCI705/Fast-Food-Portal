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
      interact.modifiers.restrictSize({
        min: { width: 100, height: 50 },
      }),
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

document.getElementById("id02").style.display = "block";

let taskMode = false;
let taskComplete = false;
let beefCounter = 1;
let friesCounter = 1;
let colaCounter = 1;
let timer = 0;

let misclicks = -3;

let totalprice = 0;
let totalitem = 0;
setInterval(myTimer, 10);

function myTimer() {
  if (taskMode && taskComplete == false) {
    timer += 1;
    document.getElementById("timer").innerHTML = "Timer: " + timer / 100 + "s";
    if (beefCounter <= 0 && friesCounter <= 0 && colaCounter <= 0) {
      taskComplete = true;
      document.getElementById("id04").style.display = "block";
      document.getElementById("taskcomplete").innerHTML =
        "Task 3 Complete - Your Time: " + timer / 100 + "s";
      store(localStorage.getItem("username"), 3, timer / 100, misclicks);
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
      totalprice += 4.7;
      totalitem += 1;
      if (totalitem == 1) {
        document.getElementById("TotalItem").innerHTML = totalitem + " item";
      } else {
        document.getElementById("TotalItem").innerHTML = totalitem + " items";
      }
      document.getElementById("TotalCheckoutPrice").innerHTML =
        "$" + totalprice;
      if (beefCounter == 0) {
        document.getElementById("beef-burger-task").innerHTML =
          "1̶x̶ ̶B̶e̶e̶f̶ ̶B̶u̶r̶g̶e̶r̶";
      }
    } else if (id == 2) {
      document.getElementById("menu-list").innerHTML +=
        '<div class="order-item"><div class="details"><img src="img/fries/fries-4.png"><div class="detail-item"><h5 style="margin-bottom:10px">French Fries Original</h5><a class="btn-sm min" href="javascript:void(0)" onclick="btnMinusOrder(event)"></a><small>1</small><a class="btn-sm max" href="javascript:void(0)" onclick="btnPlusOrder(event)"></a><a class="remove" href="javascript:void(0)" onclick="btnRemoveOrder(event)">delete</a></div></div><h2 class="price">$12.5</h2></div>';
      friesCounter -= 1;
      totalprice += 12.5;
      totalitem += 1;
      if (totalitem == 1) {
        document.getElementById("TotalItem").innerHTML = totalitem + " item";
      } else {
        document.getElementById("TotalItem").innerHTML = totalitem + " items";
      }
      document.getElementById("TotalCheckoutPrice").innerHTML =
        "$" + totalprice;
      if (friesCounter == 0) {
        document.getElementById("french-fries-task").innerHTML =
          "1̶x̶ ̶F̶r̶e̶n̶c̶h̶ ̶F̶r̶i̶e̶s̶ ̶O̶r̶i̶g̶i̶n̶a̶l̶";
      }
    } else if (id == 3) {
      document.getElementById("menu-list").innerHTML +=
        '<div class="order-item"><div class="details"><img src="img/drink/coca-cola.png"><div class="detail-item"><h5 style="margin-bottom:10px">Coca Cola Drink</h5><a class="btn-sm min" href="javascript:void(0)" onclick="btnMinusOrder(event)"></a><small>1</small><a class="btn-sm max" href="javascript:void(0)" onclick="btnPlusOrder(event)"></a><a class="remove" href="javascript:void(0)" onclick="btnRemoveOrder(event)">delete</a></div></div><h2 class="price">$2.5</h2></div>';
      colaCounter -= 1;
      totalprice += 2.5;
      totalitem += 1;
      if (totalitem == 1) {
        document.getElementById("TotalItem").innerHTML = totalitem + " item";
      } else {
        document.getElementById("TotalItem").innerHTML = totalitem + " items";
      }
      document.getElementById("TotalCheckoutPrice").innerHTML =
        "$" + totalprice;
      if (colaCounter == 0) {
        document.getElementById("coca-cola-task").innerHTML =
          "1̶x̶ ̶C̶o̶c̶a̶ ̶C̶o̶l̶a̶ ̶D̶r̶i̶n̶k̶";
      }
    }
  }
}

function disableDrag() {
  interact(".resize-drag").draggable(false).resizable(false);
  document.getElementById("controls").innerHTML =
    'Choose the following to order a combo:<br><p id="beef-burger-task">1x Beef Burger</p><p id="french-fries-task">1x French Fries Original</p><p id="coca-cola-task">1x Coca Cola Drink</p>';
  document.getElementById("controls").style.lineHeight = "1.6";
  document.getElementById("header2").innerHTML = "Task to Complete";
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

/*
* FileSaver.js
* A saveAs() FileSaver implementation.
*
* By Eli Grey, http://eligrey.com
*
* License : https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md (MIT)
* source  : http://purl.eligrey.com/github/FileSaver.js
*/

// The one and only way of getting global scope in all environments
// https://stackoverflow.com/q/3277182/1008999
var _global = typeof window === 'object' && window.window === window
  ? window : typeof self === 'object' && self.self === self
  ? self : typeof global === 'object' && global.global === global
  ? global
  : this

function bom (blob, opts) {
  if (typeof opts === 'undefined') opts = { autoBom: false }
  else if (typeof opts !== 'object') {
    console.warn('Deprecated: Expected third argument to be a object')
    opts = { autoBom: !opts }
  }

  // prepend BOM for UTF-8 XML and text/* types (including HTML)
  // note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF
  if (opts.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
    return new Blob([String.fromCharCode(0xFEFF), blob], { type: blob.type })
  }
  return blob
}

function download (url, name, opts) {
  var xhr = new XMLHttpRequest()
  xhr.open('GET', url)
  xhr.responseType = 'blob'
  xhr.onload = function () {
    saveAs(xhr.response, name, opts)
  }
  xhr.onerror = function () {
    console.error('could not download file')
  }
  xhr.send()
}

function corsEnabled (url) {
  var xhr = new XMLHttpRequest()
  // use sync to avoid popup blocker
  xhr.open('HEAD', url, false)
  try {
    xhr.send()
  } catch (e) {}
  return xhr.status >= 200 && xhr.status <= 299
}

// `a.click()` doesn't work for all browsers (#465)
function click (node) {
  try {
    node.dispatchEvent(new MouseEvent('click'))
  } catch (e) {
    var evt = document.createEvent('MouseEvents')
    evt.initMouseEvent('click', true, true, window, 0, 0, 0, 80,
                          20, false, false, false, false, 0, null)
    node.dispatchEvent(evt)
  }
}

// Detect WebView inside a native macOS app by ruling out all browsers
// We just need to check for 'Safari' because all other browsers (besides Firefox) include that too
// https://www.whatismybrowser.com/guides/the-latest-user-agent/macos
var isMacOSWebView = _global.navigator && /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent)

var saveAs = _global.saveAs || (
  // probably in some web worker
  (typeof window !== 'object' || window !== _global)
    ? function saveAs () { /* noop */ }

  // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView
  : ('download' in HTMLAnchorElement.prototype && !isMacOSWebView)
  ? function saveAs (blob, name, opts) {
    var URL = _global.URL || _global.webkitURL
    // Namespace is used to prevent conflict w/ Chrome Poper Blocker extension (Issue #561)
    var a = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
    name = name || blob.name || 'download'

    a.download = name
    a.rel = 'noopener' // tabnabbing

    // TODO: detect chrome extensions & packaged apps
    // a.target = '_blank'

    if (typeof blob === 'string') {
      // Support regular links
      a.href = blob
      if (a.origin !== location.origin) {
        corsEnabled(a.href)
          ? download(blob, name, opts)
          : click(a, a.target = '_blank')
      } else {
        click(a)
      }
    } else {
      // Support blobs
      a.href = URL.createObjectURL(blob)
      setTimeout(function () { URL.revokeObjectURL(a.href) }, 4E4) // 40s
      setTimeout(function () { click(a) }, 0)
    }
  }

  // Use msSaveOrOpenBlob as a second approach
  : 'msSaveOrOpenBlob' in navigator
  ? function saveAs (blob, name, opts) {
    name = name || blob.name || 'download'

    if (typeof blob === 'string') {
      if (corsEnabled(blob)) {
        download(blob, name, opts)
      } else {
        var a = document.createElement('a')
        a.href = blob
        a.target = '_blank'
        setTimeout(function () { click(a) })
      }
    } else {
      navigator.msSaveOrOpenBlob(bom(blob, opts), name)
    }
  }

  // Fallback to using FileReader and a popup
  : function saveAs (blob, name, opts, popup) {
    // Open a popup immediately do go around popup blocker
    // Mostly only available on user interaction and the fileReader is async so...
    popup = popup || open('', '_blank')
    if (popup) {
      popup.document.title =
      popup.document.body.innerText = 'downloading...'
    }

    if (typeof blob === 'string') return download(blob, name, opts)

    var force = blob.type === 'application/octet-stream'
    var isSafari = /constructor/i.test(_global.HTMLElement) || _global.safari
    var isChromeIOS = /CriOS\/[\d]+/.test(navigator.userAgent)

    if ((isChromeIOS || (force && isSafari) || isMacOSWebView) && typeof FileReader !== 'undefined') {
      // Safari doesn't allow downloading of blob URLs
      var reader = new FileReader()
      reader.onloadend = function () {
        var url = reader.result
        url = isChromeIOS ? url : url.replace(/^data:[^;]*;/, 'data:attachment/file;')
        if (popup) popup.location.href = url
        else location = url
        popup = null // reverse-tabnabbing #460
      }
      reader.readAsDataURL(blob)
    } else {
      var URL = _global.URL || _global.webkitURL
      var url = URL.createObjectURL(blob)
      if (popup) popup.location = url
      else location.href = url
      popup = null // reverse-tabnabbing #460
      setTimeout(function () { URL.revokeObjectURL(url) }, 4E4) // 40s
    }
  }
)


function downloadData() {
  let username = localStorage.getItem("username");
  
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
    .then((resp) => resp.json())
    .then((data) => {
      var content = JSON.stringify({
        data: data.data,
      });
      var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
      const fileName = username + "_data.json";
      saveAs(blob, fileName);
    })
    .catch((err) => {
      console.log(err);
    }); 
}
