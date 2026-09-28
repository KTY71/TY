const symptomIds = [
  "fatigue",
  "dryness",
  "blur",
  "discomfort"
];

const checkButton = document.querySelector("#checkButton");
const resultCard = document.querySelector("#resultCard");
const statusBadge = document.querySelector("#statusBadge");
const totalScoreElement = document.querySelector("#totalScore");
const resultMessage = document.querySelector("#resultMessage");

/*
 * 슬라이더의 현재 값을 화면에 표시한다.
 */
symptomIds.forEach((id) => {
  const slider = document.querySelector(`#${id}`);
  const valueElement = document.querySelector(`#${id}Value`);

  slider.addEventListener("input", () => {
    valueElement.textContent = slider.value;
  });
});

/*
 * 사용자가 입력한 증상 점수를 합산한다.
 */
function calculateTotalScore() {
  let totalScore = 0;

  symptomIds.forEach((id) => {
    const input = document.querySelector(`#${id}`);
    totalScore += Number(input.value);
  });

  return totalScore;
}

/*
 * 합산 점수에 따라 휴식 안내 수준을 결정한다.
 *
 * 주의:
 * 아래 기준은 질환 진단 기준이 아니라
 * 프로토타입의 휴식 안내 수준을 조절하기 위한 설계 규칙이다.
 */
function classifyEyeCondition(totalScore) {
  if (totalScore <= 5) {
    return {
      status: "양호",
      message:
        "현재 불편 정도가 낮습니다. 작업 중에도 정기적으로 눈을 쉬어 주세요.",
      color: "#1ca7a6",
      workMinutes: 20
    };
  }

  if (totalScore <= 12) {
    return {
      status: "주의",
      message:
        "눈의 불편감이 확인되었습니다. 평소보다 조금 이른 휴식을 권장합니다.",
      color: "#f2a23a",
      workMinutes: 15
    };
  }

  return {
    status: "휴식 권장",
    message:
      "현재 눈 휴식이 권장되는 상태입니다. 작업을 시작하기 전에 잠시 화면에서 눈을 떼어 주세요.",
    color: "#ff7a66",
    workMinutes: 10
  };
}

/*
 * 판정 버튼을 누르면 결과를 화면에 표시한다.
 */
checkButton.addEventListener("click", () => {
  const totalScore = calculateTotalScore();
  const result = classifyEyeCondition(totalScore);

  totalScoreElement.textContent = totalScore;
  statusBadge.textContent = result.status;
  statusBadge.style.backgroundColor = result.color;

  resultMessage.textContent =
    `${result.message} 권장 작업 주기는 ${result.workMinutes}분입니다.`;

  resultCard.classList.remove("hidden");
  resultCard.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});