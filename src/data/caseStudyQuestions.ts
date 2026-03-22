import {StudyQuestion} from "@/types/study_question";

export const SET_ONE: StudyQuestion[] = [
    {
        id: 1,
        questionPrompt: "What is your favorite food?",
        questionType: "multiple_choice",
        options: [
            "pizza",
            "burger",
            "salad",
            "tacos",
        ],
        required: true,
    },
    {
        id: 2,
        questionPrompt: "What do you enjoy doing?",
        questionType: "multiple_choice",
        options: [
            "reading",
            "video gaming",
            "sleeping",
            "hanging out with friends",
        ],
        required: true,
    },
];
export const VIZ_QUESTIONS: StudyQuestion[] = [
    {
        id: 1,
        questionPrompt: "How alarming does this result feel to you?",
        questionType: "likert_scale",
        scale: {
            min: 1,
            max: 6,
            minLabel: "Not at all",
            maxLabel: "Very",
        },
        required: true,
    },
    {
        id: 2,
        questionPrompt: "How urgent of an issue is this result?",
        questionType: "likert_scale",
        scale: {
            min: 1,
            max: 6,
            minLabel: "Not at all",
            maxLabel: "Very",
        },
        required: true,
    },
    {
        id: 3,
        questionPrompt:
            "Which of the following best describes what you would do in response to your test result?",
        questionType: "multiple_choice",
        options: [
            "Nothing",
            "Talk to your doctor about this test result at your next regular appointment",
            "Ask to see your doctor at the first available appointment",
            "Go to a hospital or your doctor’s office tomorrow",
            "Go to a hospital as soon as you can get free later today",
            "Go to a hospital immediately",
        ],
        required: true,
    },
];
export const FINAL_QUESTIONS: StudyQuestion[] = [
    {
        id: 1,
        questionPrompt:
            "In your opinion, how well did these images describe the test results?",
        questionType: "likert_scale",
        scale: {
            min: 1,
            max: 5,
            minLabel: "Not well at all",
            maxLabel: "Extremely well",
        },
        required: true,
    },
    {
        id: 2,
        questionPrompt:
            "How helpful were these images in helping you to understand the test results?",
        questionType: "likert_scale",
        scale: {
            min: 1,
            max: 5,
            minLabel: "Not at all helpful",
            maxLabel: "Extremely helpful",
        },
        required: true,
    },
    {
        id: 3,
        questionPrompt:
            "If you were receiving laboratory test results in real life, would you like to see the test results presented using this type of image?",
        questionType: "likert_scale",
        scale: {
            min: 1,
            max: 5,
            minLabel: "Definitely no",
            maxLabel: "Definitely yes",
        },
        required: true,
    },
    {
        id: 4,
        questionPrompt:
            "How much would you trust what these images are telling you about your health?",
        questionType: "likert_scale",
        scale: {
            min: 1,
            max: 5,
            minLabel: "Do not trust at all",
            maxLabel: "Trust completely",
        },
        required: true,
    },
];
