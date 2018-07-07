import { Subject } from './subject';

export const SUBJECTS: Subject[] = [
    {
        subject_id: 1,
        name: "social/emotion(early education)",
        cName: "社交情感(早期教育)",
        conditions: [2, 3, 4],
        results: [2, 3, 4],
        description: "",
        cDescription: ""
    },
    {
        subject_id: 2,
        name: "language/communication(early education)",
        cName: "语言交流(早期教育)",
        conditions: [1, 3, 4],
        results: [1, 3, 4, 5, 6, 7, 8],
        description: "",
        cDescription: ""
    },
    {
        subject_id: 3,
        name: "cognitive/learning(early education)",
        cName: "认知学习(早期教育)",
        conditions: [1, 2, 4],
        results: [1, 2, 4, 5, 6, 7, 8, 9],
        description: "",
        cDescription: ""
    },
    {
        subject_id: 4,
        name: "physica/movement(early education)",
        cName: "身体运动(早期教育)",
        conditions: [1, 2, 3],
        results: [1, 2, 3],
        description: "",
        cDescription: ""
    },
    {
        subject_id: 5,
        name: "chinese(primary)",
        cName: "中文(小学)",
        conditions: [2, 3],
        results: [7, 8, 9],
        description: "",
        cDescription: ""
    },
    {
        subject_id: 6,
        name: "english(primary)",
        cName: "英文(小学)",
        conditions: [2, 3],
        results: [7, 8, 9],
        description: "",
        cDescription: ""
    },
    {
        subject_id: 7,
        name: "math(primary)",
        cName: "数学(小学)",
        conditions: [3, 5, 6],
        results: [8],
        description: "",
        cDescription: ""
    },
    {
        subject_id: 8,
        name: "science(primary)",
        cName: "科学(小学)",
        conditions: [3, 5, 6, 7],
        results: [],
        description: "",
        cDescription: ""
    },
    {
        subject_id: 9,
        name: "social study(primary)",
        cName: "社会研究(小学)",
        conditions: [1, 3, 5, 6],
        results: [],
        description: "",
        cDescription: ""
    },
    {
        subject_id: 10,
        name: "character citizen education(primary)",
        cName: "公民教育(小学)",
        conditions: [1, 3, 5, 6],
        results: [],
        description: "",
        cDescription: ""
    },
    {
        subject_id: 11,
        name: "physical education(primary)",
        cName: "体育(小学)",
        conditions: [3, 4, 5, 6],
        results: [],
        description: "",
        cDescription: ""
    },
    {
        subject_id: 12,
        name: "art(primary)",
        cName: "艺术(小学)",
        conditions: [1, 2, 5, 6],
        results: [],
        description: "",
        cDescription: ""
    },
    {
        subject_id: 13,
        name: "music(primary)",
        cName: "音乐(小学)",
        conditions: [1, 2, 5, 6],
        results: [],
        description: "",
        cDescription: ""
    }
]