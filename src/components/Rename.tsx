"use client";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRef, useEffect } from "react";

type RenameProps = {
  value: string;
  onChange: (val: string) => void;
  onClose: () => void;
  onSave?: () => void;
};

export const Rename = ({ value, onChange, onClose, onSave }: RenameProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);
useEffect(() => {
  const handler = (e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  };
  window.addEventListener("keydown", handler);
  return () => window.removeEventListener("keydown", handler);
}, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 w-full max-w-sm">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Rename File
        </h2>

        <Input
          ref={inputRef}
          type="text"
          placeholder="Enter new name"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mb-4"
          onKeyDown={(e) => {
  if (e.key === "Enter") onSave?.();
}}
        />

        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onSave} disabled={!value.trim()}>
  Save
</Button>

        </div>
      </div>
    </div>
  );
};
