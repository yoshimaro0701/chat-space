$(function(){

  var latest_id = 0;

  function buildHTML(message){
    var img = message.image ? `<img src= ${ message.image }>` : "";
    if (message.content && message.image.url) {

    var html = `<div class="message" "data-message-id"=${message.id}>
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
                    ${img}
                  </div>
                </div>`
    }
    else if (message.content) {

      var html = `<div class="message" "data-message-id"=${message.id}>
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
                  </div>
                </div>`
    }
    else if (message.image.url) {

      var html = `<div class="message" "data-message-id"=${message.id}>
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="lower-message">
                    ${img}
                  </div>
                </div>`
    };
    return html;
  };

  function scroll() {
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
    }

  var reloadMessages = function() {

    latest_id = message.id
    $.ajax({
      url: 'messages.json',
      type: 'get',
      dataType: 'json',
      data: {id: latest_id}
    })
    .done(function(messages) {
      var insertHTML = '';
        messages.forEach(function(message){
          insertHTML += buildHTML(message)
        });
        $('.messages').append(insertHTML);
      scroll()
    })
    .fail(function() {
      console.log('error');

    });
  };

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
      scroll()
      latest_id = data.id;
    })
    .fail(function(data){
      alert('メッセージが送信できません');
      $('.form__submit').prop('disabled', false);
    })
  })
});