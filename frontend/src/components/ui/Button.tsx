interface PropertiessButton {
  texto: String;
}

export const Button = ({ texto }: PropertiessButton) => {
  return (
    <button className="bg-acent cursor-pointer text-xs px-4 py-2 rounded-lg font-medium">
      {texto}
    </button>
  );
};
