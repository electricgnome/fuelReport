let drivers = 1;
let cars = 1;
let vresult = [];
let date1 = new Date();
let email_name = $("#user").attr("value");
var v_user = email_name.split("@")[0];
if (v_user !== "") {
  localStorage.setItem("user", v_user);
}
user = localStorage.getItem("user");
var user_li = [];
// date1.setDate(date1.getDate()+1);

// =====chat app ==========
var server = io();
server.on("connect", function(socket) {
  console.log(user + " connected");
});
server.emit("user", user);

server.on("message", function(message) {
  var chat = document.getElementById("chat-box");
  chat.insertAdjacentHTML("beforeend", "\n" + message);
  alert("Server says: " + message);
});

server.on("users", function(users) {
  users.forEach(element => {
    console.log(user_li);

    if (!user_li.includes(element)) {
      var node = document.createElement("LI");
      var textnode = document.createTextNode(element);
      node.appendChild(textnode);
      document.getElementById("user_list").appendChild(node);
      user_li.push(element);
    }
  });
});
server.on("chat-msg", function(user, msg) {
  var chat = document.getElementById("chat-box");
  chat.insertAdjacentHTML("beforeend", "\n" + user + ": " + msg);
});

function send_message(event) {
  var char = event.which || event.keyCode;
  if (char == "13") {
    var msg = document.getElementById("message");
    server.emit("incoming", msg.value, user);
    msg.value = "";
  }
}
// =====end chat app =========

function materialize() {
  $(".modal").modal();
  $(".datepicker1").datepicker({
    format: "yyyy-mm-dd",
    minDate: date1
  });

  $(".datepicker").datepicker({
    format: "yyyy-mm-dd",
    yearRange: 90
  });
  $("select").formSelect();
  $(".tabs").tabs({});

  $(".tooltipped").tooltip();
  $(".sidenav").sidenav();
  $(".fixed-action-btn").floatingActionButton({
    direction: "left",
    hoverEnabled: false
  });

  $("input.counter").characterCounter();

  $("input[type=radio][name=curr_insured_flag]").click(function() {
    if ($("input[type=radio][name=curr_insured_flag]:checked").val() === "0") {
      jQuery("#pop").hide();
    } else {
      jQuery("#pop").show();
    }
  });

  $(`select[name=coverage${cars}]`).change(function() {
    var active_car = this.getAttribute("value");
    console.log("car: " + active_car);
    if (
      $(`select[name=coverage${active_car}][id=selects_field]`).val() ==
      "liability"
    ) {
      jQuery(`#full_cover${active_car}`).hide();
    } else {
      jQuery(`#full_cover${active_car}`).show();
    }
  });

  $(`input[type=radio][name=accident_tickets_flag${drivers}]`).click(
    function() {
      var active_driver = this.getAttribute("acc");
      console.log("active driver: " + active_driver);
      if (
        $(
          `input[type=radio][name=accident_tickets_flag${active_driver}]:checked`
        ).val() == "0"
      ) {
        jQuery(`#accidents${active_driver}`).hide();
      } else {
        jQuery(`#accidents${active_driver}`).show();
      }
    }
  );

  $(`#verify_vin${cars}`)
    .off()
    .on("click", function() {
      var active_car = this.getAttribute("value");

      verify_vin(document.getElementById(`VIN${active_car}`).value, active_car);
    });
}

// 1N4AL3AP6DN452526
function verify_vin(vin, active_car) {
  console.log("verify vin: " + active_car);
  vresult;
  $.ajax({
    url: "https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVINValuesBatch/",
    type: "POST",
    data: { format: "json", data: vin },
    dataType: "json",
    success: function(result) {
      vresult = result;
      if (
        vresult.Message == "No data found" ||
        vresult.Results[0].ErrorCode.indexOf("0") != 0
      ) {
        // alert(vresult.Results[0].ErrorCode)
        console.log(vresult.Results[0].ErrorCode);
        $("#error_msg").html(`${vresult.Results[0].ErrorCode}`);
        $("#modal1").modal("open");
        return 0;
      } else {
        console.log(result);
        $(`#brand${active_car}`).val(
          $(`#brand${active_car}`).val() + vresult.Results[0].Make
        );
        $(`#year${active_car}`).val(
          $(`#year${active_car}`).val() + vresult.Results[0].ModelYear
        );
        $(`#model${active_car}`).val(
          $(`#model${active_car}`).val() + vresult.Results[0].Model
        );
      }
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.log(xhr.status);
      console.log(thrownError);
    }
  });
}

