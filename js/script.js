// start: Sidebar
document.querySelector('.chat-sidebar-profile-toggle').addEventListener('click', function(e) {
    e.preventDefault()
    this.parentElement.classList.toggle('active')
})

document.addEventListener('click', function(e) {
    if(!e.target.matches('.chat-sidebar-profile, .chat-sidebar-profile *')) {
        document.querySelector('.chat-sidebar-profile').classList.remove('active')
    }
})
// end: Sidebar



// start: Coversation
document.querySelectorAll('.conversation-item-dropdown-toggle').forEach(function(item) {
    item.addEventListener('click', function(e) {
        e.preventDefault()
        if(this.parentElement.classList.contains('active')) {
            this.parentElement.classList.remove('active')
        } else {
            document.querySelectorAll('.conversation-item-dropdown').forEach(function(i) {
                i.classList.remove('active')
            })
            this.parentElement.classList.add('active')
        }
    })
})

document.addEventListener('click', function(e) {
    if(!e.target.matches('.conversation-item-dropdown, .conversation-item-dropdown *')) {
        document.querySelectorAll('.conversation-item-dropdown').forEach(function(i) {
            i.classList.remove('active')
        })
    }
})

document.querySelectorAll('.conversation-form-input').forEach(function(item) {
    item.addEventListener('input', function() {
        this.rows = this.value.split('\n').length
    })
})

document.querySelectorAll('[data-conversation]').forEach(function(item) {
    item.addEventListener('click', function(e) {
        e.preventDefault()
        document.querySelectorAll('.conversation').forEach(function(i) {
            i.classList.remove('active')
        })
        document.querySelector(this.dataset.conversation).classList.add('active')
    })
})

// document.querySelectorAll('.conversation-back').forEach(function(item) {
//     item.addEventListener('click', function(e) {
//         e.preventDefault()
//         this.closest('.conversation').classList.remove('active')
//         document.querySelector('.conversation-default').classList.add('active')
//     })
// })

// document.querySelector(".conversation-back").addEventListener("click", event => {
//     this.closest('.conversation').classList.remove('active')
//         document.querySelector('.conversation-default').classList.add('active')
// //     if (event.target.classList.contains("dynamic-element")) {
// //       // Handle the event for the dynamic element
// //   }
//   });
  
// end: Coversation
/***New chats js fronted start here */

document.querySelectorAll('.chat-sidebar-menu li').forEach(li => {
        li.addEventListener('click', function () {
            document.querySelectorAll('.chat-sidebar-menu li').forEach(item => {
            item.classList.remove('active'); // Remove active class from all li elements
          });
        
        if (this.querySelector('a').dataset.drl != undefined)
        {
            document.querySelectorAll(".content-sidebar").forEach(div=>{
                div.classList.remove("active");
            });
            const side_id = this.querySelector('a').dataset.drl;
            document.getElementById(side_id).classList.add("active");
        }
            this.classList.add('active'); // Add active class to the clicked li element
        });
});
/***New chats js fronted ends here */