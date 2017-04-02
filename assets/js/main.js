$(function(){

  var hash = window.location.hash;
  if(hash){
    showContent(hash, '');
  } else {
    if($('.content-div').length){
      target = '#' + $('.content-div').first().attr('id');
      showContent(target, target);
    }
  }

  $('.dropdown-item').click(function(){
    var target = $(this).attr('href');
    target = target.substring(target.indexOf('#'));
    showContent(target, target);
  });

  $('.subnav-link').click(function(e){
    e.preventDefault();
    var target = $(this).attr('href');
    target = target.substring(target.indexOf('#'));
    showContent(target, target);
  });

  function showContent(target, hash){
    if(hash != ''){
      window.location.hash = target;
    }
    $('.subnav-link').removeClass('active');
    $('[href="'+target+'"]').addClass('active');
    $('.content-div').addClass('hidden-xl-down');
    $(target).removeClass('hidden-xl-down');
  }

  function renderSpell(spell){
    var html = '<dl class="row">';
    html += '<dt class="col-sm-3">Casting Time</dt><dd class="col-sm-9">' + spell['casting-time'] + '</dd>';
    html += '<dt class="col-sm-3">Range</dt><dd class="col-sm-9">' + spell['range'] + '</dd>';
    html += '<dt class="col-sm-3">Duration</dt><dd class="col-sm-9">' + spell['duration'] + '</dd>';
    html += '</dl><hr>';
    html += '<p>' + spell['mechanic'] + '</p>';
    html += '<p>' + spell['higher-levels'] + '</p>';
    if(spell['adv-option-1']){
      html += '<h4>Advancements</h4>';
      av1 = spell['adv-option-1'].split('-');
      html += '<p><strong>' + av1[0].trim() + '</strong>: ' + av1[1].trim() + '</p>';
    }
    if(spell['adv-option-2']) {
      av2 = spell['adv-option-2'].split('-');
      html += '<p><strong>' + av2[0].trim() + '</strong>: ' + av2[1].trim() + '</p>';
    }
    return html;
  }

  $('#spell-modal').on('show.bs.modal', function (e) {
    var spell =  $(e.relatedTarget).data('spell');
    $('#spell-modal .modal-title').html(spell);
    $.getJSON( "/assets/js/spells.json" , function( result ){
      $.each(result, function(k,v){
        if(v["power"] == spell){
          html = renderSpell(v);
          $('#spell-modal .modal-body').html(html)
        }
      });
    });
  });

});