type StepSelectorProps = {
  step: string;
};

export default function StepSelector({step}: StepSelectorProps) {
  return (
    <section className="p-8 border-b border-white">
      <h2 className="text-2xl font-bold uppercase mb-4">Step: {step}</h2>
      <p className="text-sm text-gray-400">
        [Options for {step} will render here]
      </p>
    </section>
  );
}
