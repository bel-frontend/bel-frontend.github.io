const text = "Беларускі балотнічак сарамлівы";

const textAnimation = (textNode, text) => {
  let index = 0;
  const interval = setInterval(() => {
    index = index + 1;
    textNode.textContent = text.slice(0, index);
    if (index + 1 > text.length) {
      clearInterval(interval);
    }
  }, [100]);
};

const textChangeClasses = (node) => {
  setInterval(() => {
    //   node.classList.toggle("heat_out");
    node.classList.toggle("heat_up");
  }, [1000]);
  //   node.addEventListener("mouseenter", () => {
  //     node.style.top = "100px";
  //   });
  //   node.addEventListener("mouseleave", () => {
  //     node.style.top = "0px";
  //   });
};

document.addEventListener("DOMContentLoaded", () => {
  const h1 = document.querySelector("h1");
  const h2 = document.querySelector("h2");
  //  Тут  выконваецца анімацыя тэксту

  textAnimation(h1, h1.textContent);
  textAnimation(h2, h2.textContent);
  //   textAnimation(heat, h2.textContent);
  const heat = document.querySelector(".heat");
  textChangeClasses(heat);
});
