$(function () {
    'use strict';

    $('.form-group > .pw').on('click', function () {
        $(this).hasClass('eye-view') ? ($(this).removeClass('eye-view'), $(this).parent().children('input').attr('type', 'password')) : ($(this).addClass('eye-view'), $(this).parent().children('input').attr('type', 'text'));
        var src = $(this).find('img').attr('src') === 'assets/images/eyes.png' ? 'assets/images/eyes-gach.png' : 'assets/images/eyes.png';
        $(this).find('img').attr('src', src);
    });

    $('#registerForm').validate({
        rules: {
            username: {
                required: true,
                minlength: 6,
            },
            password: {
                required: true,
                minlength: 6,
            },
            repeat_pwd: {
                required: true,
                minlength: 6,
                equalTo: '#pwd',
            },
            code: {
                required: true,
                maxlength: 4,
            },
        },
        messages: {
            username: {
                required: 'Vui lòng nhập tên đăng nhập',
                minlength: 'Tên đăng nhập phải dài ít nhất 6 ký tự',
            },
            password: {
                required: 'Vui lòng nhập mật khẩu',
                minlength: 'Mật khẩu phải dài ít nhất 6 ký tự',
            },
            repeat_pwd: {
                required: 'Vui lòng nhập mật khẩu',
                minlength: 'Mật khẩu phải dài ít nhất 6 ký tự',
                equalTo: 'Nhập lại mật khẩu không đúng',
            },
            code: {
                required: 'Vui lòng nhập capcha',
                maxlength: 'Mã capcha dài không quá 4 ký tự',
            },
        },
        errorElement: 'label',
        errorPlacement: function (error, element) {
            if (element.attr('name') === 'code') {
                error.insertAfter($(element).closest('.form-code'));
            } else {
                error.insertAfter($(element));
            }
        },
        submitHandler: function (form) {
            // form.submit();
        },
    });

    $('#loginForm').validate({
        rules: {
            username: {
                required: true,
            },
            password: {
                required: true,
            },
        },
        messages: {
            username: {
                required: 'Vui lòng nhập tên đăng nhập',
            },
            password: {
                required: 'Vui lòng nhập mật khẩu',
            },
        },
        submitHandler: function (form) {
            form.submit();
        },
    });

    $(window).on('load resize', function () {
        if (getMobileOperatingSystem() === 'Android') {
            $('.android').show();
            $('.ios').hide();
        } else {
            $('.android').hide();
            $('.ios').show();
        }
    });

    loadCapcha(),
        $('.btn-reload').click(function () {
            $('#code').val('');
            loadCapcha();
        });

    $('#registerForm').on('submit', function (e) {
        e.preventDefault();
        if (!$('#registerForm').valid()) {
            return false;
        }
        var user = $('#username').val();
        var password = $.md5($('#pwd').val());
        var capcha = $('#code').val();
        var idCode = $('#idcapcha').val();
        console.log('http://portal.zclub.vin/api?c=1&un=' + user + '&pw=' + password + '&cp=' + capcha + '&cid=' + idCode + '&at=');
        $.ajax({
            type: 'GET',
            url: 'http://portal.zclub.vin/api?c=1&un=' + user + '&pw=' + password + '&cp=' + capcha + '&cid=' + idCode + '&at=',
            dataType: 'json',
            contentType: false,
            processData: false,
            cache: false,
            success: function (data) {
                console.log(data);
                if (data.success) {
                    $('.form-group input').val('');
                    alert('Bạn đã đăng ký thành công!');
                    window.location.href = 'http://zclub.vin/';
                } else {
                    $('#code').val('');
                    loadCapcha();
                    switch (data.errorCode) {
                        case '1001':
                            alert("Hệ thống bận.");
                            break;
                        case '1114':
                            alert("Hệ thống bảo trì.");
                            break;
                        case '115':
                            alert("Mã Captcha sai.");
                            break;
                        case '101':
                            alert("Tên đăng nhập không đúng định dạng.");
                            break;
                        case '1109':
                            alert("Khóa login.");
                            break;
                        case '1005':
                            alert("User không đúng.");
                            break;
                        case '1006':
                            alert("Tên đăng nhập đã tồn tại.");
                            break;
                        case '1007':
                            alert("Password sai.");
                            break;
                        case '2001':
                            alert("Yêu cầu nhập nickname.");
                            break;
                        case '1012':
                            alert("Đăng nhập bằng OTP.");
                            break;
                        default:
                            alert("Lỗi xảy ra trong quá trình xử lý hệ thống.");
                    }
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            },
        });
    });

    $('#loginForm').on('submit', function (e) {
        e.preventDefault();
        if (!$('#loginForm').valid()) {
            return false;
        }
        window.location.href = 'http://zclub.vin/';
    });

    $('.tabs .tab-item').click(function () {
        var tab = $(this).attr('data-tab');
        $('.tabs .tab-item').removeClass('active');
        $(this).addClass('active');
        if (tab === 'register') {
            var src = $('.tab-item.register img').attr('src');
            if (src === 'assets/images/reg.png') {
                $('.tab-item.register img').attr('src', 'assets/images/reg-active.png');
            }

            var srclogin = $('.tab-item.login img').attr('src');
            if (srclogin === 'assets/images/log-active.png') {
                $('.tab-item.login img').attr('src', 'assets/images/log.png');
            }

            $('#registerForm').show();
            $('#loginForm').hide();
        } else {
            var src = $('.tab-item.login img').attr('src');
            if (src === 'assets/images/log.png') {
                $('.tab-item.login img').attr('src', 'assets/images/log-active.png');
            }

            var srcregister = $('.tab-item.register img').attr('src');
            if (srcregister === 'assets/images/reg-active.png') {
                $('.tab-item.register img').attr('src', 'assets/images/reg.png');
            }

            $('#registerForm').hide();
            $('#loginForm').show();
        }
    });
});

function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return 'Windows Phone';
    }

    if (/android/i.test(userAgent)) {
        return 'Android';
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return 'iOS';
    }

    return 'unknown';
}

function loadCapcha() {
    $.ajax({
        type: 'GET',
        url: 'http://portal.zclub.vin/api?c=124&type=0&at=',
        dataType: 'json',
        contentType: false,
        processData: false,
        cache: false,
        success: function (data) {
            var base64_string = data.img;
            var img = 'data:image/png;base64,' + base64_string;
            $('.code-img img').attr('src', img);
            $('#idcapcha').val(data.id);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        },
    });
}
