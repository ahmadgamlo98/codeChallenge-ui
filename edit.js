function getUrlVars()
{
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    return params.id;
}

$(document).ready(function () {

    getUrlVars();
    $.ajax({
        url: `http://127.0.0.1:8000/api/fetchbyid_api/${getUrlVars()}`,
        type: "GET",
        data: {},
        success: function (data) {
            $.each(data, function (key, val) {
                $("#name").val(val.name);
                $("#address").val(val.address);
                $("#mobilenumber").val(val.mobilenumber);
            });

        },
        error: function () {
            alert('error saving customer');
        }
    });
});
// $("#save").on('click', function (e) {
//     var name = $("#name").val();
//     var address = $("#address").val();
//     var mobilenumber = $("#mobilenumber").val();
//     var data = {
//         name: name,
//         address: address,
//         mobilenumber: mobilenumber
//     }
//     // console.log(data);
//     $.ajax({
//         url: `http://127.0.0.1:8000/api/update_api/${getUrlVars()}`,
//         type: "PUT",
//         data: data,
//         success: function (newCustomer) {
//             alert('saving new customer');
//         },
//         error: function () {
//             alert('error saving customer');
//         }
//     });
// });
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
                    url: `http://127.0.0.1:8000/api/update_api/${getUrlVars()}`,
                    type: "PUT",
                    data: data,
                    success: function (newCustomer) {
                        alert("Customer Edit Successfuly \n" +
                        "Country Code : "+result.country_code +
                        "\nCountry Name : "+result.country_name);
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