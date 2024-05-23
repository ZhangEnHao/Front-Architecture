

const btn = document.createElement("button");
btn.innerText = "按需加载";
btn.addEventListener("click", () => {
  import("./log").then(() => {

  })
});

document.body.appendChild(btn);

