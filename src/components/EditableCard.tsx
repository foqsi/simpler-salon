'use client';

import EditableField from '@/components/EditableField';

interface EditableCardProps {
  title: string;
  footer?: React.ReactNode,
  fields: {
    label: string;
    fieldKey: string;
    value: string | undefined;
    editable?: boolean,
  }[];
  editingField: string | null;
  setEditingField: (field: string | null) => void;
  updateField: (fieldKey: string, value: string) => void;
  onSave: () => void;
}

export default function EditableCard({
  title,
  fields,
  editingField,
  setEditingField,
  updateField,
  onSave,
  footer,
}: EditableCardProps) {
  return (
    <section className="bg-base-300 p-6 rounded-xl shadow-md space-y-4">
      <h2 className="text-lg font-semibold text-base-content mb-2">{title}</h2>
      <div className="grid gap-4">
        {fields.map(({ label, fieldKey, value, editable = true }) => (
          <EditableField
            key={fieldKey}
            label={label}
            value={value}
            isEditing={editable && editingField === fieldKey}
            onChange={(val: string) => updateField(fieldKey, val)}
            onEdit={() => editable && setEditingField(fieldKey)}
            onSave={() => {
              if (editable) {
                setEditingField(null);
                onSave();
              }
            }}
            showEdit={editable}
          />
        ))}
        {footer && <div className='border-accent bg-accent rounded-xl'>{footer}</div>}
      </div>
    </section>
  );
}
