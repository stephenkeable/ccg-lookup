var postcode_field = document.getElementById("postcode");
var lookup_button = document.getElementById("lookup");
var output_div = document.getElementById("output");

// Events

postcode_field.addEventListener("keyup", function(e) {
    if(e.keyCode === 13) {
        e.preventDefault();
        lookup_ccg_by_postcode(postcode_field);
        postcode_field.blur();
    }
});

lookup_button.addEventListener("click", function(e) {
    e.preventDefault();
    lookup_ccg_by_postcode(postcode_field);
});

function lookup_ccg_by_postcode(postcode_field) {
    
    gtag('event', 'search', {'search_term': 'postcode'});
    
    var ccg_request_url = "https://api.postcodes.io/postcodes/" + encodeURIComponent(postcode_field.value.trim());
    
    var ccg_request = new XMLHttpRequest();
                        
    ccg_request.open('GET', ccg_request_url, true);

    ccg_request.onload = function() {
        if (ccg_request.status === 200) {

            var data = JSON.parse(ccg_request.responseText);
            
            output_div.innerHTML = "";

            var ccg_name = document.createElement("p");
            ccg_name.innerHTML = "<strong>ICB Name:</strong> " + data.result.ccg;
            output_div.insertAdjacentElement("beforeend", ccg_name);

            if (data.result.codes.ccg) {
                    
                var ccg_nhs_code = document.createElement("p");
                ccg_nhs_code.innerHTML = "<strong>NHS code:</strong> " + data.result.codes.ccg_id
                output_div.insertAdjacentElement("beforeend", ccg_nhs_code);
                
                var ccg_ons_code = document.createElement("p");
                ccg_ons_code.innerHTML = "<strong>ONS/GSS code:</strong> " + data.result.codes.ccg;
                output_div.insertAdjacentElement("beforeend", ccg_ons_code);
                
            }

        } else {

            //console.error(ccg_request.status + " error from API");
            
            output_div.innerHTML = "";
            
            var error_message = document.createElement("p");
            error_message.innerHTML = "Postcode not found";
            error_message.classList.add("error");
            output_div.insertAdjacentElement("beforeend", error_message);

        }
    };

    ccg_request.onerror = function() {

        //console.error("Connection error from API");
            
        output_div.innerHTML = "";

        var error_message = document.createElement("p");
        error_message.innerHTML = "Connection error from API";
        error_message.classList.add("error");
        output_div.insertAdjacentElement("beforeend", error_message);
        
    };

    ccg_request.send();
    
}
