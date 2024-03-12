export interface UserType {
  user_id: number;
  user_type: number;
  user_email: string;
  nickname: string;
  user_password: string;
  register_num: string;
  company_address: string;
  manager_name: string;
  manager_phone: string;
  manager_depart: string;
  manager_grade: string;
  other: string;
  admin_name: string;
  admin_phone: string;
  approval: number;
}

// 필터 타입이나 카드 프롭스와 같은 추가 인터페이스는 사용자 계정 데이터와 직접적으로 관련이 없어 보입니다.
// 하지만, 예를 들어 관리자나 매니저 목록을 필터링하거나 표시하기 위해 적절히 수정할 수 있습니다.

// 예시: 사용자 관리 인터페이스 내에서 관리자 또는 매니저를 필터링하기 위한 인터페이스
export interface UserFilterType {
  filterByName?: string; // 필터링을 위한 사용자 이름
  sort?: string; // 정렬 기준
  // 기타 필터링 조건들
}

// 관리자 또는 사용자 정보를 표시하기 위한 카드 컴포넌트 프롭스
export interface UserCardProps {
  user_type?: number;
  user_email?: string;
  nickname?: string;
  phone?: string; // manager_phone 또는 admin_phone을 표시하기 위함
  // 기타 필요한 프롭스
}
