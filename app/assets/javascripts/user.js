$(document).on('turbolinks:load', function(){

  $(function(){

  function addUser(user){
    
    var html = 
                `<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${user.name}</p>
                    <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
                </div>`;
              
              $("#user-search-result").append(html);
  };

  function addNoUser(){

    var html = 
                `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">ユーザーが見つかりません</p>
                </div>`
              
              $("#user-search-result").append(html);
  };

  function addDeleteUser(name, id) {
    
    var html = `
                <div class="chat-group-user clearfix" id="${id}">
                  <p class="chat-group-user__name">${name}</p>
                  <div class="chat-group-user-remove chat-group-user__btn" data-user-id=${id} data-user-name=${name}>削除</div>
                </div>`;
              $(".js-add-user").append(html);
  };

  function addMember(userId) {
    var html = `<input name="group[user_ids][]" type="hidden" value="${userId}" id="group_user_ids_${userId}">`;
    $(`#${userId}`).append(html);
  };

  $('#user-search-field').on('keyup', function(e){

    var input = $.trim($(this).val());
    $.ajax({
      type: "GET",
      url: '/users',
      dataType: 'json',
      data: {keyword: input},
    })
    .done(function(users){

      if (input.length == 0) {
        $('#user-search-result').empty();
      }
        else if (input.length !== 0){
        $('#user-search-result').empty();
        users.forEach(function(user){
            addUser(user);
          });
        }
        else {
          $('#user-search-result').empty();
            addNoUser();
        }
    })
    .fail(function(){
      alert("ユーザー検索に失敗しました");
    });
  });

  $(document).on("click", ".user-search-add", function(){
    const userName = $(this).attr("data-user-name");
    const userId = $(this).attr("data-user-id");
    $(this).parent().remove();
    addDeleteUser(userName, userId);
    addMember(userId);
  });

  $(document).on("click", ".chat-group-user-remove", function(){
    $(this).parent().remove();
  });
});
});