$(window).on("load", function() {
  materialize();
  $(".collapsible").collapsible();

  $("#add_btn").on("click", function() {
    drivers += 1;

    $(
      `<li class="tab"><a href="#driver${drivers}"> driver ${drivers}</a> </li>`
    ).insertBefore("#add_li");
    $(`<div id="driver${drivers}" value='${drivers}' style='display:block'; class="active">
    <!-- driver ${drivers} Tabs-->
<h5 class="center-align">Driver ${drivers} information</h5>
<!-- <h6 class="center-align">Additional driver info</h6> -->
<div class="row">
    <div class="input-field col s6 offset-m3 m3">
        <input name="first_name${drivers}" id="first_name${drivers}" type="text" class="validate">
        <label for="first_name${drivers}">First Name</label>
    </div>

    <div class="input-field col s6  m3">
        <input name="last_name${drivers}" id="last_name${drivers}" type="text" class="validate">
        <label for="last_name${drivers}">Last Name</label>
    </div>
</div>
<div class="row">
    <div class="input-field col s12 offset-m3 m6">
        <input name="occupation${drivers}" id="occupation${drivers}" type="text">
        <label for="occupation${drivers}">Occupation</label>
    </div></div>

<div class="divider"></div>
<div class="row">
    <div class="col s6 offset-m3 m3">

        <p>
            <label>
                <input class="with-gap" name="gender${drivers}" type="radio" value="male" checked />
                <span>Male</span>
            </label>
        </p>
        <p>
            <label>
                <input class="with-gap" name="gender${drivers}" type="radio" value="female" />
                <span>Female</span>
            </label>
        </p>
    </div>
    <div class="col s6 m3">
        <p>
            <label>
                <input class="with-gap" name="marital_status${drivers}" type="radio" value="single" checked />
                <span>Single</span>
            </label>
        </p>
        <p>
            <label>
                <input class="with-gap" name="marital_status${drivers}" type="radio" value="Married" />
                <span>Married</span>
            </label>
        </p>

    </div>

</div>
<div class="divider"></div>
<div class="row">

    <div class="input-field col s6 offset-m3 m3">
        <label for="birthdate${drivers}" class>birthdate</label>
        <input name="birthdate${drivers}" id="birthdate${drivers}" type="text" class="datepicker">


    </div>

    <div class=" input-field col s6 m3">
        <select name="relation${drivers}" id='relation${drivers}'>
            <option  value="self" >Self</option>
            <option class="flow-text" value="spouse" selected>Spouse/common law</option>
            <option value="sibiling">Sibiling</option>
            <option value="parent">Parent</option>
            <option value="child">Child</option>
            <option value="other">Other</option>
        </select>
        <label>Relation to primary driver:</label>
    </div>
</div>

<div class="row">
    <div class="input-field col s6 offset-m3 m3">
        <select name="id_type${drivers}" id="id_type${drivers}">
            <option value="Tx DL" selected>Tx Drivers License</option>
            <option value="Tx ID">Texas ID</option>
            <option value="Out of state">Out of state</option>
            <option value="passport">Passport</option>
            <option value="matricula">Matricula</option>
            <option value="International DL">International Drivers License</option>
            <option value="no ID">No ID</option>
        </select>
        <label>Form of ID (Choose one):</label>
    </div>
    <div class="input-field col s6 m3">
        <label for="id_number${drivers}">ID Number</label>
        <input name="id_number${drivers}" id="id_number${drivers}" type="text" class="validate counter" data-length="20">

    </div>

</div>

<h5 class="center-align">Accidents or Tickets?</h5>
<h6 class="center-align">Please be honest. Your record will be verified. You may get a disclousre discount</h6>
<br>
<br> 
<div class="row">
    <div class="col s12 offset-m3 m3">
Any accidents or tickets in the past 5 years: &nbsp;&nbsp;&nbsp;

<label>
    <input class="with-gap" name="accident_tickets_flag${drivers}" acc="${drivers}" type="radio" value="1" />
    <span>Yes</span>
</label>

<label>
    <input class="with-gap" name="accident_tickets_flag${drivers}" acc="${drivers}" type="radio" value="0" checked/>
    <span>No</span>
</label>
</div>
</div>
<div class="optional" id="accidents${drivers}">
<div class="row">
<div class="col s6 offset-m3 m3">
            <span class="tooltip"></span>
            <br>
            <span class="c1">How many tickets have you had in the past 3 years?</span>
            <span class="c2">
                <input type="number" min="0" max="4" value="0" name="num_tickets${drivers}">
            </span>

        </div>
    

        <div class="col s6 m3">
            <span class="tooltip"></span>
            <br>
            <span class="c1">How many accidents have you had in the past 3 years?</span>
            <span class="c2">
                <input type="number" min="0" max="4" value="0" name="num_accidents${drivers}">
            </span>
            <br>
            <br> were any of these accidents at fault?
            <label>
                <input class="with-gap" name="at_fault_flag${drivers}" type="radio" value="1" />
                <span>Yes</span>
            </label>

            <label>
                <input class="with-gap" name="at_fault_flag${drivers}" type="radio" value="0" checked/>
                <span>No</span>
            </label>
            <br>
            <br>
        </div>
    </div>

</div>
    
    </div>`).insertBefore("#add_div");

    materialize();

    setTimeout(function() {
      $("#driver_tabs li.tab a")[`${drivers - 1}`].click();
      $(`#driver${drivers - 1}`).css("display", "none");
      $(`#driver${drivers - 1}`).removeClass("active");
    }, 100);
  });

  $("#add_car_btn").on("click", function() {
    cars += 1;
    $(
      `<li class="tab"><a href="#vehicle${cars}"> vehicle ${cars}</a> </li>`
    ).insertBefore("#add_car_li");
    $(`<div id="vehicle${cars}" style='display:block'; class="active">
    <!-- vehicle ${cars} Tabs-->
      <div id="vehicle${cars}">
                <h5 class="center-align" class="fs-title">Vehicle ${cars}</h5>
                <h6 class="center-align" class="fs-subtitle">What Vehicle are we insuring today?</h6>
                <div class="row">
                    <div class="input-field col s7 offset-m3 m3">
                        <input type="text" id="VIN${cars}" name="VIN${cars}" placeholder="(VIN) Vehicle Identification Number"   class="counter" data-length="17" required />
                       
                    </div>
                    <div class="col s3 m3">
                        <a class="btn waves-effect waves-light" name="verify_vin" id="verify_vin${cars}" value="${cars}" >verify VIN
                        </a>
                    </div>
                  
                </div>
                <div class="row">
                    <div class="input-field col s4 offset-m1 m3">
                        <input type="text" id="year${cars}" name="year${cars}" placeholder="year" />
                    </div>
                    <div class="input-field col s4 m3 ">
                        <input type="text" id="brand${cars}" name="brand${cars}" placeholder="brand" />
                    </div>
                    <div class="input-field col s4 m3 ">
                        <input type="text" id="model${cars}" name="model${cars}" placeholder="model" />
                    </div>
                </div>


                <div id="coverages${cars}">
                    <h5 class="center-align">Coverage</h5>
                    <h6 class="center-align">How much coverage do you want?</h6>
                    <div class="row">
                        <div class="input-field col s12 offset-m2 m6">
                            <select name="coverage${cars}" id="selects_field" value="${cars}">

                                <option value="liability" selected>Liability Only</option>
                                <option value="full_coverage">Comprihensive/Collision(Full Coverage)</option>
                            </select>
                            <label>How much coverage do you want:</label>
                        </div>

                        
                    </div>
                    <div class="optional" id="full_cover${cars}">
                         <div class="row">
                            <div class="input-field col s6 offset-m2 m2">
                                <select name="deductible${cars}" id="selects_field" value="${cars}">
                                    <option value="500">$500.00</option>
                                    <option value="1000">$1,000.00</option>
                                    <option value="0" selected>None</option>
                                </select>
                                <label>Desired Deductible:</label>
                            </div>
                        </div>

                        <div style="text-align:left">
                            <br>
                            <h5 class="center-align">Additional coverage:</h5>
                            <br>
                            <div class="row">
                            <div class="input-field col s6 offset-m2 m4">
                            <p>
                            <label>
                                <input type="checkbox" name="pip_flag${cars}" value="1">
                                <span>Personal Injury Protection (PIP)</span>
                            </label></p>
                            <br>
                            <p>
                            <label>
                                <input type="checkbox" name="uninsured_motor_flag${cars}" value="1">
                                <span>Uninsured Motorist</span>
                            </label></p>
                            </div>

                            <div class="input-field col s6 m4">
                            <p>
                            <label>
                                <input type="checkbox" name="rental_flag${cars}" value="1">
                                <span>Rental</span>
                            </label></p>
                            <br>
                            <p>
                            <label>
                                <input type="checkbox" name="towing_flag${cars}" value="1">
                                <span>Towing</span>
                            </label>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

                </div>
            </div>
        </div>

    </div>`).insertBefore("#add_car");

    materialize();
    setTimeout(function() {
      $("#cars_tabs li.tab a")[`${cars - 1}`].click();
      $(`#vehicle${cars - 1}`).css("display", "none");
      $(`#vehicle${cars - 1}`).removeClass("active");
    }, 100);
  });
});

var driver = [
  "first_name",
  "last_name",
  "cell_phone",
  "email",
  "gender",
  "marital_status",
  "birthdate",
  "relation",
  "form_id",
  "id_no"
];
