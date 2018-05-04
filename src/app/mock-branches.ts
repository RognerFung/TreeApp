import { Branch } from './branch';

export const BRANCHES: Branch[] =
[
    {
        "id": "b-001-001",
        "name": "初级认知",
        "level": 1,
        "next": ["b-002-001", "b-005-001"],
        "previous": [],
        "description": ""
    },
    {
        "id": "b-001-002",
        "name": "初级语言",
        "level": 1,
        "next": ["b-002-001", "b-005-002"],
        "previous": [],
        "description": ""
    },
    {
        "id": "b-001-003",
        "name": "初级运动",
        "level": 1,
        "next": ["b-005-003"],
        "previous": [],
        "description": ""
    },
    {
        "id": "b-001-004",
        "name": "初级生活",
        "level": 1,
        "next": ["b-005-004"],
        "previous": [],
        "description": ""
    },
    {
        "id": "b-002-001",
        "name": "初级交流",
        "level": 2,
        "next": ["b-005-001", "b-005-002", "b-005-003", "b-005-004", "b-006-001"],
        "previous": ["b-001-001","b-001-002"],
        "description": ""
    },
    {
        "id": "b-005-001",
        "name": "中级认知",
        "level": 5,
        "next": ["b-010-001", "b-006-001"],
        "previous": ["b-001-001", "b-002-001"],
        "description": ""
    },
    {
        "id": "b-005-002",
        "name": "中级语言",
        "level": 5,
        "next": ["b-010-002", "b-006-001"],
        "previous": ["b-001-002", "b-002-001"],
        "description": ""
    },
    {
        "id": "b-005-003",
        "name": "中级运动",
        "level": 5,
        "next": ["b-010-003", "b-006-001"],
        "previous": ["b-001-003", "b-002-001"],
        "description": ""
    },
    {
        "id": "b-005-004",
        "name": "中级生活",
        "level": 5,
        "next": ["b-010-004", "b-006-001"],
        "previous": ["b-001-004", "b-002-001"],
        "description": ""
    },
    {
        "id": "b-006-001",
        "name": "中级交流",
        "level": 6,
        "next": [],
        "previous": ["b-002-001", "b-005-001", "b-005-002", "b-005-003", "b-005-004", "b-010-001", "b-010-002", "b-010-003", "b-010-004"],
        "description": ""
    },
    {
        "id": "b-010-001",
        "name": "高级认知",
        "level": 10,
        "next": [],
        "previous": ["b-005-001", "b-006-001"],
        "description": ""
    },
    {
        "id": "b-010-002",
        "name": "高级语言",
        "level": 10,
        "next": [],
        "previous": ["b-005-002", "b-006-001"],
        "description": ""
    },
    {
        "id": "b-010-003",
        "name": "高级运动",
        "level": 10,
        "next": [],
        "previous": ["b-005-003", "b-006-001"],
        "description": ""
    },
    {
        "id": "b-010-004",
        "name": "高级生活",
        "level": 10,
        "next": [],
        "previous": ["b-005-004", "b-006-001"],
        "description": ""
    }
];