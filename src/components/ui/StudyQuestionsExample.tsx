"use client"

import {QuestionType, StudyQuestion} from "@/types/study_question";
import {Divider, Paper, Stack, TextField, Typography} from "@mui/material";
import * as React from "react";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";



type StudyQuestionsExampleProps = {
    questions: StudyQuestion[];
};

type QuestionShellProps = {
   question: StudyQuestion;
    maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
};

function Question({ question, maxWidth = "md" }: QuestionShellProps) {

    return (
        <Paper
            variant="outlined"
            sx={(theme) => ({
                p: 1,
                borderRadius: 3,
                textAlign: "left",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
            })}
        >
            <Stack spacing={1}>
                <QuestionPrompt prompt={question.questionPrompt} number={question.id}/>
                <Divider/>
                <QuestionBody question={question} />
            </Stack>
        </Paper>
    );
}

function QuestionPrompt({prompt, number}: {prompt: string; number: number}) {
    return (
            <Stack spacing={1.5}>
                {/* Question Number */}
                <Typography
                    variant="overline"
                    sx={{
                        fontWeight: 700,
                        color: "text.secondary",
                        letterSpacing: 1,
                    }}
                >
                    Question {number}
                </Typography>

                {/* Prompt */}
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 600,
                        lineHeight: 1.4,
                    }}
                >
                    {prompt}
                </Typography>
            </Stack>
    );
}

function QuestionBody({
                           question
                       }: {
        question: StudyQuestion;
    }) {

    switch (question.questionType) {
        case "multiple_choice":
            return (
                <Stack spacing={1}>
                    {question.options.map((option) => (
                        <Stack key={option} direction="row" spacing={1.5} alignItems="center">
                            <RadioButtonUncheckedIcon fontSize="small" />
                            <Typography>{option}</Typography>
                        </Stack>
                    ))}
                </Stack>
            );

        case "user_input":
            return (
                <TextField
                    fullWidth
                    disabled
                    multiline={question.multiline ?? false}
                    minRows={question.multiline ? 3 : undefined}
                    placeholder={question.placeholder ?? "Type your answer..."}
                    variant="outlined"
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            bgcolor: "grey.50",
                        },
                    }}
                />
            );

        case "true_false":
            return (
                <Stack spacing={1}>
                    {["True", "False"].map((option) => (
                        <Stack
                            key={option}
                            direction="row"
                            spacing={1.5}
                            alignItems="center"
                            sx={{
                                p: 1,
                                borderRadius: 2,
                                border: "1px solid",
                                borderColor: "divider",
                            }}
                        >
                            <RadioButtonUncheckedIcon
                                fontSize="small"
                                sx={{ color: "text.secondary" }}
                            />
                            <Typography>{option}</Typography>
                        </Stack>
                    ))}
                </Stack>
            );

        case "likert_scale":
            return (
                <Stack spacing={1.5}>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2" color="text.secondary">
                            {question.scale.minLabel}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {question.scale.maxLabel}
                        </Typography>
                    </Stack>

                    <Stack direction="row" spacing={1} justifyContent="space-between">
                        {Array.from(
                            { length: question.scale.max - question.scale.min + 1 },
                            (_, index) => question.scale.min + index
                        ).map((value) => (
                            <Stack
                                key={value}
                                spacing={0.75}
                                alignItems="center"
                                sx={{
                                    flex: 1,
                                    p: 1,
                                    borderRadius: 2,
                                    border: "1px solid",
                                    borderColor: "divider",
                                }}
                            >
                                <RadioButtonUncheckedIcon
                                    fontSize="small"
                                    sx={{ color: "text.secondary" }}
                                />
                                <Typography variant="body2">{value}</Typography>
                            </Stack>
                        ))}
                    </Stack>
                </Stack>
            );
    }

    return <p>Error: Question doesn't exist or is set up improperly.</p>;
}



export default function StudyQuestionsSet({
                                                  questions,
                                              }: StudyQuestionsExampleProps) {

    if (questions == null) {
        return (
          <p>Error: Question set not found or not set up properly.</p>
        )
    }

    return (
        <Stack spacing={2}>
            {questions.map((question) => (
                <Question key={question.id} question={question}/>
            ))}
        </Stack>
    );
}
