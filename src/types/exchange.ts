export interface ExchangeResponse {
  result: 1 | 2 | 3 | 4; // 조회 결과: 1: 성공, 2: data코드 오류, 3: 인증코드 오류, 4: 일일제한횟수 마감
  cur_unit: string; // 통화코드
  cur_nm: string; // 국가/통화명
  ttb: string; // 전신환(송금) 받으실때
  tts: string; // 전신환(송금) 보내실때
  deal_bas_r: string; // 매매 기준율
  bkpr: string; // 장부가격
  yy_efee_r: string; // 년환가료율
  ten_dd_efee_r: string; // 10일환가료율
  kftc_deal_bas_r: string; // 서울외국환중개 매매기준율
  kftc_bkpr: string; // 서울외국환중개 장부가격
}
