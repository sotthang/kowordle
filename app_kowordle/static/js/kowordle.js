let height = 6 // 줄 갯수 
let width = 6 // 단어 길이

let row = 0 // 현재 줄 (attempt #)
let col = 0 // 현재 알파벳 인덱스 

let gameOver = false

var db_word = document.getElementById("answer_word").dataset.word
let word = ""
var arr_consonant =["ㅏ", "ㅑ", "ㅓ", "ㅕ", "ㅗ", "ㅛ", "ㅜ", "ㅠ", "ㅡ", "ㅣ", "ㅐ", "ㅔ"]

// 자음, 모음 분리
word = getConstantVowel(db_word[0]) + getConstantVowel(db_word[1])

if (word.length === 5 && arr_consonant.includes(word[4])) {
    // 받침이 하나인 단어 중 첫번째 글자에 받침이 있을 경우
    word = word.substring(0,5) + "\u00A0"
}
else if (word.length === 5 && arr_consonant.includes(word[3])) {
    // 받침이 하나인 단어 중 두번째 글자에 받침이 있을 경우
    word = word.substring(0,2) + "\u00A0" + word.substring(2,5)
}
else if (word.length === 4) {
    // 받침이 하나도 없는 단어인 경우
    word = word.substring(0,2) + "\u00A0" + word.substring(2,4) + "\u00A0"
}

let word_view = "정답은 " + db_word
let word_meaning = document.getElementById("answer_word").dataset.description

let modal_word_answer = "ㅅㅣ ㄱㅏㄴ"
modal_word_answer = modal_word_answer.replace(" ","\u00A0")
var arr_modal_word_answer = ["correct", "correct", "correct", "correct", "correct", "correct"]
let modal_word_try = "ㅅㅗㄴㅈㅏ "
modal_word_try = modal_word_try.replace(" ","\u00A0")
var arr_modal_word_try = ["correct", "absent", "present", "absent", "correct", "present"]

var arr_en = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" ]
var arr_ko = ["ㅁ", "ㅠ", "ㅊ", "ㅇ", "ㄷ", "ㄹ", "ㅎ", "ㅗ", "ㅑ", "ㅓ", "ㅏ", "ㅣ", "ㅡ", "ㅜ", "ㅐ", "ㅔ", "ㅂ", "ㄱ", "ㄴ", "ㅅ", "ㅕ", "ㅍ", "ㅈ", "ㅌ", "ㅛ", "ㅋ" ]
var arr_ko_keyboard = ["ㅃ", "ㅉ", "ㄸ", "ㄲ", "ㅆ", "ㅂ", "ㅈ", "ㄷ", "ㄱ", "ㅅ", "ㅛ", "ㅕ", "ㅑ", "ㅐ", "ㅔ", "ㅁ", "ㄴ", "ㅇ", "ㄹ", "ㅎ", "ㅗ", "ㅓ", "ㅏ", "ㅣ", "ㅋ", "ㅌ", "ㅊ", "ㅍ", "ㅠ", "ㅜ", "ㅡ" ]

window.onload = function() {
    initialize()
}

function getConstantVowel(kor) {
    const f = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ',
               'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ',
               'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']
    const s = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ',
               'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ',
               'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ']
    const t = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ',
               'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ',
               'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ',
               'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']

    const ga = 44032
    let uni = kor.charCodeAt(0)

    uni = uni - ga

    let fn = parseInt(uni / 588)
    let sn = parseInt((uni - (fn * 588)) / 28)
    let tn = parseInt(uni % 28)

    return f[fn] + s[sn] + t[tn]
}

