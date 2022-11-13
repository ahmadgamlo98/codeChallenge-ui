


$(document).ready(function () {
    $.ajax({
        url: "http://127.0.0.1:8000/api/fetchall_api",
        success: function (result) {
            tet = result;
            var html = "";
            $.each(result, function (key, val) {
                var id = val.id;
                var name = val.name;
                var address = val.address;
                var mobilenumber = val.mobilenumber;
                var countryname = val.countryname;

                html += "<tr>" +
                    "<td>" + id + "</td>" +
                    "<td>" + name + "</td>" +
                    "<td>" + address + "</td>" +
                    "<td>" + mobilenumber + "</td>" +
                    "<td>" + countryname + "</td>" +
                    `<td id=action><button id="delete" type="button" data-id="${id}" class="btn btn-danger delete"> Delete </button><a style="margin-left: 10px;" type="button" data-id="${id}" class="btn btn-primary edit" href="http://localhost:8000/edit?id=${id}"> Edit </a></td>` +
                    "</tr>"
            });

            $("#table").find('tbody').append(html)


        }
    });


});
$("#tbody").on("click", ".delete", function (e) {
    // get the current row
    let entryId = $(this).data("id");
    console.log(entryId);
    // var currentRow = $(this).closest("tr");
    // var selectedId = currentRow.find(`td:eq(0)`).text();

    $.ajax({
        url: `http://127.0.0.1:8000/api/delete_api/${entryId}`,
        type: "DELETE",
    }).done(function (response) {
        location.reload()
    });
});



$("#save").on('click', function (e) {
    var name = $("#name").val();
    var address = $("#address").val();
    var mobilenumber = $("#mobilenumber").val();
    
    var myHeaders = new Headers();
    myHeaders.append("apikey", "gUHac3vBzA56EqvYb6pLZJulTCWqWco4");

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };
    var test
    fetch(`https://api.apilayer.com/number_verification/validate?number=${mobilenumber}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.valid) {
                console.log(result.country_name);
                var data = {
                    name: name,
                    address: address,
                    mobilenumber: mobilenumber,
                    countryname: result.country_name
                }
                $.ajax({
                    url: `http://127.0.0.1:8000/api/post_api`,
                    type: "POST",
                    data: data,
                    success: function (newCustomer) {
                       
                        window.location.href = "http://localhost:8000/";

                    },
                    error: function () {
                        alert('error saving customer');
                    }
                });
            } else {
                alert("phone number does not match country code")
            }
        }
        )
        .catch(error => alert("error in the phone number"));
});

$("#tbody").on("click", ".edit", function (e) {

    let updateId = $(this).data("id");

    $.ajax({
        url: `http://127.0.0.1:8000/api/fetchbyid_api/${updateId}`,
        type: "GET",
        data: {},
        success: function (data) {
            $.each(data, function (key, val) {
                $("#name").val(val.name);
                $("#address").val(data.address);
                $("#mobilenumber").val(data.mobilenumber);
            });

        },
        error: function () {
            alert('error saving customer');
        }
    });
});





