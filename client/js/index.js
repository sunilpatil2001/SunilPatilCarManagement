$(document).ready(function () {
  $("#myForm").submit(function (event) {
    event.preventDefault();

    const id = $("input[name=input1]").val();
    const make = $("input[name=input2]").val();
    const color = $("input[name=input3]").val();
    const price = $("input[name=input4]").val();
    var formData = {
      id: $("input[name=input1]").val(),
      make: $("input[name=input2]").val(),
      color: $("input[name=input3]").val(),
      price: $("input[name=input4]").val(),
    };

    if (make === "" || color === "" || isNaN(price) || isNaN(id)) {
      var s = `Please enter all details missing fields : `;
      if (make === "") {
        s += "make ";
      }
      if (color === "") {
        s += "color";
      }

      document.getElementById("myFormMessage").innerHTML = s;
      document.getElementById("myFormMessage").style.color = "red";
    } else {
      $.ajax({
        type: "POST",
        url: "http://localhost:3000/cars",
        data: formData,
        success: function (response) {
          // Handle successful response
          console.log("succes");
        },
        error: function (xhr, status, error) {
          // Handle error
          console.log("fail");
        },
      });
    }
  });

  $("#myFormUpdate").submit(function (event) {
    event.preventDefault();

    const id = $("input[name=input11]").val();
    const make = $("input[name=input22]").val();
    const color = $("input[name=input33]").val();
    const price = $("input[name=input44]").val();

    const x = parseInt(id);
    console.log(typeof x);
    var formData = {
      id: x,
      make: $("input[name=input22]").val(),
      color: $("input[name=input33]").val(),
      price: $("input[name=input44]").val(),
    };

    if (make === "" || color === "" || isNaN(price) || isNaN(id)) {
      var s = `Please enter all details missing fields for update : `;
      if (make === "") {
        s += "make ";
      }
      if (color === "") {
        s += "color";
      }

      document.getElementById("myFormMessageUpdate").innerHTML = s;
      document.getElementById("myFormMessageUpdate").style.color = "red";
    } else {
      $.ajax({
        type: "DELETE",
        url: `http://localhost:3000/cars/${x}`,
        data: formData,
        success: function (response) {
          // Handle successful response
          console.log("update succes");
        },
        error: function (xhr, status, error) {
          // Handle error
          console.log("update fail");
        },
      });

      $.ajax({
        type: "POST",
        url: `http://localhost:3000/cars/${x}`,
        data: formData,
        success: function (response) {
          // Handle successful response
          console.log("update succes");
        },
        error: function (xhr, status, error) {
          // Handle error
          console.log("update fail");
        },
      });
    }
  });

  $("#deleteform").submit(function (event) {
    event.preventDefault();

    const id = $("input[name=d]").val();
    const x = parseInt(id);

    if (isNaN(id)) {
      alert("enter delete all fields");
    } else {
      $.ajax({
        type: "DELETE",
        url: `http://localhost:3000/cars/${x}`,
        success: function (response) {
          // Handle successful response
          console.log("delete succes");
          alert("Deleted success");
        },
        error: function (xhr, status, error) {
          // Handle error
          console.log("deete fail");
          alert("Deleted fail");
        },
      });
    }
  });

  $.ajax({
    type: "GET",
    url: "http://localhost:3000/cars",
    dataType: "json",
    success: function (response) {
      console.log("succes");
      console.log(response);
      for (var i = 0; i < response.length; i++) {
        var x = response[i];
        
        var row = $("<tr>");
        row.append($("<td>").text(x.id));
        row.append($("<td>").text(x.make));
        row.append($("<td>").text(x.color));
        row.append($("<td>").text(x.price));
        $("#myTable tbody").append(row);
      }
    },
    error: function (xhr, status, error) {
      console.log("fail");
    },
  });
});