function initialize() {
    
    // 보드 만들기
    for (let r = 0; r < height; r++) {
        let sub_board = document.createElement("div")
        sub_board.id = "board"+r
        document.getElementById("board").appendChild(sub_board)
        for (let c = 0; c < width; c++) {
            let tile = document.createElement("div")
            tile.id = r.toString() + "-" + c.toString() 
            tile.classList.add("tile")
            tile.innerText = ""
            document.getElementById(sub_board.id).appendChild(tile) 
        }
    }
    
    // 키보드 만들기
    let sub_keyboard = document.createElement("div")
    let sub_keyboard1 = document.createElement("div")
    let sub_keyboard2 = document.createElement("div")
    let sub_keyboard3 = document.createElement("div")
    let sub_keyboard4 = document.createElement("div")
    
    sub_keyboard.id = "keyboard"
    sub_keyboard1.id = "keyboard1"
    sub_keyboard2.id = "keyboard2"
    sub_keyboard3.id = "keyboard3"
    sub_keyboard4.id = "keyboard4"
    
    document.getElementById(sub_keyboard.id).appendChild(sub_keyboard1)
    document.getElementById(sub_keyboard.id).appendChild(sub_keyboard2)
    document.getElementById(sub_keyboard.id).appendChild(sub_keyboard3)
    document.getElementById(sub_keyboard.id).appendChild(sub_keyboard4)
    
    for (let x = 0; x < 5; x++) {
        let keytile = document.createElement("button") 
        keytile.id = x.toString()
        keytile.type = "button"
        keytile.classList.add("keytile")
        keytile.innerText = arr_ko_keyboard[x]
        document.getElementById("keyboard1").appendChild(keytile)
    }
    for (let x = 5; x < 15; x++) {
        let keytile = document.createElement("button") 
        keytile.id = x.toString() 
        keytile.classList.add("keytile")
        keytile.innerText = arr_ko_keyboard[x]
        document.getElementById("keyboard2").appendChild(keytile) 
    }
    for (let x = 15; x < 24; x++) {
        let keytile = document.createElement("button") 
        keytile.id = x.toString() 
        keytile.classList.add("keytile")
        keytile.innerText = arr_ko_keyboard[x]
        document.getElementById("keyboard3").appendChild(keytile) 
    }
    for (let x = 24; x < 31; x++) {
        let keytile = document.createElement("button") 
        keytile.id = x.toString() 
        keytile.classList.add("keytile")
        keytile.innerText = arr_ko_keyboard[x]
        document.getElementById("keyboard4").appendChild(keytile) 
    }
    for (let x = 31; x < 32; x++) {
        let keytile = document.createElement("button") 
        keytile.id = x.toString() 
        keytile.classList.add("keytile")
        keytile.innerText = "space"
        document.getElementById("keyboard4").appendChild(keytile) 
    }
    for (let x = 32; x < 33; x++) {
        let keytile = document.createElement("button") 
        keytile.id = x.toString() 
        keytile.classList.add("keytile")
        keytile.innerText = "←bs"
        document.getElementById("keyboard4").appendChild(keytile) 
    }
    
    // 키 입력 
	document.addEventListener("keydown", (e) => {
    	if (gameOver) return
        if (e.shiftKey && e.code === "KeyQ") {
            if (col < width) {
                let currTile = document.getElementById(row.toString() + "-" + col.toString())
                if (currTile.innerText === "") {
                    currTile.innerText = "ㅃ"
                    currTile.classList.add("typing")
                    col += 1
                }
            }
        }
        else if (e.shiftKey && e.code === "KeyW") {
            if (col < width) {
                let currTile = document.getElementById(row.toString() + "-" + col.toString())
                if (currTile.innerText === "") {
                    currTile.innerText = "ㅉ"
                    currTile.classList.add("typing")
                    col += 1
                }
            }
        }
        else if (e.shiftKey && e.code === "KeyE") {
            if (col < width) {
                let currTile = document.getElementById(row.toString() + "-" + col.toString())
                if (currTile.innerText === "") {
                    currTile.innerText = "ㄸ"
                    currTile.classList.add("typing")
                    col += 1
                }
            }
        }
        else if (e.shiftKey && e.code === "KeyR") {
            if (col < width) {
                let currTile = document.getElementById(row.toString() + "-" + col.toString())
                if (currTile.innerText === "") {
                    currTile.innerText = "ㄲ"
                    currTile.classList.add("typing")
                    col += 1
                }
            }
        }
        else if (e.shiftKey && e.code === "KeyT") {
            if (col < width) {
                let currTile = document.getElementById(row.toString() + "-" + col.toString())
                if (currTile.innerText === "") {
                    currTile.innerText = "ㅆ"
                    currTile.classList.add("typing")
                    col += 1
                }
            }
        }
        else if ("KeyA" <= e.code && e.code <= "KeyZ") {
            if (col < width) {
                let currTile = document.getElementById(row.toString() + "-" + col.toString())
                if (currTile.innerText === "") {
                    currTile.innerText = arr_ko[arr_en.indexOf(e.code[3])]
                    currTile.classList.add("typing")
                    col += 1
                }
            }
        }
        else if (e.code === "Space") {
            if (col < width) {
                let currTile = document.getElementById(row.toString() + "-" + col.toString())
                if (currTile.innerText === "") {
                    currTile.innerText = "\u00A0"
                    currTile.classList.add("typing")
                    col += 1
                }
            }
        }
        else if (e.code === "Backspace") {
            if (0 < col && col <= width) {
                col -= 1
            }
            let currTile = document.getElementById(row.toString() + "-" + col.toString())
            currTile.innerText = ""
            currTile.classList.remove("typing")
        }
        if (window.event.keyCode == 13) {
            pass // enter key
        }
        if (col === width) {
            update()
            row += 1 // start new row
            col = 0  // start at 0 for new row
        }
        if (gameOver || row === height) {
            gameOver = true
            document.getElementById("answer").innerText = word_view
            document.getElementById("answer_meaning").innerText = word_meaning
        }
    })
    
    // 마우스 입력
    for (let x = 0; x < 31; x++) {
        document.getElementsByClassName("keytile")[x].addEventListener("mouseup", (d) => {
            if (gameOver) return 
            let currTile = document.getElementById(row.toString() + "-" + col.toString())
            currTile.innerText = arr_ko_keyboard[x]
            currTile.classList.add("typing")
            col += 1
            if (col === width) {
                update()
                row += 1 // start new row
                col = 0  // start at 0 for new row
            }
            if (gameOver || row === height) {
                gameOver = true
                document.getElementById("answer").innerText = word_view
                document.getElementById("answer_meaning").innerText = word_meaning
            }
        })
    }
    document.getElementsByClassName("keytile")[31].addEventListener("mouseup", (d) => {
            if (gameOver) return 
            let currTile = document.getElementById(row.toString() + "-" + col.toString())
            currTile.innerText = "\u00A0"
            currTile.classList.add("typing")
            col += 1
            if (col === width) {
                update()
                row += 1 // start new row
                col = 0  // start at 0 for new row
            }
            if (gameOver || row === height) {
                gameOver = true
                document.getElementById("answer").innerText = word_view
                document.getElementById("answer_meaning").innerText = word_meaning
            }
        })
    document.getElementsByClassName("keytile")[32].addEventListener("mouseup", (d) => {
        if (0 < col && col <= width) {
            col -= 1
        }
        let currTile = document.getElementById(row.toString() + "-" + col.toString())
        currTile.innerText = ""
        currTile.classList.remove("typing")
    })
    
    // modal
    let modal_howto = document.createElement("div")
    modal_howto.id = "modal_howto"
    document.getElementById("modal").appendChild(modal_howto)
    document.getElementById(modal_howto.id).innerHTML = `
    <br>
    Hot to Play<br>
    <br>
    최대 6개의 자모 (자음, 모음)으로 이루어진<br>
    두 글자 한글 단어를 6번 안에 맞추는 게임<br>
    시도한 답에 따라 칸의 색이 변합니다<br>
    <br>
    예시<br>
    정답 = <u><b>시간</b></u><br>
    시도 = <u><b>손자</b></u><br>
    <br>
    `
    
    let modal_board = document.createElement("div")
    modal_board.id = "modal_board"
    document.getElementById("modal").appendChild(modal_board)
    for (let c = 0; c < width; c++) {
        let modal_tile = document.createElement("div")
        modal_tile.id = "modal-" + c.toString() 
        modal_tile.classList.add("modal_tile")
        modal_tile.innerText = modal_word_answer[c]
        modal_tile.classList.add(arr_modal_word_answer[c])
        document.getElementById(modal_board.id).appendChild(modal_tile) 
    }
    
    let modal_board2 = document.createElement("div")
    modal_board2.id = "modal_board2"
    document.getElementById("modal").appendChild(modal_board2)
    for (let c = 0; c < width; c++) {
        let modal_tile = document.createElement("div")
        modal_tile.id = "modal-" + c.toString() 
        modal_tile.classList.add("modal_tile")
        modal_tile.innerText = modal_word_try[c]
        modal_tile.classList.add(arr_modal_word_try[c])
        document.getElementById(modal_board2.id).appendChild(modal_tile) 
    }
    
    let modal_explain = document.createElement("div")
    modal_explain.id = "modal_explain"
    document.getElementById("modal").appendChild(modal_explain)
    document.getElementById(modal_explain.id).innerText = `
    초록색은 위치와 자모가 정확하게 일치
    노란색은 정답에 자모가 포함되지만 위치는 불일치
    회색은 정답과 일치하는 자모가 없음
    `
    
    let modal_end = document.createElement("div")
    modal_end.id = "modal_end"
    document.getElementById("modal").appendChild(modal_end)
    document.getElementById(modal_end.id).innerText = `
    아무 곳이나 클릭하면 게임 시작!`
    
    if (document.getElementById("modal").style.display != "none") {
        document.addEventListener("mousedown", (e) => {
            modal_button()
        })
        document.addEventListener("keydown", (e) => {
            modal_button()
        })
    }
}

