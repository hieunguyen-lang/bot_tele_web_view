export interface HoaDon {
  id: number;
  thoi_gian: string;
  nguoi_gui: string;
  ten_khach: string;
  so_dien_thoai: string;
  type_dao_rut: string;
  ngan_hang: string;
  ngay_giao_dich: string;
  gio_giao_dich: string;
  tong_so_tien: string;
  so_the: string;
  tid: string;
  mid: string;
  so_lo: string;
  so_hoa_don: string;
  ten_may_pos: string;
  lich_canh_bao: string;
  tien_phi: string;
  batch_id: string;
  caption_goc: string;
  ket_toan?: string;
  phi_pos?: string;
  phi_thu_khach?: string;
  ck_khach_rut?: string;
  tien_ve_tk_cty?: string;
  tinh_trang?: string;
  lenh_treo?: string;
  ly_do?: string;
}

export interface GroupedHoaDon {
  [batch_id: string]: HoaDon[];
}

export interface DashboardStats {
  totalRecords: number;
  totalBatches: number;
  totalAmount: number;
  totalFee: number;
}

export interface HoaDonGroup {
  batch_id: string;
  records: HoaDon[];
} 