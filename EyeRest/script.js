console.log("script.js 연결 성공");

const symptomIds = [
  "fatigue",
  "dryness",
  "blur",
  "discomfort"
];

symptomIds.forEach((id) => {
  const slider = document.getElementById(id);
  const valueElement = document.getElementById(`${id}Value`);

  slider.addEventListener("input", function () {
    valueElement.textContent = slider.value;
  });
});