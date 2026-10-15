function toggleSidebar() {
    var sidebar = document.getElementById('sidebar');
    sidebar.style.display = (sidebar.style.display === 'block') ? 'none' : 'block';
}

function scrollCarousel() {
    document.getElementById('cards-container').scrollBy({ left: 150, behavior: 'smooth' });
}

function addPost(e) {
    e.preventDefault();
    var movieTitle = document.getElementById('movie-title').value;
    var postTitle = document.getElementById('post-title').value;
    var tbody = document.getElementById('forum-list');

    var newRow = tbody.insertRow();
    newRow.insertCell(0).innerText = tbody.rows.length;
    newRow.insertCell(1).innerText = movieTitle;
    newRow.insertCell(2).innerText = postTitle;
    newRow.insertCell(3).innerText = "나(User)";

    alert('글이 성공적으로 등록되었습니다!');
    document.getElementById('movie-title').value = '';
    document.getElementById('post-title').value = '';
    document.getElementById('post-content').value = '';
}

document.addEventListener("DOMContentLoaded", function () {
    const id = "aaaa";
    const pw = "aaaa";

    const loginForm = document.querySelector("#loginForm");
    if (loginForm) {
        loginForm.onsubmit = function (e) {
            e.preventDefault();
            const inputId = document.querySelector("#user_Id").value;
            const inputPw = document.querySelector("#user_Pw").value;

            if (inputId === id && inputPw === pw) {
                alert("로그인 성공!");
            } else {
                alert("로그인 실패: 아이디 또는 비밀번호가 틀렸습니다.");
            }
        };
    }

    let counter = document.querySelector("#counter");
    let number = 0;
    let count_number = document.querySelector("#count_number");
    if (counter && count_number) {
        counter.onclick = function () {
            number = number + 1;
            count_number.textContent = number + "번 클릭";
        };
    }


document.addEventListener("DOMContentLoaded", function () {
    let text_message = document.querySelector('#text_message');
    
    if (text_message) {
        text_message.onclick = function () {
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            text_message.style.color = 'rgb(' + r + ',' + g + ',' + b + ')';
        };
    }
});
