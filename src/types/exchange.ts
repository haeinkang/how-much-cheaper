export interface ExchangeResponse {
  RESULT: 1 | 2 | 3 | 4; // 조회 결과: 1: 성공, 2: DATA코드 오류, 3: 인증코드 오류, 4: 일일제한횟수 마감
  CUR_UNIT: string; // 통화코드
  CUR_NM: string; // 국가/통화명
  TTB: string; // 전신환(송금) 받으실때
  TTS: string; // 전신환(송금) 보내실때
  DEAL_BAS_R: string; // 매매 기준율
  BKPR: string; // 장부가격
  YY_EFEE_R: string; // 년환가료율
  TEN_DD_EFEE_R: string; // 10일환가료율
  KFTC_DEAL_BAS_R: string; // 서울외국환중개 매매기준율
  KFTC_BKPR: string; // 서울외국환중개 장부가격
}
