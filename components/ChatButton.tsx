"use client";

interface Props {
  message: string;
  className?: string;
  children: React.ReactNode;
}

export default function ChatButton({ message, className, children }: Props) {
  return (
    <button
      onClick={() =>
        window.dispatchEvent(
          new CustomEvent("openBevansChat", { detail: { message } })
        )
      }
      className={className}
    >
      {children}
    </button>
  );
}
