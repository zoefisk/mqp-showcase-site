export type QuestionType =
    | "multiple_choice"
    | "true_false"
    | "user_input"
    | "likert_scale";

type BaseQuestion = {
    id: number;
    questionPrompt: string;
    required: boolean;
};

export type MultipleChoiceQuestion = BaseQuestion & {
    questionType: "multiple_choice";
    options: string[];
};

export type TrueFalseQuestion = BaseQuestion & {
    questionType: "true_false";
};

export type UserInputQuestion = BaseQuestion & {
    questionType: "user_input";
    placeholder?: string;
    multiline?: boolean;
};

export type LikertScaleQuestion = BaseQuestion & {
    questionType: "likert_scale";
    scale: {
        min: number;
        max: number;
        minLabel: string;
        maxLabel: string;
        step?: number;
    };
};

export type StudyQuestion =
    | MultipleChoiceQuestion
    | TrueFalseQuestion
    | UserInputQuestion
    | LikertScaleQuestion;
