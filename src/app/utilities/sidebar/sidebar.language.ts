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
    "id": "documents",
    "EN": {
      "title": "Sign Documents",
      "items": [
        "Document signing",
        "Signator list"
        
      ]
    },
    "VN": {
      "title": "Ký văn bản",
      "items": [
        "Trình ký văn bản",
        "Danh sách trình ký"
        
      ]
    },
    "routing": [
      '/Document signing',
      '/Signator',
      '/news',
     
    ],
    'icon': 'uil-notes'
  },
  {
    "id": "personal",
    "EN": {
      "title": "personal",
      "items": [
        "Event",
        "File cabinet",
        "Business card",
        "Change password"
      ]
    },
    "VN": {
      "title": "Cá nhân",
      "items": [
        "Lịch",
        "Tủ hồ sơ",
        "Danh thiếp",
        "Đổi mật khẩu"
      ]
    },
    "routing": [
      '/event',
      '/file cabinet',
      '/business card',
      '/change password'
    ],
    'icon': 'uil-smile'
  }
];

export default data;
