// 분해해서 보여지기
class TypingText {
  constructor(el, option) {
    this.el = el[0];

    const basicOption = {
      duration: 80,
      delay: 0,
    };

    this.option = Object.assign(basicOption, option);

    this.timeout = null;
    this.textArr = this.el.textContent.split("");
    this.playReset = false;
    this.playPause = false;
    this.codeInit = "0xAC00";
    this.charArr = [];
    this.i = 0;
    this.j = 0;
    this.text = "";

    // 타이핑 애니메이션 타겟
    this.addList = this.el.parentNode.querySelectorAll(".ux-text-el");
  }

  init() {
    this.setTotalCharArr();
    this.play();
  }

  /***************************************************
        'active' 클래스가 있으면 Interval 실행
        'active' 클래스가 없으면 Interval clear
  ***************************************************/
  play() {
    this.el.innerHTML = "";
    this.charTimeoutPlay();
    // if (this.charCheckClass()) {
    //   this.charTimeoutPlay();
    // } else {
    //   this.charTimeoutReset();
    // }
  }

  /***************************************************
        html text 가져오기
  ***************************************************/
  // charConvertText() {
  //     console.log(3)
  //     let textArr = [];
  //     textArr.push(this.el[0].textContent)
  //     return textArr
  // }

  /***************************************************
        'active' 클래스가 있는지 없는지 확인
  ***************************************************/
  charCheckClass() {
    return this.el.classList.contains("active");
  }

  /***************************************************
        innerHTML에 텍스트 출력
  ***************************************************/
  typing() {
    if (this.i <= this.charArr.length - 1) {
      let jmax = this.charArr[this.i].length;
      this.el.innerHTML = this.text + this.charArr[this.i][this.j];
      this.j++;
      if (this.j == jmax) {
        this.text += this.charArr[this.i][this.j - 1];
        this.i++;
        this.j = 0;
      }
    } else {
      clearInterval(this.timeout);
      this.playPause = true;
    }
  }

  /***************************************************
        interval clear후 옵션 리셋
  ***************************************************/
  charTimeoutReset() {
    clearInterval(this.timeout);
    this.playPause = true;
    this.playReset = true;
    this.i = 0;
    this.text = "";
  }

  /***************************************************
        interval 실행
  ***************************************************/
  charTimeoutPlay() {
    this.playPause = false;
    if (this.playReset) {
      this.playReset = !this.playReset;
    }

    this.timeout = setInterval(() => {
      this.typing();
    }, this.option.duration);
  }

  /***************************************************
        효과 적용할 텍스트 가져와서 한 글자씩 나눈 뒤
        초성, 종성, 종성으로 나누는 함수로 보냄
  ***************************************************/
  setTotalCharArr() {
    this.textArr.forEach((el, index) => {
      this.charArr[index] = this.divisionChar(this.textArr[index]);
    });
  }

  /***************************************************
        한 글자 들어오면 초성, 중성, 종성 분해
  ***************************************************/
  divisionChar(char) {
    let cCho = [
      "ㄱ",
      "ㄲ",
      "ㄴ",
      "ㄷ",
      "ㄸ",
      "ㄹ",
      "ㅁ",
      "ㅂ",
      "ㅃ",
      "ㅅ",
      "ㅆ",
      "ㅇ",
      "ㅈ",
      "ㅉ",
      "ㅊ",
      "ㅋ",
      "ㅌ",
      "ㅍ",
      "ㅎ",
    ];
    let cJung = [
      "ㅏ",
      "ㅐ",
      "ㅑ",
      "ㅒ",
      "ㅓ",
      "ㅔ",
      "ㅕ",
      "ㅖ",
      "ㅗ",
      "ㅘ",
      "ㅙ",
      "ㅚ",
      "ㅛ",
      "ㅜ",
      "ㅝ",
      "ㅞ",
      "ㅟ",
      "ㅠ",
      "ㅡ",
      "ㅢ",
      "ㅣ",
    ];
    let cJong = [
      "",
      "ㄱ",
      "ㄲ",
      "ㄳ",
      "ㄴ",
      "ㄵ",
      "ㄶ",
      "ㄷ",
      "ㄹ",
      "ㄺ",
      "ㄻ",
      "ㄼ",
      "ㄽ",
      "ㄾ",
      "ㄿ",
      "ㅀ",
      "ㅁ",
      "ㅂ",
      "ㅄ",
      "ㅅ",
      "ㅆ",
      "ㅇ",
      "ㅈ",
      "ㅊ",
      "ㅋ",
      "ㅌ",
      "ㅍ",
      "ㅎ",
    ];

    let cho, jung, jong;
    let uniCode;
    let divCharArr = [];

    for (let i = 0; i < char.length; i++) {
      uniCode = char.charCodeAt(i);

      if (uniCode == 32) {
        divCharArr.push(" ");
        continue;
      }
      if (uniCode < this.codeInit || uniCode > 0xd7a3) {
        divCharArr.push(char.charAt(i));
        continue;
      }

      uniCode -= this.codeInit;

      jong = uniCode % 28;
      jung = ((uniCode - jong) / 28) % 21;
      cho = ((uniCode - jong) / 28 - jung) / 21;

      divCharArr.push(cCho[cho]);
      divCharArr.push(
        String.fromCharCode(
          parseInt(this.codeInit, 16) + cho * 28 * 21 + jung * 28
        )
      );
      if (cJong[jong] !== "") {
        divCharArr.push(
          String.fromCharCode(
            parseInt(this.codeInit, 16) + cho * 28 * 21 + jung * 28 + jong
          )
        );
      }
    }

    return divCharArr;
  }

  /***************************************************
        외부에서 옵션 제어용
  ***************************************************/
  setOption(option) {
    this.option = Object.assign(this.option, option);
  }
}

export { TypingText };
