const form = document.getElementById("scratchForm");
const scratchArea = document.getElementById("scratchArea");
const couponText = document.getElementById("couponText");

const SHEET_URL = "https://script.google.com/macros/s/AKfycbxezET2jHoEdvmL3rj7vLy786PUOHXtGLElLeM7ixTvpWBDgqQD9syNcnA3md87363RrQ/exec";

form.addEventListener("submit", function(e){

  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const seat = parseInt(document.getElementById("seat").value);

  if(name===""){
    alert("Please enter your name.");
    return;
  }

  if(mobile.length!==10){
    alert("Please enter a valid mobile number.");
    return;
  }

  if(isNaN(seat) || seat<1 || seat>45){
    alert("Please enter a valid seat number (1-45).");
    return;
  }

  form.style.display="none";
  scratchArea.style.display="block";

  const result = (seat===3 || seat===9)
    ? "50% Discount"
    : "Better Luck Next Time";

  if(seat===3 || seat===9){
    couponText.innerHTML="🎉<br><br>Congratulations!<br><br>50% DISCOUNT";
  }else{
    couponText.innerHTML="😔<br><br>Better Luck Next Time";
  }

  const data = {
    name: name,
    mobile: mobile,
    seat: seat,
    route: "Indore → Khargone",
    result: result
  };

  fetch(SHEET_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify(data)
  });

});
