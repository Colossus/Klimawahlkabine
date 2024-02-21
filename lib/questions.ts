export enum Party {
  GREEN = "Green Future",
  SUST = "Sustainable Progress",
  ECON = "Economic Growth",
  TECH = "Tech Innovators",
  TRAD = "Traditional Values",
}

export interface Answer {
  text: string;
  points: { [key in Party]: number };
}

export interface Question {
  id: number;
  question: string;
  answers: Answer[];
}

export const questions: Question[] = [
  {
    id: 1,
    question: "How should the government address deforestation?",
    answers: [
      {
        text: "Increase fines for illegal logging",
        points: {
          "Green Future": 5,
          "Sustainable Progress": 3,
          "Economic Growth": 1,
          "Tech Innovators": 2,
          "Traditional Values": 2,
        },
      },
      {
        text: "Promote reforestation projects",
        points: {
          "Green Future": 3,
          "Sustainable Progress": 4,
          "Economic Growth": 2,
          "Tech Innovators": 3,
          "Traditional Values": 1,
        },
      },
      {
        text: "Implement stricter regulations on land use",
        points: {
          "Green Future": 2,
          "Sustainable Progress": 2,
          "Economic Growth": 3,
          "Tech Innovators": 4,
          "Traditional Values": 3,
        },
      },
      {
        text: "No additional measures are necessary",
        points: {
          "Green Future": 0,
          "Sustainable Progress": 1,
          "Economic Growth": 4,
          "Tech Innovators": 1,
          "Traditional Values": 4,
        },
      },
    ],
  },
  {
    id: 12,
    question:
      "What policy should be prioritized to combat climate change effectively?",
    answers: [
      {
        text: "Investing heavily in renewable energy sources",
        points: {
          "Green Future": 7,
          "Sustainable Progress": 5,
          "Economic Growth": 2,
          "Tech Innovators": 4,
          "Traditional Values": 1,
        },
      },
      {
        text: "Implementing carbon taxes on major polluters",
        points: {
          "Green Future": 3,
          "Sustainable Progress": 4,
          "Economic Growth": 3,
          "Tech Innovators": 3,
          "Traditional Values": 2,
        },
      },
      {
        text: "Enhancing public transportation infrastructure",
        points: {
          "Green Future": 0,
          "Sustainable Progress": 1,
          "Economic Growth": 1,
          "Tech Innovators": 3,
          "Traditional Values": 3,
        },
      },
      {
        text: "Promoting carbon capture and storage technology",
        points: {
          "Green Future": 0,
          "Sustainable Progress": 0,
          "Economic Growth": 4,
          "Tech Innovators": 0,
          "Traditional Values": 4,
        },
      },
    ],
  },
  {
    id: 13,
    question:
      "How should governments support communities affected by climate change?",
    answers: [
      {
        text: "By offering financial compensations and relocation assistance",
        points: {
          "Green Future": 4,
          "Sustainable Progress": 5,
          "Economic Growth": 3,
          "Tech Innovators": 2,
          "Traditional Values": 5,
        },
      },
      {
        text: "Investing in sustainable local infrastructure",
        points: {
          "Green Future": 6,
          "Sustainable Progress": 4,
          "Economic Growth": 2,
          "Tech Innovators": 5,
          "Traditional Values": 2,
        },
      },
      {
        text: "Providing education and resources for self-sustainability",
        points: {
          "Green Future": 0,
          "Sustainable Progress": 1,
          "Economic Growth": 1,
          "Tech Innovators": 3,
          "Traditional Values": 3,
        },
      },
      {
        text: "No specific support; focus on broader climate policies",
        points: {
          "Green Future": 0,
          "Sustainable Progress": 0,
          "Economic Growth": 4,
          "Tech Innovators": 0,
          "Traditional Values": 0,
        },
      },
    ],
  },
];

export default questions;
