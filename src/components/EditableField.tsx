'use client';

import { PenLine } from 'lucide-react';

interface EditableFieldProps {
  label: string;
  value: string | undefined;
  isEditing: boolean;
  onChange: (val: string) => void;
  onEdit: () => void;
  onSave: () => void;
  showEdit?: boolean;
}

export default function EditableField({
  label,
  value,
  isEditing,
  onChange,
  onEdit,
  onSave,
  showEdit = true,
}: EditableFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      {/* label */}
      <span className="text-xs text-base-content/60">{label}</span>

      {isEditing ? (
        <input
          autoFocus
          className="input input-sm input-bordered w-full"
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onSave}
          onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
        />
      ) : (
        <button
          type="button"
          disabled={!showEdit}
          onClick={showEdit ? onEdit : undefined}
          className={`relative w-full text-left py-1 px-2 rounded transition ${showEdit ? 'hover:bg-base-300 focus:bg-base-300' : ''
            }`}
        >
          {/* content */}
          <span
            className={`block truncate pr-5 ${showEdit ? 'underline-dotted underline-offset-2 decoration-2' : ''
              }`}
          >
            {value || <span className="opacity-50">—</span>}
          </span>

          {/* always-visible icon if editable */}
          {showEdit && (
            <PenLine
              size={14}
              className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-400"
            />
          )}
        </button>
      )}
    </div>
  );
}
