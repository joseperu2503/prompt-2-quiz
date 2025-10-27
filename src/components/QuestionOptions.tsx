type QuestionOptionsProps = {
  options: string[];
  correct: number;
  selected: number | null;
  showAnswer: boolean;
  onSelect: (index: number) => void;
};

const QuestionOptions = ({
  options,
  correct,
  selected,
  showAnswer,
  onSelect,
}: QuestionOptionsProps) => {
  return (
    <div className="space-y-4">
      {options.map((option, i) => {
        const isSelected = selected === i;
        const isCorrect = i === correct;

        let base =
          "w-full text-left p-4 rounded-xl border transition-all duration-300 text-gray-100 cursor-pointer";
        let styles = "border-gray-700 hover:bg-gray-800";

        if (showAnswer && isSelected && isCorrect)
          styles = "border-green-500 bg-green-900/30";
        else if (showAnswer && isSelected && !isCorrect)
          styles = "border-red-500 bg-red-900/30";
        else if (showAnswer && isCorrect)
          styles = "border-green-400 bg-green-800/20";

        return (
          <button
            key={i}
            onClick={() => onSelect(i)}
            className={`${base} ${styles}`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

export default QuestionOptions;
