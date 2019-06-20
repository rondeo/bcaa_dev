$(document).ready(function () {
  console.log("Скрипты подъехали")

  function createRipple(y, x) {

  }



  $('.btn, .submit_wr, .input_wr').mousedown(e => {
    const offset = $(e.target).offset();
    const ripple = `<div class="circle" style="top:${e.pageY - offset.top}px;left:${e.pageX - offset.left}px;"></div>`;
    const _ripple = $(ripple);
    $(e.currentTarget).find('.ripple').append(_ripple);
    setTimeout(() => _ripple.remove(), 900);

    createRipple(e.pageY - offset.top, e.pageX - offset.left);

  });

  // callback popup

  $(function () {
    $('.header__btn--phone').click(function () {
      $('.callback').addClass('show')
    })

    $('.callback .input--submit').click(function (e) {
      e.preventDefault();
      $(this).parents('.callback').find('.form_hide').hide('fast')
      $(this).parents('.callback').find('.alert').show('fast')
    })
  })

  //contact info popup 

  $(function () {
    $('.header__dropdown--phone .text').click(function () {
      $('.contact__info').addClass('show')
    })
  })

  // header search focus
  $(function () {
    $('.header__search').find('.input--search').focus(function () {
      $('.header__catalog_btn').addClass('focus');
      $('.header__search').addClass('focus');
      $('.search__list').addClass('focus');
    })
    $('.header__search').find('.input--search').focusout(function () {
      $('.header__catalog_btn').removeClass('focus');
      $('.header__search').removeClass('focus');
      $('.search__list').removeClass('focus');
    })

    $('.header__search').find('.input--search').on('input', function () {
      var search = $(this).val();
      $(".header__search .search__name:contains('" + search + "')").each(function () {
        var regex = new RegExp(search, 'gi');
        $(this).html($(this).text().replace(regex, "<span class='marker'>" + search + "</span>"));
      });
    })
  })


  $('.close').click(function () {
    console.log($(this).parent())
    $(this).parent().removeClass('show')
  })

  // смена языка 
  $(function () {

    $(".select-placeholder").on('click', function () {
      $(this).closest('.header__dropdown--language').find('.language__list').slideToggle('fast');
    });
    $('.language-list__item').on('click', function () {
      $(this).closest('.header__dropdown--language').find('.language-list__item').removeClass('checked');
      $(this).addClass('checked');
      var value = $(this).attr('data-value');
      $(this).closest('.header__dropdown--language').find('.select-placeholder').text(value);
      $(this).closest('.header__dropdown--language').find('.select-placeholder').attr('data-value', value);
      $(this).closest('.header__dropdown--language').find('.language__list').animate({ height: 'hide' }, 100);
    });
  })


  // catalog hover aside
  $(function () {
    $('.aside--catalog').find('.catalog__link').hover(function () {

      $('.catalog').addClass('hover');
    })

    $('.aside--catalog').find('.catalog__link').mouseleave(function () {

      $('.catalog').removeClass('hover');
    })
  })

  // hamburger
  $('.menu_toggle').click(function () {
    $('.menu_toggle').toggleClass('open');

    $('.mobile_menu').toggleClass('open');
  });

  //mobile menu show
  $(function () {

    var menu = $('.mobile_menu');

    menu.find('.catalog__link').click(function () {
      $(this).next('.menu_lvl').addClass('show');
    })

    menu.find('.menu_back').click(function () {
      $(this).parent('.menu_lvl').removeClass('show');
    })
  })

  $('.input--phone').mask("+38(000) 000-00-00", { placeholder: "+ 38 ( ___ ) ___ - __ - __" });

  $(document).on('click', function (e) {
    if (!$(e.target).closest('.popup ').length && !$(e.target).closest('.header__btn').length) {
      $('.callback').removeClass('show');
    }
    if (!$(e.target).closest('.popup ').length && !$(e.target).closest('.header__dropdown--phone').length) {
      $('.contact__info').removeClass('show');
    }
    if (!$(e.target).closest('.select-placeholder ').length) {
      $('.language__list').hide();
    }

    e.stopPropagation();
  });

});



