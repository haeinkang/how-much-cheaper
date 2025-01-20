module.exports = {
  rules: {
    'no-console': 'off', // 비활성화
    // .then() 사용 후 catch가 없으면 오류
    'promise/catch-or-return': 'off', 
    // .then 대신 async/await 사용 권장.
    'promise/prefer-await-to-then': 'warn', 
    // .then에서 반환 값이 없거나 throw하지 않으면 오류.
    'promise/always-return': 'warn',
  },
  extends: [
    // 기본 JavaScript 및 TypeScript 린트 규칙
    "@titicaca/eslint-config-triple",
    // TypeScript 코드에서 타입 정보까지 활용한 더 엄격한 규칙을 사용
    "@titicaca/eslint-config-triple/requiring-type-checking",
    // React 프론트엔드 프로젝트 규치    
    "@titicaca/eslint-config-triple/frontend",
    // Prettier와 호환되도록 마지막에 추가
    "@titicaca/eslint-config-triple/prettier",
  ],
};