import {
  Button,
  ButtonGroup,
  Container,
  Grid,
  Typography,
  TypographyVariant,
} from "@mui/material";
import { useAppLanguage } from "../../hooks";

import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import QuestionItem from "./items/QuestionItem";
import { FormProvider, useForm } from "react-hook-form";

function Question() {
  const { Strings } = useAppLanguage();
  const value = useForm();
  const questionList = [
    {
      number: "01",
      question:
        "For an existing lead to be used in a sales campaign, what must it contain?",
      type: "radio",
      answerList: [
        {
          content: "answer 1",
          is_result: true,
        },
        {
          content: "answer 2",
          is_result: false,
        },
        {
          content: "answer 3",
          is_result: false,
        },
        {
          content: "answer 4",
          is_result: false,
        },
      ],
    },

    {
      number: "02",
      question:
        "Which three statements are true about a competitor in Oracle Sales Cloud?",
      type: "input",
    },

    {
      number: "03",
      question: "Which three ",
      type: "checkbox",

      answerList: [
        {
          content: "answer 1",
          is_result: true,
        },
        {
          content: "answer 2",
          is_result: true,
        },
        {
          content: "answer 3",
          is_result: false,
        },
        {
          content: "answer 4",
          is_result: false,
        },
        {
          content: "answer 5",
          is_result: false,
        },
      ],
    },

    {
      number: "04",
      question: "Which three ",
      type: "checkbox",

      answerList: [
        {
          content: "answer 1",
          is_result: true,
        },
        {
          content: "answer 2",
          is_result: true,
        },
        {
          content: "answer 3",
          is_result: false,
        },
        {
          content: "answer 4",
          is_result: false,
        },
        {
          content: "answer 5",
          is_result: false,
        },
      ],
    },

    {
      number: "05",
      question: "true about a competitor in Oracle Sales Cloud?",
      type: "input",
    },
  ];
  const onSubmit = async (data) => {
    console.log(data);
  };
  return (
    <FormProvider {...value}>
      <Container classname=".container" sx={{ my: 2 }} maxWidth="lg">
        {questionList.map((question) => (
          <QuestionItem key={question.number} question={question} />
        ))}
        <ButtonGroup variant="contained" size="small">
          <Button color={"secondary"} onClick={value.handleSubmit(onSubmit)}>
            Submit
          </Button>
        </ButtonGroup>
      </Container>
    </FormProvider>
  );
}

export default Question;
