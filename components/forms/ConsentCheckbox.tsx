"use client";

import Link from "next/link";

export function ConsentCheckbox({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-2 text-xs text-muted-foreground">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 accent-turquoise"
      />
      <span>
        Согласен на обработку персональных данных согласно{" "}
        <Link href="/privacy" className="underline">
          политике
        </Link>
      </span>
    </label>
  );
}
