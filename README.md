# Dashboard Bot

Một dashboard đơn giản để hiển thị danh sách các bản ghi được nhóm theo một trường unique.

## Tính năng

- 📊 **Thống kê tổng quan**: Hiển thị số lượng bản ghi, nhóm, bản ghi active/inactive
- 🔄 **Nhóm linh hoạt**: Có thể nhóm theo category, status, name hoặc ID
- 📱 **Responsive**: Giao diện tương thích với mọi thiết bị
- 🎨 **UI hiện đại**: Sử dụng Tailwind CSS với thiết kế đẹp mắt
- ⚡ **Hiệu suất cao**: Sử dụng React với TypeScript

## Cài đặt

1. Clone repository:
```bash
git clone <repository-url>
cd dashboard_bot
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Chạy ứng dụng:
```bash
npm run dev
```

4. Mở trình duyệt và truy cập: `http://localhost:3000`

## Cấu trúc dự án

```
src/
├── components/          # React components
│   ├── Dashboard.tsx           # Component chính
│   ├── StatsCard.tsx          # Card hiển thị thống kê
│   ├── RecordCard.tsx         # Card hiển thị bản ghi
│   └── GroupedRecordsSection.tsx # Section hiển thị nhóm
├── data/
│   └── mockData.ts            # Dữ liệu mẫu
├── types/
│   └── index.ts              # TypeScript interfaces
├── utils/
│   └── groupRecords.ts       # Utility functions
├── App.tsx                   # Component gốc
└── main.tsx                  # Entry point
```

## Sử dụng

1. **Xem thống kê**: Dashboard hiển thị tổng quan về dữ liệu
2. **Chọn nhóm**: Sử dụng dropdown để chọn trường nhóm (category, status, name, id)
3. **Mở rộng nhóm**: Click vào từng nhóm để xem chi tiết các bản ghi
4. **Xem chi tiết**: Mỗi bản ghi hiển thị đầy đủ thông tin

## Công nghệ sử dụng

- **React 18** - Framework UI
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## Tùy chỉnh

### Thêm dữ liệu mới

Chỉnh sửa file `src/data/mockData.ts` để thêm bản ghi mới:

```typescript
export const mockRecords: Record[] = [
  {
    id: 'new-id',
    name: 'New Record',
    category: 'New Category',
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    value: 1000,
    description: 'New record description'
  },
  // ... thêm bản ghi khác
];
```

### Thêm trường nhóm mới

1. Cập nhật interface `Record` trong `src/types/index.ts`
2. Thêm option mới vào dropdown trong `src/components/Dashboard.tsx`

## Build cho production

```bash
npm run build
```

## Preview build

```bash
npm run preview
```