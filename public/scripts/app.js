$(() => {

  function createPost(post) {
    return $(`<div class="post" data-id=${post.id}>
      <p class="post-title">${post.title}</p>
     
      
      <p class="post-url"><a href=${post.URL}>${post.URL}</a></p>
      <p class="post-description">${post.description}</p>
      <p class="post-author">user ${post.user_id}</p>
      
      <div class="social-icon-wrapper">
        <i class="fas fa-heart"></i>
        <i class="far fa-comment"></i>
        <i class="fas fa-star-half-alt"></i>
      </div>

    </div>`);
  }

  // @params: array of posts to render, and a designated container
  function renderPosts(posts, container) {
    $('#post-container').html('')
    $('#user-post-container').html('')

    posts.forEach(post => {
      $(container).prepend(createPost(post))
    })
  }

  // Load all posts and render it
  function loadPosts() {
    $.ajax({
      method: "GET",
      url: "/api/posts"
    }).done((posts) => {
      renderPosts(posts, '#post-container')
    })
  }

  function renderProfileContainer (user) {
    // create a jquery user profile
    const $user = $(`<div class="users" data-id=${user.id}>
    <p class="user-id">User ID:${user.id}</p>
    <p class="user-firstname">First name: ${user.first_name}</p>
    <p class="user-lastname">Last name: ${user.last_name}</p>
    <button class="button-update-profile">Update</button>
    </div>`);

    // append the user to container
    $('.profile-container').append($user)

  }

  function renderProfileUpdate () {
    const $profileUpdateForm = $(`      
    <label for="user.id">User ID:</label>
    <input type="text" id="user-id" name="user_id" placeholder="Your User ID">
    <br>
    <label for="first_name">First Name:</label>
    <input type="text" id="first_name" name="first_name" placeholder="Your First Name"><br>
    <br>
    <label for="last_name">Last Name:</label>
    <input type="text" id="last_name" name="last_name" placeholder="Your Last Name"><br>
    <button class="button">Update</button>
    `)
  }

  $('.upload-form').on('submit', function (event) {
    event.preventDefault()
    
    const inputSerial = $(this).serialize()
    $.post('/api/posts', inputSerial, () => {
      loadPosts()
    })  
  })

  // Toggle post form on click
  $('#post-resource').on('click', () => {
    $('.upload-form').slideToggle('ease')
  })

  // Load current user posts
  $('#my-resources').on('click', () => {
    // right screen
    $.get('/api/posts/mine', (posts) => {
      renderPosts(posts, '#user-post-container')
    })

    $.get('api/users/mine', (user) =>{
      renderProfileContainer(user);
    })
  
  })

  // Loads all posts when click site title
  $('.page-title').on('click', () => {
    loadPosts()
  })

  // logs user1 in
  $('#login-li').on('click', () => {
    $.get('/login/1')
  })  


  $('#post-container').on('click', '.fa-heart', function() {
    const post_id = $(this).closest('.post').data('id')
    $.post(`/api/posts/${post_id}/like`, () => {
      // renderPost(post_id)
    })
  })

  $('.profile-container').on('click', '.button', function() {
    //const post_id = $(this).closest('.post').data('id')
    //$.post(`/api/posts/${post_id}/like`, () => {
      // renderPost(post_id)
    })
  

  // Initial load of the page
  loadPosts()

})


