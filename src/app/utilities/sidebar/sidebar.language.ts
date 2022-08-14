let data = [
  {
    "id": "tasks",
    "EN": {
      "title": "Tasks",

      "items": ["Task List", "Verify", "Đăng ký [Eng]", "Lịch tuần mẫu [Eng]", "Địa điểm [Eng]"]

    },
    "VN": {
      "title": "Công Việc",
      "items": ["Danh Sách Công Việc", "Lịch tuần mẫu", "Địa điểm"]
    },
    'routing': [
      '/task-list',
      '',
      '',
      '',
      ''
    ],
    'icon': 'uil-database-alt'
  },
  {
    "id": "event",
    "EN": {
      "title": "Event",
      "items": [
        "Event list",
        "New event"
      ]
    },
    "VN": {
      "title": "Lịch tuần",
      "items": [
        "Danh sách lịch",
        "Đăng ký lịch"
      ]
    },
    "routing": [
      '/event-list',
      '/new-event'
    ],
    'icon': 'uil-calendar-alt'
  },
  {
    "id": "social",
    "EN": {
      "title": "Cong Thong Tin [Eng]",
      "items": [
        "Notification",
        "Library",
        "News",
        "Images",
        "Contact",
        "Survey"
      ]
    },
    "VN": {
      "title": "Cổng Thông Tin",
      "items": [
        "Thông báo",
        "Thư Viện",
        "Tin tức",
        "Hình ảnh",
        "Danh bạ",
        "Thăm dò khảo sát"
      ]
    },
    "routing": [
      '/notification',
      '/library',
      '/news',
      '/images',
      '/contact',
      '/survey'
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
