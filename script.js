// ==========================================
// 1. 기존 HTML 요소에서 호출하는 함수들
// ==========================================

// 사이드바 토글
function toggleSidebar() {
    var sidebar = document.getElementById('sidebar');
    if (sidebar) {
        if (sidebar.style.display === 'block') {
            sidebar.style.display = 'none';
        } else {
            sidebar.style.display = 'block';
        }
    }
}

// 캐러셀 우측 스크롤
function scrollCarousel() {
    var container = document.getElementById('cards-container');
    if (container) {
        container.scrollBy({ left: 150, behavior: 'smooth' });
    }
}

// 포럼 글 작성 기능
function addPost(e) {
    e.preventDefault();
    var movieTitle = document.getElementById('movie-title').value;
    var postTitle = document.getElementById('post-title').value;

    var tbody = document.getElementById('forum-list');
    var rowCount = tbody.rows.length + 1;

    var newRow = tbody.insertRow();
    newRow.insertCell(0).innerText = rowCount;
    newRow.insertCell(1).innerText = movieTitle;
    newRow.insertCell(2).innerText = postTitle;
    newRow.insertCell(3).innerText = "나(User)";

    alert('글이 성공적으로 등록되었습니다!');
    document.getElementById('movie-title').value = '';
    document.getElementById('post-title').value = '';
    document.getElementById('post-content').value = '';
}


// ==========================================
// 2. 자바스크립트로 HTML/CSS 및 이벤트 자동 연결
// ==========================================
document.addEventListener("DOMContentLoaded", function () {

    // ------------------------------------------
    // A. 로그인 기능 (모달 팝업 및 디자인 동적 생성)
    // ------------------------------------------
    const id = "aaaa";
    const pw = "aaaa";

    // 1) 필요한 모달 CSS 스타일 추가
    const styleTag = document.createElement('style');
    styleTag.textContent = `
        .js-modal-overlay {
            display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.6); z-index: 9999; justify-content: center; align-items: center;
        }
        .js-modal-box {
            background: #fff; color: #333; padding: 24px; border-radius: 8px; width: 300px;
            position: relative; box-shadow: 0 4px 10px rgba(0,0,0,0.3); font-family: sans-serif;
        }
        .js-modal-close {
            position: absolute; top: 10px; right: 15px; cursor: pointer; font-size: 20px; font-weight: bold;
        }
        .js-modal-box input {
            width: 100%; padding: 8px; margin: 8px 0; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px;
        }
        .js-modal-box button {
            width: 100%; padding: 10px; background: #ffd700; border: none; font-weight: bold; cursor: pointer; margin-top: 10px; border-radius: 4px;
        }
        .js-counter-box {
            margin: 20px 10px; padding: 15px; background: rgba(255, 255, 255, 0.1);
            border: 1px solid #ffd700; border-radius: 8px; text-align: center; color: #fff;
        }
        .js-counter-box button {
            padding: 8px 12px; background: #ffd700; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;
        }
    `;
    document.head.appendChild(styleTag);

    // 2) 로그인 모달 HTML 화면 하단에 삽입
    const modalHTML = `
        <div id="loginModal" class="js-modal-overlay">
            <div class="js-modal-box">
                <span id="closeModal" class="js-modal-close">&times;</span>
                <h3 style="margin-top:0;">로그인</h3>
                <form id="loginForm">
                    <input type="text" id="user_Id" placeholder="아이디 (aaaa)" required>
                    <input type="password" id="user_Pw" placeholder="비밀번호 (aaaa)" required>
                    <button type="submit">로그인하기</button>
                </form>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const loginModal = document.getElementById("loginModal");
    const closeModal = document.getElementById("closeModal");
    const loginForm = document.getElementById("loginForm");

    // 3) 상단바 '로그인' 버튼 연결 (기존 alert 무력화 및 모달 오픈)
    const navLinks = document.querySelectorAll('.top-nav-link');
    let loginNavBtn = null;
    navLinks.forEach(link => {
        if (link.textContent.includes('로그인')) {
            loginNavBtn = link;
        }
    });

    if (loginNavBtn) {
        loginNavBtn.removeAttribute('onclick');
        loginNavBtn.addEventListener('click', function (e) {
            e.preventDefault();
            loginModal.style.display = "flex";
        });
    }

    // 닫기 버튼
    if (closeModal) {
        closeModal.addEventListener("click", function () {
            loginModal.style.display = "none";
        });
    }

    // 로그인 검증
    if (loginForm) {
        loginForm.onsubmit = function (e) {
            e.preventDefault();
            const inputId = document.querySelector("#user_Id").value;
            const inputPw = document.querySelector("#user_Pw").value;

            if (inputId === id && inputPw === pw) {
                alert("로그인 성공!");
                loginModal.style.display = "none";
                document.querySelector("#user_Id").value = "";
                document.querySelector("#user_Pw").value = "";
            } else {
                alert("로그인 실패: 아이디 또는 비밀번호가 틀렸습니다.");
            }
        };
    }


    // ------------------------------------------
    // B. 클릭 카운터 기능 (사이드바 내부 동적 생성)
    // ------------------------------------------
    const sidebar = document.getElementById("sidebar");
    if (sidebar) {
        const counterDiv = document.createElement("div");
        counterDiv.className = "js-counter-box";
        counterDiv.innerHTML = `
            <button id="counter">클릭 카운트 버튼</button>
            <p id="count_number" style="margin: 10px 0 0 0;">0번 클릭</p>
        `;
        sidebar.appendChild(counterDiv);

        let counterBtn = document.querySelector("#counter");
        let countNumberText = document.querySelector("#count_number");
        let number = 0;

        if (counterBtn && countNumberText) {
            counterBtn.onclick = function () {
                number = number + 1;
                countNumberText.textContent = number + "번 클릭";
            };
        }
    }


    // ------------------------------------------
    // C. 글자 색상 무작위 변경 기능 (헤더 제목 클릭 시)
    // ------------------------------------------
    let headerTitle = document.querySelector("#header-banner h2");
    if (headerTitle) {
        headerTitle.setAttribute("id", "text_message");
        headerTitle.style.cursor = "pointer";

        headerTitle.onclick = function () {
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            headerTitle.style.color = 'rgb(' + r + ',' + g + ',' + b + ')';
        };
    }

});
