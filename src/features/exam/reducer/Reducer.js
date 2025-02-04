import { createSlice } from '@reduxjs/toolkit'

export const exam = createSlice({
  name: 'exam',
  initialState: {
    current: 1,
    start: false,
    total: 0,
    answerKey: {},
    answered: 0,
    result: {
      correct: 0,
      incorrect: 0,
    },
    jsonData: null,
  },
  reducers: {
    setJSON: (state,action) => {
        state.jsonData = action.payload.action
    },

    questionRestart:(state) => {
      state.current = 1;
    },

    questionsAttempted: (state, action) => {
      const move = action.payload.action
      if (state.current < (state.total) && move === 'next') {
        state.current +=  1
      }
      if (state.current > 1 && move === 'prev') {
        state.current -=  1
      }
    },
    startExam: (state, action) => {
      state.start = action.payload.action
      if (state.start === false) {
        state.current = 1;
        state.answered = 0;
        state.result.incorrect = 0;
        state.result.correct = 0;
        state.answerKey = {};
      }
      state.total = action.payload.total
    },
    setAnswerKey: (state, action) => {
      if (state.answerKey[action.payload.number] === undefined) {
        state.answered += 1;
      }
      state.answerKey[action.payload.number] = action.payload.choice
    },
    setResult: (state, action) => {
      state.result.correct = action.payload.correct;
      state.result.incorrect = action.payload.incorrect;
    },

  }
});

/** Action creators are generated for each case reducer function  */
export const { 
  questionsAttempted,
  setAnswerKey,
  setResult,
  startExam
} = exam.actions

export default exam.reducer
