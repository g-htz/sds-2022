
interface Props {
  title: string;
  onClick: () => void;
}

export default function Button({ title, onClick }: Props) {
  return (
    <button
      onClick={() => onClick()}
      className="rounded-md border bg-cyan-600 px-4 py-2 text-white transition hover:scale-105 hover:bg-cyan-400 hover:text-black active:scale-100"
    >
      {title}
    </button>
  );
}
