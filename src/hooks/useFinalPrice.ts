import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { CategoryName, Price } from "../types/product";
import { selectTodayDealBasRByCurrency } from "../features/exchange-slice";
import { ExchangeData } from "../types/exchange";

export type PriceCalcResult = {
  /** 외화 가격을 KRW로 변환한 가격 */
  initialPriceKRW: number;
  /** 택스리펀드 금액 */
  taxRefundAmount: number;
  /** 과세 가격 */
  cif: number;
  /** 과세 대상 금액 (600달러 초과분) */
  taxableAmount: number;
  /** 지불해야할 관세 금액 */
  duty: number;
  /** 지불해야할 부가가치세 금액 */
  vat: number;
  /** 자진신고 30% 감면액 (한도 20만원) */
  discount: number;
  /** 순 세금 */
  netTax: number;
  /** 최종 금액 */
  finalPrice: number;
};

/**
 * 국가별 Tax Refund (VAT 환급) 비율
 * - 일본: 10%
 * - 유럽: 12%
 * - 홍콩, 미국: 환급 없음
 */
const TAX_REFUND_RATES: Record<ExchangeData["cur_unit"], number> = {
  "JPY(100)": 0.1, // 일본: 10%
  EUR: 0.12, // 유럽: 12%
  HKD: 0.0, // 홍콩: 없음
  USD: 0.0, // 미국: 없음
};

/**
 * 물품 종류에 따른 관세율 (우리나라 세관 기준)
 * 예) 가방: 8%, 의류(아우터, 상의, 하의, 원피스): 13%, 슈즈: 13%, 악세서리: 8%
 */
const DUTY_RATES: Record<CategoryName, number> = {
  아우터: 0.13,
  상의: 0.13,
  하의: 0.13,
  원피스: 0.13,
  슈즈: 0.13,
  가방: 0.08,
  악세서리: 0.08,
};

const DEFAULT_DUTY_RATE = 0.08; // DUTY_RATES에 없는 경우의 기본값

/**
 * useFinalPrice - 최종 금액을 계산하는 사용자 Hook
 *
 * @param category - 물품 종류 (CategoryName)
 * @param price - 상품 가격 정보 (Price)
 * @returns 세부 내역을 포함한 최종 금액 정보 객체
 *
 * 계산 절차:
 * 1. 외화 가격(price.localPrice)을 환율(exchangeRates)을 적용해 KRW로 변환
 *    - JPY(100)의 경우 단위 보정을 위해 100으로 나눔
 * 2. applyTaxRefund가 true이면, 국가별 TAX_REFUND_RATES에 따라 택스 리펀드 금액을 차감
 *    → 과세가격(CIF) = 초기 KRW 가격 - 택스 리펀드 금액
 * 3. USD 환율을 사용해 600달러에 해당하는 KRW 금액(threshold)을 산출
 *    - CIF가 이 한도 이하이면 과세 대상이 아니므로 세금 없음
 * 4. CIF가 한도를 초과하면, 초과분(taxableAmount)에 대해 관세와 부가세 계산
 *    - 관세 = taxableAmount × (DUTY_RATES[category] 또는 기본값)
 *    - 부가세 = (taxableAmount + 관세) × 10%
 * 5. 자진 신고 시 관세의 30% 감면(최대 200,000원)을 적용
 * 6. 최종 금액 = CIF - (관세 + 부가세 - 감면액)
 */
const useFinalPrice = (
  category: CategoryName,
  price: Price
): PriceCalcResult => {
  const { applyDuty, applyTaxRefund } = useSelector(
    (state: RootState) => state.products
  );
  const exchangeRates = useSelector(selectTodayDealBasRByCurrency); // { cur_unit: number }

  // 1. 외화 가격을 KRW로 변환
  let initialPriceKRW = price.localPrice * (exchangeRates[price.cur_unit] || 1);
  if (price.cur_unit === "JPY(100)") {
    initialPriceKRW /= 100;
  }

  // 2. Tax Refund 적용 (택스 리펀드 금액 계산)
  const taxRefundRate = TAX_REFUND_RATES[price.cur_unit] || 0;
  const taxRefundAmount = applyTaxRefund ? initialPriceKRW * taxRefundRate : 0;

  /** 과세가격 (CIF): 택스 리펀드 적용 후 실제 구매 가격 */
  const cif = initialPriceKRW - taxRefundAmount;

  /** 3. 면세 한도 600달러를 원화(KRW)로 환산한 값 */
  const usd600 = 600 * (exchangeRates["USD"] || 1300);

  // 세금 부과 대상이 아니면
  if (cif <= usd600 || !applyDuty) {
    return {
      initialPriceKRW: Math.round(initialPriceKRW),
      taxRefundAmount: Math.round(taxRefundAmount),
      cif: Math.round(cif),
      taxableAmount: 0,
      duty: 0,
      vat: 0,
      discount: 0,
      netTax: 0,
      finalPrice: Math.round(cif),
    };
  }

  // 4. 과세 대상 금액 (초과분)
  const taxableAmount = cif - usd600;

  // 5. 관세: 과세 대상 금액에 대해 물품 종류별 관세율 적용
  const dutyRate =
    DUTY_RATES[category] !== undefined
      ? DUTY_RATES[category]
      : DEFAULT_DUTY_RATE;
  const duty = taxableAmount * dutyRate;

  // 6. 부가가치세 (VAT): (과세 대상 금액 + 관세)의 10%
  const vat = (taxableAmount + duty) * 0.1;

  // 7. 총 세금 (관세 + 부가세)
  const totalTax = duty + vat;

  // 8. 자진 신고 시 관세 감면: 관세의 30% 감면 (최대 200,000원 한도)
  const discount = Math.min(duty * 0.3, 200000);

  // 9. 순 세금
  const netTax = totalTax - discount;

  // 10. 최종 금액 = CIF - 순 세금
  const final = cif + netTax;

  return {
    initialPriceKRW: Math.round(initialPriceKRW),
    taxRefundAmount: Math.round(taxRefundAmount),
    cif: Math.round(cif),
    taxableAmount: Math.round(taxableAmount),
    duty: Math.round(duty),
    vat: Math.round(vat),
    discount: Math.round(discount),
    netTax: Math.round(netTax),
    finalPrice: Math.round(final),
  };
};

export default useFinalPrice;