function update() {
    let correct = 0
    word2 = Array.from(word)
    const array = [0, 1, 2, 3, 4, 5]
    Array.prototype.remove = function(value) {
        this.splice(this.indexOf(value), 1)
    }
    
    // letter 가 정답 단어에 포함되고 위치도 같은 경우
    for (let c = width-1; c > -1; c--) {
        let currTile = document.getElementById(row.toString() + "-" + c.toString())
        let letter = currTile.innerText
        const regex = new RegExp(`[${letter}]`, 'g')
        
        if (word2[c] === letter) {
            currTile.classList.add("correct")
            correct += 1
            word2.splice(c, 1)
            array.splice(c, 1)
        }
    }
    
    // letter 가 정답 단어에 포함되나 위치가 다른 경우
    for (let c of [...array].reverse()) {
        let currTile = document.getElementById(row.toString() + "-" + c.toString())
        let letter = currTile.innerText
        if (word2.includes(letter)) {
            currTile.classList.add("present")
            word2.remove(letter)
            array.remove(c)
        }
    }
    
    // letter 가 정답에 없는 경우
    for (let c of array) {
        let currTile = document.getElementById(row.toString() + "-" + c.toString())
        let letter = currTile.innerText
        currTile.classList.add("absent")
    }
    
	// 정답을 맞추면 게임오버 
    if (correct === width) {
        gameOver = true
    }
}

function modal_button() {
    document.getElementById("modal").style.display = "none"
}
