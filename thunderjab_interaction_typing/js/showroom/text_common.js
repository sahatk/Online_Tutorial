class layout {
  constructor(el) {
    this.el = el;
    this.textDelay = el.querySelector(".delayD");
    this.textDuration = el.querySelector(".durationD");
    this.textEasing = el.querySelector(".easingD");
    this.duration = this.textDuration.textContent;
    this.stagger = this.textDelay.textContent;
    this.easing = this.textEasing.textContent;
    this.toggleClassBtn = el.querySelector(".btn-addClass");
    this.easingLi = el.querySelectorAll(".easing li");
    this.typeSpeed = el.querySelector(".speed");
    this.slowBtn = el.querySelector(".slow");
    this.normalBtn = el.querySelector(".normal");
    this.fastBtn = el.querySelector(".fast");
    this.submitDur = el.querySelector(".input-box1");
    this.inputDur = el.querySelector(".duration");
    this.submitDel = el.querySelector(".input-box2");
    this.inputDel = el.querySelector(".delay");
    this.addList = el.parentNode.querySelectorAll(".ux-text-el");
    this.jsCheck = el.classList.contains("js");
  }
  init() {
    this.toggleClass();
    this.loadClass();
    this.easingFnc();
    this.timingDuration();
    this.timingDelay();
  }
  removeClass(element, className) {
    if (element) {
      if (element.length == undefined) {
        element.classList.remove(className);
      } else {
        element.forEach((el) => {
          el.classList.remove(className);
        });
      }
    }
  }
  toggleClass() {
    this.toggleClassBtn.addEventListener("click", () => {
      this.toggleClassBtn.classList.toggle("active");
      this.addList.forEach((el) => {
        el.classList.toggle("active");
      });
    });
  }
  loadClass() {
    this.toggleClassBtn.classList.toggle("active");
    this.addList.forEach((el) => {
      el.classList.toggle("active");
    });
  }
  easingFnc() {
    if (!this.jsCheck) {
      const easingList = [
        "linear",
        "ease-in",
        "ease-out",
        "ease-in-out",
        "cubic-bezier(0,2,.4,.6)",
      ];
      this.addList.forEach((el) => {
        el.style.setProperty("--easing", this.textEasing.textContent);
      });
      this.easingLi.forEach((el, index) => {
        el.addEventListener("click", () => {
          this.addList.forEach((list) => {
            list.style.setProperty("--easing", easingList[index]);
          });
          this.textEasing.innerHTML = easingList[index];
          this.removeClass(this.easingLi, "active");
          this.removeClass(this.addList, "active");
          this.removeClass(this.toggleClassBtn, "active");
          el.classList.add("active");
        });
      });
    } else {
      const easingList = [
        "linear",
        "power4.in",
        "power4.out",
        "power4.inOut",
        "Back.easeOut",
      ];
      this.easingLi.forEach((el, index) => {
        el.addEventListener("click", () => {
          this.easing = easingList[index];
          this.textEasing.innerHTML = easingList[index];
          this.removeClass(this.easingLi, "active");
          this.removeClass(this.toggleClassBtn, "active");
          el.classList.add("active");
        });
      });
    }
  }
  timingDuration() {
    let inputTextDur;
    this.addList.forEach((el) => {
      el.style.setProperty("--dur", this.textDuration.textContent + "s");
    });
    this.inputDur.addEventListener("change", (e) => {
      inputTextDur = e.target.value;
    });
    this.submitDur.addEventListener("submit", (e) => {
      e.preventDefault();
      this.duration = inputTextDur ? inputTextDur : this.duration;
      this.textDuration.innerHTML = this.duration;
      if (!this.jsCheck) {
        this.addList.forEach((el) => {
          el.style.setProperty("--dur", this.duration + "s");
        });
      }
    });
  }
  timingDelay() {
    let delCheck;
    this.inputDel ? (delCheck = this.inputDel.disabled) : null;
    let inputTextDel;
    if (!delCheck && this.inputDel) {
      this.addList.forEach((el) => {
        el.style.setProperty("--del", this.textDelay.textContent + "s");
      });
      this.inputDel.addEventListener("change", (e) => {
        inputTextDel = e.target.value;
      });
      this.submitDel.addEventListener("submit", (e) => {
        e.preventDefault();
        this.stagger = inputTextDel ? inputTextDel : this.stagger;
        this.textDelay.innerHTML = this.stagger;
        if (!this.jsCheck) {
          this.addList.forEach((el) => {
            el.style.setProperty("--del", this.stagger + "s");
          });
        }
      });
    } else {
      this.textDelay.innerHTML = 0;
    }
  }
  applyTypeSpeed() {
    this.checkTypeSpeed();
    this.textDuration.innerHTML = this.duration;
    if (!this.jsCheck) {
      this.addList.forEach((el) => {
        el.style.setProperty("--dur", this.duration + "s");
      });
    }
    this.textDelay.innerHTML = this.stagger;
    if (!this.jsCheck) {
      this.addList.forEach((el) => {
        el.style.setProperty("--del", this.stagger + "s");
      });
    }
  }
}
export { layout };
