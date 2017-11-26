$(document).ready(function() {

    var news = $('#app-body-wrapper');
    $nextPage = $('#next');
    $prevPage = $('#prev');
    $display = $("#pageDisplay")
    $pageNumber = $display.val();

    if ($pageNumber === "1") {
        $prevPage.hide();
    }

    newsFeed();

    function newsFeed() {
       $.ajax({
                type: "GET",
                dataType: "jsonp",
                data: { get_param: 'value' },
                cache: false,
                url: "https://content.guardianapis.com/search?show-blocks=body&page="+ $pageNumber +"&api-key=a82427d0-599a-4d97-a1db-c01da3abfa77",
                success: function (data) {

                    for (var i = 0; i < data.response.results.length; i++) {
                        $(news).append("<h1 class='app-body__wrapper_heading js-heading' id='news-heading'>" + data.response.results[i].webTitle + "<span class='cross'>" + "<span>" + "</h1>" + "<span class='description' id='description'> " + data.response.results[i].blocks.body["0"].bodyTextSummary + "</span>");
                        var link = "<a class='more' target='_blank'>read more</a>";
                        $(news).append($(link).attr("href", data.response.results[i].webUrl));
                    }

                        $(".description").slideUp(10);
                        $("h1").click(function(e){
                            $(this).children().toggleClass("cross-active");
                            text = $(this).next(".description");
                            text.slideToggle();
                        });
                      

                },
                error: function(jqXHR, textStatus, errorThrown) {
                    $(news).append("<h1>" + "Sorry, no news today :-(" + "</h1>");
                }
            });

    }

    $("#app-reload").click(function () {
        $(news).fadeOut(50);
        $(news).empty();
        newsFeed();
        $(news).fadeIn(1000);
    });

    var i = 1;


    $nextPage.click(function(){

        if (i < 160000 ) {
            i++;
        } else if (i = i++) {
            i = 1;
        }
        $pageNumber = i;
        $(news).fadeOut(50);
        $(news).empty();
        newsFeed();
        $(news).fadeIn(1000);
        document.getElementById("pageDisplay").innerHTML = i;
        $display.val(i);
        $prevPage.show();
    })

    $prevPage.click(function(){

        if (i > 1) {--i;}
        $pageNumber = i;
        $(news).fadeOut(50);
        $(news).empty();
        newsFeed();
        $(news).fadeIn(1000);
        $display.val(i);
        if ($pageNumber === 1) {
            $(this).hide();
        }
    })

    $display.on("input", function () {
        i = $(this).val();
        $pageNumber = i;
        $(news).fadeOut(50);
        $(news).empty();
        newsFeed();
        $(news).fadeIn(1000);
    })
});