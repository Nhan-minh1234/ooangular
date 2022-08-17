let data = [
  {
    "id": "tasks",
    "EN": {
      "title": "Tasks",
      "items": ["Task list", "Task report", "Task Autocomplete", "Report", "Báo cáo định kỳ", "Project", "Project group", "Trao đổi"]

    },
    "VN": {
      "title": "Công Việc",
      "items": ["Danh Sách Công Việc", "Thống kê", "Công việc mẫu", "Báo cáo", "Báo cáo định kỳ", "Dự án công việc", "Nhóm công việc", "Trao đổi"]
    },
    'routing': ['/task-list', '/task-report', '/task-autocomplete', "/report", "/project", "", "", ""],
    'icon': ' uil-receipt-alt'
  },
  {
    "id": "event",
    "EN": {
      "title": "Event",

      "items": [
        "Event list",
        "New event",
        "Event Sample",
        "Location",
      ]
    },
    "VN": {
      "title": "Lịch tuần",
      "items": [
        "Danh sách lịch",
        "Đăng ký lịch",
        "Lịch tuần mẫu",
        "Địa điểm"
      ]
    },
    "routing": [
      '/event-list',
      '/new-event',
      '/event-sample',
      '/location'

    ],

    'icon': 'uil-calendar-alt'
  },
  {
    "id": "client",
    "EN": {
      "title": "Client",
      "items": [
        "Contract",
        "Catalog",
        "Report",
        "Search",
      ]
    },
    "VN": {
      "title": "Khách hàng",
      "items": [
        "Hợp đồng",
        "Danh mục",
        "Báo cáo",
        "Tìm kiếm"
      ]
    },
    "routing": [
      '/contract',
      '/catalog',
      '/report',
      '/search'

    ],
    'icon': 'uil-users-alt'
  },
  {
    "id": "social",
    "EN": {
      "title": "Cong Thong Tin [Eng]",
      "items": ["Notification", "Library", "News", "Images", "Contact", "Survey"]
    },
    "VN": {
      "title": "Cổng Thông Tin",
      "items": ["Thông báo", "Thư Viện", "Tin tức", "Hình ảnh", "Danh bạ"/*, "Thăm dò khảo sát"*/
      ]
    },
    "routing": ['/notification', '/library', '/news', '/images', '/contact'/*, '/survey'*/
    ],
    'icon': 'uil-globe'
  },
  {
    "id": "document",
    "EN": {
      "title": "Van ban [Eng]",
      "items": [
        "Inoming Text",
        "Text go",
        "Internal Text",
        "Search",
        "Create Folder",
        "Text Source",
        "Text Inheritance"
      ]
    },
    "VN": {
      "title": "Văn bản",
      "items": [
        "Văn bản đến",
        "Văn bản đi",
        "Văn bản nội bộ",
        "Tìm kiếm",
        "Tạo thư mục",
        "Nguồn văn bản",
        "Kế thừa văn bản"
      ]
    },
    "routing": [
      '/incoming-text',
      '/text-go',
      '/internal-text',
      '/search',
      '/create-folder',
      '/text-source',
      '/text-inheritance'
    ],
    'icon': 'dripicons-blog'
  }

];

export default data;
