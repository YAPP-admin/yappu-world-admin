/**
 * HEX + ALPHA 조합 생성기
 * @param hexColor 6자리 HEX 코드 (예: "#2E2F33")
 * @param alpha 0~1 또는 0~100 (%)
 * @returns HEX+Alpha 코드 (예: "#2E2F33E0")
 */
export function hexWithAlpha(hexColor: string, alpha: number): string {
  const normalizedAlpha = alpha > 1 ? alpha / 100 : alpha;
  const clamped = Math.max(0, Math.min(1, normalizedAlpha));
  const alphaHex = Math.round(clamped * 255)
    .toString(16)
    .padStart(2, '0')
    .toUpperCase();

  return hexColor + alphaHex;
}

// const baseHex = "#2E2F33"; // colorCoolNeutral["22"]
// const result = hexWithAlpha(baseHex, 0.88); // "#2E2F33E0"
