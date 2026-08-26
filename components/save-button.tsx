interface SaveButtonProps {
  pending?: boolean;
}

export function SaveButton({ pending = false }: SaveButtonProps) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-primary flex h-11 items-center justify-center rounded-md px-6 text-base font-medium"
    >
      {pending ? "저장 중..." : "저장"}
    </button>
  );
}
