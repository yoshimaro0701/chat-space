$(function(){

  var buildHTML = function(message){
    image = (message.image.url)? `<image class="lower-message__image" src= "${ message.image.url }">` : "";

    var html = `<div class="message" data-message-id="${message.id}">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                      ${message.content}
                    </p>
                    ${image}
                  </div>
                </div>`
    return html;
  };

  function scroll() {
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
    }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $(".new_message")[0].reset();
      $('.form__submit').prop('disabled', false);
      scroll()
    })
    .fail(function(data){
      alert('メッセージが送信できません');
      $('.form__submit').prop('disabled', false);
    })
  })

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      var last_message_id = $('.message').filter(":last").data('messageId');
      var href = 'api/messages#index {:format=>"json"}'

      $.ajax({
      url: href,
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
            messages.forEach(function (message) {
            insertHTML = buildHTML(message);
            $('.messages').append(insertHTML);
          })
          scroll()
      })
      .fail(function() {
        alert('自動更新に失敗しました');
      });
    } 
    else {
      clearInterval(interval);
    }
  };
  var interval = setInterval(reloadMessages, 5000);
});

