document.addEventListener('DOMContentLoaded', function () {

    $("#search-btn").click(function (e) {
        e.preventDefault();
        
        $("body").addClass("started");
        var term = $("#search-box").val();
        $(".search-result").show();
         $(".product-details").hide();
        var apiURL = "https://api.zalando.com/articles?fullText=" + term;

        $.ajax({
            url: apiURL,

            headers: {
                'Accept-Language': 'de-DE',
            },
            beforeSend: function () {
                $('.ld-wrapper').show();
            },
            complete: function () {
                $('.ld-wrapper').hide();
            },
            success: function (data) {
                
                console.log("SUC", data.content);
                $("#search-box").val("");
                $(".search-result").html("")
                
                if(data.content.length > 0) {
                    data.content.forEach(function (item, index) {
                    $(".search-result").append("<li class=" + ((index % 2 == 0) ? 'first' : 'second') + " data-productId=" + item.id + "><img class='product-image' src=" + item.media.images[0].smallUrl + "><span class='brand-name'>" + item.brand.name + "</span> <span>" + item.name.substring(0,30) + "</span></li>");
                });
                } else {
                     $(".search-result").append("<div class='nothing-found'>Nothing found! :(</div>");
                }
                

            },
            error: function (data) {
                console.log("ERR", data);
            }
        });
    });


    $(".search-result").on('click', 'li', function () {
        var id = $(this).attr("data-productid");
        var urlProductDetails = "https://api.zalando.com/articles/" + id;
        console.log(id);
        $(".product-details").show();
        $.ajax({
            url: urlProductDetails,
            beforeSend: function () {
                $('.ld-wrapper').show();
            },
            complete: function () {
                $('.ld-wrapper').hide();
            },

            headers: {
                'Accept-Language': 'de-DE',
            },
            success: function (data) {
                console.log("Product details", data);
                $(".search-result").hide();
                $(".product-details").html("");
                $(".product-details").append("<span class='brand-name'>" + data.brand.name + "</span>" + 
                                             "<span class='product-name'>" + data.name + "</span>")
            },
            error: function (data) {
                console.log("ERR", data);
            }
        });
    })

});