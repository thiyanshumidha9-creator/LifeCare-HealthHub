// Reusable FormField Component (Lectures 55–60: React Forms & Validation)

export function FormField({
  label,
  id,
  type = "text",
  required = false,
  error = "",
  helperText = "",
  children,
  ...inputProps
}) {
  const inputId = id || `field-${label?.toLowerCase().replace(/\s+/g, "-")}`;
  const errorId = `${inputId}-error`;

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label}
          {required && <span className="required-star">*</span>}
        </label>
      )}

      {children ? (
        children
      ) : type === "textarea" ? (
        <textarea
          id={inputId}
          className={error ? "input-error" : ""}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          {...inputProps}
        />
      ) : (
        <input
          id={inputId}
          type={type}
          className={error ? "input-error" : ""}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          {...inputProps}
        />
      )}

      {error && (
        <p id={errorId} className="field-error" role="alert">
          ⚠️ {error}
        </p>
      )}

      {!error && helperText && <p className="form-helper">{helperText}</p>}
    </div>
  );
}

export default FormField;
