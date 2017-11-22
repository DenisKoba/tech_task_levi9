$(document).ready(function() {

    function newsFeed() {
        var inputVal = $("#input").val();
        var news = $('#app-body-wrapper');

            $.ajax({
                type: "GET",
                dataType: "jsonp",
                data: { get_param: 'value' },
                cache: false,
                url: "http://content.guardianapis.com/search?show-blocks=body&api-key=test",
                    success: function (data) {

                    for (var i = 0; i < data.response.results.length; i++) {
                        $(news).append("<h1 class='app-body__wrapper_heading js-heading' id='news-heading'>" + data.response.results[i].webTitle + "<span class='cross'>" + "<span>" + "</h1>" + "<span class='description' id='description'> " + data.response.results[i].blocks.body["0"].bodyTextSummary + "</span>");
                        var link = "<a class='more'>read more</a>";
                        $(news).append($(link).attr("href", data.response.results[i].webUrl));
                    }
                        $(".description").slideUp(10);
                        $("h1").click(function(e){
                            $(this).children().toggleClass("cross-active");
                            text = $(this).next(".description");
                            text.slideToggle();
                        })
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    $(news).append("<h1>" + "Sorry, no news today :-(" + "</h1>");
                }
            });
    }
    newsFeed();

    $("#app-reload").click(function () {
        location.reload();
    });
});