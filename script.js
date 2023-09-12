


$(function () {
  // Display current date, tried other formats, really like the "dddd, MMMM D, YYYY" the best
  const currentDate = dayjs().format("dddd, MMMM D, YYYY");
  $("#currentDay").text(currentDate); //Took forever to figure out I was missing the $ symbol

  // The for loop to go through each hour
  $(".time-block").each(function () {
    const hourString = $(this).attr("id").split("-")[1];
    const hour = parseInt(hourString);
    const currentHour = parseInt(dayjs().format("H"));

    //The if statement to cycle through past,present, and future hours
    if (hour < currentHour) {
      $(this).addClass("past");
      $(this).removeClass("present future");
    } else if (hour === currentHour) {
      $(this).addClass("present");
      $(this).removeClass("past future");
    } else {
      $(this).addClass("future");
      $(this).removeClass("past present");
    }

    // This will "get" or pull the saved items
    const savedData = localStorage.getItem(`hour-${hour}`);
    if (savedData) {
      $(this).find("textarea").val(savedData);
    }
  });

  // The event listener for buttons
  //Checked, the ".saveBtn" does store to local with time
  $(".saveBtn").on("click", function () {
    const timeBlock = $(this).closest(".time-block");
    const hour = timeBlock.attr("id").split("-")[1];
    const textAreaValue = timeBlock.find("textarea").val();

    // Save users input to localStorage
    localStorage.setItem(`hour-${hour}`, textAreaValue);
  });
});


// Adding a current clock for easy use to the user
const currentDate = dayjs().format("dddd, MMMM D, YYYY");
$("#currentDay").text(currentDate);

//This was a neat find, going to use it alot in the future
function updateClock() {
  const currentTime = dayjs().format("h:mm:ss A");
  $("#liveClock").text(currentTime);
}

updateClock();//Call for the clock to keep updating itself
setInterval(updateClock, 1000);//Forgot it tracks time in milseconds

// This should update the colors in the boxes, and after a few hundrend tries it does :)
function updateTimeBlocks() {
  const currentHour = dayjs().hour(); // get current hour

  $(".time-block").each(function () { //$$$$$-need to ask about these
    const blockHour = parseInt($(this).attr("id").split("-")[1]); // get the hour from the id

    if (blockHour < currentHour) {
      $(this).removeClass("present future").addClass("past");
    } else if (blockHour === currentHour) {
      $(this).removeClass("past future").addClass("present");
    } else {
      $(this).removeClass("past present").addClass("future");
    }

  });
}

// Call for the function to set the initial class 
updateTimeBlocks();

// )
// 60,000 milseconds would equal one hour which is when we want the colors to change
//I kept trying to use 6000
setInterval(updateTimeBlocks, 60000);


  //Need to ask if I need to put in a reset function into this
