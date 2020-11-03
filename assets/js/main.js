$(function () {
    'use strict';

    $('.form-group > .pw').on('click', function () {
        console.log($(this).find('img').attr('src'));
        $(this).hasClass('eye-view') ? ($(this).removeClass('eye-view'), $(this).parent().children('input').attr('type', 'password')) : ($(this).addClass('eye-view'), $(this).parent().children('input').attr('type', 'text'));
        var src = ($(this).find('img').attr('src') === 'assets/images/eyes.png' ? 'assets/images/eyes-gach.png' : 'assets/images/eyes.png');
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
        },
        // errorElement: 'span',
        submitHandler: function (form) {
            form.submit();
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
        // errorElement: 'span',
        submitHandler: function (form) {
            form.submit();
        },
    });

    $(window).load(function () {
        // $('html, body').animate({ scrollTop: $(document).height() }, 1000);
    });

    $(window).on('load resize', function(){
        if(getMobileOperatingSystem() === 'Android') {
            $('.android').show();
            $('.ios').hide();
        } else {
            $('.android').hide();
            $('.ios').show();
        }
        
        var win = $(this);
        if (win.width() > 768) {
            $('body').addClass('pc').removeClass('sp');
            var src = $('.logo img').attr('src');
            $('#form').show();
            if (src === 'assets/images/logo-sp.png') {
                $('.logo img').attr('src', 'assets/images/logo.png');
            }
        } else {
            $('body').addClass('sp').removeClass('pc');
            $('#form').hide();
            var src = $('.logo img').attr('src');
            if (src === 'assets/images/logo.png') {
                $('.logo img').attr('src', 'assets/images/logo-sp.png');
            }
        }
    });

    $('.tabs .tab-item').click(function() {
        var tab = $(this).attr("data-tab");
        $('.tabs .tab-item').removeClass('active');
        $(this).addClass('active');
        if(tab === 'register') {
            var src = $('.tab-item.register img').attr('src');
            if (src === 'assets/images/reg.png') {
                $('.tab-item.register img').attr('src', 'assets/images/reg-active.png');
            }
            
            var srclogin = $('.tab-item.login img').attr('src');
            if(srclogin === 'assets/images/log-active.png') {
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
            if(srcregister === 'assets/images/reg-active.png') {
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
          return "Windows Phone";
      }
  
      if (/android/i.test(userAgent)) {
          return "Android";
      }
  
      // iOS detection from: http://stackoverflow.com/a/9039885/177710
      if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
          return "iOS";
      }
  
      return "unknown";
  }