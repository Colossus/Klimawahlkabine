import { useEffect, useState } from "react";
import questions, { Party } from "./questions"; // Adjust the import path based on your project structure
import Link from "next/link";

interface GivenAnswer {
  questionId: number;
  answer: string;
}

type Results = { partyName: string; score: number }[];

export default function Home() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<GivenAnswer[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswerChange = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = {
      questionId: questions[currentQuestionIndex].id,
      answer,
    };
    setAnswers(newAnswers);
  };

  // Reset state and start over
  const handleStartOver = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowResults(false);
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleShowResults = () => {
    setShowResults(true);
  };

  // Function to render a simple bar chart with aligned bars and consistent row heights
  const renderBarChart = (results: Results) => {
    const maxValue = Math.max(...results.map((result) => result.score));
    return (
      <div className="space-y-4">
        {" "}
        {/* Adjust vertical spacing between rows */}
        {results.map((result, index) => (
          <div key={index} className="flex items-center h-10">
            {" "}
            {/* Fixed height for each row */}
            <span className="text-gray-700 w-1/4 md:w-1/3 lg:w-1/4">
              {result.partyName}
            </span>
            <div className="flex-1 bg-gray-200 rounded-full h-4 mx-4">
              <div
                className="bg-blue-600 h-4 rounded-full"
                style={{ width: `${(result.score / maxValue) * 100}%` }}
              ></div>
            </div>
            <span className="text-gray-700">{result.score}</span>
          </div>
        ))}
      </div>
    );
  };

  useEffect(() => {
    // Scroll to the top of the page when navigating questions
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentQuestionIndex]);

  const calculateResults = () => {
    // Initialize an object to hold scores for each party
    let scores: { [key in Party]: number } = {
      "Green Future": 0,
      "Sustainable Progress": 0,
      "Economic Growth": 0,
      "Tech Innovators": 0,
      "Traditional Values": 0,
    };

    answers.forEach((answer) => {
      // Find the question based on the answer's questionId
      const question = questions.find((q) => q.id === answer.questionId);
      if (!question) return;

      // Find the selected answer object based on the answer text
      const selectedAnswer = question.answers.find(
        (a) => a.text === answer.answer
      );
      if (!selectedAnswer) return;

      // Add the points from the selected answer to each party's score
      Object.keys(selectedAnswer.points).forEach((party) => {
        scores[party as Party] += selectedAnswer.points[party as Party];
      });
    });

    // Convert scores to a sorted array of objects { name, score }
    const sortedScores: Results = Object.keys(scores)
      .map((partyName) => ({
        partyName,
        score: scores[partyName as Party],
      }))
      .sort((a, b) => b.score - a.score);

    return sortedScores;
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center px-4">
      {" "}
      {/* Added horizontal padding */}
      <header className="text-center py-5 w-full">
        {" "}
        {/* Ensure header takes full width */}
        <h1 className="text-4xl font-bold text-gray-800">
          Klimawahlkabine
        </h1>
      </header>
      {!showResults ? (
        <div className="w-full max-w-lg">
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-gray-700">
              {questions[currentQuestionIndex].question}
            </h2>
            <div className="mt-4">
              {questions[currentQuestionIndex].answers.map((answer, index) => (
                <label
                  key={index}
                  className="block bg-white shadow-md rounded-lg px-4 py-2 mb-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    id={answer.text}
                    name="answer"
                    value={answer.text}
                    onChange={() => handleAnswerChange(answer.text)}
                    checked={
                      answers[currentQuestionIndex]?.answer === answer.text
                    }
                    className="mr-2"
                  />
                  {answer.text}
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-between">
            <button
              disabled={currentQuestionIndex === 0}
              onClick={goToPreviousQuestion}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                currentQuestionIndex === 0
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`} // Conditionally apply styles based on disabled state
            >
              Previous
            </button>
            {currentQuestionIndex === questions.length - 1 &&
            answers.length === questions.length ? (
              <button
                onClick={handleShowResults}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Show Results
              </button>
            ) : null}
            <button
              disabled={currentQuestionIndex === questions.length - 1}
              onClick={goToNextQuestion}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                currentQuestionIndex === questions.length - 1
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`} // Apply conditional styling for the Next button as well
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Results</h1>
          {renderBarChart(calculateResults())}
          <button
            onClick={handleStartOver}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Start Over
          </button>
        </div>
      )}
      <footer className="text-center py-5">
        <p>&copy; {new Date().getFullYear()} Fridays For Future Oesterreich.</p>
        <Link href="/imprint" className="text-blue-600 hover:text-blue-800">
          Impressum
        </Link>
      </footer>
    </div>
  );
}
