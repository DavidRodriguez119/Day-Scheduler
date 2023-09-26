// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var currentDay = $(`#currentDay`)
var saveBtns = $(`.saveBtn`)

$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  saveBtns.on(`click`, function(){
    // Assign a variable to the parent container
    var parentDiv = $(this).parent();

    // Assign a variable to the textarea inside the parent container
    var textSelected = parentDiv.find(`textarea`).val();
    
    // check if the textarea inside the parent container has any text bo be saved
    if (textSelected == ``) {
      alert(`There is not text to be saved`);
    } else {
      // Get the Id of the parent Div
      var parentId = parentDiv.attr(`id`);

      // add the text inside the data object using the id of the div in which it is located as the key name
      localStorage.setItem(parentId, textSelected);
    }


    
  });
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  var currentHour = dayjs().format(`H`);

  for (var i = 9; i <= 17; i++){
    var timeSection = $(`#hour-` + i);

    if (i < currentHour) {
      timeSection.addClass(`past`)
    } else if (i > currentHour){
      timeSection.addClass(`future`)
    } else {
      timeSection.addClass(`present`)
    };

    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    var retrievedData = localStorage.getItem(`hour-` + i)
    if (retrievedData === null) {

    } else {
      var textArea = timeSection.find(`textarea`);
      textArea.val(retrievedData)
    }

  }


  // TODO: Add code to display the current date in the header of the page.
  currentDay.text(dayjs().format(`MMM DD, YYYY`))
});
