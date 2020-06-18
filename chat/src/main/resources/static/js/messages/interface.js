$(function () {
    $(window).on('resize', function () {
        var clientW = $(window).width();
        if (clientW < 768) {
            $('.row .send_nei').addClass("w-100");
            $('.row .send_nei').removeClass("w-50");
        } else {
            $('.row .send_nei').removeClass("w-100");
            $('.row .send_nei').addClass("w-50");
        }
    }).trigger('resize');
});